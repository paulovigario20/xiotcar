FROM php:8.2-fpm

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    libzip-dev libpng-dev libicu-dev libxml2-dev libsqlite3-dev curl git unzip nginx supervisor \
    && docker-php-ext-install zip gd intl bcmath pdo_sqlite pdo_mysql \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Copiar código-fonte
COPY . .

# Instalar dependências PHP
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Instalar e compilar frontend
RUN npm install && npm run build

# Preparar base de dados e storage
RUN mkdir -p /var/www/html/database /var/www/html/storage/app/public/cars \
    && touch /var/www/html/database/database.sqlite \
    && chown -R www-data:www-data /var/www/html

# Copiar .env e gerar key
RUN cp .env.example .env && \
    php artisan key:generate

# Preparar a aplicação antes de iniciar os serviços
RUN cat > /usr/local/bin/start-container <<'START_CONTAINER'
#!/bin/sh
set -e

mkdir -p /var/www/html/database \
    /var/www/html/storage/app/public/cars \
    /var/www/html/storage/framework/cache/data \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache

touch /var/www/html/database/database.sqlite

APP_PORT="${PORT:-80}"
case "$APP_PORT" in
    ''|*[!0-9]*) APP_PORT=80 ;;
esac

cat > /etc/nginx/sites-enabled/default <<'NGINX_CONF'
server {
    listen __APP_PORT__;
    server_name _;
    root /var/www/html/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }
}
NGINX_CONF
sed -i "s/__APP_PORT__/${APP_PORT}/g" /etc/nginx/sites-enabled/default

php artisan migrate --force
chown -R www-data:www-data /var/www/html/database /var/www/html/storage /var/www/html/bootstrap/cache

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
START_CONTAINER
RUN chmod +x /usr/local/bin/start-container

# Configurar PHP-FPM para ouvir em TCP 127.0.0.1:9000
RUN cat > /usr/local/etc/php-fpm.d/docker.conf <<'PHP_FPM_CONF'
[www]
listen = 127.0.0.1:9000
listen.backlog = -1
listen.owner = www-data
listen.group = www-data
user = www-data
group = www-data
pm = dynamic
pm.max_children = 5
pm.start_servers = 2
pm.min_spare_servers = 1
pm.max_spare_servers = 3
catch_workers_output = yes
clear_env = no
PHP_FPM_CONF

# Criar config Nginx
RUN rm -f /etc/nginx/sites-enabled/default && \
    mkdir -p /etc/nginx/sites-enabled && \
    cat > /etc/nginx/sites-enabled/default <<'NGINX_CONF'
server {
    listen 80;
    server_name _;
    root /var/www/html/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }
}
NGINX_CONF

# Criar arquivo de configuração do Supervisor
RUN mkdir -p /etc/supervisor/conf.d && \
    cat > /etc/supervisor/conf.d/supervisord.conf <<'SUPERVISOR_CONF'
[supervisord]
nodaemon=true
user=root
logfile=/var/log/supervisord.log
pidfile=/var/run/supervisord.pid

[program:php-fpm]
command=/usr/local/sbin/php-fpm -F
autostart=true
autorestart=true
user=root
stderr_logfile=/var/log/php-fpm.err.log
stdout_logfile=/var/log/php-fpm.out.log

[program:nginx]
command=/usr/sbin/nginx -g "daemon off;"
autostart=true
autorestart=true
user=root
stderr_logfile=/var/log/nginx.err.log
stdout_logfile=/var/log/nginx.out.log
SUPERVISOR_CONF

EXPOSE 80

CMD ["/usr/local/bin/start-container"]
