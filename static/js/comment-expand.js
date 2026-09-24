// Clamped comment text expands on click
const CLAMPED = "static-comments-msg-clamped";
const EXPANDED = "static-comments-msg-expanded";

function markClamped(root = document) {
	for(let msg of root.querySelectorAll(`.static-comments-msg:not(.${EXPANDED})`)) {
		msg.classList.toggle(CLAMPED, msg.scrollHeight > msg.clientHeight + 1);
	}
}

markClamped();

// Messages inside closed <details> have no size until opened
document.addEventListener("toggle", event => {
	if(event.target.open && event.target.closest("#comments")) {
		markClamped(event.target);
	}
}, true);

document.addEventListener("click", event => {
	if(window.getSelection()?.toString()) {
		return;
	}
	let msg = event.target.closest(`.${CLAMPED}`);
	if(msg) {
		msg.classList.replace(CLAMPED, EXPANDED);
	}
});
