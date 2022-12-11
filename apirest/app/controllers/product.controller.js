import ProductModel from "../models/product.model.js"


const create = async(req, res) => 
{
    try {
        if (!req.body.category && !req.body.nameProduct && !req.body.mark && !req.body.price && !req.body.stock && !req.body.idProvider)
            return res.status(400).send({ message: "Content product can not be empty!" });

        const newProduct = new ProductModel(req.body);
        await newProduct.save();

        return res.status(200).json({
            success: true,
            message: 'Product created',
        });
        
    } catch ( err ){
        return res.status(500).json({ message: err.message });
    };
};

//asignar condicion de acuerdo al filtro por parámetro
const filter = (req) =>
{
    const {name, ctgry, price} = req.query;

    if (ctgry && price && name) return { $and: [{ category: { $regex: `${ctgry}`, $options: 'i' }}, { price: { $lte: price }}, { nameProduct: { $regex: `${name}`, $options: 'i'}}] };
    else if (ctgry && price)    return { $and: [{ category: { $regex: `${ctgry}`, $options: 'i' }}, { price: { $lte: price }}] };
    else if (name && price)     return { $and: [{ nameProduct: { $regex: `${name}`, $options: 'i'}}, { price: { $lte: price }}] };
    else if (ctgry && name)     return { $and: [{ category: { $regex: `${ctgry}`, $options: 'i'} }, { nameProduct: { $regex: `${name}`, $options: 'i'}}] };
    else
        return (ctgry || price || name)? { $or: [{ category: { $regex: `${ctgry}`, $options: 'i'}}, { price: { $lte: price }}, { nameProduct: { $regex: `${name}`, $options: 'i'}}] } : null;
}

const findAll = async(req, res) => 
{
    try {
        const condition = filter(req);
        const type      = (req.query.typeUser)? req.query.typeUser.toLowerCase() : "u";

        const products = await ProductModel.find(condition, (type=="a")? { __v:0 } : { __v:0, _id: 0, idProvider: 0, createdAt: 0, updatedAt: 0 }).exec();
        return res.status(200).json({
            success: true,
            products: products,
        });

    } catch ( err ){
        return res.status(500).json({ message: err.message });
    };
};

const findAllByStock = async(req, res) =>
{
    try {
        const stock = req.params.stock;
        if (stock<0) return res.send({ message: "Incorrect stock value" });

        const products = await ProductModel.find({ stock: stock }, '-__v -_id');  

        return res.status(200).json({
            success: true,
            product: products,
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const findAllFromProvider = async(req, res) =>
{
    try {
        const id_prov  = req.params.id_prov;
        const products = await ProductModel.find({ idProvider: id_prov }, '-__v -_id');

        return res.status(200).json({
            success: true,
            product: products,
        });
        
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const findId = async(req, res) => 
{
    try {
        const foundNew = await ProductModel.findById( req.params.id_prod, '-createdAt -updatedAt -__v' ).exec();
        
        if(!foundNew)
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        
        return res.status(200).json({
            success: true,
            product: foundNew,
        });

    } catch ( err ){
        return res.status(500).json({ message: err.message });
    };
};

const update = async(req, res) => 
{
    try {
        const attributes = req.body;  
       
        if(!Object.entries(attributes).length)
            return res.status(404).json({
                success: false,
                error: "Product needs some parameter to update"
            });
    
        await ProductModel.findByIdAndUpdate(req.params.id_prod, attributes).exec();

        return res.status(200).json({
            success: true,
            message: 'Product updated',
        });

    } catch ( err ){
        return res.status(500).json({ message: err.message });
    };
};

const deleteOne = async(req, res) => 
{
    try {
        const productDeleted = await ProductModel.findByIdAndDelete(req.params.id_prod).exec();

        return (!productDeleted)? res.status(404).json({
            success: false,
            error: "Product not found to delete"
        }) 
        : res.status(200).json({
            success: true,
            message: 'Product removed',
        });

    } catch ( err ){
        return res.status(500).json({ message: err.message });
    };
};

const deleteAll = async(req, res) => 
{
    try {
        const products = await ProductModel.deleteMany().exec();
        return res.status(200).json({
            success: true,
            products: products,
        });

    } catch ( err ){
        return res.status(500).json({ message: err.message });
    };
};

export { create, findAll, findAllByStock, findAllFromProvider, findId, update, deleteOne, deleteAll };