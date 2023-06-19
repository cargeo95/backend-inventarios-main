const Usuario = require('../models/usuario')
const {req, res, request, response} = require('express')
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt');

const validateUsuario = async (req = request, res = response) =>{
    try{

        const email = req.body.email
        
        const usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({msg: 'No existe usuario'})
        }

        const password = req.body.password

        const esIgual = await bcrypt.compareSync(password, usuario.password)

        if(!esIgual){
            return res.status(400).json({msg: 'Contraseña mal escrita'})
        }

        // generar token
        const token = await generarJWT(usuario)
        
        return res.status(201).json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            access_token: token
        })

    }catch(e){
        return res.status(500).json({msg: e })
    }

}

module.exports = {validateUsuario}