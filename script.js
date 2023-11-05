function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
  }
}

const delBtn = document.querySelector("#del");
const acBtn = document.querySelector("#ac");
const dotBtn = document.querySelector("#dot");
const equalBtn = document.querySelector("#equal");
const plusBtn = document.querySelector("#plus");
const minusBtn = document.querySelector("#minus");
const multiplyBtn = document.querySelector("#multiply");
const divisionBtn = document.querySelector("#division");

const numberBtnList = Array.from(document.querySelectorAll(".number-btn"));
numberBtnList.sort((a, b) => a.textContent - b.textContent);
console.log(numberBtnList);

const textField = document.querySelector(".text-field");
let textContentValue = "";

textField.textContent = "0";

document.addEventListener("click", (e) => {
  numberBtnList.forEach((btn, index) => {
    if (e.target === btn) {
      if (
        (index !== 0 || textField.textContent !== "0") &&
        textField.textContent.length < 10
      ) {
        textContentValue += `${index}`;
        textField.textContent = textContentValue;
      }
    }
  });

  switch (e.target) {
    case acBtn:
      textField.textContent = "0";
      textContentValue = "";
  }
});
