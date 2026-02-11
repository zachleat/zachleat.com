function toggleCSS(enable) {
	var styles = Array.from(document.querySelectorAll("style"));
	for(var j = 0, k = styles.length; j<k; j++) {
		styles[j].disabled = !enable;
	}
	var stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
	for(var j = 0, k = stylesheets.length; j<k; j++) {
		stylesheets[j].disabled = !enable;
	}
}

function toggleClassname(enable, className) {
	document.documentElement.classList.toggle(className, !enable);
}

document.addEventListener("click", function(event) {
	if(!("closest" in event.target)) {
		return;
	}

	let toggle = event.target.closest(".toggle");
	if(!toggle) {
		return;
	}
	let wasPressed = toggle.getAttribute("aria-pressed") === 'true';
	let isPressed = !wasPressed;
	toggle.setAttribute("aria-pressed", String(isPressed));

	// for CSS
	if(toggle.classList.contains("toggle-css")) {
		toggleCSS(isPressed);
	}

	// for Web Fonts
	let className = toggle.getAttribute("data-toggle-class");
	if(className) {
		toggleClassname(isPressed, className);
	}

	if(toggle.getAttribute("id").startsWith("ai-mode")) {
		// In sidebar and embedded in the blog post
		Array.from(document.querySelectorAll("[id^='ai-mode']")).forEach(el => {
			el.setAttribute("aria-pressed", true);
			el.setAttribute("disabled", "")
		});
		import("/static/js/ai-mode.js");
	}
});
