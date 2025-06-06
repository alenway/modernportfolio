# Use nginx to serve static files
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy your website files into nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# No need for CMD – nginx does it by default
