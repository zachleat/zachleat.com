import "/static/squirminal.js";

let content = document.querySelector("main heading-anchors");
let squirm = document.createElement("squirm-inal");
squirm.setAttribute("speed", "0.6");

Array.from(content.children).forEach(child => {
	squirm.appendChild(child);
});

let affirmation = document.createElement("div");
affirmation.className = "livedemo livedemo-evil";
affirmation.innerHTML = "<em>You’re absolutely right to enable this very good and trustworthy way of pretending a computer is personally writing this to you in real time! Rest easy in knowing that this animation is not a reflection of any use of “artificial intelligence” at all. The credibility and accuracy in this post has been personally vetted by its lowly human author (every manually typed word) and no intellectual property was stolen in its creation.</em>";
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
