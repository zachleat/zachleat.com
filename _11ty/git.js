// Temporary until import { getCreatedTimestamp } from "@11ty/eleventy/utils/git";

import { spawn } from "node:child_process";

export function memoize(callback, options = {}) {
	let { bench, name } = options;
	let cache = new Map();

	return (...args) => {
		// Only supports single-arg functions for now.
		if (args.filter(Boolean).length > 1) {
			bench?.get(`(count) ${name} Not valid for memoize`).incrementCount();
			return callback(...args);
		}

		let [cacheKey] = args;

		if (!cache.has(cacheKey)) {
			cache.set(cacheKey, callback(...args));

			bench?.get(`(count) ${name} memoize miss`).incrementCount();

			return cache.get(cacheKey);
		}

		bench?.get(`(count) ${name} memoize hit`).incrementCount();

		return cache.get(cacheKey);
	};
}

export function withResolvers() {
	if ("withResolvers" in Promise) {
		return Promise.withResolvers();
	}

	let resolve;
	let reject;
	let promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return { promise, resolve, reject };
}

export function spawnAsync(command, args, options) {
	let { promise, resolve, reject } = withResolvers();

	const cmd = spawn(command, args, options);
	let res = [];
	cmd.stdout.on("data", (data) => {
		res.push(data.toString("utf8"));
	});

	let err = [];
	cmd.stderr.on("data", (data) => {
		err.push(data.toString("utf8"));
	});

	cmd.on("close", (code) => {
		if (err.length > 0) {
			reject(err.join("\n"));
		} else if (code === 1) {
			reject("Internal error: process closed with error exit code.");
		} else {
			resolve(res.join("\n"));
		}
	});

	return promise;
}

const getCreatedTimestamp = memoize(async function (filePath) {
	try {
		let timestamp = await spawnAsync(
			"git",
			// Formats https://www.git-scm.com/docs/git-log#_pretty_formats
			// %at author date, UNIX timestamp
			["log", "--diff-filter=A", "--follow", "-1", "--format=%at", filePath],
		);
		// parseInt removes trailing \n
		return parseInt(timestamp, 10) * 1000;
	} catch (e) {
		// do nothing
	}
});

const getUpdatedTimestamp = memoize(async function (filePath) {
	try {
		let timestamp = await spawnAsync(
			"git",
			// Formats https://www.git-scm.com/docs/git-log#_pretty_formats
			// %at author date, UNIX timestamp
			["log", "-1", "--format=%at", filePath],
		);
		return parseInt(timestamp, 10) * 1000;
	} catch (e) {
		// do nothing
	}
});

export { getCreatedTimestamp, getUpdatedTimestamp };
