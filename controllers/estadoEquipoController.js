const EstadoEquipo = require('../models/estadoEquipo')
const {req, res, request, response} = require('express')

/**
 * CREACIÓN
 * */
const createEstadoEquipo = async (req = request, res = response) =>{
    try{
        const nombre = req.body.nombre 
        ? req.body.nombre.toUpperCase()
        : ''
        const estadoEquipoDB = await EstadoEquipo.findOne({nombre})
        if(estadoEquipoDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        
        const data = {
            nombre
        }

        const estadoEquipo = new EstadoEquipo(data)
        await estadoEquipo.save()
        return res.status(201).json(estadoEquipo)

    }catch(e){
        return res.status(500).json({msg: e })
    }
   
}



/**
 * EDICIÓN
 * */

const updateEstadoEquipo = async (req = request, res = response) =>{
    try{
        
        const { id } = req.params
        const data = req.body
        data.fechaActualizacion = new Date()

        const equipo = await EstadoEquipo.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(equipo)


    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e })
    }
   
}

/**
 * LISTAR TODOS
 * */

const getEstadoEquipo = async (req = request, res = response) =>{
    try{
        const { estado } = req.query
        const estadoDB = await EstadoEquipo.find({ estado })
        return res.json(estadoDB)

    }catch(e){
        return res.status(500).json({msg: e })
    }
   
}


module.exports = {createEstadoEquipo , updateEstadoEquipo, getEstadoEquipo}