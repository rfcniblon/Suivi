 const express = require('express');
 const router = express.Router({ mergeParams: true });
 const connection = require('../config/database');
 const jwtsecret = process.env.JWT_SECRET;
 const jwt = require('jsonwebtoken');
 const bcrypt = require('bcryptjs');
 const salt =  process.env.SALT;

 router.post('/',(req, res) => {
   const user = req.body;
   var hash =  bcrypt.hashSync(user.password, salt);
   const sql = 'SELECT * from users WHERE name=? AND password=? ';
   connection.query(sql, [user.name, hash], (error, results, fields) => {
     if (error || results.length === 0) {
       res.status(501).send("couldn't post users " + error);
     } else {
       jwt.sign({ user }, jwtsecret, (err, token) => {
         if (err) {
           res.status(501).send('JWT error');
         } else {
           res.json({ token });
         }
       });
     }
   });
 });

module.exports = router;
