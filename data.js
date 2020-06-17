//require the Elasticsearch librray
const elasticsearch = require('elasticsearch');
// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});

// Check the client to be sure Elasticsearch is up
client.ping({
     requestTimeout: 30000,
 }, function(error) {

    if (error) {
         console.error('Elasticsearch cluster is down!');
     } else {
         console.log('Elasticsearch cluster is up!');
     }
 });

client.indices.create({
    index: 'elasticsearch-tutorial'
}, function(error, response, status) {
    if (error) {
        console.log(error);
    } else {
        console.log("created a new index", response);
    }
});

// add a data to the index that has already been created
client.index({
    index: 'elasticsearch-tutorial',
    id: '1',
    type: 'project_list',
    body: {
        "Key1": "Content for key one",
        "Key2": "Content for key two",
        "key3": "Content for key three",
    }
}, function(err, resp, status) {
    console.log(resp);
});

// require the array of project that was downloaded
const projects = require('./project.json');
var bulkProject = [];
projects.forEach(project =>{
    bulkProject.push({index:{ 
                 _index:"elasticsearch-tutorial", 
                 _type:"project_list",
             }          
         })
  bulkProject.push(project)
})
client.bulkProject({body:bulkProject}, function( err, response  ){ 
         if(err){ 
             console.log("Failed Bulk operation".red, err) 
         } else { 
             console.log("Successfully imported %s".green, projects.length); 
         } 
});