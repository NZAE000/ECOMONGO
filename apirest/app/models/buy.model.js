import mongoose from "mongoose";

const BuySchema = new mongoose.Schema({
    totalProducts: {
        type: Number,
        required: true,
        trim: true
    },
    totalPrice: {
        type: Number,
        required: true,
        trim: true
    }
})
export default mongoose.model('Buys', BuySchema)
