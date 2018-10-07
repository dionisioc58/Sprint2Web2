var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('lists all users');

  var users = [
        { name: 'Artur Lima', id: 1 },
        { name: 'Renata Passos', id: 5 },
        { name: 'Valdir Moreira', id: 10 }
  ];

  res.render('userlist', { users: users } );
});

module.exports = router;
