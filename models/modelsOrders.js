const database = require('../Database/database');

const insertOrders  = (appData,appOrders,req,res)=>{


    database.connection.getConnection(function(err,connection){
        if(err){
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        }else{
            // Premiere insertion dans la table orders avec l'id de l'user
            connection.query('INSERT INTO orders SET ?',appOrders,function(err, rows, fields){
                if(err){
                    // console.log(appOrders)
                    appData.error = 1;
                    appData["data"] = "Error is not Insert";
                    res.status(400).json(appData);
                }else{
                    // console.log(appOrders.id_user)
                    //On selectione selon l'id de l'user  pour ensuite l'inserer dans la table orders_items
                    connection.query('SELECT * FROM orders WHERE id_user = ?', appOrders.id_user, function(err,rows,fields){
                        if(err){
                            appData.error = 1;
                            appData["data"] = "Error is not Existe";
                            res.status(403).json(appData);
                        }else{
                            // On recupere l'id du product
                           let appOrdersItems = {
                                "order_id": rows[rows.length - 1].id,
                                "products_id": req.body.products_id,

                            }
                            let arrayProducts = []
                            for (let i = 0; i < req.body.products_id.length; i++) {

                                arrayProducts.push([rows[rows.length - 1].id,
                                                    req.body.products_id[i]]
                                                )
                            }
                            // console.log(arrayProducts)
                            // L'insertion dans la table orders_items avec le id de order que l'on a recupere avant et le product id
                                connection.query(`INSERT INTO orders_items (order_id, products_id) VALUES ? `,[arrayProducts],function(err,rows,fields){

                                    if(err){
                                        appData.error = 1;
                                        appData["data"] = "Error is not Insert in orders_items";
                                        res.status(403).json(appData);
                                    }else{
                                        appData.error = 0;
                                        appData["data"] = "Succes is Insert in orders_items";
                                        res.status(200).json(appData);
                                    }
                                })

                        }
                    })
                }

            })
            connection.release();

        }
    });
}

const getOrderall = (appData,res)=>{
    database.connection.getConnection(function(err,connection){
        if(err){
             appData["error"] = 1;
             appData["data"] = "Internal Server Error";
             res.status(500).json(appData);
        }else{
            // La jointure entre les 3 tables produit , commande , liste de commande
            connection.query(`
                           SELECT
                                    o.*,
                                    p.title, p.description,
                                    p.price
                           FROM
                                    orders AS o
                           INNER JOIN
                                    orders_items AS oi
                           ON       o.id = oi.order_id
                           INNER JOIN
                                    products AS p
                           ON
                                   p.id = oi.products_id`, (err,rows,fields)=>{

                                  if(err){

                                      appData.error = 1;
                                      appData["data"] = "Error";
                                      res.status(400).json(appData)
                                  }
                                  else{
                                    appData.error = 0;
                                    appData["data"] = "Succes";
                                    res.status(200).json(rows)
                                  }
                              })
                              connection.release();
        }
    })
}

module.exports = {
    insertOrders,
    getOrderall,
}