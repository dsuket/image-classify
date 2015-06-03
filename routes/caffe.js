var express = require('express');
var client = require('cheerio-httpcli');

var router = express.Router();

var url = 'http://demo.caffe.berkeleyvision.org/classify_url';

/* GET users listing. */
router.get('/', function(req, res, next) {
  var imageurl = req.query.imageurl;
  loadCaffe(imageurl, function(results) {
    res.json(results);
  });
});


function loadCaffe(imageurl, cb) {
  var urlQuery = url + '?imageurl=' + imageurl;
  console.log('loadWatson: ' + urlQuery);

  client.fetch(urlQuery, {}, function (err, $, res) {
    var ret = [];
    var $li = $('#infopred li');
    $li.each(function() {
      var $this = $(this);
      ret.push({
        label: $this.find('a').text(),
        score: $this.find('.badge').text()
      });
    });
    // console.log(JSON.stringify(ret, null, '  '));
    cb(ret);
  });
}

function getDummy() {
  return [
    {label: 'cat', score: 0.812},
    {label: 'dog', score: 0.763},
    {label: 'animal', score: 0.545},
    {label: 'human', score: 0.343},
    {label: 'object', score: 0.234}
  ]
}

module.exports = router;
