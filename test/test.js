var mochas = require("spawn-mochas");

mochas([
	"basics.js",
	"fixture.js"
], __dirname);
