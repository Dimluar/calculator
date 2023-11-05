function add(a, b) {
  return +a + +b;
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

const numberBtnList = Array.from(document.querySelectorAll(".number-btn"));
numberBtnList.sort((a, b) => a.textContent - b.textContent);

const symbolBtnList = Array.from(document.querySelectorAll(".symbol-btn"));
[symbolBtnList[3], symbolBtnList[4]] = [symbolBtnList[4], symbolBtnList[3]];

const textField = document.querySelector(".text-field");
let textContentValue = "";

textField.textContent = "0";

document.addEventListener("click", (e) => {
  numberBtnList.forEach((btn, index) => {
    if (e.target === btn) {
      textContentValue = displayNumber(btn, index);
    }
  });

  symbolBtnList.forEach((btn, index) => {
    if (e.target === btn) {
      textContentValue = displaySymbol(btn, index);
    }
  });

  switch (e.target) {
    case acBtn:
      textField.textContent = "0";
      textContentValue = "";
  }
});

function displayNumber(btn, index) {
  if (typeof index === "string" && textField.textContent === "0") {
    textContentValue = `0${index}`;
    textField.textContent = textContentValue;
    return textContentValue;
  } else if (index !== 0 || textField.textContent !== "0") {
    textContentValue += `${index}`;
    textField.textContent = textContentValue;
    return textContentValue;
  }
}

function displaySymbol(btn, index) {
  const symbols = ["*", "/", "-", "+"];
  if (symbols.some((item) => textContentValue.includes(item))) {
    switch (index) {
      case 0:
        return displayOperate(" / ");
        break;
      case 1:
        return displayOperate(" * ");
        break;
      case 2:
        return displayOperate(" - ");
        break;
      case 3:
        return displayOperate(" + ");
        break;
      case 4:
        return displayOperate("");
        break;
    }
  }

  switch (index) {
    case 0:
      return displayNumber(btn, " / ");
    case 1:
      return displayNumber(btn, " * ");
    case 2:
      return displayNumber(btn, " - ");
    case 3:
      return displayNumber(btn, " + ");
    case 4:
      return textContentValue;
      break;
  }
}

function displayOperate(symbol) {
  let [a, operator, b] = textContentValue.split(" ");
  textContentValue = `${operate(a, b, operator)}${symbol}`;
  textField.textContent = textContentValue;
  return textContentValue;
}
