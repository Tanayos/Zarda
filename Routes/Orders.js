const express = require('express');
const orders = express.Router();
const database = require('../Database/database');
const cors = require('cors');
const verfyToken = require('../Utils/auth');
const modelsOrders = require('./../models/modelsOrders');
const modelsOrdersTwo = require('./../models/modelsOrders2');
const checkInput = require('./../Utils/checkInput');
const { check, validationResult } = require('express-validator')


orders.use(cors());
// Ajout de la commande en base avec id_user = id de table user et le product_id = id de la table produit
orders.post('/orders', verfyToken, checkInput.checkInputOrdersPost,(req, res) => {
    let appData = {
        "error": 1,
        "data": "",
    };
    console.log('',req.userData.id)
    let appOrders = {
        "id_user": req.userData.id,
        "status": 0,
    };
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {

            modelsOrders.insertOrders(appData, appOrders, req, res)
        }


})
// Récupération de toute les commandes pour l'admin
orders.get('/getOrdersAll', verfyToken, (req, res) => {
    let appData = {
        "error": 0,
        "data": ""
    };
    if (req.userData.role === 1) {
        modelsOrders.getOrderall(appData, res)
    } else {
        appData.error = 1;
        appData["data"] = "Unauthorized";
        res.status(403).json(appData)
    }

});
// recuperation des commande selon l'user donc avec l'id de la table user
orders.get('/getOrders', verfyToken, (req, res) => {
    let appData = {
        "error": 0,
        "data": ""
    };
     console.log(req.userData.id)
    modelsOrdersTwo.ordersId(req, appData, res)

});

//Modifier le status de la commande avec l'id de la commande en parametre donc order.id ;)
orders.put('/ordersStatus/:id', verfyToken, (req, res) => {
    let appData = {
        "error": 0,
        "data": ""
    };
    if (req.userData.role === 1) {
        modelsOrdersTwo.changeStatusOrders(appData, req, res)

    } else {
        appData.error = 1;
        appData["data"] = "Unauthorized";
        res.status(403).json(appData)
    }

})

module.exports = orders;

