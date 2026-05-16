FROM php:8.2-apache

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    libzip-dev libpng-dev libicu-dev libxml2-dev libsqlite3-dev curl git unzip \
    && docker-php-ext-install zip gd intl bcmath pdo_sqlite pdo_mysql \
    && rm -rf /var/lib/apt/lists/*

# Habilitar mod_rewrite do Apache
RUN a2enmod rewrite

# Definir DocumentRoot
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Copiar todo o código-fonte
COPY . .

# Instalar dependências PHP
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Instalar e compilar frontend
RUN npm install && npm run build

# Preparar base de dados e storage
RUN mkdir -p /var/www/html/database /var/www/html/storage/app/public/cars \
    && touch /var/www/html/database/database.sqlite \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database

# Copiar arquivo .env.example para .env se não existir
RUN cp .env.example .env && \
    php artisan key:generate

EXPOSE 80

# Iniciar Apache
CMD ["apache2-foreground"]
