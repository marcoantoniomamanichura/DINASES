'use strict'
const jwt=require('jwt-simple')
const moment=require('moment')
const config=require('../config')
const js2xmlparser = require("js2xmlparser");
const accessDataModel = require('../models/access_data')
function postPedidos(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
    const token =req.headers.tokenauthorization
    const payload=jwt.decode(token,config.SECRET_TOKEN)
    const cod_cliente=payload.sub
    const listajson=req.body
    
    for (var i = 0; i < listajson.length; i++) {    
       const item=listajson[i]
        

        if(Number.isInteger(item["cantidad"])){
            
        }else{
            res.status(200).send({code:4,message:'Los datos de la cantidad son invalido. Por favor coloque datos numericos'})
         return   
        }
    }; 



    const detalle=js2xmlparser.parse("row", req.body)
    //console.log(detalle)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 9},
    {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": cod_cliente},
    {"nombre":"TO0011", "tipo": accessDataModel.sqlapi.Xml, "valor": detalle}]
                    
   accessDataModel.executeStoredProcedurePedidosPost(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/orders'}, {result_api: null}], 1)

}
function deletePedidos(req, res){
      const token =req.headers.tokenauthorization
    const payload=jwt.decode(token,config.SECRET_TOKEN)
    const cod_cliente=payload.sub
         let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 12},
    {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": cod_cliente},
    {"nombre":"pedido", "tipo": accessDataModel.sqlapi.Int, "valor": req.params.ordersID}]
                    
   accessDataModel.EjecutaProcedimiento(res, array,0,13,'El pedido #'+req.params.ordersID+' ha sido cancelado', 'El pedido no pudo ser cancelado')

}

function getPedidos(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
    const token =req.headers.tokenauthorization
    const payload=jwt.decode(token,config.SECRET_TOKEN)
    const cod_cliente=payload.sub

   
    //console.log(detalle)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 10},
    {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": cod_cliente}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'GET /api/orders'}, {result_api: null}], 1)

}
function getPedidosProducts(req, res){
    //console.log(req.params)
    //console.log(req.body)
    const token =req.headers.tokenauthorization
    const payload=jwt.decode(token,config.SECRET_TOKEN)
    const cod_cliente=payload.sub
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 11},
    {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": cod_cliente},
    {"nombre":"pedido", "tipo": accessDataModel.sqlapi.Int, "valor": req.params.ordersID}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/order/products'}, {result_api: null}], 1)
}


module.exports = {
    postPedidos,
    getPedidos,
    getPedidosProducts,
    deletePedidos
}