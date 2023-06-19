const {Router} = require('express')
const {createInventario , updateInventario, getInventario} = require('../controllers/inventarioController')
const router = Router()
const {validarJWT} = require('../middleware/validar-jwt')
const {validarRolAdmin} = require('../middleware/validar-rol-admin')

// create
router.post('/', [
    validarJWT,
    validarRolAdmin
],createInventario)

// editar
router.put('/:id', [
    validarJWT,
    validarRolAdmin
],updateInventario)

// listar
router.get('/', [
    validarJWT
],getInventario)


module.exports = router

