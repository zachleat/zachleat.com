import "/static/squirminal.js";

let content = document.querySelector("main heading-anchors");
let squirm = document.createElement("squirm-inal");
squirm.setAttribute("speed", "0.6");

Array.from(content.children).forEach(child => {
	squirm.appendChild(child);
});

let affirmation = document.createElement("div");
affirmation.className = "livedemo livedemo-evil";
affirmation.innerHTML = "<em>This animated hallucinatory chatbot output is only emulated. Rather than stealing intellectual property or consuming egregious amounts of public water, the credibility and accuracy in this post has been personally vetted by its lowly human author (every manually typed word).</em>";
content.appendChild(affirmation);

let index = 0;
let max = 3;
setInterval(() => {
	affirmation.style.setProperty("--evil-icon", '"' + Array(index + 1).fill("😈").join("") + '"');
	index = (index + 1) % max;
}, 600);

content.appendChild(squirm);

setTimeout(() => {
	squirm.play();
}, 1000);
