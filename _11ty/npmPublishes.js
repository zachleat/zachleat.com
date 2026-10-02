// Most recent npm publishes from the `neglectByProject` report, newest first, linked to a GitHub release (or the repo).
export function getRecentNpmPublishes(byProject = {}, n = 5, activeOnly = false) {
	return Object.values(byProject).flat()
		.filter(project => project.packageName && project.lastPublish)
		.filter(project => !activeOnly || (!project.isArchived && !project.npmDeprecated))
		.sort((a, b) => b.lastPublish.localeCompare(a.lastPublish))
		.slice(0, n)
		.map(project => ({
			...project,
			releaseUrl: project.releaseUrl ?? project.url,
		}));
}
