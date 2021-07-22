const Random_quote_API_URL = "http://api.quotable.io/random";
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

//to check and compare quotedisplay and quoteInput
quoteInput.addEventListener("input", () => {
  const arrayQuote = quoteDisplay.querySelectorAll("span");
  const arrayValue = quoteInput.value.split("");

  let correct = true;

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  // for new quote after every things goes correct
  if (correct) renderNewQuote();
});

//fetching quote from api link
function getRandomQuote() {
  return fetch("http://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();

  //making quotedisplay element empty and than spliting it by color
  //  each character to track each characters and than can  change
  // or count it or can compare it with quoteinput element
  quoteDisplay.innerHTML = ""; //making empty
  quote.split("").forEach((character) => {
    //by using split function and for each for every character
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplay.appendChild(characterSpan);
  });

  quoteInput.value = null;
  startTimer(); //calling timer function here
}

// code for updating the timer
let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = getTimertime();
  }, 1000);
}

function getTimertime() {
  return Math.floor((new Date() - startTime) / 1000);
}
renderNewQuote();
