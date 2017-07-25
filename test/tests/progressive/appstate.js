var loader = require("@loader");
var Map = require("can-map");
require("can-map-define");

debugger;

module.exports = Map.extend({
	define: {
		loader: {
			serialize: false,
			value: loader
		}
	},
	throwError: function() {
		throw Error('Something went wrong');
	}
});
