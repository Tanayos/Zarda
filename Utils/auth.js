const jwt = require('jsonwebtoken');

// BIENVENUE DANS VERIFYTOKEN MON MIDDLEWARE BY MoHaMeD
function verifyToken(req,res,next){
    // recuperation du token pour pouvoir verifiez faire un console log au cas ou =>
    let token = req.headers.authorization.split(' ')[1];
    // console.log(token)
    let appData = {};
    //Donc si il y'a un token
    if(token){
        // console.log(process.env.PRIVATE_KEY)
        // JsonWebToken prend en premier parametre le token en deuxieme la clef Secret ;) =>
        jwt.verify(token, process.env.PRIVATE_KEY, function(err,decoded){
            // On gere l'erreur =>
            if(err){
                console.log(err)
                appData.error = 1;
                appData["data"] = "Token Invalid";
                res.sendStatus(403).json(appData)


            }
            // Tu passe à la suite on tourne la page =>
            else{
                req.userData = decoded
                // console.log('toto', req.userData.id)

                 next()
            }
        })

    }
    // Alors si il y'a pas de token envoie un message d'erreur =>
    else {
        appData.error = 1;
        appData["data"] = 'SEND TOKEN !!!';
        res.status(403).json(appData);
    }
}

module.exports = verifyToken;