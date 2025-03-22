
## Getting Started

First, run the development server:

```bash
laravel new --using=vngne/boilerplate
```
```bash
composer run dev
```

Configure your local environment
```bash
cp .env.local .env
```
```bash
php artisan key:generate
```
Migrate database
```bash
php artisan migrate --seed
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.
Use [Style Guide](https://ekovegeance.github.io/styleguide/coding/laravel) for Consistent Development 

## Tech Stack

- [Laravel](https://laravel.com/docs/12.x) - learn about Laravel
- [Eloquent ORM](https://laravel.com/docs/11.x/eloquent) - PostgreSQL
- [Auth Laravel Breeze](https://laravel.com/docs/12.x/starter-kits#laravel-breeze) - Inertia React
- [Dependencies/ third party library](https://github.com/ekovegeance/laravel-templates/blob/main/package.json)

With shadcn/ui [Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.](https://ui.shadcn.com/) 
Generate UI [v0](https://v0.dev/https://v0.dev/)


