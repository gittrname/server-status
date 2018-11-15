var config = require('config');
var express = require('express');
var router = express.Router();
require('express-ws')(router);

var db = require('../database');

/**
 * Top
 */
router.get('/', function(req, res, next) {
  // 画面描画
  res.render('index', { title: 'Top', config: config});
});
router.ws('/', function(ws, req) {
  // ステータス確認
  db.find({}, function(err, docs) {
    console.log(docs);
    ws.send(JSON.stringify(docs));
  });
});

/**
 * status
 */
router.get('/status/:site', function(req, res, next) {
  // サービスの存在確認
  var service = config.services[req.params.site];
  if (service == undefined) {
    var error = new Error(req.params.site + ' is not found.');
    error.status = 404;
    next(error);
  }

  // 画面描画
  res.render('status', {
    title: 'Status', config: config, site: req.params.site
  });
});
router.ws('/status/:site', function(ws, req) {
  // サービスの存在確認
  var service = config.services[req.params.site];
  if (service == undefined) {
    var error = new Error(req.params.site + ' is not found.');
    ws.send(JSON.stringify({status: false}));
    return;
  }

  // ステータス確認
  db.findOne({name: req.params.site}, function(err, docs) {
    console.log(docs);
    ws.send(JSON.stringify(docs));
  });
});

/**
 * about
 */
router.get('/about', function(req, res, next) {
  // 画面描画
  res.render('about', { title: 'About', config: config});
});

module.exports = router;
