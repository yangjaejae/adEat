const crypto = require('crypto');

const DBObject = require("../sqliteDB/sqlite.execute").SqlQueryObj;
const makeToken_account = require("../utils/certtificate/jwt").makeToken_account;

const db = new DBObject();

let signin = (req) => {
    return new Promise((resolve, reject) => {
        let id = req.body.id;
        let phone = req.body.phone;
        let pass = req.body.password;

        console.log("singin controller")
        console.log(id, phone, pass)

        let encry_pass = crypto.createHash('sha512').update(pass).digest('base64');
        db.put_user_info(id, phone, encry_pass).then(res => {
            if(res){

                let token = makeToken_account(id, phone, 1);
                resolve({result_code:200, result:"success", jwt: token})
            }else{
                resolve({result:500});
            }
        }).catch( err => {
            resolve(err);
        });
    });
}

let login = (req) => {
    return new Promise((resolve, reject) => {
        let id = req.body.id;
        let pass = req.body.password;

        let encry_pass = crypto.createHash('sha512').update(pass).digest('base64');
        db.get_user_pass(id).then(res => {

            if(res){
                let pass_saved = res[0]["pass"];
                let phone_saved = res[0]["phone"];
                if(encry_pass == pass_saved){
                    let token = makeToken_account(id, phone_saved, 1);
                    resolve({result_code:200, result:"success", jwt: token});
                }else{
                    resolve({result_code:500, result:"fail"});
                }
            }else{
                resolve({result_code:500, result:"fail"});
            }

        }).catch( err => {
            resolve(err);
        })
    });
}

let get_videos = () => {
    return new Promise((resolve, reject) => {
        resolve({result_code: 200, result: "success", video: "ok"});
    });
}

module.exports = {
    signin,
    login,
    get_videos
}