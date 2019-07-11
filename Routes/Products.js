const express = require('express');
const products = express.Router();
const database = require('../Database/database');
const cors = require('cors');
const verfyToken = require('../Utils/auth');
const modelsProduct = require('./../models/productsData')
const upload = require('./../Utils/multer');
const checkInput = require('./../Utils/checkInput');
const { check, validationResult } = require('express-validator')

products.use(cors());
// admin
products.post('/addProduct', verfyToken, upload.single('productImage'), checkInput.checkInputProductPost, (req, res) => {
    let appData = {
        "error": 1,
        "data": "",
    };
    var today = new Date();
    let userProduct = {
        "source": req.file.path,
        "title": req.body.title,
        "description": req.body.description,
        'price': req.body.price,
        'category': req.body.category,
        'status': req.body.status,
        "created": today,

    };
    if (req.userData.role === 1) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {

            modelsProduct.addProduct(userProduct, appData, res, req)
        }
    } else {
        appData.error = 1;
        appData["data"] = "Unauthorized";
        res.status(403).json(appData)
    }
})



// A la vue de tous
products.get('/getProduct', (req, res) => {
    let appData = {
        "error": 1,
        "data": "",

    };
    modelsProduct.getProduct(appData, res)
});
products.put('/putProduct/:id', verfyToken, checkInput.checkInputProductPost, (req, res) => {
    let appData = {
        "error": 1,
        "data": "",
    };
    var today = new Date();
    let userProduct = {
        "title": req.body.title,
        "description": req.body.description,
        "price": req.body.price,
        'category': req.body.category,
        "status": req.body.status,
        "created": today,

    };
    console.log(userProduct)
    if (req.userData.role === 1) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {

            modelsProduct.putTextProduct(userProduct, appData, res, req)
        }

    } else {
        appData.error = 1;
        appData["data"] = "Unauthorized";
        res.status(403).json(appData)
    }
});
// Pour modifier l'image
products.put('/putProductImg/:id', verfyToken, upload.single('productImage'), (req, res) => {
    let appData = {
        "error": 1,
        "data": "",
    };
    let userProduct = {
        "source": req.file.path
    }
    if (req.userData.role === 1) {

        modelsProduct.putImgProduct(userProduct, appData, res, req)

    } else {
        appData.error = 1;
        appData["data"] = "Unauthorized";
        res.status(403).json(appData)
    }
})
module.exports = products;