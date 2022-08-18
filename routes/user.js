const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db/db.config')

const connection = mysql.createConnection(db.database)

// user connect to db and create table in db
connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to the MYSQL server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS users (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), username Varchar(255))"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
            // console.log(result);
            if(result.warningCount === 0){
                console.log('User table created');
            }
        })
    }
})

const router = express.Router()

// get all users from db
router.get('/',(req, res) =>{
    var query = "SELECT * FROM users"

    connection.query(query,(err,rows) =>{
        if(err) throw err

        res.send(rows)
    })
})

// save user
router.post('/',(req, res) =>{
    const id = req.body.id
    const name = req.body.name
    const username = req.body.username

    var query = "INSERT INTO users (id, name, username) VALUES (?,?,?)"

    connection.query(query, [id, name, username], (err) =>{
        if(err){
            res.send({"message" : "Duplicate Entry. Please try again"})
        }else{
            res.send({"message" : "User Created!"})
        }
    })
})

// update user
router.put('/',(req, res) =>{
    const id = req.body.id
    const name = req.body.name
    const username = req.body.username

    var query = "UPDATE users SET name =?, username=? WHERE id=?"

    connection.query(query, [name, username, id], (err,rows) =>{
        if(err) console.log(err);

        if(rows.affectedRows > 0){
            res.send({'message' : 'User Successfully Updated'})
        }else{
            res.send({'message' : 'User not found. Please try again'})
        }

    })
})

// delete user
router.delete('/:id', (req, res) => {
    const id = req.params.id

    var query = "DELETE FROM users WHERE id=?";

    connection.query(query, [id], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'User Successfully deleted' })
        } else {
            res.send({ 'message': 'User not found. Please try again' })
        }
    })
})

// get user in table by id
router.get('/:id', (req, res) => {
    const id = req.params.id

    var query = "SELECT * FROM users WHERE id=?"

    connection.query(query, [id], (err, rows) => {
        if (err) console.log(err);

        res.send(rows)
    })
})

module.exports = router;