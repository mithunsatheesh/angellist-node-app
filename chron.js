request = require('request');
mongo = require('./mongodb.js');

mongo.FnDelete("jobs",{},function(){
	mongo.FnDelete("jobtag",{},function(){
		console.log("collection jobs & jobtags cleaned");
	});
});

var tagMap = [];

(function FnGetJobs(current) {

	if(typeof(current) == "undefined") {
		current = 1;
	}
	
	request('https://api.angel.co/1/jobs?page='+current, function (error, response, body) {

        if (response.statusCode == 200) {
           
		    var docs = JSON.parse(body);			
			var jobs = docs.jobs;
			var i,j;
			for(i=0;i<jobs.length;i++) {
				
				for(j=0;j<jobs[i].tags.length;j++) {
					
					var tag = jobs[i].tags[j];
					if(typeof(tagMap[tag.id]) == "undefined") {
						tagMap[tag.id] = {};
						tagMap[tag.id].id = tag.id;
						tagMap[tag.id].tag_type = tag.tag_type;
						tagMap[tag.id].name = tag.name;
						tagMap[tag.id].display_name = tag.display_name;
						tagMap[tag.id].angellist_url = tag.angellist_url;
						tagMap[tag.id].jobs = [];
					}
					if(tagMap[tag.id].jobs.indexOf(jobs[i].id) == -1) {
						tagMap[tag.id].jobs.push(jobs[i].id);
					}
					
				}
			}
			
			mongo.FnInsert("jobs",jobs,function(err,obj){
			   if(err){
				  console.log(err);
			   }else{
			   
					if(docs.page == docs.last_page) {
						console.log("last page reached. job finished.");
						return FnJobTagInsert();
					} else {
						current++;
						console.log(current,docs.page,docs.last_page,(docs.page == docs.last_page));
						FnGetJobs(current);
					}					
			   }
			});
			
        } else {
            console.log(error, body);
        }
		
    });

})();

function FnJobTagInsert() {
	
	var jobtag = [];
	for(id in tagMap) {
		jobtag.push(tagMap[id]);
	}
	
	mongo.FnInsert("jobtag",jobtag,function(err,obj){
		console.log("job tags inserted.");
	});

}
