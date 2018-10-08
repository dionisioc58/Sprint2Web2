var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var menu = 
    [
      {'title': 'Users', 'href': '/users'},
      {'title': 'Products', 'href': '/products'}
    ];
  res.render('index', { title: 'Express CRUD', menu: menu });
});

module.exports = router;
