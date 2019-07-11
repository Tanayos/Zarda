const database = require('../Database/database');

const deleteUser = (req,res,appData)=>{
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else{
            connection.query(`DELETE FROM users
                              WHERE users.id = ?`,req.userData.id,function(err,rows,fields){
                if(err){
                    appData["error"] = 1;
                    appData["data"] = "Internal Server Error";
                    res.status(403).json(appData);
                }else{
                    appData["error"] = 0;
                    appData["data"] = 'Succes';
                    res.status(200).json(appData);
                }
            });
            connection.release();

        }

    })

}

module.exports = {
    deleteUser
}