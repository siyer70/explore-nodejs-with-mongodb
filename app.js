var MongoClient = require('mongodb').MongoClient,
      assert = require('assert');

var insertDocuments = (db, data, callback) => {
  var collection = db.collection('Todos');
  console.log(`Inserting data: ${data.text}`);
  collection.insertOne(data, function(err, result) {
    if(err) console.log(err);
    assert(1, result.result.n);
    assert(1, result.ops.length);
    console.log('1 document inserted')
    console.log(result.ops);
    callback(result);
  });
  collection.find().toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  });
}

// connection url
var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, (err,db) => {
  assert.equal(null, err);
  console.log('Connected directly to the server');
  insertDocuments(db, {'text':'Health nuts with milks at 4pm'}, () => {
    db.close();
  });
});
