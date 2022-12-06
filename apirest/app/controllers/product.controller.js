import ProductModel from "../models/product.model.js"


const create = async ( req, res ) => {
    try {

        const ProductAttributes = req.body;

        const newProduct = new ProductModel(ProductAttributes);

        await newProduct.save();

        return res.status(200).json({
            success: true,
            message: 'producto creado',
        });
        
    }catch ( error ){
        console.log(error);
        return error;
    };
};

const findId = async ( req, res ) => {
    try {

        console.log("ID: ",req.params.id);
        const foundNew = await ProductModel.findById( req.params.id, '-createdAt -updatedAt -__v' ).exec();
        
        if(!foundNew){
            return res.status(404).json({
                success: false,
                error: "producto no encontrado"
            });
        };
        
        return res.status(200).json({
            success: true,
            product: foundNew,
        });


    }catch ( error ){
        console.log(error);
        return error;
    };
};

const findAll = async ( req, res ) => {
    try {//name

        const products = await ProductModel.find().exec();
        return res.status(200).json({
            success: true,
            products: products,
        });
    }catch ( error ){
        return error;
    };
};

const update = async ( req, res ) => {
    try {

        const attributes = req.body;  
       
        if(!Object.entries(attributes).length){
            return res.status(404).json({
                success: false,
                error: "Producto necesita algun parametro para actualizar"
            });
        }
        await ProductModel.findByIdAndUpdate(req.params.id, attributes).exec();

        return res.status(200).json({
            success: true,
            message: 'Producto actualizado',
        });
    }catch ( error ){
        console.log(error)
        return error ;
    };
};

const deleteOne = async ( req, res ) => {
    try {

        console.log("ID: ",req.params.id);
        const productDeleted = await ProductModel.findByIdAndDelete(req.params.id).exec();
        if(!productDeleted){
            return res.status(404).json({
                success: false,
                error: "Producto no encontrado para eliminar"
            });
        };
       
        return res.status(200).json({
            success: true,
            message: 'Producto eliminado',
        });
    }catch ( error ){
        console.log(error)
        return  error ;

    };
};

const deleteAll = async ( req, res ) => {
    try {

        const products = await ProductModel.deleteMany().exec();
        return res.status(200).json({
            success: true,
            products: products,
        });
    }catch ( error ){
        return error;

    };
};
export { create, findAll, findId, update, deleteOne, deleteAll };