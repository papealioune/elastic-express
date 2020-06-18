const ElasticSearch = require('elasticsearch');

const client = new ElasticSearch.Client({
  hosts: ['http://127.0.0.1:9200']
});

module.exports = client;
