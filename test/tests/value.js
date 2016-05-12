/* jshint node: true, mocha: true */
'use strict';

var mongoose = require('mongoose');
var should = require('should');

var helper = require('../helper');
var integerValidation = require('../../index');

module.exports = function() {

	describe('Value', function() {
		afterEach(helper.afterEach);

		it('should validate value for basic field', function(done) {
			var Integer = mongoose.model('Integer', helper.createIntegerSchema().plugin(integerValidation));

			new Integer({
				value: 0.5
			}).save(function(err) {
				should.exist(err);
				err.errors.value.value.should.equal(0.5);
				done();
			});
		});

		it('should validate value for nested field', function(done) {
			var Integer = mongoose.model('Integer', helper.createIntegerNestedObjectSchema().plugin(integerValidation));

			new Integer({
				nested: {
					value: 0.5
				}
			}).save(function(err) {
				should.exist(err);
				err.errors['nested.value'].value.should.equal(0.5);
				done();
			});
		});

		it('should validate value for nested array field', function(done) {
			var Integer = mongoose.model('Integer', helper.createIntegerNestedObjectArraySchema().plugin(integerValidation));

			new Integer({
				nested: [{
					value: 0.5
				}]
			}).save(function(err) {
				should.exist(err);
				err.errors['nested.0.value'].value.should.equal(0.5);
				done();
			});
		});

		it('should validate value for nested array nested array field', function(done) {
			var Integer = mongoose.model('Integer', helper.createIntegerNestedNestedObjectArraySchema().plugin(integerValidation));

			new Integer({
				nested: [{
					nested: [{
						value: 0.5
					}]
				}]
			}).save(function(err) {
				should.exist(err);
				err.errors['nested.0.nested.0.value'].value.should.equal(0.5);
				done();
			});
		});

		
	});
};
