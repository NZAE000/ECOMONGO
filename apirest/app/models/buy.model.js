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
    },
    rutClient: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
})
export default mongoose.model('Buy', BuySchema)
