var {MongoClient, ObjectID} = require('mongodb'),
      assert = require('assert');

var insertDocuments = (db, collectionName, data, callback) => {
  var collection = db.collection(collectionName);
  console.log(`Inserting data: ${data.text}`);
  collection.insertOne(data, function(err, result) {
    if(err) console.log(err);
    assert(1, result.result.n);
    assert(1, result.ops.length);
    console.log('1 document inserted')
    console.log(result.ops);
    callback(result);
  });
}

var findDocuments = (db, collectionName, findExpr, callback) => {
  var collection = db.collection(collectionName);
  collection.find(findExpr).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  });
  callback();
}

var updateDocument = (db, collectionName, filterExpr, updateExpr, callback) => {
  var collection = db.collection(collectionName);
  collection.findOneAndUpdate(filterExpr, updateExpr).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });
  callback();
}


var deleteDocument = (db, collectionName, expr, callback) => {
  var collection = db.collection(collectionName);
  collection.deleteOne(expr).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });
  callback();
}

// connection url
var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, (err,db) => {
  assert.equal(null, err);
  console.log('Connected directly to the server');

  // findDocuments(db, 'Todos', {text:/Lunch/}, () => {
  //   db.close();
  // });

  updateDocument(db, 'Todos', {_id: new ObjectID('5a070b05583a9b50d44dbc8d')},
    {$set : {text : 'Healthy nuts and berries with milk @4pm'}}, () => {
    db.close();
  });

  // deleteDocument(db, 'Todos', {text:/Play/}, () => {
  //   db.close();
  // });
  // insertDocuments(db, 'Todos', {'text':'Healthy nuts with milk at 4pm'}, () => {
  //   db.close();
  // });
});
