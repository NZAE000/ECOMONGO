import PurchasedProductModel from "../models/purchasedProduct.model.js"

// Crear un nuevo producto comprado
const create = async(req, res) =>
{
    // Validar consulta
    if (!req.body.units && !req.body.product && !req.body.buy)
        return res.status(400).send({ message: "Content can not be empty!" });

    // Create a purchased product
    const purchased = new PurchasedProductModel(req.body);

    purchased.save()
    .then(data =>{
        return res.status(200).json({
            success: true,
            message: "Purchased product created"
        })
    })
    .catch(err => {
        return res.status(500).json({message: err.message})
    })
};

const filter = async(req) =>
{
    const {name, ctgry} = req.query;

    if (name && ctgry) return { [Op.and]: [{ category: { [Op.like]: `%${ctgry}%`} }, { name_product: { [Op.like]: `%${name}%`} }] };
    else return (name || ctgry)? { [Op.or]: [{ category: { [Op.like]: `%${ctgry}%`} }, { name_product: { [Op.like]: `%${name}%`} }] } : null; 
}

//Retornar los productos comprados de la base de datos.
const findAll = async(req, res) => 
{
    const condition = filter(req);

    PurchasedProductModel.find({},'-__v')
    .then(data => {
        return res.send(data);
    })
    .catch(err => {
        return res.status(500).send({ message: err.message || "Search failed."});
    });
};

// Buscar producto comprado por id
const findId = async(req, res) => 
{
    const id = req.params.id_purchased;

    PurchasedProductModel.findById(id)
    .then(data => {
        if (data) return res.send(data); // existe el dato? entrega la data
        else      return res.status(404).send({ message: `The purchased product was not found. `});
    })
    .catch(err => {
        return res.status(500).send({ message: err.message + ". " || "Search failed. "});
    });
};

// actualizar un producto comprado por su id
const update = async(req, res) => 
{
    const id = req.params.id_purchased;

    UserModel.findOneAndUpdate({ "_id" : id }, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data)
            return res.status(404).send({ message: "No purchased found with id " + id });

        return res.status(200).json({
            success: true,
            message: 'Purchased product updated',
        });
    })
    .catch(err => {
        return res.status(500).send({ message: err.message + ". " || "Update error. "});
    });
};

// eliminar un producto comprado
const deleteOne = async(req, res) =>
{
    const id = req.params.id_purchased;

    PurchasedProductModel.findOneAndDelete(id)
    .then(data => {
        if (!data) 
            return res.status(404).send({ message: "No purchased found with id " + id });
        
        return res.status(200).json({
            success: true,
            message: 'Product purchased remove.',
        });
    })
    .catch(err => {
        return res.status(500).send({ message: err.message + ". " || "Update error. "});
    })
};

// eliminar todos los productos comprados
const deleteAll = async(req, res) =>
{
    UserModel.deleteMany({})
    .then(data => {
        return res.status(200).send({ message: `${data.deletedCount} purchased products removed.`})
    })
    .catch(err => {
        return res.status(500).json({message: "Error deleting all purchased products"});
    })
};

export{ create, findAll, findId, update, deleteOne, deleteAll };