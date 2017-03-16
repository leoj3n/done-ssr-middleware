var loader = require("@loader");
var Map = require("can-map");

module.exports = Map.extend({
	loader: loader,
	throwError: function() {
		throw Error('Something went wrong');
	}
});
