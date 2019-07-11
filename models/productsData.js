const database = require('../Database/database');

const addProduct = (userProduct, appData, res,req) => {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query("SELECT * FROM products WHERE title = ?", userProduct.title, function (err, rows, fields) {
                // console.log(rows);
                if (!rows.length) {
                    // console.log("Je suis passer");
                    const insertProduit = "INSERT INTO products SET ?"
                    // console.log(userProduct)
                    connection.query(insertProduit, userProduct, function (err, rows, fields) {
                        if (!err) {
                            appData.error = 0;
                            appData["data"] = " registered successfully!";
                            res.status(201).json(appData);
                        } else {
                            appData.error = 1;
                            appData["data"] = "Error is not Insert";
                            res.status(400).json(appData);
                        }
                    })
                } else {
                    appData.error = 1;
                    appData["data"] = "Error exist in database rename title";
                    res.status(400).json(appData);
                }
            })
            connection.release();
        }
    })

};
const getProduct = (appData, res) => {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            let sql = 'SELECT * FROM products';
            connection.query(sql, function (err, rows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = "Error doesn't existe ";
                    res.status(400).json(appData);
                } else {
                    appData["error"] = 0;
                    appData["data"] = "All Product";
                    res.status(200).json(rows)
                }
            })
            connection.release();
        }
    })
};


const putTextProduct = (userProduct, appData, res, req) => {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {

            connection.query('SELECT * FROM products WHERE products.id = ? ', req.params.id, function (err, rows, fields) {


                if (rows.length) {
                    console.log('toto');
                    let sql = `UPDATE products SET
                               products.title = ${connection.escape(userProduct.title)},
                               products.description = ${connection.escape(userProduct.description)},
                               products.price = ${connection.escape(userProduct.price)},
                               products.status = ${connection.escape(userProduct.status)},
                               products.category = ${connection.escape(userProduct.category)},
                               products.created = ${connection.escape(userProduct.created)}
                               WHERE
                               products.id = ${connection.escape(req.params.id)}`;
                    // UPDATE products SET `source` = '/quelque/chose', `title`  = `toto` , `description`  = `toto` ,`price`  =  12 ,  WHERE products.id = 1
                    connection.query(sql, (err, rows, fields) => {

                        if (err) {
                            appData["error"] = 1;
                            appData["data"] = "Error";
                            res.status(400).json(err);
                        } else {
                            appData["error"] = 0;
                            appData["data"] = "Product update with success";
                            res.status(200).json(appData)
                        }
                    })



                } else {
                    appData["error"] = 1;
                    appData["data"] = "Error pas de donnée";
                    res.status(400).json(appData);
                }
            })
            connection.release();
        }
    })

};
const putImgProduct = (userProduct, appData, res, req) => {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {

            connection.query('SELECT * FROM products WHERE products.id = ? ', req.params.id, function (err, rows, fields) {
                if (rows.length) {
                    // console.log('toto');
                    // console.log('toto1', userProduct.source)
                    let sql = `UPDATE products SET products.source = ${connection.escape(userProduct.source)}  WHERE products.id = ${connection.escape(req.params.id)} `;
                    // UPDATE products SET `source` = '/quelque/chose', `title`  = `toto` , `description`  = `toto` ,`price`  =  12 ,  WHERE products.id = 1
                    connection.query(sql, (err, rows, fields) => {

                        if (err) {
                            appData["error"] = 1;
                            appData["data"] = "Error";
                            res.status(400).json(appData);
                        } else {
                            appData["error"] = 0;
                            appData["data"] = "Product update with success";
                            res.status(200).json(appData)
                        }
                    })



                }
            })
            connection.release();
        }
    })
}
module.exports = {
    addProduct,
    getProduct,
    putTextProduct,
    putImgProduct,
}