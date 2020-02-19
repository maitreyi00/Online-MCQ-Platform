const mongoose=require('mongoose')

const questionSchema=new mongoose.Schema({
    index:{
        type:Number,
        required:true
    },
    ques:{
        type:String,
        required:true
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
    correctAns:
    {
        type:Number,
        required:true
    }
})

const Question=mongoose.model('Question',questionSchema)

module.exports=Question