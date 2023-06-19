const TipoEquipo = require('../models/tipoEquipo')
const {req, res, request, response} = require('express')


/**
 * CREACIÓN
 * */

const createTipoEquipo = async (req = request, res = response) =>{
    try{
        const nombre = req.body.nombre 
        ? req.body.nombre.toUpperCase()
        : ''
        const tipoEquipoDB = await TipoEquipo.findOne({nombre})
        if(tipoEquipoDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        
        const data = {
            nombre
        }

        const tipoEquipo = new TipoEquipo(data)
        await tipoEquipo.save()
        return res.status(201).json(tipoEquipo)

    }catch(e){
        return res.status(500).json({msg:'Error '})
    }
   
}

/**
 * EDICIÓN
 * */


const updateTipoEquipo = async (req = request, res = response) =>{
    try{
        const { id } = req.params
        const data = req.body
        data.fechaActualizacion = new Date()
        
        const tipoEquipo = TipoEquipo.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(tipoEquipo)

    }catch(e){
        return res.status(500).json({msg: e})
    }

}


/**
 * LISTAR TODOS
 * */

const getTipoEquipo = async(req = request, res = response) =>{
    try{
        const { estado } = req.query
        const tipoEquipoDB = await TipoEquipo.find({ estado })
        return res.json(tipoEquipoDB)

    }catch(e){
        return res.status(500).json({msg: e})
    }
}


module.exports = {createTipoEquipo , getTipoEquipo, updateTipoEquipo}