var express = require('express');
var http = require('http');
var router = express.Router();

var url = 'http://watson-sample.eu-gb.mybluemix.net/classify.json';

/* GET users listing. */
router.get('/', function(req, res, next) {
  var imageurl = req.query.imageurl;
  loadWatson(imageurl, function(results) {
    res.json(results);
  });
});


function loadWatson(imageurl, cb) {
  var urlQuery = url + '?imageurl=' + imageurl;
  console.log('loadWatson: ' + urlQuery);
  http.get(urlQuery, function(res) {
    var body = '';
  	res.setEncoding('utf8');

  	res.on('data', function(chunk){
  		body += chunk;
  	});

  	res.on('end', function(res) {
      var ret = parseBody(body);
      // console.log(JSON.stringify(ret, null, '  '));
      cb(ret);
  	});

  });
}

function parseBody(body) {
  var data = JSON.parse(body);

  if (!data.images || !data.images[0]) {
    return [];
  }
  var labels = data.images[0].labels;
  if (!labels) {
    return [];
  }
  return labels.map(function(label){
    return {
      label: label.label_name,
      score: Number(label.label_score)
    };
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
