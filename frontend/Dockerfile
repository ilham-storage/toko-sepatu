# Gunakan Nginx yang sangat ringan
FROM nginx:alpine

# Salin semua file dari folder frontend ke direktori default Nginx
COPY . /usr/share/nginx/html

# Ekspos port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]