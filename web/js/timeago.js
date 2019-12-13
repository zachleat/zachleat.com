if(Date.parse && "getElementsByClassName" in document) {
    // update the date if the build is old
    var els = document.getElementsByClassName("timeago");
    for(var j = 0, k = els.length; j<k; j++) {
        var el = els[j];
        var dateAttr = el.getAttribute("data-date");
        var diff = Date.now() - Date.parse(dateAttr);
        var years = Math.floor( diff / (1000 * 60 * 60 * 24 * 365 ) );
        var days = Math.floor( (diff / (1000 * 60 * 60 * 24)) % 365 );
        var hours = Math.round( (diff / (1000 * 60 * 60)) % 24 );

        var output = [];
        if( years > 0 ) {
            output.push(years + " year" + (years !== 1 ? "s" : ""));
        }
        if( days > 0 ) {
            output.push(days + " day" + (days !== 1 ? "s" : ""));
        }
        if( hours > 0 && dateAttr.indexOf("00:00:00") === -1 ) {
            output.push(hours + " hour" + (hours !== 1 ? "s" : ""));
        }

        el.innerHTML = output.join(", ");
    }
}