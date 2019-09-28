const jwt = require('jsonwebtoken');
const responseCommon = require('./response');
const logger = require("../format/format.logger").logger;

const PRIVATE_KEY = 'rlackdtn19$(06@^rlarn';

exports.makeToken_account = function(id, phone, day) {
    return jwt.sign({_id: id, _phone: phone}, PRIVATE_KEY, {expiresIn: 60 * 60 * 24 * day});  // 유효기간 day 일  60 * 60 * 24 * day
};

exports.verifyToken_auth = function(req, res, next) {
    let authToken = req.headers["token"];

    if(authToken === undefined) {
        res.send({result_code:300});
        return;
    }

    if(authToken === '') {
        res.send({result_code:300});
        return;
    }

    jwt.verify(authToken, PRIVATE_KEY, function(err, decoded) {
        if(err != null) {
            req.decoded_err = err;
            res.send({result_code:300});
            return;
        }
        next();
    })
};

