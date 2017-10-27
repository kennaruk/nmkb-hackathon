var express = require('express');
var router = express.Router();
var db = require('../db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  // db.writeUserData(1, "name", "email", "image");
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {

});


module.exports = router;
