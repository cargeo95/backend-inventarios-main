const {Router} = require('express')
const {createTipoEquipo , updateTipoEquipo , getTipoEquipo} = require('../controllers/tipoEquipoController')
const router = Router()
const {validarJWT} = require('../middleware/validar-jwt')
const {validarRolAdmin} = require('../middleware/validar-rol-admin')

// create
router.post('/', [
    validarJWT,
    validarRolAdmin
],createTipoEquipo)

// editar
router.put('/:id',[
    validarJWT,
    validarRolAdmin
], updateTipoEquipo)

// listar
router.get('/', [
    validarJWT,
    validarRolAdmin
],getTipoEquipo)


module.exports = router