name: Production

on:
push:
branches:
- prod

jobs:
deploy:
runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }} 
          username: ${{ secrets.SSH_USER }} 
          key: ${{ secrets.SSH_PRIVATE_KEY }} 

          script: |
            # Menambahkan 'set -e' agar skrip berhenti jika ada perintah yang gagal
            set -e

            # 1. Pindah ke direktori proyek
            echo "Changing directory..."
            cd /home/laravel-boilerplate/htdocs/laravel-boilerplate.vngne.tech/laravel-boilerplate

            # 2. Masuk ke mode maintenance agar user tidak mengalami error saat proses deploy
            echo "Activating maintenance mode..."
            php artisan down

            # 3. Tarik perubahan terbaru dari branch 'prod'
            echo "Pulling latest code from prod branch..."
            git pull origin prod

            # 4. Install dependensi Composer (hanya jika ada perubahan di composer.lock)
            echo "Installing Composer dependencies..."
            composer install --no-interaction --prefer-dist --optimize-autoloader

            # 5. Jalankan migrasi database
            echo "Running database migrations..."
            php artisan migrate --force

            # 6. Bersihkan dan buat cache baru untuk performa
            echo "Clearing cache and creating new cache..."
            php artisan optimize:clear
            php artisan config:cache
            php artisan route:cache
            php artisan view:cache

            # 7. Keluar dari mode maintenance
            echo "Deactivating maintenance mode..."
            php artisan up

            echo "✅ Deployment to production successful!"