# Usa la imagen oficial de MySQL
FROM mysql:latest

# Variables de entorno para configurar la base de datos
ENV MYSQL_DATABASE=ecommerce_db
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_USER=JorgeLopez
ENV MYSQL_PASSWORD=123456

# Copia el script de inicialización de la base de datos
COPY schema.sql /docker-entrypoint-initdb.d/

# Exponer el puerto 3306 de MySQL
EXPOSE 3306
