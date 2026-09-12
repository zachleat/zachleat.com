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

// Auto follows the OS preference, otherwise force the opposite of the OS preference.
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

// The button is named for what it will do next, so it has no pressed state.
function syncThemeButton(button) {
	let mode = currentThemeMode();
	let nextMode = mode === "dark" ? "light" : "dark";
	button.setAttribute("data-mode", mode);
	button.querySelector(".theme-button-text").textContent = `Use ${nextMode} theme${isAutoTheme() ? "" : " (auto)"}`;
}

function announceTheme(button) {
	let status = button.parentNode.querySelector(".theme-button-status");
	if(status) {
		status.textContent = `${currentThemeMode() === "dark" ? "Dark" : "Light"} theme on${isAutoTheme() ? ", matching your system" : ""}.`;
	}
}

document.querySelectorAll(".theme-button").forEach(syncThemeButton);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function() {
	document.querySelectorAll(".theme-button").forEach(syncThemeButton);
});

document.addEventListener("click", function(event) {
	if(!("closest" in event.target)) {
		return;
	}

	let themeButton = event.target.closest(".theme-button");
	if(themeButton) {
		setAutoTheme(!isAutoTheme());
		syncThemeButton(themeButton);
		announceTheme(themeButton);
		return;
	}

	let toggle = event.target.closest(".toggle");
	if(!toggle) {
		return;
	}
	let isChecked = toggle.getAttribute("aria-checked") !== "true";
	toggle.setAttribute("aria-checked", String(isChecked));

	// for CSS
	if(toggle.classList.contains("toggle-css")) {
		toggleCSS(isChecked);
	}

	// for Web Fonts
	let className = toggle.getAttribute("data-toggle-class");
	if(className) {
		toggleClassname(isChecked, className);
	}

	if(toggle.getAttribute("id")?.startsWith("ai-mode")) {
		// In sidebar and embedded in the blog post
		Array.from(document.querySelectorAll("[id^='ai-mode']")).forEach(el => {
			el.setAttribute("aria-checked", true);
			el.setAttribute("disabled", "")
		});
		import("/static/js/ai-mode.js");
	}
});
