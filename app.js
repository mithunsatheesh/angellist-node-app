var express = require('express');
var hbs = require('hbs');
request = require('request');
mongo = require('./mongodb.js');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));


app.get('/', function(req, res){
  res.json({"status":200});
});

app.get('/test', function(req, res){

	mongo.find('jobtag',{},{"id":true,"tag_type":true,"display_name":true},function(data){
		
		
		
		res.render('index.hbs');
	});
  
});

app.get('/api/jobcloud', function(req, res){
  
  mongo.find('jobtag',{},{"id":true,"tag_type":true,"display_name":true},function(data){
	res.json(data);
  });
  
});

app.get('/jobs', function(req, res){

	
  
});

app.listen(3000);





