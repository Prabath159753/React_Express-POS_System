const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db/db.config')

const connection = mysql.createConnection(db.database)

// order details connect to db and crate table in db
connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to the MYSQL server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS orderDetail (orderId VARCHAR(255) PRIMARY KEY, itemCode VARCHAR(255), orderQty int(10), price double)"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
            console.log(result);
            if(result.warningCount === 0){
                console.log('Order Detail table created');
            }
        })
    }
})

const router = express.Router()


module.exports = router