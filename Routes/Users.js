const express = require('express');
const users = express.Router();
const database = require('../Database/database');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const modelsUser = require('./../models/modelsUsers');
const modelsUser2 = require('./../models/modelsUsers2')
const { check, validationResult } = require('express-validator')
const checkInput = require('../Utils/checkInput')
// Verify token est un middleware pour protéger certaines routes =>
const verfyToken = require('../Utils/auth');
//-------------------------------------------------------------

users.use(cors());

users.post('/register', checkInput.checkInputRegister, (req, res) => {

    // variable today donc la date du jour  pour être inseré en base de donnée =>
    let today = new Date();
    // appData pour la gestion des requete si la requete est bonne ou pas =>
    let appData = {
        "error": 1,
        "data": "",
    };
    // Initialisation des variable pour ne pas se repéter =>
    let userData = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "password": req.body.password,
        "created": today,

    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        modelsUser.register(userData, appData, bcrypt, res)
    }

    // Connection à la base de donnée avec le Poolconnection =>
});
// LOGIN !!!!!!! *_*
users.post('/login', checkInput.checkInputLogin, (req, res) => {
    // appData pour la gestion des requête =>
    let appData = {};
    let password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        modelsUser.login(password, appData, req, bcrypt, jwt, res)

    }

});

// Pour recup tout les users

users.get('/Allusers', verfyToken, function (req, res) {

    let appData = {};
    if (req.userData.role === 1) {
        database.connection.getConnection(function (err, connection) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Internal Server Error";
                res.status(500).json(appData);
            } else {
                console.log(appData)
                connection.query('SELECT * FROM users ', function (err, rows, fields) {
                    if (!err) {
                        appData["error"] = 0;
                        appData["data"] = rows;
                        res.status(200).json(appData);
                    } else {
                        appData["data"] = "No data found";
                        res.status(404).json(appData);
                    }
                });
                connection.release();
            }
        });
    } else {
        appData.error = 1;
        appData["data"] = "Unauthorized";
        res.status(403).json(appData)
    }
});
// Supression de l'user
users.delete('/deleteUser', verfyToken, function (req, res) {
    let appData = {};
    if (req.userData.role === null) {
        modelsUser2.deleteUser(req, res, appData)
    } else {
        appData.error = 1;
        appData["data"] = "Unauthorized";
        res.status(403).json(appData)
    }

})




module.exports = users;

