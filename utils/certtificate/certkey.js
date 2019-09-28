const { MESSAGE, ERROR, CERT_LEVEL } = require("../../constants/contants");
const { res_error } = require("../format/format.response");
const { verifyToken_auth, verifyToken_cert } = require("./jwt");
const logger = require("../format/format.logger").logger;

let check_certkey = (req, res, next) => {
    logger.log("info", "CHECK CERT KEY");
    
    if (CERT_LEVEL.LEVEL == "NO") {
        next();
    } else if (CERT_LEVEL.LEVEL == "ACCESS" || CERT_LEVEL.LEVEL == "CERT") {
        verifyToken_cert(req, res, next);
    } else {
        res.send(res_error(MESSAGE.TOKEN_REQUIRED, ERROR.TYPE.FORBIDDEN.CODE));
    }
};

module.exports = {
    check_certkey
}