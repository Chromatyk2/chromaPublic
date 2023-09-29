const mysql = require('mysql')

var pool  = mysql.createPool({
  connectionLimit : 10,
  host: "sp1029617-001.eu.clouddb.ovh.net",
  user: "chromatyk",
  password: "d32aA7mU02",
  database:"chromatykDex"
});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


module.exports = pool;
