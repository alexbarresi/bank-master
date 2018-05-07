var User        = require('../models/User');
var transaction = require('../models/Transaction');
var jwt         = require('jwt-simple');
var secret      = 'xxx';


var verify = function(req, res, next) {
    if (req.query.token === undefined) return res.status(401).json({message:'Unothorized'})
    var id = jwt.decode(req.query.token, secret);
    User.findById(id, function(err, user) {
      console.log(req.account1);
        if (err) return res.status(500).json({message: err});
        req.transaction.account1 = account1;
        next();
    })
}
module.exports.verify = verify;
module.exports.secret = secret;
