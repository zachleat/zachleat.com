;(async function() {
	function getScoreClass(score) {
		if(score < .5) {
			return "score score-bad";
		}
		if(score < .9) {
			return "score score-ok";
		}
		return "score score-good";
	}

	let target = document.getElementById("speedlify-lighthouse-score");
	let shorthash = document.querySelector("meta[name='shorthash']");
	if(target && shorthash && shorthash.content) {
		let response = await fetch(`https://speedlify.netlify.app/api/${shorthash.content}.json`);
		let json = await response.json();
		let scores = [];
		scores.push(`<span class="${getScoreClass(json.lighthouse.performance)}">${json.lighthouse.performance * 100}</span>`);
		scores.push(`<span class="${getScoreClass(json.lighthouse.accessibility)}">${json.lighthouse.accessibility * 100}</span>`);
		scores.push(`<span class="${getScoreClass(json.lighthouse.bestPractices)}">${json.lighthouse.bestPractices * 100}</span>`);
		scores.push(`<span class="${getScoreClass(json.lighthouse.seo)}">${json.lighthouse.seo * 100}</span>`);

		let content = [];
		content.push(`<span class="summary">${json.weight.summary}</span>`);
		content.push(`<a href="https://speedlify.netlify.app/zachleat.com/">Lighthouse</a>${scores.join("")}`);
		target.innerHTML = content.join(" ");
	}
})();