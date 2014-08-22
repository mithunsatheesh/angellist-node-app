var MongoClient = require('mongodb').MongoClient;

var connect = function(cb) {	
	
	database = 'web';
	MongoClient.connect('mongodb://127.0.0.1:27017/'+database, function(err, db) {

		if(err) throw err;
			
		cb(db);
		
		
	});
  
};

var find = function(col,query,fields,cb) {
	
	connect(function(db) {
		
		var collection = db.collection(col);
		
		collection.find(query,fields).toArray(function(err, results) {
			
			cb(results);
            db.close();
		
		});
		
	});
	
};

var findLimited = function(col,query,fields,skip,limit,cb) {
	
	connect(function(db) {
		
		var collection = db.collection(col);
		
		collection.find(query,fields).skip(skip).limit(limit).toArray(function(err, results) {
			
			cb(results);
            db.close();
		
		});
		
	});
	
};

var FnFindOne = function(col,query,cb) {
	
	connect(function(db) {
		
		var collection = db.collection(col);
		
		collection.findOne(query, function(err, result) {
			
			cb(err,result);
            db.close();
		
		});
		
	});
	
};


var findAndSort = function(col,query,sortdoc,cb) {
	
	connect(function(db) {
		
		var collection = db.collection(col);
		
		collection.find(query).sort(sortdoc).toArray(function(err, results) {
			
			cb(results);
            db.close();
		
		});
		
	});
	
};

var insert = function(col,doc,cb) {
	
	connect(function(db) {
		
		var collection = db.collection(col);
		
		collection.insert(doc, function(err, docs) {
			
			cb(null,docs);
            db.close();
		
		});
		
	});
	
};

var FnDelete = function(col,query,cb) {
	
	connect(function(db) {
		
		var collection = db.collection(col);
		
		collection.remove(query, function(err, docs) {
			
			cb(docs);
            db.close();
		
		});
		
	});
	
};

var FnUpdate = function(col,query,doc,options,cb) {
	
	connect(function(db) {
		
		var collection = db.collection(col);
		
		collection.update(query, doc, options, function(err, docs) {
			
			cb(err,docs);
            db.close();
		
		});
		
	});
	
};

module.exports.find = find;
module.exports.findLimited = findLimited;
module.exports.findAndSort = findAndSort;
module.exports.FnInsert = insert;
module.exports.FnUpdate = FnUpdate;
module.exports.FnDelete = FnDelete;
module.exports.FnFindOne = FnFindOne;