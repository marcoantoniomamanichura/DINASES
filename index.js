'use strict'

const app = require('./app')
const config = require('./config')
const accessDataModel = require('./models/access_data')




accessDataModel.sqlapi.connect(config.db, function(err, res) {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')
  
  app.listen(config.port, function() {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })
})
