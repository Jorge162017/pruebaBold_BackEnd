-- Crear usuario y otorgar permisos
CREATE USER IF NOT EXISTS 'JorgeLopez'@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'JorgeLopez'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,             -- Nombre del producto
    description TEXT NOT NULL,               -- Descripción del producto
    price DECIMAL(10, 2) NOT NULL,           -- Precio del producto
    category VARCHAR(100),                   -- Categoría del producto
    image_url VARCHAR(500),                  -- URL de la imagen del producto
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de creación
);
