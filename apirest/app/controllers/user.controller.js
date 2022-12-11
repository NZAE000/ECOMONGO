import UserModel from "../models/user.model.js"


const create = (req, res) =>
{
    // Validar consulta
    if (!req.body.firstName && !req.body.lastName && !req.body.rut && !req.body.address && !req.body.mail && !req.body.password && !req.body.isAdmin) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // instanse a user
    const client = new UserModel(req.body);
    client.save()
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
};

const filter = (req) =>
{
    const {type, first, last, adrs} = req.query;
    let userCondition = null;

    if (type){ // si se especifica usuarios solo admins o solo clientes
        if (type.toLowerCase() == 'a') userCondition = { isAdmin: true  };
        if (type.toLowerCase() == 'c') userCondition = { isAdmin: false };
    }

    if (first && last && adrs)  return { $and: [{ firstName: { $regex: `${first}`, $options: 'i' }}, { lastName: { $regex: `${last}`, $options: 'i'}}, { address: { $regex: `${adrs}`, $options: 'i'}}, (userCondition)? userCondition : {}]};
    else if (first && last)     return { $and: [{ firstName: { $regex: `${first}`, $options: 'i' }}, { lastName: { $regex: `${last}`, $options: 'i'}}, (userCondition)? userCondition : {}]};
    else if (first && adrs)     return { $and: [{ firstName: { $regex: `${first}`, $options: 'i' }}, { address: { $regex: `${adrs}`, $options: 'i'}}, (userCondition)? userCondition : {}]};
    else if (last && adrs)      return { $and: [{ lastName: { $regex: `${last}`, $options: 'i'}}, { address: { $regex: `${adrs}`, $options: 'i'}}, (userCondition)? userCondition : {}]};
    else {
        if (userCondition)
            return (first || last || adrs)? { $or: [{ $and: [{firstName: { $regex: `${first}`, $options: 'i'}}, userCondition]}, { $and: [{lastName: { $regex: `${last}`, $options: 'i' }}, userCondition]}, { $and: [{address: { $regex: `${adrs}`, $options: 'i'}}, userCondition]}]} : userCondition;
        
        return (first || last || adrs)? { $or: [{ firstName: { $regex: `${first}`, $options: 'i'}}, { lastName: { $regex: `${last}`, $options: 'i' }}, { address: { $regex: `${adrs}`, $options: 'i'}}]} : null;
    }
}

// Retornar todos los usuarios de la base de datos.
const findAll = (req, res) => 
{
    const condition = filter(req);

    UserModel.find(condition, { password: 0 })
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
};

// Buscar un usuario por su id rut
const findId = (req, res) => 
{
    const id = req.params.rut;

    UserModel.findOne({ "rut" : id }, {password: 0})
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontró usuario con el id " + id });
        else
            res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({message: "Error al buscar usuario"})
    })
};

// Actualizar un usuario por su id
const update = (req, res) => 
{
    // Agregar validaciones

    const id = req.params.rut;

    UserModel.updateOne({ "rut" : id }, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontró usuario con el id " + id });
        else
            res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({message: "Error al buscar usuario"})
    })
};

// Eliminar un usuario
const deleteOne = (req, res) => 
{
    const id = req.params.rut;

    UserModel.deleteOne({ "rut":  id })
    .then(data => {
        if (!data) 
            res.status(404).send({ message: "No se encontró usuario con el id " + id });
        else 
            res.status(200).send({ message: "Usuario eliminado"})
    })
    .catch(err => {
        res.status(500).json({message: "Error al buscar usuario"})
    })
};

// Eliminar a todos los usuarios
const deleteAll = (req, res) => 
{
    UserModel.deleteMany({})
    .then(data => {
        res.status(200).send({ message: `${data.deletedCount} usuarios eliminados`})
    })
    .catch(err => {
        res.status(500).json({message: "Error al eliminar todos los usuarios"})
    })
};

export { create, findAll, findId, update, deleteOne, deleteAll };