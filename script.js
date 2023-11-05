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
      break;
    case delBtn:
      textContentValue = delInput();
      break;
    case dotBtn:
      textContentValue = displayDot();
      break;
  }
});

function displayNumber(btn, index) {
  if (textField.textContent === "Infinity" || textField.textContent === "NaN") {
    textField.textContent = "0";
    textContentValue = "";
  }

  if (typeof index === "string" && textField.textContent === "0") {
    textContentValue = `0${index}`;
    textField.textContent = textContentValue;
    return textContentValue;
  } else if (index !== 0 || textField.textContent !== "0") {
    textContentValue += `${index}`;
    textField.textContent = textContentValue;
    return textContentValue;
  } else {
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
  }
}

function displayOperate(symbol) {
  let [a, operator, b] = textContentValue.split(" ");
  textContentValue = `${operate(a, b, operator)}${symbol}`;
  textField.textContent = textContentValue;
  return textContentValue;
}

function delInput() {
  let toErase = textField.textContent;
  if (toErase.length > 1) {
    if (toErase.slice(-1) === " ") {
      textContentValue = toErase.slice(0, toErase.length - 3);
    } else {
      textContentValue = toErase.slice(0, toErase.length - 1);
    }
    textField.textContent = textContentValue;
  }
  return textContentValue;
}

function displayDot() {
  const symbols = ["*", "/", "-", "+"];
  if (!symbols.some((item) => textContentValue.includes(item))) {
    if (!textContentValue.includes(".")) {
      if (textField.textContent === "0") {
        textContentValue = "0.";
      } else {
        textContentValue += ".";
      }
    }
  } else {
    const [$1, $2, b] = textContentValue.split(" ");
    if (!b.includes(".")) textContentValue += ".";
  }
  textField.textContent = textContentValue;
  return textContentValue;
}
