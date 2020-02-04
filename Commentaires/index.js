//Server
let app = require('express')()
const bodyParser = require('body-parser')
const session = require('express-session')

//MySql
const connection = require('./database/db')
//Imports
const requetes = require('./routes/requetes')

//Template
let ejs = require('ejs')
//Port 
const port = 5000


app.set('view engine', 'ejs');

app.get('/',(req,res) =>{
    connection.query(`SELECT * FROM Comment ORDER BY datetime DESC`, (err, results) => {
        if (err) {
          res.send('Erreur lors de l\'envoie du message', err).status(500);
        } else {
            res.render('home', { message: results });
        }
    })

})

//Middlewares
app.use(bodyParser())

app.use(session(
    {
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }  
    }
))


app.use(requetes);
app.listen(port, err => {
    if (err) {
      throw new Error('Something bad happened...');
    }
    console.log(`Server is listening on ${port}`);
  });
 

app.post('/',(req,res)=>{
    console.log('req sur /', req.body)
    if(req.body.message === undefined || req.body.message === ''){
      res.send(console.log('Aucun message envoyé')).status(500)
    } else {
        const message = {
            content : req.body.message
        }
        connection.query(`INSERT INTO Comment SET ?`, message, (err, results) => {
            if (err) {
              res.send('Erreur lors de l\'envoie du message', err).status(500);
            } 
            res.redirect('/');
        })
    }
})

app.delete('/delete/:id',(req, res)=> {
    const id = req.params.id
    connection.query(`DELETE FROM Comment WHERE id = ${id}`, (err, results)=> {
        if(err){
            console.log('erreur', err)
            res.send('Le message n\'as pas été supprimé').status(500);
        }
        res.send(results).status(200)
    })
})

app.get('/public',(req, res)=>{
    if(req.session === undefined){
        res.send(console.log('Il y a une error')).status(500)
    }else{
        console.log('session on top')
    }
})



