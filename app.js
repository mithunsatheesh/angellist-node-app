var express = require('express');
var hbs = require('hbs');
request = require('request');
mongo = require('./mongodb.js');

//var app = express();

//app.set('view engine', 'hbs');
//app.use(express.static('public'));

/*
app.get('/', function(req, res){
  res.json({"status":200});
});

app.get('/callback', function(req, res){
  res.json({"cameback":true});
});

app.get('/jobs', function(req, res){

	
  
});

app.listen(3000);
*/


(function FnGetJobs(current) {

	if(typeof(current) == "undefined") {
		current = 1;
	}
	
	request('https://api.angel.co/1/jobs?page='+current, function (error, response, body) {

        if (response.statusCode == 200) {
           
		    var docs = JSON.parse(body);			
			var jobs = docs.jobs;;
			//console.log(jobs);
			mongo.FnInsert("jobs",jobs,function(err,obj){
			   if(err){
				  console.log(err);
			   }else{
			   
					if(docs.page == docs.last_page) {
						console.log("last page reached. job finished.");
						return;
					} else {
						current++;
						console.log(current);
						FnGetJobs(current);
					}					
			   }
			});
			
        } else {
            console.log(error, body);
        }
		
    });

})();

