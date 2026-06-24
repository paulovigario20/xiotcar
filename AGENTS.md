# AGENTS.md

## Cursor Cloud specific instructions

### Overview

XiotCar is a Portuguese used car dealership website built with **Laravel 12** (PHP 8.2) + **React 18** (via Inertia.js) + **Vite 6**. It uses SQLite for all storage (database, cache, sessions, queues).

### System Dependencies

- **PHP 8.2+** with extensions: mbstring, xml, curl, zip, sqlite3, gd, bcmath, intl, dom, tokenizer
- **Composer 2** (PHP package manager)
- **Node.js 18+** with npm (JS package manager, lockfile is `package-lock.json`)
- **SQLite** (file-based, no server required)

### Running the Development Environment

Start all dev services concurrently:
```bash
composer dev
```
This runs (via concurrently):
1. `php artisan serve` — Laravel HTTP server on port 8000
2. `php artisan queue:listen --tries=1` — Queue worker
3. `php artisan pail --timeout=0` — Real-time log viewer
4. `npm run dev` — Vite HMR dev server on port 5173

Or start services individually in separate terminals:
```bash
php artisan serve --host=0.0.0.0 --port=8000
npm run dev
```

### Testing

```bash
php artisan test          # Run PHPUnit tests (25 tests covering auth, profile, etc.)
./vendor/bin/pint --test  # PHP code style linter (Laravel Pint)
npm run build             # Verify frontend builds successfully
```

### Database

- SQLite file at `database/database.sqlite`
- Run migrations: `php artisan migrate`
- The `DatabaseSeeder` has a known issue: `Car::factory()` fails because the Car model lacks `HasFactory` trait. Create test data via `php artisan tinker` instead.

### Key Gotchas

- The `.env` must have `APP_ENV=local` and `APP_DEBUG=true` for development (the `.env.example` defaults to production).
- After `composer install`, always run `php artisan key:generate` if `APP_KEY` is empty.
- Run `php artisan storage:link` to create the public storage symlink for car images.
- The app uses Inertia.js for SPA-like navigation; both the Laravel server AND Vite dev server must be running for the frontend to work in dev mode.
- Admin login credentials (after seeding): `admin@admin.com` / `admin1234`
