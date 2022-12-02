import mongoose from "mongoose";

const PurshacedProductSchema = new mongoose.Schema({

    units: {
        type: Number,
        required: true,
    }
})
export default mongoose.model('PurshacedProducts', PurshacedProductSchema)