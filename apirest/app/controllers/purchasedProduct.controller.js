import PurchasedProductModel from "../models/purchasedProduct.model.js"

// Crear un nuevo producto comprado
exports.create = (req, res) =>
{
    // Validar consulta
    if (!req.body.units && !req.body.id_product && !req.body.id_buy) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a purchased product
    const client = new PurchasedProductModel({
        units:      req.body.units,
        id_buy:     req.body.id_buy,
        id_product: req.body.id_product
    })
    Purchased.save()
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
};

const filter = (req) =>
{
    const {name, ctgry} = req.query;

    if (name && ctgry) return { [Op.and]: [{ category: { [Op.like]: `%${ctgry}%`} }, { name_product: { [Op.like]: `%${name}%`} }] };
    else return (name || ctgry)? { [Op.or]: [{ category: { [Op.like]: `%${ctgry}%`} }, { name_product: { [Op.like]: `%${name}%`} }] } : null; 
}

//Retornar los productos comprados de la base de datos.
exports.findAll= (req, res) => 
{
    const condition = filter(req);

    Purchased.findAll({ 
/*
        include:[{
            model: db.product,
            as: 'product',
            //required: false,
            attributes: { exclude:["id_product","createdAt","updatedAt", "id_provider", "stock"] },
            where: condition
        }],
        attributes: { exclude:["updatedAt", "id_product"] }
*/
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error en la búsqueda"});
    });
};

// Buscar producto comprado por id
exports.findOne= (req, res) => 
{
    const id = req.params;

    Purchased.findByPk(id,{
/*
        include: [{ 
            model: db.product,
            as: 'product',
            required: false,
            attributes: { exclude:["id_product","createdAt","updatedAt", "id_provider"] }
        }],
        attributes: { exclude:["updatedAt", "id_product"] },
*/
    })

    .then(data => {
        if (data) res.send(data); // existe el dato? entrega la data
        else      res.status(404).send({ message: `No se encontró el producto comprado. `});
    })
    .catch(err => {
        res.status(500).send({ message: err.message + ". " || "Error en la búsqueda. "});
    });
};

// actualizar un producto comprado por su id
exports.update= (req, res) => 
{
    const id = req.params.id_purchased;
    Purchased.update(req.body, {  where: { id_purchased: id }})

    .then(num => {
        if (num == 1) res.send({ message: "Producto comprado actualizado. "});
        else          res.status(404).send({ message: `No se pudo actualizar el producto comprado. `});
        
    })
    .catch(err => {
        res.status(500).send({ message: err.message + ". " || "Error en actualización. "});
    });
};

// eliminar un producto comprado
exports.delete= (req, res) =>
{
    const id = req.params.id_purchased;
    Purchased.destroy({where: { id_purchased: id }})
    .then(num => {
        if (num == 1) res.send({ message: "Producto comprado eliminado" });
        else          res.status(404).send({ message: `Producto comprado no encontrado. `});     
    })
    .catch(err => {
        res.status(500).send({ message: err.message + ". " || "Error al eliminar producto comprado. "});
    });
};

// eliminar todos los productos comprados
exports.deleteAll= (req, res) =>
{
    const id = req.params.id_purchased;
    Purchased.destroy({where: {}, truncate: false})
    .then(nums => {
       res.send({message: `Productos comprados eliminados! (${nums})`})
    })
    .catch(err => {
        res.status(500).send({ message: err.message + ". " || "Error al eliminar producto comprado. "});
    });
};