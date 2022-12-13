import mongoose from "mongoose";

const BuySchema = new mongoose.Schema({
    totalProducts: {
        type: Number,
        required: true,
        trim: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true,
        trim: true,
        min: 0
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
});

export default mongoose.model('Buy', BuySchema);
