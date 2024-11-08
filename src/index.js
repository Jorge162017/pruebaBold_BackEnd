import express from 'express';
import cors from 'cors';
import { 
    getProduct, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from './productController.js';

const app = express();
const port = 3800;

app.use(express.json());
app.use(cors());

// Endpoint para obtener todos los productos
app.get("/product", async (req, res) => { 
    try {
        const products = await getProduct();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

// Endpoint para obtener un producto por ID
app.get("/product/:productId", async (req, res) => {
    try {
        const product = await getProductById(req.params.productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        if (error.message === "ID de producto inválido") {
            res.status(400).json({ error: error.message });
        } else {
            console.error('Error al obtener el producto por ID:', error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
});

// Endpoint para crear un producto
app.post("/product", async (req, res) => {
    try {
        const newProduct = await createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
});

// Endpoint para actualizar un producto por ID
app.put("/product/:productId", async (req, res) => {
    try {
        const updatedProduct = await updateProduct(req.params.productId, req.body);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
});

// Endpoint para eliminar un producto por ID
app.delete("/product/:productId", async (req, res) => {
    try {
        const deleted = await deleteProduct(req.params.productId);
        if (deleted) {
            res.status(204).end(); // No content response
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        if (error.message === 'ID del producto requerido') {
            res.status(400).json({ error: error.message });
        } else {
            console.error('Error al eliminar el producto:', error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
