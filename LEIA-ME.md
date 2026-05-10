# Xiotecar — Guia de Instalação

## Opção 1: Com Docker (Recomendado)

### Pré-requisitos
- Docker e Docker Compose instalados
- Um servidor (Hetzner, Railway, DigitalOcean, etc.)

### Passos

1. **Copiar os ficheiros para o servidor:**
   ```bash
   scp -r xiotecar-delivery/ utilizador@servidor:/home/utilizador/xiotecar/
   ```

2. **No servidor, construir e iniciar:**
   ```bash
   cd xiotecar
   docker compose up -d --build
   ```

3. **O site estará disponível em:** http://IP-DO-SERVIDOR:8090

4. **Para usar HTTPS**, configurar Nginx ou Caddy como reverse proxy:
   ```bash
   # Exemplo com Caddy (instalar: apt install caddy)
   caddy reverse-proxy --from xiotecar.pt --to localhost:8090
   ```

### Criar utilizador administrador
```bash
docker exec -it xiotecar php artisan tinker --execute="
App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@xiotecar.pt',
    'password' => bcrypt('SuaPasswordAqui'),
    'email_verified_at' => now(),
]);
"
```

### Aceder ao backoffice
- URL: http://IP-DO-SERVIDOR:8090/login
- Usar as credenciais criadas acima

---

## Opção 2: Sem Docker (Servidor tradicional)

### Pré-requisitos
- PHP 8.2+ com extensões: mbstring, xml, curl, zip, sqlite3, gd, bcmath, intl
- Composer 2
- Node.js 18+
- Nginx ou Apache

### Passos

1. **Copiar a pasta `app/` para o servidor**

2. **Instalar dependências:**
   ```bash
   cd app
   composer install --no-dev --optimize-autoloader
   npm install
   npm run build
   ```

3. **Configurar o ficheiro `.env`:**
   ```bash
   cp .env.example .env  # ou editar o .env existente
   php artisan key:generate
   ```
   
   Alterar no `.env`:
   - `APP_URL=https://seudominio.pt`
   - `DB_CONNECTION=sqlite` (ou mysql se preferir)
   - `MAIL_MAILER=smtp` (configurar SMTP para emails)

4. **Preparar a base de dados:**
   ```bash
   touch database/database.sqlite
   php artisan migrate --force
   php artisan storage:link
   ```

5. **Configurar Nginx:**
   ```nginx
   server {
       listen 80;
       server_name xiotecar.pt;
       root /caminho/para/app/public;
       
       index index.php;
       
       location / {
           try_files $uri $uri/ /index.php?$query_string;
       }
       
       location ~ \.php$ {
           fastcgi_pass unix:/run/php/php8.2-fpm.sock;
           fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
           include fastcgi_params;
       }
   }
   ```

6. **Permissões:**
   ```bash
   chmod -R 775 storage bootstrap/cache
   chown -R www-data:www-data storage bootstrap/cache database
   ```

---

## Estrutura do Projeto

```
app/
├── app/Http/Controllers/   ← Lógica do servidor (PHP)
├── resources/js/Pages/     ← Páginas do frontend (React)
├── routes/web.php          ← Rotas do site
├── database/               ← Migrações e base de dados SQLite
├── public/                 ← Ficheiros públicos (imagens, CSS, JS compilado)
│   ├── build/              ← Assets compilados pelo Vite
│   ├── imgs/               ← Logótipos de marcas e imagens do site
│   └── storage/            ← Link simbólico para uploads
└── storage/app/public/cars ← Fotografias das viaturas
```

## Backoffice — O que pode fazer

| Página | URL | Funcionalidade |
|---|---|---|
| Dashboard | /dashboard | Ver estatísticas e retomas recentes |
| Carros | /cars | Listar, criar, editar, eliminar viaturas |
| Marcas | /brands | Listar, criar, editar, eliminar marcas |
| Utilizadores | /users | Ver utilizadores registados |

## Dados Atuais

O site já contém:
- 8 viaturas migradas do StandVirtual com 40 fotografias
- 10 marcas registadas
- Design escuro profissional baseado no site WordPress

## Suporte

Para questões técnicas, contactar quem forneceu este pacote.
