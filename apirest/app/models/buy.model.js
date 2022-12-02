import mongoose from "mongoose";

const BuySchema = new mongoose.Schema({
    dateBuy: {
        type: Date,
        required: true,
    },
    totalProducts: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
})
export default mongoose.model('Buys', BuySchema)
