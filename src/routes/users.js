const express=require('express')
const User=require('../models/user')
const router= new express.Router()
const passport=require('passport')
const { forwardAuthenticated, ensureAuthenticated }=require('../../config/auth')
const questions=require('../models/question')

function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

router.get('/login',forwardAuthenticated,(req,res)=>{
    console.log(' IN login')
    res.render('login')
})

router.get('/instructions',ensureAuthenticated,(req,res)=>{
    res.render('instructions')
})


/*router.post('/users/login',async (req,res)=>{
    
   try
   { 
       const user= await User.findOne({email:req.body.email, password:req.body.password})
       if(!user)
       {
           res.send({error:'No such user found'})
           return
       }
       res.send(user)
   }
   catch(e)
   {
       res.status(500).send({error:e})
   }
}) */

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/instructions',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next)
  })

router.post('/',async (req,res)=>{
    console.log('Inside Create')
    const user= new User(req.body)

    try{
        await user.save()
        res.send(user)
    }
    catch(e)
    {
        res.send({error:'Error'+ e})
    }

})

router.post('/instructions',(req,res)=>
{    console.log('in inst post')
    res.redirect('/logout')
})

router.get('/logout',(req,res)=>
{
    req.logout()
    res.redirect('/login')
})

router.get('/game',ensureAuthenticated, async (req,res)=>{

    var number=getRnd(0,2)
    console.log('Number',number)
    var question=questions[number]
    //const array= await User.findById(req.user._id)
    
    console.log(question)
    res.render('game',question)
    console.log(req.user)
})



module.exports=router