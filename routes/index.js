var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '哈哈' });//渲染views-index.jade文件内容
});

module.exports = router;
