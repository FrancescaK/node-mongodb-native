exports['start with withWriteConcern and perform limit, isolate and update'] = function(configuration, test) {
  var db = configuration.db();
  var col = db.collection('fluent_api');

  // Simple insert
  col.insert([{update:1}, {update:1}], function(err, result) {
    test.equal(null, err);

    // With write concern
    col
      .withWriteConcern({j:true})
      .limit(10)
      .isolated()
      .find({update:1})
      .update({$set:{c:1}}, function(err, result) {
        test.equal(null, err);
        test.equal(true, result.updatedExisting);
        test.equal(2, result.n);
        test.done();
      });
  });
}

exports['start with withWriteConcern and perform single document updateOne'] = function(configuration, test) {
  var db = configuration.db();
  var col = db.collection('fluent_api');

  // Simple insert
  col.insert({updateOne:1}, function(err, result) {
    test.equal(null, err);

    // With write concern
    col
      .withWriteConcern({j:true})
      .find({updateOne:1})
      .updateOne({$set:{c:1}}, function(err, result) {
        test.equal(null, err);
        test.equal(true, result.updatedExisting);
        test.equal(1, result.n);
        test.done();
      });
  });
}

exports['start with withWriteConcern and perform single updateOneAndGet'] = function(configuration, test) {
  var db = configuration.db();
  var col = db.collection('fluent_api');

  // Simple insert
  col.insert({updateOneAndGet:1}, function(err, result) {
    test.equal(null, err);

    // With write concern
    col
      .withWriteConcern({w:1})
      .find({updateOneAndGet:1})
      .updateOneAndGet({$set:{e:1}}, function(err, doc) {
        test.equal(null, err);
        test.equal(1, doc.e);
        test.equal(1, doc.updateOneAndGet);
        test.done();
      });
  });
}

exports['start with withWriteConcern and perform single getOneAndUpdate'] = function(configuration, test) {
  var db = configuration.db();
  var col = db.collection('fluent_api');

  // Simple insert
  col.insert({getOneAndUpdate:1}, function(err, result) {
    test.equal(null, err);

    // With write concern
    col
      .withWriteConcern({w:1})
      .find({getOneAndUpdate:1})
      .getOneAndUpdate({$set:{e:1}}, function(err, doc) {
        test.equal(null, err);
        test.equal(null, doc.e);
        test.equal(1, doc.getOneAndUpdate);
        test.done();
      });
  });
}

exports['start with withWriteConcern and perform single replaceOneAndGet'] = function(configuration, test) {
  var db = configuration.db();
  var col = db.collection('fluent_api');

  // Simple insert
  col.insert({replaceOneAndGet:1}, function(err, result) {
    test.equal(null, err);

    // With write concern
    col
      .withWriteConcern({w:1})
      .find({replaceOneAndGet:1})
      .replaceOneAndGet({replaceOneAndGet:2, e:10}, function(err, doc) {
        test.equal(null, err);
        test.equal(10, doc.e);
        test.equal(2, doc.replaceOneAndGet);
        test.done();
      });
  });
}

exports['start with withWriteConcern and perform single getOneAndReplace'] = function(configuration, test) {
  var db = configuration.db();
  var col = db.collection('fluent_api');

  // Simple insert
  col.insert({getOneAndReplace:1}, function(err, result) {
    test.equal(null, err);

    // With write concern
    col
      .withWriteConcern({w:1})
      .find({getOneAndReplace:1})
      .getOneAndReplace({getOneAndReplace:2, e:10}, function(err, doc) {
        test.equal(null, err);
        test.equal(null, doc.e);
        test.equal(1, doc.getOneAndReplace);
        test.done();
      });
  });
}

exports['start with withWriteConcern and perform single getOneAndRemove'] = function(configuration, test) {
  var db = configuration.db();
  var col = db.collection('fluent_api');

  // Simple insert
  col.insert({getOneAndReplace:1}, function(err, result) {
    test.equal(null, err);

    // With write concern
    col
      .withWriteConcern({w:1})
      .find({getOneAndReplace:1})
      .getOneAndRemove(function(err, doc) {
        test.equal(null, err);
        test.equal(null, doc.e);
        test.equal(1, doc.getOneAndReplace);
        test.done();
      });
  });
}

exports['start with withWriteConcern and perform single replace'] = function(configuration, test) {
  var db = configuration.db();
  var col = db.collection('fluent_api');

  // Simple insert
  col.insert([{replace:1, a:1}], function(err, result) {
    test.equal(null, err);

    // With write concern
    col
      .withWriteConcern({w:1})
      .find({replace:1})
      .replaceOne({replace:2, a:3}, function(err, result) {

        col
          .find({replace:2})
          .fields({replace:1})
          .getOne(function(err, doc) {
            test.equal(null, err);
            test.equal(2, doc.replace);
            test.equal(null, doc.a);
            test.done();
          });
      });
  });
}

exports['start with withWriteConcern and perform single save'] = function(configuration, test) {
  var db = configuration.db();
  var col = db.collection('fluent_api');

  // Simple insert
  col.insert([{replace:1, a:1}], function(err, docs) {
    test.equal(null, err);

    // With write concern
    col
      .withWriteConcern({w:1})
      .save(docs[0], function(err, doc) {
        test.equal(null, err);
        test.equal(1, doc.replace);
        test.done();
      });
  });
}

exports['start with withWriteConcern and perform limit, isolate, upsert and update'] = function(configuration, test) {
  var db = configuration.db();
  var col = db.collection('fluent_api');

  // With write concern
  col
    .withWriteConcern({j:true})
    .limit(10)
    .isolated()
    .upsert()
    .find({upsert:1})
    .update({$set:{upsert:2}}, function(err, result) {
      test.equal(null, err);
      test.equal(false, result.updatedExisting);
      test.equal(1, result.n);

      // Upsert should fail
      col
        .withWriteConcern({j:true})
        .limit(10)
        .isolated()
        .find({upsert:3})
        .update({$set:{upsert:4}}, function(err, result) {
          test.equal(null, err);
          test.equal(false, result.updatedExisting);
          test.equal(0, result.n);
          test.done();
        });
    });
}

