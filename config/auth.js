module.exports={
    ensureAuthenticated: function(req,res,next){
        
        if(req.isAuthenticated())
        {   console.log('In other  middleware, authenticated')
            return next()
        }
        req.flash('error_msg','Please log-in to view that resource')
        console.log('IN other middleware,not authenticated')
        res.redirect('/login')
        
    },
    forwardAuthenticated: function(req,res,next){
        
        if(!req.isAuthenticated())
        {  console.log(' IN login middleware')
            return next()
        }
        res.redirect('/instructions')
    }
}