var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.getConnection(function(err,connection){     
    var query = connection.query('SELECT * FROM user ORDER BY name',function(err,rows) {
      if(err)
        console.log("Error Selecting : %s ",err );
      res.render('userlist', { users: rows } );
    });
  });
});

module.exports = router;
