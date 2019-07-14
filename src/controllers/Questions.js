import PersonCtrl from './PersonCtrl.js';
import LevelCtrl from './Level.js';


const QuestionsCtrl = (function(){
  
  const current = {
    question: ''
  }


  return{
    showQuestion: function(){
      // check  what actor is chosen and show a question depending from it
      let actorName = PersonCtrl.getPerson().title;   // chosen actor's name

      // display block with questions
      let allAnswers = document.querySelector('.answers');
      allAnswers.style.display = "flex";
      let answers = Array.from(allAnswers.children);

      // get data 
      let actorMovie = PersonCtrl.getPerson().movies[1];  // get a random movie

      // hardcoded wrong answers
      let randomMovie1 = ['randomMovie1', 'randomMovie2', 'randomMovie3'];
      let randomMovie2 = ['randomMovie4', 'randomMovie5', 'randomMovie6'];

      let randomNumber1 = Math.random() * 3;  // 0 1 2
      let random1 = Math.floor(randomNumber1); 
      let randomNumber2 = Math.random() * 3;  // 0 1 2
      let random2 = Math.floor(randomNumber2); 

      // put all answers in new array
      let newArray = new Array; // init new array
      newArray.push(actorMovie, randomMovie1[random1], randomMovie2[random2]);
      console.log(`new array: ${newArray}`);

      // put random answer into random place
      function getRandomAnswer(){
        let randomNum = Math.random() * newArray.length;  // if length==3, will be [0 1 2]
        let random = Math.floor(randomNum);
        return random;
      }

      fillAnswers();
      function fillAnswers(){
        if(answers[0].textContent==''){
        
          const randomAnswerId = getRandomAnswer();
          console.log(randomAnswerId);

          // put random answer into first block
          answers[0].textContent=newArray[randomAnswerId];

          // splice this answer from newArray
          newArray.splice(randomAnswerId, 1);  
          console.log('the new array is:', newArray);

         
          fillAnswers();   // run the whole function again!

        } else if(answers[1].textContent==''){

          const randomAnswerId = getRandomAnswer();
          console.log(randomAnswerId);

          // put random answer into second block
          answers[1].textContent=newArray[randomAnswerId];

          // splice this answer from newArray
          newArray.splice(randomAnswerId, 1);  
          console.log('the new array is:', newArray);

          fillAnswers();

        } else if(answers[2].textContent==''){

          const randomAnswerId = getRandomAnswer();
          console.log(randomAnswerId);

          // put random answer into third block
          answers[2].textContent=newArray[randomAnswerId];

          // splice this answer from newArray
          newArray.splice(randomAnswerId, 1);  
          console.log('the new array is:', newArray);

          fillAnswers();
        } else {
          console.log('All answers filled');
        }
      }
      


      // guess the answer
      answers.forEach((button)=>{
        button.addEventListener('click', tryGuess);
      })

      function tryGuess(){
        let guess = this.textContent;   // string of clicked answer
        let correctAnswer = actorMovie;   // string of correct answer

        if (correctAnswer == guess){ 
          console.log('correct!');

          QuestionsCtrl.clearAnswers();
          QuestionsCtrl.hideAnswers();

          LevelCtrl.IncreaseScoreByOne(); // incement score 

          // remove event listeners from buttons
          answers.forEach((button)=>{
            button.removeEventListener("click", tryGuess, false);
          })

          // clear block answers

          LevelCtrl.initText();  // init next level
         

        } else {
          console.log('bad answer! Game over!');
          //game over
        }

      }

    },

    clearAnswers: function(){
      let allAnswers = document.querySelector('.answers');
      let answers = Array.from(allAnswers.children);
      answers.forEach((answer)=> {answer.textContent=''}); // loop
      
    },
    hideAnswers: function(){
      document.querySelector('.answers').style.display = "none";    // hide buttons
    }


  }

})();

export default QuestionsCtrl;