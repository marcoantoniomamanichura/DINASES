'use strict'

const express = require('express')
const clientCtrl = require('../controllers/client')
const productCtrl = require('../controllers/product')
const ordersCtrl =require('../controllers/orders')
const api = express.Router()
const auth=require('../middlewares/auth')
const authorization=require('../middlewares/authorization')
api.get('/client', clientCtrl.getClient)
api.post('/clients',authorization, clientCtrl.postClient)
api.put('/update-client', clientCtrl.putClient)
api.delete('/delete-client/:code_id', clientCtrl.deleteClient)
api.put('/clients/password',authorization, clientCtrl.putRecoverPassword)
api.post("/clients/login",authorization, clientCtrl.postClientAuth)

api.get('/private',authorization,function(req,res){
res.status(200).send({message:'Tienes Acceso'})
})

/////////  PEDIDOS   ///////////////////////
api.post("/orders",auth,authorization, ordersCtrl.postPedidos)
api.get("/orders",auth,authorization, ordersCtrl.getPedidos)
api.get('/orders/:ordersID/products',auth,authorization,ordersCtrl.getPedidosProducts)
api.put('/orders/:ordersID',auth,authorization, ordersCtrl.putPedidos)
/////////  PRODUCTOS  ////////
api.get('/products/category',authorization,productCtrl.getCategorias)
api.get('/products/category/:categoryId',authorization,productCtrl.getProducts)
module.exports = api
