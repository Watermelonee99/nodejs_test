const  express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session'); 
const FileStore = require('session-file-store')(session);
const apiRouter = require('./routes/routing')

const app = express()

// Connect to MongoDB
mongoose.connect("mongodb+srv://root:1234@mydb.a53fjz0.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true})
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

app.set('views', path.resolve(__dirname + '/views'))
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(session({                                          
  secret:"asdfasffdas",
  resave:false,
  saveUninitialized:true,
  store : new FileStore()
}))
app.use('/',apiRouter)

let port = 8008

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})