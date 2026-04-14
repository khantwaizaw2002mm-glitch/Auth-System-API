var express = require('express');
var router = express.Router();
var users= require('../controller/UserController');

/*
router.get('/', (req, res, next) => {
 // res.send('respond with a resource');
 console.log('User/ get executed');
 res.json({
  id : 1,
  name: "Express"
 });
});
router.post('/', (req, res, next)=>{
 console.log('User/ post executed');
 res.json({
  id : 1,
  name: "Express"
 });
});*/
router.get('/:userId', users.getUserById);
router.post('/', users.registerUser);
router.post('/login', users.login);


module.exports = router;
