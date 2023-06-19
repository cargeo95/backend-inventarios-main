const express = require('express')
const app = express()
const cors = require('cors')

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors({
    origin: '*'
}))

const estadoEquipo = require('./routes/estadoEquipo')
const inventario = require('./routes/inventario')
const marca = require('./routes/marca')
const tipoEquipo = require('./routes/tipoEquipo')
const usuario = require('./routes/usuario')
const auth = require('./routes/auth')

// URI o endpoint
app.use('/api/estadoequipos',estadoEquipo)
app.use('/api/inventarios',inventario)
app.use('/api/marcas',marca)
app.use('/api/tipoequipos',tipoEquipo)
app.use('/api/usuarios',usuario)
app.use('/api/auth',auth)


module.exports = app