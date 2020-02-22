var answer='optionA'
const A= document.getElementById('optionA').checked
const B= document.getElementById('optionB').checked
const C= document.getElementById('optionC').checked
const D= document.getElementById('optionD').checked

if(B)
{
    answer='optionB'
}
else if(C)
{
    answer='optionC'
}
else if(D)
{
    answer='optionD'
}
console.log('in javascript')
console.log('A is', A)
// $(document).ready(function(){
//     $('#next').click(function()
//     {

//     })
// })


