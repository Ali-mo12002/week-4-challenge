var startButton = document.querySelector("#start-button");
var welcomeEl = document.querySelector("#welcome");
var quizEl = document.querySelector("#quiz");
var questions = document.querySelector("#questions");
var selected = false;
var option1 = document.querySelector("#option1");
var option2 = document.querySelector("#option2");
var option3 = document.querySelector("#option3");
var correct = document.querySelector("#right");
var incorrect = document.querySelector("#wrong");
var next = document.querySelector(".next");
var next1 = document.querySelector(".next1")
var score = 0;

var users = [];
var userdetails = {
    username : document.getElementById("#name"),
    userscore : undefined
    
}
startButton.addEventListener("click", function(event){
    
    welcomeEl.className = "hidden";
    quizEl.classList.replace("hidden", "show");
    
});

   
    main();
    



function main() {
    var j = 0; // Initialize j outside the loop
  
    function showQuestion() {
      questions.innerHTML = quiz[j].question;
      option1.innerHTML = quiz[j].optionOne;
      option2.innerHTML = quiz[j].optionTwo;
      option3.innerHTML = quiz[j].optionThree;
    }
  
    function handleOptionClick(event) {
      var selectedOption = event.target.innerHTML;
      if (selectedOption === quiz[j].answer) {
        score++;
        quizEl.classList.replace("show", "hidden");
        correct.classList.replace("hidden", "show");
      } else {
        quizEl.classList.replace("show", "hidden");
        incorrect.classList.replace("hidden", "show");
      }
    }
  
    function handleNextClick(event) {
      event.preventDefault();
      correct.classList.replace("show", "hidden");
      incorrect.classList.replace("show", "hidden");
      j++; // Move to the next question
      if (j < quiz.length) {
        showQuestion();
        quizEl.classList.replace("hidden", "show");
      } else {
        // Display final score or perform other actions
      }
    }
  
    // Show the first question
    showQuestion();
  
    // Add event listener to the options
    option1.addEventListener("click", handleOptionClick);
    option2.addEventListener("click", handleOptionClick);
    option3.addEventListener("click", handleOptionClick);
    next.addEventListener("click", handleNextClick);
    next1.addEventListener("click", handleNextClick);
  }
  
  main();
  