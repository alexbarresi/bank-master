var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var User = require('../models/User');
var auth = require('../middlewares/auth');
var Transaction = require('../models/Transaction');


var findAccountByIban = function(req, res, next) {
  User.findOne({iban: req.body.iban}, function(err, account){
    if (err) return res.status(500).json({message: err});
    req.account2 = account2;
    next();
  })
}
// SIGN UP
router.post('/signup', function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.email = req.body.email;
    user.iban = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    user.balance = 1000;

    user.save(function(err, userCreated) {
        if (err) return res.status(400).json(err);
        res.status(201).json(userCreated);
    })
})
// LOGIN
router.post('/login', function(req, res) {
    User.findOne({email: req.body.email}, function(err, user){
        if (user === null) {
            return res.status(404).json({message: 'Account not found'})
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
             var token = jwt.encode(user._id, auth.secret);
             return res.json({token: token});
         } else {
             return res.status(401).json({message: 'password not valid'});
         }

    })

})
// ME
router.get('/me', auth.verify, function(req, res, next) {
    res.json(req.user);
});

// Produrre una transazione tra l'account 1 e l'account 2
router.post('/trs', auth.verify, findAccountByIban, function(req, res){
    var transaction = new Transaction();
    transaction.account1 = req.user.iban;
    transaction.account2 = req.body.iban;
    transaction.amount = req.body.amount;

    // if (req.transaction.account1.balance === 0 ) {
    //   res.status(400).json({message:'You do not have enough credit'});
    // }
    req.user.balance = parseInt(req.user.balance) - parseInt(req.body.amount);
    req.user.balance = parseInt(req.user.balance) + parseInt(req.body.amount);

    transaction.save(function (err, trsSaved) {
       if (err) return res.status(500).json(err);
       req.account1.transactions.push(trsSaved);
       req.account2.transactions.push(trsSaved);
       req.account1.save();
       req.account2.save();
       return res.status(201).json(trsSaved)
 })
});

module.exports = router;
