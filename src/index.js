const express=require('express')
const expressLayouts=require('express-ejs-layouts')
require('./db/mongoose')
const userRouter=require('./routes/users')
const passport=require('passport')
const flash=require('connect-flash')
const session=require('express-session')
const initializePassport=require('../config/passport')
initializePassport(passport)

const app=express()
const port=process.env.PORT||3000

//EJS
//app.use(expressLayouts)
app.set('view engine','ejs')

//Body-parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  )
  // Connect flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



// Global variables -middleware
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



//Routes
app.use(express.json())
app.use(userRouter)




app.listen(port,()=>
{
    console.log('Server running at port: ',port)
})