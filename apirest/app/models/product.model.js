import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
    },

    nameProduct: {
        type: String,
        required: true,
    },
    mark: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    }
})
export default mongoose.model('Products', ProductSchema)
