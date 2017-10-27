var express = require('express');
var router = express.Router();
var db = require('../db.js');
/* GET home page. */
router.get('/homepage', function(req, res, next) {
  res.render('index.ejs');
});


module.exports = router;
