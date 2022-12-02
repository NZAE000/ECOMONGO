import mongoose from "mongoose";

const ProviderSchema = new mongoose.Schema({

    units: {
        type: Number,
        required: true,
    }
})
export default mongoose.model('Providers', ProviderSchema)