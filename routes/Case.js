var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('路径错误');
});
router.get('/wangyi', function(req, res, next) {
  res.render('wangyi');
});
router.get('/wegame', function(req, res, next) {
    res.render('wegame');
  });
module.exports = router;
