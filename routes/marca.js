const {Router} = require('express')
const {createMarca , updateMarca, getMarca} = require('../controllers/marcaController')
const router = Router()
const {validarJWT} = require('../middleware/validar-jwt')
const {validarRolAdmin} = require('../middleware/validar-rol-admin')

// create
router.post('/', [
    validarJWT,
    validarRolAdmin
],createMarca)

// editar
router.put('/:id',[
    validarJWT,
    validarRolAdmin
], updateMarca)

// listar
router.get('/', [
    validarJWT,
    validarRolAdmin
],getMarca)


module.exports = router