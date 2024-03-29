const mysql = require('mysql');
require('dotenv').config({path: 'variables.env'});


    const mysqlConnection = mysql.createPool({
        host: process.env.BD_HOST,
        user: process.env.BD_USER,
        password: process.env.BD_PASS,
        database: process.env.BD_NOMBRE,
        port: process.env.BD_PORT,
        multipleStatements: true ,
        
    });
   
    mysqlConnection.getConnection(function(err){
  if(err) {
        console.log("\n\t *** Cannot establish a connection with the database. ***");
  }else {
      console.log("\n\t *** New connection established with the database. ***")
  }
});

module.exports = mysqlConnection;
      
   