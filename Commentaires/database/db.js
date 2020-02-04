const mysql = require('mysql');

const bdd_name = 'Postcomm';
const port = 3306;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jecode4wcs', // INSERT YOUR PASSWORD HERE
  database: bdd_name // INSERT YOUR DATABASE NAME HERE
});
connection.connect(function(err) {
  if (!err) {
    console.log(`## 🤙 MySQL is connected to ${bdd_name} on port ${port}`);
  } else {
    console.log('### 👎 Error connecting database', err);
  }
});

module.exports = connection;
