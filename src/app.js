require('dotenv').config();
const express = require('express');
const path = require('path')
const bcrypt = require('bcryptjs')
const hbs = require('hbs')
const connectToMongo = require('./db/connect'); 
const Register = require('./models/register');
const app = express()
const port = process.env.PORT || 5000

connectToMongo();



const static_path = path.join(__dirname, '../public')
const templates_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

app.use(express.json())

// for get form data code   
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path))
app.set('view engine', 'hbs')
app.set("views", templates_path)
hbs.registerPartials(partials_path)


app.get('/', (req, res) => {
    res.render("index")
})

app.get('/register', (req, res) => {
    res.render("register")
})

app.get('/login', (req, res) => {
    res.render("login")
})


// for registration
app.post('/register', async (req, res) => {
    try {
       const password = req.body.password;
       const cpassword = req.body.confirm_password;

       if(password === cpassword){
        const registerData = new Register({
            firstname : req.body.firstname,
            lastname  : req.body.lastname,
            email : req.body.email,
            phone : req.body.phone,
            gender : req.body.gender,
            password : password,
            confirm_password : cpassword,
            age: req.body.age
        })


        console.log('the success part' + registerData)

        const usertoken = await registerData.generateToken();
        console.log('this is web token ' + usertoken)

        const registered = await registerData.save();
        res.status(201).render("index") 

       }else{
        res.status(404).send("Password Not match")
       }
    } catch (error) {
        res.status(404).send(error)
    }
})

// for login
app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
       
        const userEmail = await Register.findOne({email: email})
        const isMatch = await bcrypt.compare(password, userEmail.password)

        // it will create token when user login
        const usertoken = await userEmail.generateToken();
        console.log('this is login token ' + usertoken)
      
        if(isMatch){
            res.status(200).render('index')
        }else{
            res.status(404).send('Invalid user id or password')
        }
    } catch (error) {
        res.status(404).send('Invalid user id or password')
    }
})



app.listen(port, () => {
    console.log(`Connected wiht http://localhost/${port}`)
})






