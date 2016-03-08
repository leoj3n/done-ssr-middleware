var copy = require("copy-dir").sync;

var modules = [
	"can",
	"can-simple-dom",
	"micro-location",
	"simple-html-tokenizer",
	"jquery",
	"done-autorender",
	"can-zone"
];

modules.forEach(function(name){
	copy("node_modules/" + name, "test/tests/node_modules/" + name);
});
