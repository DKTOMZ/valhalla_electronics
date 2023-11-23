import mongoose from "mongoose";

/**
 * Product schema for mongodb. Used to create a product before db operations.
 */
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    properties: {
        type: Object,
        required: true
    }
},{ versionKey: false });

/**
 * Product model for mongodb. Used to perform db CRUD operations.
 */
const Product = mongoose.models.products || mongoose.model('products', productSchema);

export default Product;