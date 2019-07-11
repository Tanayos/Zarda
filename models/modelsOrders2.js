const database = require('../Database/database');

const ordersId = (req, appData, res) => {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);

        } else {
            // console.log('Je suis la id : ',req.userData.id)
            connection.query(`
                SELECT
                        o.id, o.status,
                        p.title, p.description
                FROM
                        orders AS o
                INNER JOIN
                        orders_items AS oi
                ON      o.id = oi.order_id
                INNER JOIN
                products AS p
                ON
                        p.id = oi.products_id
                WHERE   o.id_user = ?`, req.userData.id, (err, rows, fields) => {
                    if (err) {
                        appData.error = 1;
                        appData["data"] = "Error";
                        res.status(400).json(appData)
                    }
                    else {
                        appData.error = 0;
                        appData["data"] = "Succes";
                        res.status(200).json(rows)
                    }
                })
                connection.release();
        }
    })
}

const changeStatusOrders = (appData,req,res) => {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query(`UPDATE orders
                              SET status = 1
                              WHERE id = ?`, req.params.id, (err, rows, fields) => {
                    if (err) {
                        appData.error = 1;
                        appData["data"] = "Error";
                        res.status(400).json(appData)
                    } else {
                        appData.error = 0;
                        appData["data"] = "Succes";
                        res.status(200).json(appData)
                    }
                })
                connection.release();
        }
    })
}

module.exports = {
    ordersId,
    changeStatusOrders
}