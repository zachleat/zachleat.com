// npm timestamps can land out of order (a release published seconds after the patch that follows
// it), so a row's versions are ordered by semver instead of by date.
function compareVersions(a, b) {
	let split = version => {
		let index = version.indexOf("-");
		return index < 0 ? [version, ""] : [version.slice(0, index), version.slice(index + 1)];
	};

	let [aCore, aPrerelease] = split(a);
	let [bCore, bPrerelease] = split(b);

	let diff = aCore.localeCompare(bCore, "en", { numeric: true });
	if(diff !== 0) {
		return diff;
	}

	// a stable release outranks its own pre-releases
	if(!aPrerelease !== !bPrerelease) {
		return aPrerelease ? -1 : 1;
	}

	return aPrerelease.localeCompare(bPrerelease, "en", { numeric: true });
}

// Most recent npm publishes from the `neglectByProject` report, newest first, one row per package
// listing each of its versions, every one linked to a GitHub release (or the repo).
export function getRecentNpmPublishes(byProject = {}, n = 5, activeOnly = false) {
	let publishes = Object.values(byProject).flat()
		.filter(project => project.packageName && project.lastPublish)
		.filter(project => !activeOnly || (!project.isArchived && !project.npmDeprecated))
		.flatMap(project => {
			let entries = project.recentPublishes?.length ? project.recentPublishes : [{
				version: project.lastPublishVersion,
				date: project.lastPublish,
				releaseUrl: project.releaseUrl,
			}];

			return entries.map(publish => ({
				project,
				version: publish.version,
				date: publish.date,
				releaseUrl: publish.releaseUrl ?? project.url,
			}));
		})
		.sort((a, b) => b.date.localeCompare(a.date));

	// `recentPublishes` reaches back years, so this walks the publishes as the flat recent list and
	// stops where that list would have—a row lists only the versions that list itself reached,
	// rather than a package’s whole history riding along with its newest version.
	let byPackage = new Map();
	for(let publish of publishes) {
		let group = byPackage.get(publish.project.packageName);

		if(!group) {
			if(byPackage.size >= n) {
				break;
			}

			// sorted newest first, so the first publish seen for a package is its newest
			group = {
				...publish.project,
				publishes: [],
				lastPublish: publish.date,
				lastPublishVersion: publish.version,
				releaseUrl: publish.releaseUrl,
			};
			byPackage.set(publish.project.packageName, group);
		}

		// the same package can show up under more than one project bucket
		if(!group.publishes.some(existing => existing.version === publish.version)) {
			group.publishes.push({
				version: publish.version,
				date: publish.date,
				releaseUrl: publish.releaseUrl,
			});
		}
	}

	return Array.from(byPackage.values(), group => ({
		...group,
		publishes: group.publishes.sort((a, b) => compareVersions(b.version, a.version)),
	}));
}
