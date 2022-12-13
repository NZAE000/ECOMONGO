import mongoose from "mongoose";

const PurchasedProductSchema = new mongoose.Schema({

    units: {
        type: Number,
        required: true,
        trim:true
    },
    buy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buy',
        trim: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        trim: true
    }
},
{    
    timestaps: true
});

export default mongoose.model('PurshacedProduct', PurchasedProductSchema);
