const { check, validationResult,body } = require('express-validator');


/**************************************************/
//***************/ Pour les input /******************
/* ***********************************************/

const checkInputRegister = [
    check("email", `L'email est invalide`)
        .isEmail()
        .not()
        .isEmpty().withMessage(`L'email est obligatoire`),

    check('password')
        .not().isEmpty().withMessage(`Le password est obligatoire`)
        .isLength({ min: 8, max:30 }).withMessage(`Au moins  8 caractères.`),
        // .matches(`[0-9]`).withMessage(`Au moins un chiffre`)
        // .matches(`[a-z]`).withMessage(`Au moins une lettre minuscule`)
        // .matches(`[A-Z]`).withMessage(`Au moins une lettre majuscule,`),

    check("first_name", `Le prenom est invalide`)
        .not().isEmpty().withMessage(`Le prenom est obligatoire`)
        .isLength({ min: 1, max: 30 }),

    check("last_name", `Le nom est invalid`)
        .not().isEmpty().withMessage(`Le nom est obligatoire`)
        .isLength({ min: 1, max: 30 }),


];

const checkInputLogin = [
    check("email", `L'email est invalide`)
        .isEmail()
        .not()
        .isEmpty().withMessage(`L'email est obligatoire`),

    check('password', "Mots de pas Incorret").isLength({ min: 4, max: 30 }),
];

const checkInputProductPost = [

    check('title', `Le titre est obligatoire`).isLength({ min: 3, max: 20 })
        .not()
        .isEmpty().withMessage(`Le titre doit être `),

    check('description', `La description est obligatoire`).isLength({ min: 3 })
        .not()
        .isEmpty(),
    check('category', `La category est obligatoire`).isLength({ min: 3 })
        .not()
        .isEmpty(),
    check('price', `le prix est obligatoire`)
        .not()
        .isEmpty()
        .isDecimal().withMessage(`Le prix doit etre une decimal`),

    check('status', `Le status est obligatoire`)
        .not()
        .isEmpty()
        .isBoolean().withMessage(`le status doit etre booleen`)
];

const checkInputOrdersPost = [
    // check('id_user')
    // .not()
    // .isEmpty()
    // .matches(`[0-9]`).withMessage(`Au moins un chiffre`),

    body('products_id')
    .exists()
    .withMessage(`Manquant`),
    body('products_id.*')
    .matches(`[0-9]`).withMessage(`Au moins un chiffre`)

]



module.exports = {
    checkInputRegister,
    checkInputLogin,
    checkInputProductPost,
    checkInputOrdersPost
}