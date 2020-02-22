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
    },
    qno :{
        type:Number,
        default:0
    },
    q_array:[{
        question:{
            type:String,
            required:true,
        },
        optionA:{
            type:String,
            required:true
        },
        optionB:{
            type:String,
            required:true
        },
        optionC:{
            type:String,
            required:true
        },
        optionD:{
            type:String,
            required:true
        },
        correctAns:{
            type:String,
            required:true
        }

    }]
})

const User=mongoose.model('User',userSchema)

module.exports=User