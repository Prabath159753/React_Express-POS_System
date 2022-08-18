const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db/db.config')

const connection = mysql.createConnection(db.database)

// item connect to db and crate table in db
connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to the MYSQL server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS items (code VARCHAR(255) PRIMARY KEY, name VARCHAR(255), discription Varchar(255), price double, qtyOnHand int(10))"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
            console.log(result);
            if(result.warningCount === 0){
                console.log('Item table created');
            }
        })
    }
})

const router = express.Router()



module.exports = router