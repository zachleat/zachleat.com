const fastglob = require("fast-glob");
module.exports = async function() {
	let fonts = await fastglob.async("./css/fonts/lato/2.0/*.woff2");

	fonts = fonts.map(function(value) {
		return "/web" + value.substr(1);
	});

	return {
		fonts: fonts
	};
};