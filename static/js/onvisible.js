class OnVisible extends HTMLElement {
	static tagName = "on-visible";

	static register(tagName) {
		if(!("customElements" in globalThis)) {
			return;
		}
		customElements.define(tagName || this.tagName, this);
	}

	static classes = {
		visible: "onvisible"
	};

	static css = `:host { display: block; }`;

	connectedCallback() {
		// https://caniuse.com/mdn-api_cssstylesheet_replacesync
		if(!("IntersectionObserver" in globalThis) || this.shadowRoot || !("replaceSync" in CSSStyleSheet.prototype)) {
			return;
		}

		let root = this.attachShadow({ mode: "open" });
		let sheet = new CSSStyleSheet();
		sheet.replaceSync(OnVisible.css);
		root.adoptedStyleSheets = [sheet];
		let slot = document.createElement("slot");
		root.appendChild(slot);

		let observer = new IntersectionObserver(entries => {
			for(let entry of entries) {
				if(entry.isIntersecting) {
					this.classList.add(OnVisible.classes.visible);
				} else {
					this.classList.remove(OnVisible.classes.visible);
				}
			}
		},
		{
			threshold: .001 // .1% of element must be visible
		});

		observer.observe(this);
	}
}

OnVisible.register();
