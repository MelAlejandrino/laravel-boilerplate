# laravel-inertia-react-starter

A full-stack boilerplate built with **Laravel**, **Inertia.js**, and **React**. Comes with authentication, role & permission management, user management, and a reusable data table — ready to build on top of.

## Stack

- **Laravel** — Backend framework
- **Inertia.js** — Bridge between Laravel and React
- **React** — Frontend framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **shadcn/ui** — UI components
- **Spatie Laravel Permission** — Roles & permissions
- **Laravel Sanctum** — API authentication
- **Zustand** — Client state management
- **TanStack Table** — Data tables
- **Laravel Wayfinder** — Type-safe route helpers
- **Laravel Herd** — Local development (recommended)

## Features

- 🔐 Authentication via Laravel Fortify (login, register, password reset, email verification, 2FA)
- 👥 User management (create, edit, delete, assign roles)
- 🛡️ Role & permission management (create, edit, delete, assign permissions)
- 🔑 Sanctum API token generated on login for API calls
- 📊 Reusable data table with search, sort, pagination, and sticky header
- 🚫 403 Forbidden and 404/500 error pages
- 🔔 Toast notifications via Sonner
- 🌙 Light/dark mode

## Getting Started

### Requirements

- PHP 8.2+
- Composer
- Node.js 18+
- [Laravel Herd](https://herd.laravel.com/) (recommended) or any local PHP server

### Installation

```bash
git clone https://github.com/yourusername/laravel-inertia-react-starter.git
cd laravel-inertia-react-starter

composer install
npm install

cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
```

### Running

With **Herd** (recommended):

```bash
npm run dev
```

Without Herd:

```bash
composer run dev
```

### Default Credentials

```
Email: admin@admin.com
Password: password
```

> ⚠️ Change these immediately in production.

## Permissions

Permissions are defined in `app/Constants/Permissions.php`. After adding or modifying permissions, sync them to the frontend TypeScript constants by running:

```bash
php artisan generate:permissions-ts
```

This generates `resources/js/constants/permissions.ts` automatically — no need to manually keep them in sync.

### Adding a New Permission

1. Add the constant to `app/Constants/Permissions.php`
2. Add it to the `ALL` array in the same file
3. Run `php artisan generate:permissions-ts`
4. Run `php artisan migrate:fresh --seed` to re-seed the permissions

## Project Structure

```
app/
├── Constants/
│   └── Permissions.php           # Permission constants (source of truth)
├── Console/Commands/
│   └── GeneratePermissionsTs.php # Syncs permissions to TypeScript
├── Http/
│   ├── Controllers/
│   │   ├── Api/
│   │   │   └── AuthController.php  # API login/logout/me
│   │   ├── UserController.php
│   │   └── RoleController.php
│   ├── Requests/
│   │   ├── UserRequest.php
│   │   └── RoleRequest.php
│   └── Resources/
│       ├── UserResource.php
│       └── RoleResource.php

resources/js/
├── constants/
│   └── permissions.ts            # Auto-generated, do not edit manually
├── features/
│   ├── users/                    # User management feature
│   └── roles/                    # Role management feature
├── hooks/
│   ├── use-permission.ts         # hasPermission, hasRole helpers
│   └── use-nav-items.ts          # Permission-based nav items
├── components/
│   └── data-table/               # Reusable data table components
└── pages/
    ├── users/index.tsx
    ├── roles/index.tsx
    ├── forbidden.tsx
    └── error.tsx
```

## API

The boilerplate supports both session-based (Inertia) and token-based (Sanctum) authentication.

### Endpoints

```
POST /api/login     # Get a token
POST /api/logout    # Revoke token (auth:sanctum)
GET  /api/me        # Get current user (auth:sanctum)
```

### Using the Token in React

The Sanctum token is shared via Inertia props on login:

```ts
const { auth } = usePage().props;

fetch('/api/your-endpoint', {
    headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
```

## License

MIT
