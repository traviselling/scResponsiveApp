var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {title : 'Users'});
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* Get Registstration page */

router.get('/register', function(req, res, next){
  res.render('register', {title : 'Registration'});
});

module.exports = router;
