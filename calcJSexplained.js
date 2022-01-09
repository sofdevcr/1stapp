let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    console.log("we clicked the:", event.target.innerText);
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    console.log("handling symbol...");
    handleSymbol(value);
  } else {
    console.log("handling number...");
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    console.log("buffer is 0");
    buffer = value;
    console.log("and now is:", buffer);
  } else {
    console.log("buffer was not 0 and adds to the screen value");
    buffer += value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      console.log("Equals symbol is processing...");
      if (previousOperator === null) {
        console.log("there is no previous operator!");
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      console.log("deleting the last character of the string in the buffer...");
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  console.log(
    "is doing math and shit!, first convert the buffer to integer",
    value,
    buffer,
    runningTotal
  );
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    console.log("running total was 0");
    runningTotal = intBuffer;
    console.log("but now is:", intBuffer);
  } else {
    console.log("there is some running total:", runningTotal);
    flushOperation(intBuffer);
  }

  console.log("previous operator is assigned here with value:", value);
  previousOperator = value;

  buffer = "0";
}

function flushOperation(intBuffer) {
  console.log("we are flushing the operation", previousOperator);
  if (previousOperator === "+") {
    console.log("we are adding");
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    console.log("we are substracting");
    runningTotal -= intBuffer;
  } else if (previousOperator === "x") {
    console.log("we are multipling");
    runningTotal *= intBuffer;
  } else {
    console.log("we are dividing");
    runningTotal /= intBuffer;
  }
  console.log("what the hell did you do with my total?:", runningTotal);
}

function rerender() {
  console.log("Im re-render with buffer:", buffer);
  console.log("previousOperator", previousOperator);
  console.log("runningTotal", runningTotal);
  screen.innerText = buffer;
}
