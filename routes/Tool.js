var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('url地址错误');
});
router.get('/mall', function(req, res, next) {
  res.render('mall');
});
router.get('/visualization', function(req, res, next) {
    res.render('visualization');
  });
module.exports = router;
