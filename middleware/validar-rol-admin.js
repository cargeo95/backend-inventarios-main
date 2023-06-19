const jwt = require('jsonwebtoken')

const validarRolAdmin = (req, res, next) => {
    if(req.payload.rol !== 'ADMINISTRADOR'){
        return res.status(401).json({msg: 'Error Unanuthorized'})
    }
    next()
}

module.exports = {validarRolAdmin}