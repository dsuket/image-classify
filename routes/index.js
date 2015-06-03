var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var param = {
    imageurl: 'https://dl.dropboxusercontent.com/u/1662536/images/sample.jpg',
    checkWatson: true,
    checkCaffe: true,
    result: false
  };
  if (typeof req.query.imageurl !== 'undefined') {
    param.imageurl = req.query.imageurl;
    param.checkWatson = req.query.checkWatson === 'true';
    param.checkCaffe = req.query.checkCaffe === 'true';
    param.result = req.query.result === 'true';
  }
  res.render('index', param);
});

module.exports = router;
