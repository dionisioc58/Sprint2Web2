var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.getConnection(function(err,connection){     
    var query = connection.query('SELECT * FROM user ORDER BY name', function(err,rows) {
      if(err)
        console.log("Error listing : %s ", err);
      res.render('userlist', {page_title: "Users List", users: rows});
    });
  });
});

/* GET new user form. */
router.get('/add', function(req, res, next) {
  res.render('userAdd', {page_title:"Add User"});
});

/* POST new user */
router.post('/add', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function (err, connection) {
    var data = {
        name    : input.name,
        email   : input.email,
    };
    var query = connection.query("INSERT INTO user set ? ", data, function(err, rows) {
      if (err)
          console.log("Error inserting : %s ", err);
      res.redirect('/users');
    });
  });
});

/* GET edit user form. */
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  req.getConnection(function(err,connection){
    var query = connection.query('SELECT * FROM user WHERE id = ?', [id], function(err,rows) {
      if(err)
          console.log("Error editing : %s ", err);
      res.render('userEdit', {page_title: "Edit User", data:rows});
    });
  }); 
});

/* POST edited user */
router.post('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function (err, connection) {
    var data = {
        name    : input.name,
        email   : input.email,
    };
    connection.query("UPDATE user SET ? WHERE id = ? ", [data,id], function(err, rows) {
      if (err)
          console.log("Error editing : %s ", err);
      res.redirect('/users');
    });
  });
});

/* GET delete user */
router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;
    req.getConnection(function (err, connection) {
      connection.query("DELETE FROM user WHERE id = ? ",[id], function(err, rows) {
        if(err)
            console.log("Error deleting : %s ",err );
        res.redirect('/users');
      });
    });
});

module.exports = router;
