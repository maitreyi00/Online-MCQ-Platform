const mongoose=require('mongoose')
const validator=require('validator')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error('Enter a valid email id')
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    score:{
        type:Number
    }
})

const User=mongoose.model('User',userSchema)

module.exports=User