/* jshint node: true, mocha: true */
'use strict';

var mongoose = require('mongoose');
var should = require('should');

var helper = require('../helper');
var integerValidation = require('../../index');

module.exports = function() {

	describe('Path', function() {
		afterEach(helper.afterEach);

		it('should validate path for basic field', function(done) {
			var Integer = mongoose.model('Integer', helper.createIntegerSchema().plugin(integerValidation));

			new Integer({
				value: 0.5
			}).save(function(err) {
				should.exist(err);
				err.errors.value.path.should.equal('value');
				done();
			});
		});

		it('should validate path for nested field', function(done) {
			var Integer = mongoose.model('Integer', helper.createIntegerNestedObjectSchema().plugin(integerValidation));

			new Integer({
				nested: {
					value: 0.5
				}
			}).save(function(err) {
				should.exist(err);
				err.errors['nested.value'].path.should.equal('nested.value');
				done();
			});
		});

		it('should validate path for nested array field', function(done) {
			var Integer = mongoose.model('Integer', helper.createIntegerNestedObjectArraySchema().plugin(integerValidation));

			new Integer({
				nested: [{
					value: 0.5
				}]
			}).save(function(err) {
				should.exist(err);
				err.errors['nested.0.value'].path.should.equal('nested.0.value');
				done();
			});
		});

		it('should validate path for nested array nested array field', function(done) {
			var Integer = mongoose.model('Integer', helper.createIntegerNestedNestedObjectArraySchema().plugin(integerValidation));

			new Integer({
				nested: [{
					nested: [{
						value: 0.5
					}]
				}]
			}).save(function(err) {
				should.exist(err);
				err.errors['nested.0.nested.0.value'].path.should.equal('nested.0.nested.0.value');
				done();
			});
		});

		
	});
};
