var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var expect = require("chai").expect;
var ctm = require("cds-task-management");
var userService = require('../app/services/user');


describe("common", function() {
    it('should run with those environment variables', function() {
        expect(process.env.ENVTYPE).to.equals('dev');
        expect(process.env.NODE_ENV).to.equals('development');
    });
});

describe("User Services", function() {
    it("get user types", function(done) {
        userService.userTypes(2, function(data) {
            expect(data.status).to.equals('success');
            done();
        });
    });
});
