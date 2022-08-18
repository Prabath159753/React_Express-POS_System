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
        var userTableQuery = "CREATE TABLE IF NOT EXISTS orders (orderId VARCHAR(255) PRIMARY KEY, date VARCHAR(255), customerId Varchar(255))"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
            console.log(result);
            if(result.warningCount === 0){
                console.log('Order table created');
            }
        })
    }
})

const router = express.Router()

// get all orders from db
router.get('/',(req, res) =>{
    var query = "SELECT * FROM orders"

    connection.query(query,(err,rows) =>{
        if(err) throw err

        res.send(rows)
    })
})

// save order
router.post('/',(req, res) =>{
    const orderId = req.body.orderId
    const date = req.body.date
    const customerId = req.body.customerId

    var query = "INSERT INTO orders (orderId, date, customerId) VALUES (?,?,?)"

    connection.query(query, [orderId, date, customerId], (err) =>{
        if(err){
            res.send({"message" : "duplicate entry. Please try again"})
        }else{
            res.send({"message" : "Order Successfully Added!"})
        }
    })
})

// update order
router.put('/',(req, res) =>{
    const orderId = req.body.orderId
    const date = req.body.date
    const customerId = req.body.customerId

    var query = "UPDATE orders SET date=?, customerId=? WHERE orderId=?"

    connection.query(query, [date, customerId, orderId], (err,rows) =>{
        if(err) console.log(err);

        if(rows.affectedRows > 0){
            res.send({'message' : 'Order Successfully Updated'})
        }else{
            res.send({'message' : 'Order not found. Please try again'})
        }
    })
})

// delete order
router.delete('/:orderId', (req, res) => {
    const orderId = req.params.orderId

    var query = "DELETE FROM orders WHERE orderId=?";

    connection.query(query, [orderId], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'Order Successfully Deleted' })
        } else {
            res.send({ 'message': 'Order not found. Please try again' })
        }
    })
})

module.exports = router