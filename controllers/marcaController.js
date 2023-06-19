const Marca = require('../models/marca')
const {req, res, request, response} = require('express')


/**
 * CREACIÓN
 * */
const createMarca = async (req = request, res = response) =>{
    try{
        const nombre = req.body.nombre 
        ? req.body.nombre.toUpperCase()
        : ''
        const marcaDB = await Marca.findOne({nombre})
        if(marcaDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        
        const data = {
            nombre
        }

        const marca = new Marca(data)
        await marca.save()
        return res.status(201).json(marca)
    

    }catch(e){
        return res.status(500).json({msg: e })
    }
   
}



/**
 * EDICIÓN
 * */

const updateMarca = async (req = request, res = response) =>{
    try{
        const { id } = req.params
        const data = req.body
        data.fechaActualizacion = new Date()

        const marca = await Marca.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(marca)     
     

    }catch(e){
        return res.status(500).json({msg: e })
    }
   
}

/**
 * LISTAR TODOS
 * */

const getMarca = async (req = request, res = response) =>{
    try{
        const { estado } = req.query
        const marcaDB = await Marca.find({ estado })
        return res.json(marcaDB)


    }catch(e){
        return res.status(500).json({msg: e })
    }
   
}


module.exports = {createMarca , updateMarca, getMarca}