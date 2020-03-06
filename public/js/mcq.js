console.log('in mcq js')
window.console = window.console || function(t) {};

if (document.location.search.match(/type=embed/gi)) {
    window.parent.postMessage("resize", "*");
  }


  $(document).ready( function() {
          
    setTimeout(display,10000)
  })



  function display()
  {   console.log('inside display')
      var answer='optionA'
      const A1=document.getElementById('optionA')
      
  const A= document.getElementById('optionA').checked
  const B= document.getElementById('optionB').checked
  const C= document.getElementById('optionC').checked
  


  if(B)
  {
      answer='optionB'
  }
  else if(C)
  {
      answer='optionC'
  }
  
  console.log('in javascript')
  console.log('A is', A) 
  console.log('B is',B)
  console.log('C is',C)
  console.log(answer)

  
  $.post('/game',{answer:answer})
  $.ajax({
      url:"/game",
      type:"GET",
  }).done(function (result){
      console.log(result)
      renderFunction(result)
  }).fail(function(err){
      console.log(err)
  })
  //renderQuestion()
   
  }
  var renderFunction = function(result){
      var set= document.getElementById('set')
      set.innerHTML=result
         
      setTimeout(display,10000)
  }

  
function glow()
{
const target = window.document.getElementsByTagName('h1')[0];

const flickerLetter = letter => `<span style="animation: text-flicker-in-glow ${Math.random() * 4}s linear both ">${letter}</span>`;
const colorLetter = letter => `<span style="color: hsla(${Math.random() * 360}, 100%, 80%, 1);">${letter}</span>`;
const flickerAndColorText = (text) =>
text.
split('').
map(flickerLetter).
map(colorLetter).
join('');
const neonGlory = target => target.innerHTML = flickerAndColorText(target.textContent);

neonGlory(target);
target.onclick = ({ target }) => neonGlory(target);
}

const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
var colorA = document.querySelector('.optionA');
var colorB = document.querySelector('.optionB');
var colorC = document.querySelector('.optionC');
var colorD = document.querySelector('.optionD');
var q = document.querySelector('.card');

let count = 0;
let score = 0;
const questionTime = 10;
var deadline = new Date(Date.parse(new Date()) + 10000);
var timeinterval;
let TIMER;

function qTime()
{   
    var time=10 
    
    // fetch('/time').then((response)=>{

    //     response.json().then((data)=>{
    //         time=data.time
    //     })
    // })
    return time;
}

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var s = Math.floor(t / 1000 % 60);
    var m = Math.floor(t / 1000 / 60 % 60);
    return {
    'total': t,
    'minutes': m,
    'seconds': s };
    }
    
    function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var mSpan = clock.querySelector('.minutes');
    var sSpan = clock.querySelector('.seconds');
    
    function updateClock() {
    var t = getTimeRemaining(endtime);
    
    mSpan.innerHTML = ('0' + t.minutes).slice(-2);
    sSpan.innerHTML = ('0' + t.seconds).slice(-2);
    
    if(t.total<=0) {
    clearInterval(timeinterval);
    }
    
    }

    updateClock();

    timeinterval = setInterval(updateClock, 1000);
    }

  colorA.onclick = function () {
    recolour(colorB);
    recolour(colorC);
    recolour(colorD);
  this.style.backgroundColor = "#ae38c5b4";
  this.style.color = "white";
  
}

colorB.onclick = function () {
  recolour(colorA);
    recolour(colorC);
    recolour(colorD);
  this.style.backgroundColor = "#ae38c5b4";
  this.style.color = "white";
  
}

colorC.onclick = function () {
  recolour(colorB);
    recolour(colorA);
    recolour(colorD);
  this.style.backgroundColor = "#ae38c5b4";
  this.style.color = "white";
  
}

colorD.onclick = function () {
  recolour(colorB);
    recolour(colorC);
    recolour(colorA);
  this.style.backgroundColor = "#ae38c5b4";
  this.style.color = "white";
  
}
    
function recolour(colour){
  colour.style.backgroundColor = "white";
  colour.style.color = "black";
}  

    function startQuiz(){
      console.log('IN startQuiz')
    initializeClock('box', new Date(Date.parse(new Date()) + qTime()*1000));
      quiz.style.display = "block";
      renderCounter();
      TIMER = setInterval(renderCounter,1000);
    }
  

  function renderCounter(){
    if(count <= qTime())
        count++;
    else{
      nextQuestion();
    }
}

let cardTransitionTime = 1000;
let $card = $('.js-card');

function nextQuestion(){
  count = 0;
  recolour(colorA);
  recolour(colorB);
    recolour(colorC);
    recolour(colorD);
  
           
            $card.addClass('js-card is-switched');
            window.setTimeout(function () {
              $card.removeClass('js-card is-switched');
              }, cardTransitionTime);
            
            clearInterval(timeinterval);
            initializeClock('box', new Date(Date.parse(new Date()) + qTime()*1000));
        
}