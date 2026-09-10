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

function prefersDark() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function isAutoTheme() {
	try {
		return !localStorage.getItem("theme");
	} catch(e) {
		return true;
	}
}

function currentThemeMode() {
	if(isAutoTheme()) {
		return prefersDark() ? "dark" : "light";
	}
	return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

// Auto (pressed): follows the OS preference. Off: forces the opposite of the OS preference.
function setAutoTheme(auto) {
	if(auto) {
		document.documentElement.removeAttribute("data-theme");
		try {
			localStorage.removeItem("theme");
		} catch(e) {}
	} else {
		let mode = prefersDark() ? "light" : "dark";
		document.documentElement.setAttribute("data-theme", mode);
		try {
			localStorage.setItem("theme", mode);
		} catch(e) {}
	}
}

function syncThemeToggle(toggle) {
	let auto = isAutoTheme();
	let mode = currentThemeMode();
	let autoMode = prefersDark() ? "dark" : "light";
	toggle.setAttribute("aria-pressed", String(auto));
	toggle.setAttribute("data-mode", mode);

	let modeLabel = mode === "dark" ? "Dark" : "Light";
	toggle.setAttribute("aria-label", modeLabel + " theme" + (auto ? ", following your system preference" : ""));

	let wrap = toggle.closest(".theme-toggle");
	if(wrap) {
		wrap.querySelectorAll("[data-theme-side]").forEach(function(side) {
			let side_mode = side.getAttribute("data-theme-side");
			side.classList.toggle("active", side_mode === mode);
			let base = side_mode === "dark" ? "Dark" : "Light";
			// (auto) always marks the OS-preferred side, whether or not it's the one currently showing
			side.textContent = base + (side_mode === autoMode ? " (auto)" : "");
		});
	}
}

document.querySelectorAll(".toggle-theme").forEach(syncThemeToggle);

// Re-render the theme toggle(s) whenever the OS preference itself changes, live
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function() {
	document.querySelectorAll(".toggle-theme").forEach(syncThemeToggle);
});

document.addEventListener("click", function(event) {
	if(!("closest" in event.target)) {
		return;
	}

	// The theme toggle's flanking "Dark"/"Light" labels aren't the button itself,
	// but a click anywhere in that wrapper should still act on it.
	let toggle = event.target.closest(".toggle") || event.target.closest(".theme-toggle")?.querySelector(".toggle-theme");
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

	// for Theme
	if(toggle.classList.contains("toggle-theme")) {
		setAutoTheme(isPressed);
		syncThemeToggle(toggle);
	}

	if(toggle.getAttribute("id")?.startsWith("ai-mode")) {
		// In sidebar and embedded in the blog post
		Array.from(document.querySelectorAll("[id^='ai-mode']")).forEach(el => {
			el.setAttribute("aria-pressed", true);
			el.setAttribute("disabled", "")
		});
		import("/static/js/ai-mode.js");
	}
});
