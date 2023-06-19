const jwt = require('jsonwebtoken')

const validarJWT = (req, res, next) => {
    // leer token
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).json({msg: 'Error Unanuthorized'})
    }
    try{
        const payload = jwt.verify(token, '123456')
        req.payload = payload
        next()
    }catch(e){
        console.log(error)
        return res.status(401).json({msg: 'Token no válido'})
    }
}

module.exports = {validarJWT}