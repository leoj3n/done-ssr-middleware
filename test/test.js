var mochas = require("spawn-mochas");

mochas([
	"basics.js",
	"fixture.js",
	"production.js"
], __dirname);
