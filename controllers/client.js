'use strict'

const accessDataModel = require('../models/access_data')
const my_basic_auth = require('basic-auth')
const my_mail = require('./mail')
const service=require('../Services')
var nodemailer = require('nodemailer')
var validator = require('email-validator')
var generator = require('generate-password')
function getClient(req, res){
  
}
function isValidEmail(mail) { 
  return  validator.validate(mail)
  }
function getClients(req, res){

}

function postClient(req, res){
    //console.log(JSON.stringify(req.body))

    //console.log(JSON.stringify(req.body.mail))

//req.assert('full_name','{"Code":"0","message":"Por favor inserte Un nombre valido"}').noempty();
req.check('full_name', '{"Code":"8","message":"El nombre no puede ser vacío. Por favor inserte un nombre valido"}').notEmpty();
req.check('password_cli', '{"Code":"7","message":"La contraseña no puede ser vacio. Por favor inserte una valida"}').notEmpty();
req.check('phone', '{"Code":"9","message":"El telefono no puede ser vacio. Por favor inserte una valida"}').notEmpty();
req.check('address', '{"Code":"10","message":"La dirección no puede ser vacío. Por favor coloque su dirección actual"}').notEmpty();
req.check('location_lat', '{"Code":"11","message":"Los datos de la ubicación es invalida por favor seleccione una correcta"}').notEmpty();
req.check('location_log', '{"Code":"11","message":"Los datos de la ubicación es invalida por favor seleccione una correcta"}').notEmpty();

req.check('location_lat', '{"Code":"12","message":"El tipo de dato de la ubicación es invalido"}').isDecimal();
req.check('location_log', '{"Code":"12","message":"El tipo de dato de la ubicación es invalido"}').isDecimal();
req.check('mail', '{"Code":"5","message":"La Dirección De Correo Es Invalido. Inserte Un Correo Valido"}').isEmail();
var erros = req.validationErrors();
var result=""
if(erros){

    for (var i = 0; i < erros.length; i++) {
      
        result=result+erros[i].msg+","
        //res.status(401).send(JSON.parse(erros[i].msg));
      //  return
    }; 
    result= "["+result.substring(0, result.length - 1)+"]"; 
    res.status(401).send(JSON.parse(result));
     return

}

  /*  if(isValidEmail(req.body.mail)==false ){
        res.status(401).send({code:5,message:'La Dirección De Correo Es Invalido. Inserte Un Correo Valido'})
        return
    }
    if(!req.body.password_cli){
       res.status(401).send({code:7,message:'Contraseña Invalida. Por Favor Inserte Una Valida'})
      return
    }*/
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 1}, /*1 Opción de registro de cliente*/
                 {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": 0},
                 {"nombre":"full_name", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.full_name},
                 {"nombre":"business_name", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.business_name},
                 {"nombre":"nit", "tipo": accessDataModel.sqlapi.NVarChar(20), "valor": req.body.nit},
                 {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": req.body.mail},
                 {"nombre":"phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.phone},
                 {"nombre":"cell_phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.cell_phone},
                 {"nombre":"address", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.address},
                 {"nombre":"reference", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.reference},
                 {"nombre":"location_lat", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.location_lat},
                 {"nombre":"location_log", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.location_log},
                 {"nombre":"password_cli", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": req.body.password_cli}]
                    
   accessDataModel.executeStoredProcedure(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/register-client'}, {result_api: null}], 1,req.body.mail)

}

function putClient(req, res){
}

function deleteClient(req, res){
    var query = 'DELETE FROM [user] WHERE Id=' + req.params.id
    executeQuery(res, query)
}

function putRecoverPassword(req, res){
   // console.log('PUT /api/recover-password')
    console.log(req.body.mail)
    if(isValidEmail(req.body.mail)==false){
        res.status(200).send({code:5,message:'La dirección de correo es invalido. inserte un correo valido'})
        return
    }
    const passw =generator.generate({
        length: 8,
        numbers: true
    });
      let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 6},
    {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor":req.body.mail},
    {"nombre":"password_cli", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor":passw}]
  let b =accessDataModel.ExisteEMail(res,passw,req.body.mail,array)

   
   }

function postClientAuth(req, res) {
   // let user = my_basic_auth(req);  
   
    if ( !req.body.mail || !req.body.password_cli) {
           res.status(401).send({code:4,message:'Datos invalidos. Por favor inserte un correo y una contraseña válida'})
        return
    }
    if(isValidEmail(req.body.mail)==false ){
        res.status(401).send({code:5,message:'La dirección de correo es invalido. inserte un correo valido'})
		return
    }
      res.set('WWW-Authenticate', 'Basic realm=Authorization No Required')
   let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 5}, 
   {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor":req.body.mail},
   {"nombre":"password_cli", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": req.body.password_cli}]
  accessDataModel.VerificarCuenta(res,req.body.mail,req.body.password_cli,array)
}




module.exports = {
    getClient,
    getClients,
    postClient,
    putClient,
    deleteClient,
    putRecoverPassword,
    postClientAuth
}
