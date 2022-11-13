// I may have to replace the following code

// async function getQuotes() {
//   ...
//   const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
//   try {
//   ...

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//  Show New Quote
function newQuote() {
  loading();
  //  Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  // console.log(quote);
  // Check if Author field is black and replace it w/ Unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // set Quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

//  Get Quotes from API
async function getQuotes() {
  loading();
  // const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes[12]);
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//  Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//  On Load
getQuotes();
// newQuote();

// loading();
