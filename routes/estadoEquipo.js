const {Router} = require('express')
const {createEstadoEquipo , updateEstadoEquipo, getEstadoEquipo} = require('../controllers/estadoEquipoController')
const router = Router()
const {validarJWT} = require('../middleware/validar-jwt')
const {validarRolAdmin} = require('../middleware/validar-rol-admin')

// create
router.post('/', [
    validarJWT,
    validarRolAdmin
],
createEstadoEquipo)

// editar
router.put('/:id', [
    validarJWT,
    validarRolAdmin
],updateEstadoEquipo)

// listar
router.get('/',[
    validarJWT,
    validarRolAdmin
], getEstadoEquipo)


module.exports = router