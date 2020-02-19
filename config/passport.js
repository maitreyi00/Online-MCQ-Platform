
const LocalStrategy=require('passport-local').Strategy
const User=require('../src/models/user')


module.exports=function(passport){
      
    passport.use(new LocalStrategy({usernameField:'email'},
    function(email,password,done){
     
        User.findOne({email:email}).then((user)=>{

            if(!user)
            {   console.log('no such user')
                return done(null,false,{message:'No such e-mail registered'})
            }
            if(user.password!==password)
            {   console.log('password does not match')
                return done(null,false,{message:'Password Incorrect'})
            }
            
            return done(null,user)
        }).catch((err)=>{

            return done(err)
        })


}))

passport.serializeUser(function(user, done) {
    console.log('IN seriaize')
    console.log(user)
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    console.log('IN deserialize')
    User.findById(id, function(err, user) {
      done(err, user);
    })
  })
}

