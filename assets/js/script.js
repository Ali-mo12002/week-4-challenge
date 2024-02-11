// Selecting elements from the DOM
var highscores = document.querySelector("#highscores"); // Selecting the element with id "highscores"
var highscoresEl = document.querySelector("#section-highscore"); // Selecting the element with id "section-highscore"
var startButton = document.querySelector("#start-button"); // Selecting the element with id "start-button"
var welcomeEl = document.querySelector("#welcome"); // Selecting the element with id "welcome"
var quizEl = document.querySelector("#quiz"); // Selecting the element with id "quiz"
var questions = document.querySelector("#questions"); // Selecting the element with id "questions"
var summaryEl = document.querySelector("#summary"); // Selecting the element with id "summary"
var username; // Variable to store the username
var review = document.querySelector("#review"); // Selecting the element with id "review"
var selected = false; // Variable to track if an option has been selected
var option1 = document.querySelector("#option1"); // Selecting the element with id "option1"
var option2 = document.querySelector("#option2"); // Selecting the element with id "option2"
var option3 = document.querySelector("#option3"); // Selecting the element with id "option3"
var correct = document.querySelector("#right"); // Selecting the element with id "right"
var incorrect = document.querySelector("#wrong"); // Selecting the element with id "wrong"
var next = document.querySelector(".next"); // Selecting the element with class "next"
var next1 = document.querySelector(".next1"); // Selecting the element with class "next1"
var score = 0; // Variable to store the score
var timerInterval; // Variable to store the timer interval
var timeRemaining = 60; // Total time for the quiz in seconds
var timer = document.querySelector("#timer"); // Selecting the element with id "timer"

// Check if topTen data is already stored in local storage, if not, initialize it with default values
if (!localStorage.getItem('topTen')) {
  var topTen = [
    { name: "John", score: 100 },
    { name: "Alice", score: 90 },
    { name: "Bob", score: 80 },
    { name: "john", score: 70 },
    { name: "lewis", score: 60 },
    { name: "william", score: 50 },
    { name: "stacy", score: 40 },
    { name: "james", score: 30 },
    { name: "jack", score: 20 },
    { name: "jim", score: 10 }
  ];
  var highscorerendered = false; // Variable to track if high scores have been rendered

  // Save the initial topTen data to local storage
  localStorage.setItem('topTen', JSON.stringify(topTen));
} else {
  // Retrieve the topTen data from local storage
  var topTen = JSON.parse(localStorage.getItem('topTen'));
}

// Event listener for the highscores element
highscores.addEventListener("click", function(event) {
  // Toggle between showing highscores and the home screen
  if (highscoresEl.classList.contains("show")) {
    highscores.textContent = "High Scores";
    highscoresEl.classList.replace("show", "hidden");
    welcomeEl.classList.replace("hidden", "show");
  } else if (welcomeEl.classList.contains("show")) {
    highscores.textContent = "Home";
    highscoresEl.classList.replace("hidden", "show");
    welcomeEl.classList.replace("show", "hidden");
  }

  // Render the high scores if they haven't been rendered before
  if (!highscorerendered) {
    var scoresContainer = document.querySelector(".scores-section");
    var scoresHTML = '';

    topTen.forEach(function(score, index) {
      var scoreElement = document.createElement('p');
      scoreElement.textContent = `${index + 1}. ${score.name}: ${score.score}`;
      scoresContainer.appendChild(scoreElement);
      highscorerendered = true;
    });
  }
});
startButton.addEventListener("click", function(event) {
    // Get the username from the input field
    username = document.getElementById("name").value;
    // Hide the welcome screen and show the quiz screen
    welcomeEl.className = "hidden";
    quizEl.classList.replace("hidden", "show");
    console.log(username);
  
    // If the quiz screen is shown, hide the highscores
    if (quizEl.classList.contains("show")) {
      highscores.classList.replace("show", "hidden");
    }
  
    // Start the timer
    startTimer();
  });
  
  // Function to start the timer
  function startTimer() {
    timerInterval = setInterval(function() {
      timeRemaining--;
      timer.innerHTML = timeRemaining;
  
      // If time runs out, end the quiz
      if (timeRemaining <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    quizEl.classList.replace("show", "hidden");
    summaryEl.classList.replace("hidden", "show");
    console.log("score = " + score);
  
    // Display appropriate message based on the remaining time
    if (timeRemaining === 0) {
      review.innerHTML = "Nice try! You were almost there. Unfortunately, you did not complete the quiz in time. Better luck next time.";
    } else if (timeRemaining < 5) {
      review.innerHTML = "Well done! You just about finished the quiz. You only had " + timeRemaining + " seconds left. You got " + score + " points.";
    } else {
      review.innerHTML = "Well done! You finished the quiz with " + timeRemaining + " seconds remaining. You got a score of " + score + ".";
    }
  
    // Create a new user object with username and score
    newUser = { name: username, score: score };
    topTen = JSON.parse(localStorage.getItem('topTen'));
  
    // Check if the user's score is high enough to be added to the top ten
    var shouldAddUser = topTen.some(score => newUser.score > score.score);
  
    if (shouldAddUser) {
      // Add the user to the top ten and update local storage
      topTen.push(newUser);
      topTen.sort((a, b) => b.score - a.score);
      topTen = topTen.slice(0, 10);
      localStorage.setItem('topTen', JSON.stringify(topTen));
    }
  
    topTen = JSON.parse(localStorage.getItem('topTen'));
    console.log(topTen);
  
    var scoresContainer = document.querySelector("#scores-section");
    var scoresHTML = '';
  
    // Render the top ten scores
    topTen.forEach(function(score, index) {
      var scoreElement = document.createElement('p');
      scoreElement.textContent = `${index + 1}. ${score.name}: ${score.score}`;
      scoresContainer.appendChild(scoreElement);
    });
  }
  
  // Call the main function
  main();
  
  // Main function to handle the quiz logic
  function main() {
    var j = 0;
  
    function showQuestion() {
      // Display the current question and options
      questions.innerHTML = quiz[j].question;
      option1.innerHTML = quiz[j].optionOne;
      option2.innerHTML = quiz[j].optionTwo;
      option3.innerHTML = quiz[j].optionThree;
    }
  
    function handleOptionClick(event) {
      // Handle the option click event
      var selectedOption = event.target.innerHTML;
  
      if (selectedOption === quiz[j].answer) {
        // If the selected option is correct, update the score and show the correct message
        score = score + 1;
        quizEl.classList.replace("show", "hidden");
        correct.classList.replace("hidden", "show");
      } else {
        // If the selected option is incorrect, show the incorrect message and deduct 5 seconds from the remaining time
        quizEl.classList.replace("show", "hidden");
        incorrect.classList.replace("hidden", "show");
        timeRemaining = timeRemaining - 5;
      }
    }
  
    function handleNextClick(event) {
      event.preventDefault();
      correct.classList.replace("show", "hidden");
      incorrect.classList.replace("show", "hidden");
      j++; // Move to the next question
  
      if (j < quiz.length) {
        // If there are more questions, show the next question
        showQuestion();
        quizEl.classList.replace("hidden", "show");
      } else {
        // If all questions have been answered, calculate the final score and end the quiz
        score = timeRemaining * score;
        endQuiz();
      }
    }
  
    // Show the first question
    showQuestion();
  
    // Add event listeners to the options and next buttons
    option1.addEventListener("click", handleOptionClick);
    option2.addEventListener("click", handleOptionClick);
    option3.addEventListener("click", handleOptionClick);
    next.addEventListener("click", handleNextClick);
    next1.addEventListener("click", handleNextClick);
}
