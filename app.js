const express = require('express')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80 
const app = express()

// Define mongoose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded())


// PUG SPECIFIC STUFF 
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views'))

//ENDPOINTS
app.get('/', (req, res) => {
    // const para = {}
    res.status(200).render('home.pug')
})
app.get('/home', (req, res) => {
    // const para = {}
    res.status(200).render('home.pug')
})
app.get('/contact', (req, res) => {
    // const para = {}
    res.status(200).render('contact.pug')
})
app.post('/contact', (req, res) => {
    var myData = new contact(req.body)
    myData.save().then(() => {
        res.send('this item has been sent successfully')
    }).catch(()=>{
        res.status(400).send("Item has not been sent to the database")
    })
    // const para = {}
    
})

//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})




