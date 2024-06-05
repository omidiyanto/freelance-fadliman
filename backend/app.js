const express = require('express')
const cors = require('cors')
const session = require('express-session');
const errorGlobal = require('./controller/errorController')
const cookieParser = require('cookie-parser');
const authRouter = require('./router/authRouter')
const productRouter = require('./router/productRouter')
const userRouter = require('./router/userRouter')
const pinjamanRouter = require('./router/pinjaman')

const app = express()
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json({ limit: '10kb' }));
app.use(session({
  secret: process.env.JWT_SECRET, // Replace with a secret key for session encryption
  resave: false,
  saveUninitialized: false,
}));

app.use(cors(
  {
      origin: ['http://localhost:5173'],
    credentials: true,            //access-control-allow-credentials:true
    methods: ["POST", "GET","DELETE","PATCH"],
  }
));

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Origin'
  )
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173','http://127.0.0.1:5173'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next()
})
app.use(cookieParser());

console.log(process.env.NODE_ENV)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/pinjaman', pinjamanRouter)

app.use(errorGlobal)

module.exports = app
