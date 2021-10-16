const numberButtons = document.querySelectorAll("[data-numbers]");
const operatorButtons = document.querySelectorAll("[data-operators]");
const decimalButton = document.querySelector("[data-decimal]");
const backspaceButton = document.querySelector("[data-backspace]");
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
decimalButton.onclick = () => addDecimalPoint();
backspaceButton.onclick = () => backspace();
clearButton.onclick = () => clear();
window.addEventListener("keydown", keyboardFunctionality);

// FUNCTIONS

function keyboardFunctionality(e) {
  if (e.key >= 0 && e.key <= 9) updateNumber(e.key);
  if (e.key === ".") addDecimalPoint();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clear();
  if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "%" ||
    e.key === "^" ||
    e.key === "/" ||
    e.key === "*"
  )
    updateOperator(e.key);
}

function updateNumber(number) {
  userInput.textContent += number;
}

function updateOperator(operator) {
  let lastChar = userInput.textContent.trim().slice(-1);
  if (userInput.textContent === "" && operator !== "-") {
    firstNumber = 0;
    userInput.textContent = firstNumber + " " + operator + " ";
    operatorIsThere = true;
  } else if (userInput.textContent === "" && operator === "-") {
    userInput.textContent = operator;
  } else if (lastChar.match(/[+*^/-]/)) {
    userInput.textContent =
      userInput.textContent.slice(0, -2) + " " + operator + " ";
  } else if (operatorIsThere == true) {
    secondNumber = userInput.textContent.split(" ").pop();
    currentOperator = userInput.textContent
      .substring(
        userInput.textContent.indexOf(" ") + 1,
        userInput.textContent.lastIndexOf(" ")
      )
      .trim();
    result = calculate(currentOperator, firstNumber, secondNumber);
    result = Math.round(result * 100) / 100;
    displayResult.textContent = result;
    resultIsThere = true;
    updateDisplay(result, operator);
  } else if (operatorIsThere == false) {
    firstNumber = userInput.textContent;
    userInput.textContent = userInput.textContent + " " + operator + " ";
    operatorIsThere = true;
  }
}

function updateDisplay(result, operator) {
  resultIsThere == true ? (firstNumber = result) : false;
  userInput.textContent = firstNumber + " " + operator + " ";
  resultIsThere = false;
}

function addDecimalPoint() {
  if (userInput.textContent === "") updateNumber("0");
  if (firstNumber === "" && userInput.textContent.includes(".")) return;
  if (firstNumber !== "") {
    secondNumber = userInput.textContent.split(" ").pop();
    if (secondNumber === "") updateNumber("0");
    if (secondNumber.includes(".")) return;
  }
  userInput.textContent += ".";
}

function backspace() {
  let lastChar = userInput.textContent.trim().slice(-1);
  userInput.textContent = userInput.textContent.trim().slice(0, -1);
  if (lastChar.match(/[+*/-]/)) {
    userInput.textContent = userInput.textContent.trim();
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
    case "^":
      return Math.pow(a, b);
    default:
      return "calculate problem";
  }
}
