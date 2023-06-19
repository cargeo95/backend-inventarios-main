const {Router} = require('express')
const {createUsuario , updateUsuario, getUsuario} = require('../controllers/usuarioController')
const { check } = require('express-validator')
const router = Router()
const {validarJWT} = require('../middleware/validar-jwt')
const {validarRolAdmin} = require('../middleware/validar-rol-admin')


// create
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('rol', 'invalid.rol').isIn(['ADMINISTRADOR','DOCENTE']),

], createUsuario)

// editar
router.put('/:id', [
   
],updateUsuario)

// listar
router.get('/',[

], getUsuario)


module.exports = router