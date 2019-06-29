if( typeof IntersectionObserver !== "undefined" && "forEach" in NodeList.prototype ) {
	var observer = new IntersectionObserver(function(changes) {
		if ("connection" in navigator && navigator.connection.saveData === true) {
			return;
		}

		changes.forEach(function(change) {
			if(change.isIntersecting) {
				change.target.setAttribute("src", change.target.getAttribute("data-src"));
				change.target.addEventListener("error", function() {
					change.target.parentNode.classList.add("img-error");
					// change.target.parentNode.removeChild(change.target);
				}, false);
				observer.unobserve(change.target);
			}
		});
	});

	document.querySelectorAll("img[data-src]").forEach(function(img) {
		observer.observe(img);
	});
}
