---
title: "Self-Hosting OpenWebUI: A Step-by-Step Walkthrough"
description: "A technical guide for deploying a production-ready OpenWebUI instance on your own domain with Docker, Nginx, and Let's Encrypt for secure AI interactions."
date: 2025-04-12
tags: ["openwebui", "self-hosting", "docker", "nginx", "lets-encrypt", "ai-interface", "devops", "infrastructure", "security", "containerization"]
showAuthor: true
showTableOfContents: true
showHero: false
category: "ai-systems-engineering"
---

# Self-Hosting OpenWebUI: A Complete Step-by-Step Guide

## Overview

OpenWebUI is an open-source, customizable web interface for various AI models and APIs. This guide provides detailed instructions for deploying a secure, production-ready OpenWebUI instance on your own server and domain. We'll cover Docker configuration, HTTPS setup with Nginx and Let's Encrypt, security best practices, and more.

By the end of this guide, you'll have a professional OpenWebUI deployment that:
- Runs behind a secure HTTPS connection
- Follows container best practices
- Is properly backed up and maintainable
- Follows security best practices

## Prerequisites

- A server with Docker and Docker Compose installed
- A domain name pointed to your server
- SSH access to your server
- Basic understanding of Linux, Docker, and networking

## Step 1: Server Preparation

Let's start by ensuring your server has the necessary components:

```bash
# Update your system
sudo apt update && sudo apt upgrade -y

# Install Docker if not already installed
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    echo "Docker installed. Please log out and back in for group changes to take effect."
    exit
fi

# Install Docker Compose if not already installed
if ! command -v docker-compose &> /dev/null; then
    sudo apt install -y docker-compose-plugin
fi
```

## Step 2: Setting Up the Directory Structure

Create a dedicated directory structure for your OpenWebUI deployment:

```bash
# Create the main directory
mkdir -p ~/openwebui
cd ~/openwebui

# Create directories for configuration files
mkdir -p nginx/conf.d
mkdir -p certbot/www
mkdir -p certbot/conf
```

## Step 3: Configure Docker Compose

Create a `docker-compose.yml` file with the following production-ready configuration:

```yaml
version: '3'

services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: openwebui
    restart: unless-stopped
    volumes:
      - open-webui-data:/app/backend/data
    environment:
      - TZ=UTC
      # Add any additional environment variables here
    networks:
      - openwebui-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    # Not exposing the port directly - we'll use Nginx as a reverse proxy
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  nginx:
    image: nginx:stable-alpine
    container_name: nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./certbot/www:/var/www/certbot
      - ./certbot/conf:/etc/letsencrypt
    networks:
      - openwebui-network
    depends_on:
      - openwebui

  certbot:
    image: certbot/certbot
    container_name: certbot
    volumes:
      - ./certbot/www:/var/www/certbot
      - ./certbot/conf:/etc/letsencrypt
    restart: unless-stopped
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
    networks:
      - openwebui-network

networks:
  openwebui-network:
    driver: bridge

volumes:
  open-webui-data:
    driver: local
```

## Step 4: Configure Nginx as a Reverse Proxy

Create an Nginx configuration file for your domain:

```bash
cat > nginx/conf.d/openwebui.conf << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/your-domain.com/chain.pem;

    # SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Proxy settings for OpenWebUI
    location / {
        proxy_pass http://openwebui:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 90;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF
```

Replace `your-domain.com` with your actual domain name.

## Step 5: Obtain SSL Certificate

Run the following command to obtain an SSL certificate from Let's Encrypt:

```bash
# Replace with your email and domain
EMAIL="your-email@example.com"
DOMAIN="your-domain.com"

# Start Nginx to handle the ACME challenge
docker-compose up -d nginx

# Wait a moment for Nginx to start
sleep 5

# Get the SSL certificate
docker-compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
  --email $EMAIL -d $DOMAIN -d www.$DOMAIN \
  --agree-tos --no-eff-email --force-renewal" certbot

# Restart Nginx to apply the SSL configuration
docker-compose restart nginx
```

## Step 6: Start Your OpenWebUI Instance

Now that everything is configured, start your OpenWebUI instance:

```bash
docker-compose up -d
```

