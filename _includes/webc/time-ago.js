class TimeAgo extends HTMLElement {
	static tagName = "time-ago";

  connectedCallback() {
    // update the date if the build is old
    let dateAttr = this.getAttribute("data-date");
    let diff = Date.now() - Date.parse(dateAttr);
    let years = Math.floor( diff / (1000 * 60 * 60 * 24 * 365 ) );
    let days = Math.floor( (diff / (1000 * 60 * 60 * 24)) % 365 );
    let hours = Math.round( (diff / (1000 * 60 * 60)) % 24 );

    let output = [];

    if( years > 0 ) {
      output.push(years + " year" + (years !== 1 ? "s" : ""));
    }
    if( days > 0 ) {
      output.push(days + " day" + (days !== 1 ? "s" : ""));
    }
    if( hours > 0 && dateAttr.indexOf("00:00:00") === -1 ) {
      output.push(hours + " hour" + (hours !== 1 ? "s" : ""));
    }

    this.innerHTML = output.join(", ");
  }
}

if(Date.parse && "customElements" in window) {
  window.customElements.define(TimeAgo.tagName, TimeAgo);
}
