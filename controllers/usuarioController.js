const Usuario = require('../models/usuario')
const {req, res, request, response} = require('express')
const bcrypt = require('bcrypt');


/**
 * CREACIÓN
 * */
const createUsuario = async (req = request, res = response) =>{
    try{

        const nombre = req.body.nombre 
        ? req.body.nombre.toUpperCase()
        : ''

        const email = req.body.email
        const password = req.body.password;
        const saltRounds = 10; // Número de saltos de encriptación
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const rol = req.body.rol

        const emailBD = await Usuario.findOne({email})
        if(emailBD){
            return res.status(400).json({msg: 'Ya existe'})
        }

        const usuarioDB = await Usuario.findOne({nombre})
        if(usuarioDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        
        const data = {
            nombre,
            email,
            password: hashedPassword,
            rol
        }

        const usuario = new Usuario(data)
        await usuario.save()
        return res.status(201).json(usuario)
  

    }catch(e){
        return res.status(500).json({msg: e })
    }
   
}



/**
 * EDICIÓN
 * */

const updateUsuario = async (req = request, res = response) =>{
    try{

        const { id } = req.params
        const data = req.body
        data.fechaActualizacion = new Date()

        const usuario = await Usuario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(usuario)
        

    }catch(e){
        return res.status(500).json({msg: e })
    }
   
}

/**
 * LISTAR TODOS
 * */

const getUsuario = async (req = request, res = response) =>{
    try{
        const { estado } = req.query
        const usuarioDB = await Usuario.find({ estado })
        return res.json(usuarioDB)

    }catch(e){
        return res.status(500).json({msg: e })
    }
   
}


module.exports = {createUsuario , updateUsuario, getUsuario}