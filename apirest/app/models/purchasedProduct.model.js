import mongoose from "mongoose";

const PurchasedProductSchema = new mongoose.Schema({

    units: {
        type: Number,
        required: true,
        trim:true
    }
},
{    timestaps:true})
export default mongoose.model('PurshacedProducts', PurchasedProductSchema)
