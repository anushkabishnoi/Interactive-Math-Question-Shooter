const problemElement = document.querySelector(".problem");
const ourForm = document.querySelector(".our-form");
const ourField = document.querySelector(".our-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");
const resetButton = document.querySelector(".reset-button");

//for score counting
//(its an object:))
let state = {
  score: 0,
  wrongAnswers: 0,
};

//changes UI
//updates html page with random numbers generated
function updateProblem() {
  state.currentProblem = generateProblem();
  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`;
  ourField.value = "";
  ourField.focus();
}

updateProblem();

//1st (innermost function)
//generates all 3 random numbers
//max is maxm number entered
//(like if range is 1-10 or 1-3 etc)
function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}

//generates 2 random numbers between 1 to 10
//also generates number b/w 1-3
//for selecting random operator
//(from operator array)
function generateProblem() {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ["+", "-", "x"][generateNumber(2)],
  };
}

//form
//1st arg -> event listening for
//2nd arg -> funcn to run on event trigger
ourForm.addEventListener("submit", handleSubmit);

//to handle form funcn
//e when logged, gives submitEvent
function handleSubmit(e) {
  //prevent default funcn prevents
  //page reload everytime submit is hit
  e.preventDefault();

  //correct answer checking funcn
  let correctAnswer;
  const prob = state.currentProblem;

  //checks for +
  //if no 1 generated + no 2 generated is same
  //as user input
  if (prob.operator == "+") correctAnswer = prob.numberOne + prob.numberTwo;
  if (prob.operator == "-") correctAnswer = prob.numberOne - prob.numberTwo;
  if (prob.operator == "x") correctAnswer = prob.numberOne * prob.numberTwo;

  if (parseInt(ourField.value, 10) === correctAnswer) {
    //alert("great work!")
    state.score++;
    pointsNeeded.textContent = 10 - state.score;
    updateProblem();
    renderProgressBar();
  } else {
    //alert("oops! try again!")
    state.wrongAnswers++;
    mistakesAllowed.textContent = 2 - state.wrongAnswers;
    problemElement.classList.add("animate-wrong");
    setTimeout(() => problemElement.classlist.remove("animate-wrong"), 451);
  }
  checkLogic();
}

//win/lose condition checker
function checkLogic() {
  //on winning
  if (state.score === 10) {
    endMessage.textContent = "Congrats! You Won!!!";
    document.body.classList.add("overlay-is-open");
    setTimeout(() => resetButton.focus(), 331);
  }
  //on losing
  if (state.wrongAnswers === 3) {
    endMessage.textContent = "Better luck next time! :(";
    document.body.classList.add("overlay-is-open");
    setTimeout(() => resetButton.focus(), 331);
  }
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
  document.body.classList.remove("overlay-is-open");
  updateProblem();
  state.score = 0;
  state.wrongAnswers = 0;
  pointsNeeded.textContent = 10;
  mistakesAllowed.textContent = 2;
  renderProgressBar();
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`;
}

//custom theme part
//------------------------------------------------------------------

document.querySelector(".btn1").addEventListener("click", () => {
  document.body.classList.remove("twilight");
  document.body.classList.remove("forest");
  document.body.classList.remove("sunset");
  document.body.classList.remove("goldenHues");
  document.body.classList.toggle("pastel");
  document.querySelector("button").classList.add("btn-custom");
  document.querySelector('input').classList.add("input-box")
});

document.querySelector(".btn2").addEventListener("click", () => {
  document.body.classList.remove("forest");
  document.body.classList.remove("sunset");
  document.body.classList.remove("goldenHues");
  document.body.classList.toggle("twilight");
  document.querySelector("button").classList.add("btn-custom");
  document.querySelector('input').classList.add("input-box")
});

document.querySelector(".btn3").addEventListener("click", () => {
  document.body.classList.remove("sunset");
  document.body.classList.remove("goldenHues");
  document.body.classList.toggle("forest");
  document.querySelector("button").classList.add("btn-custom");
  document.querySelector('input').classList.add("input-box")
});

document.querySelector(".btn4").addEventListener("click", () => {
  document.body.classList.remove("goldenHues");
  document.body.classList.toggle("sunset");
  document.querySelector("button").classList.add("btn-custom");
  document.querySelector('input').classList.add("input-box")
});

document.querySelector(".btn5").addEventListener("click", () => {
  document.body.classList.toggle("goldenHues");
  document.querySelector("button").classList.add("btn-custom");
  document.querySelector('input').classList.add("input-box")
});

//custom button theme change
// document.querySelector("button").classList.toggle('btn-custom')
// document.querySelector('input').classList.toggle("input-box")
//----------------------------------------------------------------------------
