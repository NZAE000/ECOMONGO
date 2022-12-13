import BuyModel from "../models/buy.model.js";

// const isValidPurchased = (purchased) => {
//     return (purchased.id_product && purchased.units);
// }

// const isValidBoughtProducts = (purchasedProds) =>
// {
//     if (purchasedProds.length == 0) return false;
    
//     purchasedProds.forEach(purchased => { if (!isValidPurchased(purchased)) return false; });
//     return true;
// }

// const isValidBuy = (req) => {
//     return (req.body.date_buy && req.body.total_products && req.body.total_price && req.body.id_client);
// }

// const isDataValid = (req) => {
//     return (isValidBuy(req) && isValidBoughtProducts(req.body.purchasedProds));
// }

// const getInOrderPurchasedProds = (req) =>
// {
//     const size = req.body.purchasedProds.length;
//     const id_products = [], units_prods = [];

//     // Situar los id y unidades apartados pero en misma posicion de indice
//     for (p=0; p<size; ++p) {
//         id_products.push(req.body.purchasedProds[p].id_product);
//         units_prods.push(req.body.purchasedProds[p].units);
//     }
//     return {id_prods: id_products, u_prods: units_prods};
// }

// const areAllProducts = (products, ids) => 
// {
//     return (products && (products.length == ids.length))?  { value: 200, mess: "areAllProducts: All products found. " }
//     : { value: 404, mess: "areAllProducts: The product(s) were not found. " };
// }

// const availableStock = (products, purchasedProds) =>
// {
//     const size = products.length;
//     for (p=0; p<size; ++p)
//     {
//         const indexOfId = purchasedProds.id_prods.indexOf(products[p].id_product);
//         if (products[p].stock < purchasedProds.u_prods[indexOfId])
//             return { value: 404, mess: "availableStock: Stock not available. " };
//     }
//     return { value: 200, mess: "availableStock: stock available. " };
// }

// async function createBuy(req, T)
// {
//     var status = { value: 200, mess: "buy created", id_buy: 0 };

//     await Buy.create({                          // Guardar en la base de datos
//         date_buy:       req.body.date_buy,
//         total_products: req.body.total_products,
//         total_price:    req.body.total_price*1.19,
//         id_client:      req.body.id_client
//     }, { transaction: T })
//     .then(buy => {
//         status.id_buy = buy.id_buy;
//     })
//     .catch(err => {
//         status = { value: 500, mess:  err.message + ". " || "createBuy: Error creating a new purchase. " };
//     });

//     return status;
// }

// async function createPurchasedProducts(purchasedProds, id_buy, T)
// {
//     var status = { value: 200, mess: "Buy and purchased products created. " };
//     var purchaseds = [];
//     //console.log("aca: " + id_buy);

//     purchasedProds.forEach(purchase => {
//         purchaseds.push({
//             units:      purchase.units,
//             id_buy:     id_buy,
//             id_product: purchase.id_product
//         });
//     });
//     // Creacion masiva de productos comprados
//     await db.purchasedProduct.bulkCreate(purchaseds, { transaction: T })
//     .catch(err => {
//         status = { value: 500, mess: err.message + ". " || "createPurchasedProds: Error creating a new products purchased. " };
//     });

//     return status;
// }

// async function discountStock(products, purchasedProds, T)
// {
//     var status = { value: 200, mess: "Discounted stock. " };
//     var productsToUpdate = []
//     //console.log(JSON.stringify(products));
    
//     var size = products.length;
//     for (p=0; p<size; ++p)
//     {
//         const indexOfId = purchasedProds.id_prods.indexOf(products[p].id_product);
//         //productsToUpdate.push({ id_product: products[p].id_product, stock:  (products[p].stock - purchasedProds.u_prods[indexOfId]) });
//         await products[p].decrement(['stock'], { by: purchasedProds.u_prods[indexOfId] }, { transaction: T })
//         .then(prod => {
//             //console.log("ojo: " + JSON.stringify(prod));
//         })
//         .catch(err => { 
//             status = { value: 500, mess: err.message + ". " || "discountStock: stock discount error. " };
//         })
//         if (status.value != 200) break;
//     }

//     //console.log(productsToUpdate);
//     // await db.product.bulkCreate(productsToUpdate,
//     //     { updateOnDuplicate: ["stock"] }, { transaction: T }
//     // )
//     // .then(products => {
//     //     console.log("CAC");
//     //     console.log(JSON.stringify(products));
//     // }).catch(err => {
//     //     console.log(err);
//     //     status = { value: 500, mess: err.message + ". " || "discountStock: Error updating stock. " };
//     // });
//     return status;
// }

// async function destroyBuy(id)
// {
//     var status = { mess: "Purchase removed. " };

//     Buy.destroy({ where: { id_buy: id } })
//     .then(num => {
//         if (num != 1) status.mess =  "Purchase not found. "; 
//     })
//     .catch(err => {   status.mess =  "Error removing purchase. " + err.message + ". " ;
//     });

//     return status;
// }

// async function createBuyTransaction(req, T)
// {
//     const OKEY           = 200;
//     const purchasedProds = getInOrderPurchasedProds(req);   //console.log(purchasedProds);
//     const Condition      = { id_product: {[Op.or]: purchasedProds.id_prods } };
//     let status, id_buy   = 0;
    
