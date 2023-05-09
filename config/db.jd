const mysql = require('mysql')

var pool  = mysql.createPool({
  connectionLimit : 10,
  host: "us-cdbr-east-06.cleardb.net",
  user: "b3334c967dae01",
  password: "34751553",
  database:"heroku_90217414f3db7ef"
});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


module.exports = pool;

