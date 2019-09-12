var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('url地址错误');
});
router.get('/flybird', function(req, res, next) {
  res.render('flybird');
});
module.exports = router;
