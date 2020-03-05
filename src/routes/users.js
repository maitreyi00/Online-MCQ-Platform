const express=require('express')
const User=require('../models/user')
const router= new express.Router()
const passport=require('passport')
const { forwardAuthenticated, ensureAuthenticated }=require('../../config/auth')
const questions=require('../models/question')
const questions2=require('../models/question2')
const questions3=require('../models/question3')

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
    var array=req.user.q_array
    var array_numbers=[]
    var qno=req.user.qno

    if(qno>=0 && qno<=4)
    {
        array.forEach((ques)=> {
            var str=ques.question
            var strno=str.split("n")
            var no=parseInt(strno[1]-1)        
           array_numbers.push(no)
        })
   
       var number=getRnd(0,4)
       console.log('Random number:',number)
       var question=questions[number]
        console.log(array_numbers)
        if(array_numbers)
        {
            while(array_numbers.includes(number) && req.user.qno!=5)
            {   console.log('IN while loop')
                number=getRnd(0,4)
                question=questions[number]
            }
        }
    }
    else if(qno>=5 && qno<=9)
    {
        array.forEach((ques)=> {
            var str=ques.question
            var strno=str.split("n")
            var no=parseInt(strno[1]-1)        
           array_numbers.push(no)
        })
   
       var number=getRnd(5,9)
       console.log('Random number:',number)
       var question=questions2[number-5]
        console.log(array_numbers)
        if(array_numbers)
        {
            while(array_numbers.includes(number) && req.user.qno!=5)
            {   console.log('IN while loop')
                number=getRnd(5,9)
                question=questions2[number-5]
            }
        }
    }
    else if(qno>=10 && qno<=14)
    {
        array.forEach((ques)=> {
            var str=ques.question
            var strno=str.split("n")
            var no=parseInt(strno[1]-1)        
           array_numbers.push(no)
        })
   
       var number=getRnd(10,14)
       console.log('Random number:',number)
       var question=questions3[number-10]
        console.log(array_numbers)
        if(array_numbers)
        {
            while(array_numbers.includes(number) && req.user.qno!=5)
            {   console.log('IN while loop')
                number=getRnd(10,14)
                question=questions3[number-10]
            }
        }
    }
     //choosing the question, done here!.
    console.log('question is',question)
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

router.post('/game',async (req,res)=>{
    const index=req.user.qno
    console.log(index)
    console.log(req.user.q_array[index].correctAns)
    console.log(req.body.answer)
    if(req.body.answer==req.user.q_array[index].correctAns)
    {
        console.log('correct answer')
    }
    else
    {
        console.log('wrong answer')
    }
    req.user.qno=req.user.qno+1
    await req.user.save()
    console.log(req.user.qno)

    

})

router.get('/remove',ensureAuthenticated,async (req,res)=>{
    try{ req.user.qno=0
        req.user.q_array=[]
        await req.user.save()
    }
    catch(e)
    {
        res.status(400).send({error:e})
    }
    

})

router.get('',(req,res)=>{
    res.render('ind')
})


module.exports=router