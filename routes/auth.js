const {Router} = require('express')
const {validateUsuario} = require('../controllers/authController')
const router = Router()


// validar usuario
router.post('/', validateUsuario)

module.exports = router