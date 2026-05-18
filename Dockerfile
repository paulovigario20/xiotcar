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

# Configurar Nginx
RUN mkdir -p /etc/nginx/sites-available && \
    echo 'server { \
    listen 80; \
    server_name _; \
    root /var/www/html/public; \
    index index.php; \
    location / { \
        try_files $uri $uri/ /index.php?$query_string; \
    } \
    location ~ \.php$ { \
        fastcgi_pass 127.0.0.1:9000; \
        fastcgi_index index.php; \
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name; \
        include fastcgi_params; \
    } \
    location ~ /\.ht { \
        deny all; \
    } \
}' > /etc/nginx/sites-available/default

# Configurar Supervisor para rodar PHP-FPM e Nginx
RUN mkdir -p /etc/supervisor/conf.d && \
    echo '[supervisord] \
nodaemon=true \
\
[program:php-fpm] \
command=php-fpm \
autostart=true \
autorestart=true \
\
[program:nginx] \
command=nginx -g "daemon off;" \
autostart=true \
autorestart=true' > /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
