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
	if("closest" in event.target) {
		var toggle = event.target.closest(".toggle");
		if(toggle) {
			var wasPressed = toggle.getAttribute("aria-pressed") === 'true';
			var isPressed = !wasPressed;
			toggle.setAttribute("aria-pressed", String(isPressed));

			if(toggle.classList.contains("toggle-css")) {
				toggleCSS(isPressed);
			} else {
				toggleClassname(isPressed, toggle.getAttribute("data-toggle-class"));
			}
		}
	}
});
