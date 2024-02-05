const replace = require("replace-in-file");

const dateReplace = replace.sync({
    files: [`src/Version.json`],
    from: /\{date\}/g,
    to: new Date().toISOString(),
    countMatches: true
});

console.log(dateReplace);