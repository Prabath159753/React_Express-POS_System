const express = require('express')
const mongoose = require('mongoose')

const user = require ('./routes/user')
const customer = require('./routes/customer')
const item = require('./routes/item')
const order = require ('./routes/Order')

const app = express()
const port = 4000

app.use(express.json())
app.use('/users',user)
app.use('/customer', customer)
app.use('/items',  item)
app.use('/orders',order)


// app.get('/',(req,res) =>{
//     console.log('get request coming!');
//     res.send('get req came for / route')
// });
//
// app.get('/customer',(req,res) =>{
//     console.log('get request coming!');
//     res.send('<h1>customer get request came <h1/>')
// });
//
// app.get('/item',(req,res) =>{
//     console.log('get request coming!');
//     res.send('<h1>item get request came <h1/>')
// });
//
// app.get('/order',(req,res) =>{
//     console.log('get request coming!');
//     res.send('<h1>order get request came <h1/>')
// });

app.listen(port, () => {
    console.log(`app starting on ${port}`);
})