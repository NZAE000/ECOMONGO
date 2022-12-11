import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
        trim:true
    },

    nameProduct: {
        type: String,
        required: true,
        trim:true
    },
    mark: {
        type: String,
        required: true,
        trim:true
    },
    price: {
        type: Number,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        trim:true
    },
    idProvider: {
        type: String,
        required: true,
        trim:true
    }
},
{
    timestamps: true
}
)
export default mongoose.model('Product', ProductSchema)
