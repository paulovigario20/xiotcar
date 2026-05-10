FROM php:8.4-cli

# Dependências do sistema
RUN apt-get update && apt-get install -y \
    libzip-dev libpng-dev libicu-dev libxml2-dev libsqlite3-dev \
    unzip curl git sqlite3 \
    && docker-php-ext-install zip gd intl bcmath pdo_sqlite pdo_mysql \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar código-fonte
COPY app/ /app/

# Instalar dependências PHP
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Instalar e compilar frontend
RUN npm install && npm run build

# Preparar base de dados e storage
RUN mkdir -p /app/database /app/storage/app/public/cars \
    && touch /app/database/database.sqlite \
    && php artisan migrate --force \
    && php artisan storage:link 2>/dev/null || true \
    && chown -R www-data:www-data /app/storage /app/bootstrap/cache /app/database

EXPOSE 8090

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8090"]
