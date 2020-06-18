const _ = require('lodash');
const client = require('./server.client');
const BOOKS = require('./json/books.json').books;

let initialBulk = {index: {_index: "catalog"}};
let collectionBulk = [];
_.map(_.keys(BOOKS), uuid => {
  collectionBulk = [
    ...collectionBulk, 
    initialBulk, 
    BOOKS[uuid]
  ];
});

client.bulk({body: collectionBulk}, function (err, r) {
  if (err) {
    console.log(`Failed Bulk operation\n`, err);
  } else {
    console.log(`🚀 Successfully imported ${_.keys(BOOKS).length} items \n`);
  }
});
