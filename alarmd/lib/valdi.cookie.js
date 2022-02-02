YAHOO.namespace( 'valdi.cookie' );
// taken from the legendary ppk http://www.quirksmode.org/js/cookies.html
YAHOO.valdi.cookie.create = function(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
};
YAHOO.valdi.cookie.read = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};
YAHOO.valdi.cookie.erase = function(name) {
	YAHOO.valdi.cookie.create(name,"",-1);
};