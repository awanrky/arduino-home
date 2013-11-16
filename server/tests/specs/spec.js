// SERVER SIDE TEST SUITE
var request = require('superagent'),
	expect = require('expect.js'),
	app = require('../../server.js');


// BEFORE HOOK
before(function(){
    'use strict';
	this.server = http.createServer(app).listen(3000);
});

// AFTER HOOK
after(function(done){
    'use strict';
	this.server.close(done);
});

// TEST SUITES
describe('API: GET /hello', function() {
	it('Should Return 200', function(done) {
		request.get('localhost:3000/hello').end(function(res) {
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			done();
		});
	});
});