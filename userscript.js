// ==UserScript==
// @name     Hide recommendations on Reddit
// @namespace HideRecommendationsReddit
// @description Removes all recommended posts from communities you aren't subscribed to from your Reddit timeline.
// @match  https://www.reddit.com/
// @match  https://www.reddit.com/r/*
// @version  1.0
// @grant    none
// @run-at document-start
// ==/UserScript==

let x = 0;

function hide_recommendations() {
  // Define the target strings to match
  const targetStrings = [
    "Because you've shown interest in a similar community",
    "Because you've shown interest in this community",
    "Popular near you",
    "Suggested",
  ];

  // Find all elements with the data-testid attribute
  const elements = document.querySelectorAll('[data-testid="post-container"]');
  // Loop through the elements
  for (let element of elements) {
    // Find the <p> element containing the text
    const matchingPs = element.querySelectorAll('p');

    for (let p of matchingPs) {
      for (let targetString of targetStrings) {
        if (p.textContent.includes(targetString)) {
            x++;
          console.log("Userscript Hide Recommendations: Hid", x, "post(s)");
          element.remove();
          break; // No need to check other target strings for this element
        }
      }
    }
  }
};

hide_recommendations();
//Also rerun the code each time document change (i.e new posts are added when user scroll down)
document.addEventListener("DOMNodeInserted", hide_recommendations);
