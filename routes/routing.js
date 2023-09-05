const express = require('express')
const User = require('../utils/userModel')
const bcrypt = require('bcrypt')
const router = express.Router()

router.get('/', (req, res)=>{
    return res.render('index',{name:"안동", action : ["수영","축구","야구"]})
})

router.get('/register',(req, res)=>{
    return res.render('register')
})

router.post('/register',(req, res)=>{
    console.log(req.body)
    console.log(req.body['email'])
    username = req.body.name
    email = req.body.email
    phone = req.body.phone
    password = req.body.password

    
    const encryptedPassowrd = bcrypt.hashSync(password, 10) // sync
    console.log(encryptedPassowrd)
    const user = new User({
        username:username,
        email:email,
        phone:phone,
        password:password

    })

    // Document instance method
    user.save()
    .then((result) => console.log(`Saved successfully result : ${result}`))
    .catch(e => console.error(e));
    return res.redirect('/')
})

router.get('/login',(req, res)=>{
    return res.render('login')
})

router.post('/login',(req, res)=>{
    console.log(req.body.email)
    console.log(req.body['password'])
    return res.redirect('/')
})

module.exports = router