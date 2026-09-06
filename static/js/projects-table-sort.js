import { TableSortableElement } from "/static/table-sortable.js";

// table-sortable makes every `thead th` sortable and rebuilds each one as
// `th.textContent = ""` + a button holding the trimmed text. On the projects table that would
// (a) offer a sort on columns that have no meaningful order of their own (Audit, Issues, PRs)
// and (b) throw away the `{% icon %}` SVGs in the headers, since textContent doesn't see them.
// So `_setupAccessibility` is replaced here: only `[data-sortable]` headers get a button, the
// header's existing nodes move into it intact, and `[data-sorted]` starts already marked.
//
// This overrides a private method, hence the exact version pin on the dependency.
class ProjectsTableSortable extends TableSortableElement {
	_setupAccessibility() {
		if (!this._table) {
			return;
		}

		for (let th of this._table.querySelectorAll("thead th[data-sortable]")) {
			let button = document.createElement("button");
			button.type = "button";
			button.append(...th.childNodes);

			// all three indicator states ride along in each button; CSS shows the matching one
			let icons = document.getElementById("table-sort-icons");
			if (icons) {
				button.appendChild(icons.content.cloneNode(true));
			}

			th.appendChild(button);
			th.setAttribute("aria-sort", "none");
		}

		// the rows already arrive in the shipped order, so the column that reflects it is marked
		// rather than re-sorted—no DOM churn, no live-region announcement on load. The component
		// reads the `up` class to pick the next direction, so `down` here means the first click
		// flips to ascending.
		let preSorted = this._table.querySelector("thead th[data-sorted]");
		if (preSorted) {
			let direction = preSorted.getAttribute("data-sorted");
			let column = [...preSorted.parentNode.children].indexOf(preSorted);

			preSorted.setAttribute("aria-sort", direction);
			preSorted.classList.add("active", direction === "ascending" ? "up" : "down");

			let col = this._colgroup?.querySelectorAll("col")[column];
			if (col) {
				col.classList.add("sorted");
			}
		}

		// every sort resets `aria-sort` across all of `thead th`, which would advertise the
		// three columns that have no button as sortable. Clear them again each time.
		this.addEventListener("table-sortable:sort", () => {
			for (let th of this._table.querySelectorAll("thead th:not([data-sortable])")) {
				th.removeAttribute("aria-sort");
			}
		});
	}
}

if (!customElements.get("table-sortable")) {
	customElements.define("table-sortable", ProjectsTableSortable);
}
