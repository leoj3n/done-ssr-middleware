var assert = require('assert');
var path = require('path');
var request = require('request');
var express = require('express');
var stealTools = require('steal-tools');

var ssr = require('../lib/index');

describe("done-ssr middleware - production", function() {
	this.timeout(30000);

	beforeEach(function() {
		this.oldEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = "production"
	});

	afterEach(function() {
		process.env.NODE_ENV = this.oldEnv;
	});

	it('uses middleware in an Express application', function(done) {
		var root = path.join(__dirname, 'tests');
		var config = path.join(root, 'package.json') + '!npm';

		stealTools.build({
			config: config,
			main: [ "progressive/index.stache!done-autorender" ]
		}, {})
		.then(function() {
			var app = express()
				.use('/', express.static(root))
				.use('/', ssr({
					config: path.join(root, 'package.json') + '!npm'
				}));

			var server = app.listen(5500);

			server.on('listening', function() {
				request('http://localhost:5500', function(err, res, body) {
					assert.equal(res.statusCode, 200);
					assert.ok(/You are home/.test(body), 'Got body');
					assert.ok(/Showing: \//.test(body),
							'The request object is accessible from the AppViewModel');
					assert.ok(/progressive\/index.stache!done-autorender/.test(body),
								'The "main" is set correctly')

					var contentType = res.headers['content-type'];
					assert.equal(contentType, 'text/html; charset=utf-8',
								'set the correct content type');
					server.close(done);
				});
			});
		});
	});
});
