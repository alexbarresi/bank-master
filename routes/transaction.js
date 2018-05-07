var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Transaction = require('../models/Transaction');
var auth = require('../middlewares/auth');

// var findAccountByIban = function(req, res, next) {
//   Account.findOne({iban: req.body.iban}, function(err, account){
//     if (err) return res.status(500).json({message: err});
//     req.account2 = account;
//     next();
//   })
// }
//
// // Produrre una transazione tra l'account 1 e l'account 2
// router.post('/trs', auth.verify, findAccountByIban, function(req, res){
//     var transaction = new Transaction();
//     transaction.account1 = req.user;
//     req.transaction.amount = req.body.amount;
//     if (transaction.account1.balance === 0 ) {
//       res.status(400).json({message:'You do not have enough credit'});
//     }
//     req.transaction.account1.balance = req.transaction.account1.balance - req.body.amount;
//     req.transaction.account2.balance = req.transaction.account2.balance + req.body.amount;
//
//     transaction.save(function(err, trsSaved) {
//         if (err) return res.status(500).json({message: err});
//         req.user.inTransactions.push(trsSaved._id);
//         req.user.save(function(err, userSaved) {
//             res.status(201).json({message: 'transaction done'});
//         })
//     });
// });
