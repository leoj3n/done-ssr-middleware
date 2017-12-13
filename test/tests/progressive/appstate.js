var loader = require("@loader");
var DefineMap = require("can-define/map/map");

module.exports = DefineMap.extend({
	statusMessage: "string",
	loader: {
		serialize: false,
		value: () => loader
	},
	throwError: function() {
		throw Error('Something went wrong');
	}
});
