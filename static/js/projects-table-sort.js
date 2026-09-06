import { TableSortableElement } from "/static/table-sortable.js";

// table-sortable makes every `thead th` sortable and rebuilds each one as
// `th.textContent = ""` + a button holding the trimmed text. On the projects table that would
// (a) offer a sort on columns that have no meaningful order (#, Neglect—the table is already
// sorted by Neglect—and Audit) and (b) throw away the `{% icon %}` SVGs in the headers, since
// textContent doesn't see them. So `_setupAccessibility` is replaced here: only `[data-sortable]`
// headers get a button, and the header's existing nodes move into it intact.
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

			th.appendChild(button);
			th.setAttribute("aria-sort", "none");
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
