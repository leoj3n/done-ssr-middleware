var assert = require("assert");
var path = require("path");
var request = require("request");
var express = require("express");
var nock = require("nock");

var ssr = require("../lib/index");

describe("Using can-fixture", function(){
	this.timeout(10000);

	before(function(done){
		var root = path.join(__dirname, "tests");
		var app = express()
			.use("/", express.static(root))
			.use("/", ssr({
				config: path.join(root, "package.json") + "!npm",
				main: "fixtures/index.stache!done-autorender"
			}));

		this.scope = nock("http://www.example.org")
			.get("/stuff")
			.delay(20)
			.reply(
			function (uri, requestBody) {
				return [
					200,
					'["one","two"]'
				];
			}
		);

		var server = this.server = app.listen(5500);

		server.on("listening", function(){
			done();
		});
	});

	after(function(done){
		nock.restore();
		this.server.close(done);
	});


	it("Returns a response", function(done){
			request('http://localhost:5500', function(err, res, body) {
				console.log("BODY:", body)
				assert.equal(res.statusCode, 200);
				done();
			});
	});
});
