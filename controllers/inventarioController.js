const Inventario = require('../models/inventario')
const { request, response} = require('express')
const Usuario = require('../models/usuario')
const Marca = require('../models/marca')
const EstadoEquipo = require('../models/estadoEquipo')
const TipoEquipo = require('../models/tipoEquipo')


/**
 * CREACIÓN
 * */
const createInventario = async (req = request, res = response) =>{
    try{
        const data = req.body
        
        const { usuario, marca, estadoEquipo, tipoEquipo } = data

        const usuarioDB = Usuario.findOne({
            _id: usuario._id,
            estado: true
        })
        if(!usuarioDB){
            return res.status(400).json({msg: 'usuario invalido'})
        }

        const marcaDB = Marca.findOne({
            _id: marca._id,
            estado: true
        })

        if(!marcaDB){
            return res.status(400).json({msg: 'marca invalida'})
        }

        const estadoDB = EstadoEquipo.findOne({
            _id: estadoEquipo._id,
            estado: true
        })

        if(!estadoDB){
           return res.status(400).json({msg: 'estado invalido'})
        }

        const tipoEquipoDB = TipoEquipo.findOne({
            _id: tipoEquipo._id,
            estado: true

        })

        if(!tipoEquipoDB){
           return res.status(400).json({msg: 'estado invalido'})
        }      
        
        const inventario = new Inventario(data)

        await inventario.save()
        
        return res.status(201).json(inventario)
    

    }catch(e){
        return res.status(500).json({msg: e })
    }
   
}



/**
 * EDICIÓN
 * */

const updateInventario = async (req = request, res = response) =>{
    try{

        const { id } = req.params
        const data = req.body
        data.fechaActualizacion = new Date()

        const inventario = await Inventario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(inventario)

    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e })
    }
   
}

/**
 * LISTAR TODOS
 * */

const getInventario = async (req = request, res = response) =>{
    try{
        const inventariosDB = await Inventario.find()
        return res.json(inventariosDB)

    }catch(e){
        return res.status(500).json({msg: e })
    }
   
}


module.exports = {createInventario , updateInventario, getInventario}