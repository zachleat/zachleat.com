if( typeof IntersectionObserver !== "undefined" && "forEach" in NodeList.prototype ) {
	var observer = new IntersectionObserver(function(changes) {
		changes.forEach(function(change) {
			if ("connection" in navigator && navigator.connection.saveData === true) {
				// do nothing
			} else if(change.isIntersecting) {
				change.target.setAttribute("src", change.target.getAttribute("data-src"));
				observer.unobserve(change.target);
			}
		});
	});

	document.querySelectorAll("img[data-src]").forEach(function(img) {
		observer.observe(img);
	});
}
