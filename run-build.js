import Eleventy from "@11ty/eleventy";

process.env.PRODUCTION_BUILD="true";
process.env.ELEVENTY_FEATURES="webmentions";

process.on('uncaughtException', (e) => console.error('uncaughtException', e))
process.on('unhandledRejection', (e) => console.error('unhandledRejection', e))
process.on("rejectionHandled", (e) => console.error('rejectionHandled', e));

let elev = new Eleventy();
await elev.write();
