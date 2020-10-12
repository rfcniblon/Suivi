// virer le salt en dur et mettre la variable d'environnement

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const parser = require("body-parser");

router.use(parser.urlencoded({ extended: false }))
 
// parse application/json
router.use(parser.json())


router.post(
    '/',
    (req, res) => {
        let token = req.body.token;
        jwt.verify(token, 'monbeaupotager', (err, authenticationData) => {
            if(err){
                res.json({
                    succes: false,
                    token: "erreur"
                });
            }
            else {
                res.json({
                    succes: true,
                    token: token
                });
            }
        });
    }
)

module.exports = router;
