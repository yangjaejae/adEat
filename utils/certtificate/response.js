const { res_format, res_error } = require("../format/format.response");

exports.sendResponseFailDataNid = function(req, res) {
    try {
        let result = {};
        let err_details = "";
        if( !req.decoded_err)
        {
            result = res_error(err_details, "no token");
        }
        else
        {
            result = res_error(err_details, "invalid token");
        }

        return res.send(result);
    }
    catch (err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};

exports.sendResponseFailDataNotNId = function(req, res) {
    try {
        let result;
        let err_details = "";
        result = res_error(err_details, "invalid id");

        return res.send(result);
    }
    catch (err) {
        console.error(err);
        return new Error("Can't make response data...");
    }
};