//     await db.product.findAll({
//         where: Condition,                   // todos los que su id intersecten en conjunto id_products
//         attributes: ["id_product", "stock"]
//     }, { transaction: T })
//     .then(async products =>             
//     {
//         //console.log(JSON.stringify(products));
//         if ((( status = areAllProducts(products, purchasedProds.id_prods)).value == OKEY ) 
//         && ((  status = availableStock(products, purchasedProds)).value          == OKEY )
//         && ((  status = await createBuy(req, T)).value                           == OKEY ))
//         { 
//             id_buy = status.id_buy;
//             if ((( status = await discountStock(products, purchasedProds, T)).value                  != OKEY )
//             || ((  status = await createPurchasedProducts(req.body.purchasedProds, id_buy, T)).value != OKEY ))
//             {
//                 status.mess += (await destroyBuy(id_buy)).mess;
//             }
//         }
//     })
//     .catch(err => {
//         status = { value: 500, mess:  err.message + ". " || "createBuyTransaction: error in searching the product(s). " };
//     })
        
//     return status;
// }

// Crear una nueva compra
// exports.create = async function (req, res)
// {
//     if (!isDataValid(req)){                         // Validar consulta
//         res.status(400).send({ message: "Content can not be empty!. " }); return;
//     }
//     try {
//         const T        = await db.sequelize.transaction(); 
//         const response = await createBuyTransaction(req, T);
//         await T.commit();
//         return res.status(response.value).json({ message: response.mess });
//     } 
//     catch (err){
//         await err.rollback(); 
//         return res.status(500).send({ message: "TransactionError: " + err.message + ". " })
//     }
// };

const create = async(req, res) => 
{
    // Agregar validaciones
    // 
    const buy = new BuyModel({
        totalProducts: req.body.totalProducts,
        totalPrice:    req.body.totalPrice*1.19,
        client:        req.body.idClient
    });

    buy.save()
    .then(data =>{
        return res.status(200).json({
            success: true,
            message: 'Buy created',
        });
    })
    .catch(err => {
        return res.status(500).json({message: err.message});
    })
};

// Filtrar compras de un clinte o por fecha, o las dos
const filter = (req) =>
{
    const { id_cl, date } = req.query;

    if ( id_cl && date ) return { $and: [{ client: id_cl }, { createdAt: { $lte: date} }] };
    else return (id_cl || date)? { $or: [{ client: id_cl }, { createdAt: { $lte: date} }] } : null; 
}

// Retornar las compras de la base de datos.
const findAll = async(req, res) => 
{
    try {
        const condition    = filter(req);
        const type         = req.query.typeUser;
        let adminCondition = false;

        if (type) // si se especifica usuarios solo admins o solo clientes
            if (type.toLowerCase() == 'a') adminCondition = true;

        const clientQuery = req.query.id_cl;
        let buys          = null;

        if (clientQuery) 
            buys = await BuyModel.find(condition, (adminCondition)? '-__v' : '-__v -_id -client -updatedAt').exec()
        else
            buys = await BuyModel.find(condition, (adminCondition)? '-__v' : '-__v -_id -updatedAt')
            .populate({ path: 'client', select: (adminCondition)? '-password -isAdmin -__v' : 'firstName lastName rut -_id'}).exec();

        return res.status(200).json({
            success: true,
            buys:    buys
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Buscar una compra por su id
const findId = async(req, res) => 
{
    try {
        const buy = await BuyModel.findById( req.params.id_buy, '-_id -__v' )
        .populate({ path: 'client', select: 'firstName lastName rut -_id' }).exec();
        
        if(!buy)
            return res.status(404).json({
                success: false,
                error: "Buy not found"
            });
        
        return res.status(200).json({
            success: true,
            buy: buy,
        });
        
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// actualizar una compra por su id
const update = async(req, res) => 
{
    try {
        const attributes = req.body;  
       
        if(!Object.entries(attributes).length)
            return res.status(404).json({
                success: false,
                error: "Buy need some shield to update"
            });
    
        await BuyModel.findByIdAndUpdate(req.params.id_buy, attributes).exec();

        return res.status(200).json({
            success: true,
            message: 'Buy updated',
        });

    } catch ( err ){
        return res.status(500).json({ message: err.message });
    };
};

// eliminar una compra
const deleteOne = async(req, res) => 
{
    try {
        const id = req.params.id_buy;
        const buyDeleted = await BuyModel.findByIdAndDelete(id).exec();

        return (!buyDeleted)? res.status(404).json({
            success: false,
            error: "Buy not found to delete"
        }) 
        : res.status(200).json({
            success: true,
            message: 'Buy removed',
        });
        
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// eliminar todas las compras
const deleteAll = async(req, res) => 
{
    BuyModel.deleteMany({})
    .then(data => {
        res.send({ message: `${data.deletedCount} buys removed!. ` });
    })
    .catch(err => {
        res.status(500).send({ message: err.message + ". " || "Error deleting all buys." });
    });
};

export { create, findAll, findId, update, deleteOne, deleteAll };
