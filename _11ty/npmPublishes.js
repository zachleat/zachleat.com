// Most recent npm publishes from the `neglectByProject` report, newest first, one row per published version, linked to a GitHub release (or the repo).
export function getRecentNpmPublishes(byProject = {}, n = 5, activeOnly = false) {
	return Object.values(byProject).flat()
		.filter(project => project.packageName && project.lastPublish)
		.filter(project => !activeOnly || (!project.isArchived && !project.npmDeprecated))
		.flatMap(project => {
			let publishes = project.recentPublishes?.length ? project.recentPublishes : [{
				version: project.lastPublishVersion,
				date: project.lastPublish,
				releaseUrl: project.releaseUrl,
			}];

			return publishes.map(publish => ({
				...project,
				lastPublish: publish.date,
				lastPublishVersion: publish.version,
				releaseUrl: publish.releaseUrl ?? project.url,
			}));
		})
		.sort((a, b) => b.lastPublish.localeCompare(a.lastPublish))
		.slice(0, n);
}
