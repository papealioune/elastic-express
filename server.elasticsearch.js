const client = require('./server.client');
const elasticSearchSchema = require('./server.es.schema');

client.ping({
  requestTimeout: 30000,
}, function (error) {
  error
    ? console.error('ElasticSearch cluster is down!')
    : console.log('ElasticSearch cluster is up');
});

function ElasticSearchClient(body) {
  return client.search({index: 'catalog', body: body});
}

function ApiElasticSearchClient(req, res) {
  ElasticSearchClient({...elasticSearchSchema})
    .then(r => res.send(r['hits']['hits']))
    .catch(e => {
      console.error(e);
      res.send([]);
    });
}

module.exports = {
  ApiElasticSearchClient,
  ElasticSearchClient
};
