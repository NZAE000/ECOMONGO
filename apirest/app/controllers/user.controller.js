import UserModel from "../models/user.model.js"

const create = (req, res) =>
{
    // Validar consulta
    if (!req.body.first_name && !req.body.last_name && !req.body.rut && !req.body.address && !req.body.mail && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // instanse a user
    const client = new UserModel({
        firstName: req.body.fisrt_name,
        lasttName: req.body.last_name,
        rut:       req.body.rut,
        address:   req.body.address,
        email:     req.body.email,
        password:  req.body.password,
    })
    client.save()
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
};

// Retornar todos los usuarios de la base de datos.
const findAll = (req, res) => 
{
    const name    = req.query.name;
    var condition = name ? { name: name } : {};

    UserModel.find(condition)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
};

// Buscar un cliente por su id
const findId = (req, res) => 
{
    const id = req.params.id;
    UserModel.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No se encontró cliente con el id " + id });
            else
                res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: "Error al buscar cliente"})
        })
};

// actualizar un cliente por su id
const update = (req, res) => 
{
    // Agregar validaciones
    // 
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, req.body,{ useFindAndModify: false })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No se encontró cliente con el id " + id });
            else
                res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: "Error al buscar cliente"})
        })
};

// eliminar un cliente
const deleteOne = (req, res) => 
{
    const id = req.params.id;
    UserModel.findByIdAndRemove(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "No se encontró cliente con el id " + id });
            else 
                res.status(200).send({ message: "cliente eliminado"})
        })
        .catch(err => {
            res.status(500).json({message: "Error al buscar cliente"})
        })
};

// eliminar a todos los usuarios
const deleteAll = (req, res) => 
{
    UserModel.deleteMany({})
        .then(data => {
            res.status(200).send({ message: `${data.deletedCount} usuarios eliminados`})
        })
        .catch(err => {
            res.status(500).json({message: "Error"})
        })
};

export {
    create, findAll, findId, update, deleteOne, deleteAll
};