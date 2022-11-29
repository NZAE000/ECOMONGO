import mongoose from "mongoose";

const BuySchema = new mongoose.Schema({
    dateBuy: {
        type: Date,
        required: true,
    },
    totalProducts: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: String,
        required: true,
    }
})
export default mongoose.model('Buys', BuySchema)
