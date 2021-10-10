const numberButtons = document.querySelectorAll("[data-numbers]");
const operatorButtons = document.querySelectorAll("[data-operators]");
const decimalButton = document.querySelector("[data-decimal]");
const backspaceButton = document.querySelector("[data-backspace]");
const equalButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const userInput = document.getElementById("user-input");
const displayResult = document.getElementById("result");

// VARIABLES
let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let operatorIsThere = false;
let result = "";
let resultIsThere = false;

// EVENTS
numberButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    updateNumber(button.textContent);
  })
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    updateOperator(button.textContent);
  })
);
backspaceButton.onclick = () => backspace();
clearButton.onclick = () => clear();
// FUNCTIONS
function updateNumber(number) {
  userInput.textContent += number;
}

function updateOperator(operator) {
  let lastChar = userInput.textContent.trim().slice(-1);
  if (userInput.textContent === "" && operator !== "-") {
    console.log(firstNumber);
    firstNumber = 0;
    userInput.textContent = firstNumber + " " + operator + " ";
    operatorIsThere = true;
  } else if (userInput.textContent === "" && operator === "-") {
    userInput.textContent = operator;
  } else if (lastChar.match(/[+*/-]/)) {
    userInput.textContent =
      userInput.textContent.slice(0, -2) + " " + operator + " ";
  } else if (operatorIsThere == true) {
    secondNumber = userInput.textContent.split(" ").pop();
    // currentOperator = userInput.textContent.split(" ").slice(1, 2);
    // currentOperator = currentOperator[0];
    currentOperator = userInput.textContent
      .substring(
        userInput.textContent.indexOf(" ") + 1,
        userInput.textContent.lastIndexOf(" ")
      )
      .trim();
    console.log(secondNumber);
    console.log(currentOperator);
    result = calculate(currentOperator, firstNumber, secondNumber);
    displayResult.textContent = result;
    resultIsThere = true;
    updateDisplay(result, operator);
  } else if (operatorIsThere == false) {
    firstNumber = userInput.textContent;
    userInput.textContent = userInput.textContent + " " + operator + " ";
    console.log(Number(firstNumber));
    operatorIsThere = true;
  }
}

function updateDisplay(result, operator) {
  resultIsThere == true ? (firstNumber = result) : false;
  userInput.textContent = firstNumber + " " + operator + " ";
  resultIsThere = false;
}

function backspace() {
  let lastChar = userInput.textContent.trim().slice(-1);
  userInput.textContent = userInput.textContent.trim().slice(0, -1);
  if (lastChar.match(/[+*/-]/)) {
    operatorIsThere = false;
    currentOperator = "";
  }
}

function clear() {
  userInput.textContent = "";
  displayResult.textContent = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  result = "";
  operatorIsThere = false;
  resultIsThere = false;
}

function calculate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? a : a / b;
    default:
      return "calculate problem";
  }
}

// ADD POINT
// ADD BACKSPACE
// ADD CLEAR
// ADD KEYBOARD FUNC.
// ADD EQUALS OPERATOR
