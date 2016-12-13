var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	paginator = require('./paginator')(20, 10);


function ProductsDAO(database) {
	"use strict";

	this.db = database;
	this.products = this.db.collection('products');

	this.getAll = function(options, callback) {
		var cursor,
			length,
			page = parseInt(options.page, 10) || 1,
			pagination;

		// Overwrite the limit if necessary
		paginator.per_page = typeof(options.limit) === 'string' ? parseInt(options.limit, 10) : paginator.per_page;
		
		// Create cursor
		cursor = this.products.find({});
		// Count results number that would be returned by the query(but don't perform it)
		length = cursor.count(false, function(err, length) {
			cursor
				// Set limit
				.limit(paginator.per_page)
				// Set skip
				.skip(page * paginator.per_page)
				// Iterate completely the cursor, load all the documents into RAM and exhaust the cursor
				.toArray(function(err, products) {
					assert.equal(null, err);
					// Build object for pagination
					pagination = paginator.build(length, page);
					// Call function with the data
					callback({ data: products, pagination: pagination });
				});
		});

	}

	this.getOne = function(num, callback) {
		this.products.findOne({ Number: num }, function(err, product) {
			assert.equal(null, err);
			callback(product);
		})
	}

	this.getByType = function(sel, options, callback) {
		var cursor,
			length,
			page = parseInt(options.page, 10) || 1,
			pagination;

		// Overwrite the limit if necessary
		paginator.per_page = typeof(options.limit) === 'string' ? parseInt(options.limit, 10) : paginator.per_page;

		// Create cursor
		cursor = this.products.find({ Type: sel });
		// Count results number that would be returned by the query(but don't perform it)
		length = cursor.count(false, function(err, length) {
			cursor
				// Set limit
				.limit(paginator.per_page)
				// Set skip
				.skip(page * paginator.per_page)
				// Iterate completely the cursor, load all the documents into RAM and exhaust the cursor
				.toArray(function(err, products) {
					assert.equal(null, err);
					// Build object for pagination
					pagination = paginator.build(length, page);
					// Call function with the data
					callback({ data: products, pagination: pagination });
				});
		});
	}
}

module.exports.ProductsDAO = ProductsDAO;