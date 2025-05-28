## Production Deployment Workflow

### Using Github Actions & SSH

**Step 1: Create a Custom SSH Key for GitHub Actions**

1. Log in to the server:
```bash
ssh username@your_server
```

2. Create a new SSH key on the server
```bash
# Press Enter on all questions to accept the default (no passphrase)
ssh-keygen -t rsa -b 4096 -C "github-actions@example.com" -f ~/.ssh/id_rsa_github
```

3. Add the public key to the ```authorized_keys``` file on the server:
```bash
cat ~/.ssh/id_rsa_github.pub >> ~/.ssh/authorized_keys
```

4. Get and copy the contents of the private key:
```bash
cat ~/.ssh/id_rsa_github
```

**Step 2: Store Private Key and Server Info in GitHub Secrets**
> [!CAUTION]
> Never put private keys or sensitive information directly in code. Use the "Secrets" feature on GitHub.

1. Open the GitHub repository
2. Go to ```Settings > Secrets and variables > Actions.```
3. Click the New repository secret button and create the following secret:
    - name: ```SSH_PRIVATE_KEY``` secret: value ```id_rsa_github```
    - name: ```SSH_HOST``` secret: ```your_public_ip```
    - name: ```SSH_USER``` secret: ```your_user```


**Step 3: Create a GitHub Actions Workflow File**


```yml
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
            # Add 'set -e' to stop the script if any command fails.
            set -e

            # 1. Move to project directory
            echo "Changing directory..."
            cd /home/laravel-boilerplate/htdocs/laravel-boilerplate.vngne.tech/laravel-boilerplate

            # 2. Maintenance Mode
            echo "Activating maintenance mode..."
            php artisan down

            # 3. Pull
            echo "Pulling latest code from prod branch..."
            git pull origin main

            # 4. Install Dependencies
            echo "Installing Composer dependencies..."
            composer install --no-interaction --prefer-dist --optimize-autoloader

            # 5. Run Database Migrations
            echo "Running database migrations..."
            php artisan migrate --force

            # 6. Clear Cache
            echo "Clearing cache and creating new cache..."
            php artisan optimize:clear
            php artisan config:cache
            php artisan route:cache
            php artisan view:cache

            # 7. Exit maintenance mode
            echo "Deactivating maintenance mode..."
            php artisan up

            echo "✅ Deployment to production successful!"
```
