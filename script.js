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
      textContentValue = displayNumber(index);
    }
  });

  symbolBtnList.forEach((btn, index) => {
    if (e.target === btn) {
      textContentValue = displaySymbol(index);
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

document.addEventListener("keydown", (e) => {
  console.log(e.key);

  if (+e.key >= 0 && +e.key <= 9) {
    textContentValue = displayNumber(+e.key);
  }

  if (e.key === "Backspace" && e.ctrlKey) {
    textField.textContent = "0";
    textContentValue = "";
  }

  switch (e.key) {
    case "/":
      textContentValue = displaySymbol(0);
      break;
    case "*":
      textContentValue = displaySymbol(1);
      break;
    case "-":
      textContentValue = displaySymbol(2);
      break;
    case "+":
      textContentValue = displaySymbol(3);
      break;
    case "Enter":
      textContentValue = displaySymbol(4);
      break;
    case "Backspace":
      textContentValue = delInput();
      break;
    case ".":
      textContentValue = displayDot();
      break;
  }
});

function displayNumber(index) {
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

function displaySymbol(index) {
  const symbols = ["*", "/", "-", "+"];
  if (symbols.some((item) => textContentValue.includes(item))) {
    if (textContentValue[textContentValue.length - 1] !== " ") {
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
      }
    } else {
      return textContentValue;
    }
  } else {
    switch (index) {
      case 0:
        return displayNumber(" / ");
      case 1:
        return displayNumber(" * ");
      case 2:
        return displayNumber(" - ");
      case 3:
        return displayNumber(" + ");
      case 4:
      default:
        return textContentValue;
    }
  }
}

function displayOperate(symbol) {
  let [a, operator, b] = textContentValue.split(" ");
  textContentValue = `${
    Math.round(operate(a, b, operator) * 10 ** 5) / 10 ** 5
  }${symbol}`;
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
  } else {
    textContentValue = "";
    textField.textContent = "0";
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
    const [_1, _2, b] = textContentValue.split(" ");
    if (!b.includes(".")) textContentValue += ".";
  }
  textField.textContent = textContentValue;
  return textContentValue;
}
