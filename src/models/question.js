const mongoose=require('mongoose')

/*const questionSchema=new mongoose.Schema({
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

module.exports=Question */
const questions=[
{ question:'Question1',
  optionA:'A1',
  optionB:'B',
  optionC: 'C',
  optionD: 'D',
  correctAns:'optionA'

},
{ question:'Question2',
  optionA:'A2',
  optionB:'B',
  optionC: 'C',
  optionD: 'D',
  correctAns:'optionB'

},
{ question:'Question3',
  optionA:'A3',
  optionB:'B',
  optionC: 'C',
  optionD: 'D',
  correctAns:'optionC'

},
{ question:'Question4',
  optionA:'A4',
  optionB:'B',
  optionC: 'C',
  optionD: 'D',
  correctAns:'optionB'

},
{ question:'Question5',
  optionA:'A5',
  optionB:'B',
  optionC: 'C',
  optionD: 'D',
  correctAns:'optionD'

}]

module.exports=questions