## Step 7: Configure Automatic Renewals for SSL Certificates

Create a cron job to periodically renew your SSL certificates:

```bash
# Create a renewal script
cat > renew-ssl.sh << 'EOF'
#!/bin/bash
cd ~/openwebui
docker-compose run --rm certbot renew --quiet
docker-compose restart nginx
EOF

# Make it executable
chmod +x renew-ssl.sh

# Set up a cron job to run it twice a month
(crontab -l 2>/dev/null; echo "0 0 1,15 * * ~/openwebui/renew-ssl.sh") | crontab -
```

## Step 8: Set Up Backups

Create a backup script for your OpenWebUI data:

```bash
# Create a backup script
cat > backup.sh << 'EOF'
#!/bin/bash
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_DIR=~/openwebui-backups
mkdir -p $BACKUP_DIR

# Backup OpenWebUI data
cd ~/openwebui
docker-compose exec -T openwebui tar -czf - /app/backend/data > $BACKUP_DIR/openwebui-data-$TIMESTAMP.tar.gz

# Backup configuration files
tar -czf $BACKUP_DIR/openwebui-config-$TIMESTAMP.tar.gz -C ~/openwebui docker-compose.yml nginx certbot

# Rotate backups (keep last 7)
ls -tp $BACKUP_DIR/openwebui-data-* | grep -v '/$' | tail -n +8 | xargs -I {} rm -- {}
ls -tp $BACKUP_DIR/openwebui-config-* | grep -v '/$' | tail -n +8 | xargs -I {} rm -- {}
EOF

# Make it executable
chmod +x backup.sh

# Set up a cron job to run it daily
(crontab -l 2>/dev/null; echo "0 2 * * * ~/openwebui/backup.sh") | crontab -
```

## Step 9: Security Hardening

### Firewall Configuration

Set up a firewall to only allow necessary traffic:

```bash
# Install UFW (Uncomplicated Firewall) if not already installed
sudo apt install -y ufw

# Allow SSH, HTTP, and HTTPS
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

# Enable the firewall
sudo ufw enable
```

### Fail2Ban Configuration

Install and configure Fail2Ban to protect against brute force attacks:

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Create a basic configuration
sudo tee /etc/fail2ban/jail.local > /dev/null << EOF
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
findtime = 600
bantime = 3600
EOF

# Restart Fail2Ban
sudo systemctl restart fail2ban
```

## Step 10: Monitoring and Logging

Set up basic monitoring with Docker container logs:

```bash
# Install and configure a simple log rotation for Docker
sudo tee /etc/logrotate.d/docker-containers > /dev/null << EOF
/var/lib/docker/containers/*/*.log {
    rotate 7
    daily
    compress
    missingok
    delaycompress
    copytruncate
}
EOF
```

For more comprehensive monitoring, consider setting up Prometheus and Grafana.

## Maintenance and Troubleshooting

### Common Commands

```bash
# Check the status of your containers
docker-compose ps

# View logs for OpenWebUI
docker-compose logs -f openwebui

# View logs for Nginx
docker-compose logs -f nginx

# Restart the stack
docker-compose restart

# Update to the latest OpenWebUI version
docker-compose pull openwebui
docker-compose up -d
```

### Troubleshooting

1. **SSL Certificate Issues**: If your SSL certificate isn't working, check Nginx logs with `docker-compose logs nginx`.

2. **OpenWebUI Not Starting**: Check OpenWebUI logs with `docker-compose logs openwebui`.

3. **Connection Issues**: Ensure your domain is correctly pointing to your server's IP address.

## Conclusion

You now have a production-ready OpenWebUI instance running on your own domain with:

- HTTPS encryption
- Regular backups
- Automatic certificate renewal
- Security best practices
- Proper containerization

This setup provides a secure and reliable platform for interacting with AI models through OpenWebUI. For additional features like authentication or custom model configurations, refer to the OpenWebUI documentation.

## Next Steps

- Configure authentication for your OpenWebUI instance
- Connect to your preferred AI models and APIs
- Set up additional monitoring and alerting
- Consider implementing a content delivery network (CDN) for improved performance

Remember to keep your server and Docker images updated regularly to ensure security and stability.
