var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs');
request = require('request');
mongo = require('./mongodb.js');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
	
	mongo.find('jobtag',{},{"id":true,"tag_type":true,"display_name":true},function(data){
		
		var html = {};
		for(var i=0;i<data.length;i++) {
			
			if(typeof(html[data[i].tag_type])=="undefined") {	
				html[data[i].tag_type] = "";
			}			
			html[data[i].tag_type] += "<option value=\""+data[i].display_name+"\">";
						
		}		
		res.render('index.hbs',{"innerhtml":html});
		
	});
	  
});


app.post('/api/search', function(req, res){
	
	mongo.find('jobtag',{ 'display_name': { $in: req.body.names } },{},function(data){
		
		var dump = data[0].jobs.filter(function(n) {
			return ((data[1].jobs.indexOf(n) != -1) && (data[2].jobs.indexOf(n) != -1))
		});
		
		mongo.findLimited('jobs',{ 'id': { $in: dump } },{},0,10,function(data){
			
			res.json(data);
			
		});
		
		
	});
	
	  
});


app.listen(3000);





