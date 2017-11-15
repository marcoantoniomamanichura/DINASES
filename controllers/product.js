'use strict'
const jwt=require('jwt-simple')
const moment=require('moment')
const config=require('../config')

const accessDataModel = require('../models/access_data')
function getCategorias(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
   // const token =req.headers.tokenauthorization
  //  const payload=jwt.decode(token,config.SECRET_TOKEN)
   // console.log(payload.sub)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 7}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/category-product'}, {result_api: null}], 1)

}
function getProducts(req, res){
   // console.log(req.params)
    //console.log(req.body)
   
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 8},
    {"nombre":"categoria", "tipo": accessDataModel.sqlapi.Int, "valor": req.params.categoryId}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/category-product'}, {result_api: null}], 1)
}
module.exports = {
    getCategorias,
    getProducts
}