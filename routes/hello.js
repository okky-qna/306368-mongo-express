var express = require('express');
var router = express.Router();

router.get('/hello', function (req, res, next) {
  var db = req.db;
  db.collection('current').find({})
  .toArray(function(err, docs) {
    if (err) {
      next(err);
      return;
    }
    res.render('hello', {list: docs});
  });
});

module.exports = router;
