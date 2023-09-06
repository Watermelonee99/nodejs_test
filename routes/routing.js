const express = require('express')
const User = require('../utils/userModel')
const List = require('../utils/listModel')
const bcrypt = require('bcrypt')
const router = express.Router()


router.get('/', (req, res)=>{
    return res.render('index',{name:req.session["username"]})
})

router.get('/register',(req, res)=>{
    return res.render('register',{user:'guest'})
})

router.post('/register',async(req, res)=>{
    console.log(req.body.name)
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
        password:encryptedPassowrd 
    })

    let result = await User.findOne({ email: email });
    console.log(result)
    if (result != null) {
        res.render('register', {user:'exist'})
    }
    else {
        // Document instance method
        try{
            let result = await user.save()
            await console.log(`Saved successfully result : ${result}`)
            await res.redirect('/login')
        }   catch (error){
            console.log(error);
            return res.redirect('/register')
        }
    }
    
    
})

router.get('/login',(req, res)=>{
    return res.render('login',{user:'guest'})
})

router.post('/login',async (req, res)=>{
    console.log(req.body.email)
    console.log(req.body['password'])
    let email = req.body.email
    let password = req.body['password']
    let result = await User.findOne({ email: email });
    console.log(result)
    if (result == null) {
        res.render('login', {user:'null'})
    }
    else {
        resultPassword = result.password
        const same = bcrypt.compareSync(password, resultPassword) // sync
        console.log(same)
        if (same){
            req.session["username"] = result.username; 
            res.render('index',{name:req.session["username"]}) //로그인 후 인사페이지 이름 넣기
        }else {
            res.render('login',{user :""})
        }
        
        // Document instance method
        // try{
        //     let result = await user.save()
        //     await console.log(`Saved successfully result : ${result}`)
        //     await res.redirect('/login')
        // }   catch (error){
        //     console.log(error);
        //     return res.redirect('/register')
        // }
    }
    
})

router.get('/logout',function(req, res){
    req.session.destroy(function(){
    req.session;
    });
    res.redirect('/');
    });


router.get('/list',async (req, res, next)=> {
    let result = await List.find();
    console.log(result)
    res.render('list', {articles : result})

})

router.get('/create', (req, res, next)=> {
    res.render('create')

})

router.post('/create',async (req, res, next)=> {
    title = req.body.title
    author = req.body.author
    desc = req.body.desc
    console.log(title)
 

    
    const list = new List({
        title:title,  //왼쪽은 스키마에서 의 값, 오른쪽은 위에서 받아온 값
        author:author,
        desc:desc,
        
    })

    try{
        let result = await list.save()
        await console.log(`Saved successfully result : ${result}`)
        await res.redirect('/list')
    }   catch (error){
        console.log(error);
        return res.redirect('/create')
    }


})

module.exports = router