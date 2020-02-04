const express = require('express')
const router = express.Router()
const connection = require('../database/db')


router.post('/Comment', (req, res) => {
    const comment = req.body
    console.log('/comment',comment)
    connection.query(`INSERT INTO Comment SET ?`, (err, results) => {
      if (err) {
        res.send('Commentaire bien envoyer').status(500);
      } else {
        console.log(results);
        res.json(results);
      }
    });
  });
  
  

  module.exports = router


