#!/bin/bash
set -e

# Set storage permissions only
echo "Setting storage folder permissions..."
chown -R www-data:www-data /var/www/html/storage
chmod -R 775 /var/www/html/storage

# Start Apache
exec apache2-foreground