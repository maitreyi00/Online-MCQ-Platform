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
    const array=req.user.q_array
    var number=getRnd(0,4)
    var question=questions[number]
    while(array.includes(question))
    {
        number=getRnd(0,4)
        question=questions[number]
    }
    res.render('game',question)

    try{
        req.user.q_array.push(question)
        await req.user.save()
     }
     catch(e)
     {
         res.status(400).send({error :'Error, cannot open'})
     }
    
    console.log(req.user)
    
   
    
    
})

router.post('/game',(req,res)=>{
    const index=req.user.qno
    if(req.body.answer==req.user.q_array[index].correctAns)
    {
        console.log('correct answer')
    }
    else
    {
        console.log('wrong answer')
    }
    req.user.qno=req.user.qno+1
    console.log(req.user.qno)
})



module.exports=router