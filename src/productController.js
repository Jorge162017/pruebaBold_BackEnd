import pool from './connection.js';

// Obtener todos los productos
export async function getProduct() {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error; // Re-lanza el error para manejarlo más arriba en la cadena de promesas.
    }
}

// Obtener un producto por ID
export async function getProductById(productId) {
    if (isNaN(productId)) {
        throw new Error("ID de producto inválido");
    }

    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [parseInt(productId, 10)]);
    return rows.length > 0 ? rows[0] : null;
}

export async function createProduct({ name, description, price, category, image_url }) {
    try {
        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)',
            [name, description, price, category, image_url]
        );
        return { message: 'Producto creado', productId: result.insertId };
    } catch (error) {
        console.error('Error en createProduct:', error.message, error.stack);
        throw error;
    }
}


// Actualizar un producto por ID
export async function updateProduct(productId, { name, description, price, category }) {
    try {
        const [result] = await pool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, category = ? WHERE id = ?',
            [name, description, price, category, productId]
        );

        if (result.affectedRows > 0) {
            const [updatedProducts] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
            return updatedProducts[0];
        } else {
            return null; // No se encontró el producto o no se modificaron los datos
        }
    } catch (error) {
        throw error; // Relanza el error para manejarlo en el endpoint
    }
}


//  deleteProduct para que solo maneje la eliminación
export async function deleteProduct(productId) {
    if (!productId) {
        throw new Error('ID del producto requerido');
    }

    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [productId]);
    return result.affectedRows > 0;
}

