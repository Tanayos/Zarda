const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const history = require('connect-history-api-fallback')



const app = express();
app.use(history());
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended : false}));


var Users = require('./Routes/Users.js');
var Products = require('./Routes/Products.js');
var Orders = require('./Routes/Orders.js');
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use('/user',Users);
app.use('/product', Products);
app.use('/orders', Orders)
app.use('/', express.static(path.join(__dirname, './dist')))
app.listen(PORT, ()=>{
    console.log(`Le serveur tourne sur le port ${PORT}`);
})