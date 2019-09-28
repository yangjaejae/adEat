const { Api, JsonRpc } = require('eosjs');
const { TextEncoder, TextDecoder } = require('util');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const ecc = require('eosjs-ecc');

const NODE = require("../../constants/contants").NODE;
const fetch = require('node-fetch');

class EosManager {
    
    constructor(){
        this.rpc = new JsonRpc(NODE[13].url, { fetch });
    }

    set_cached_key(keys) {
        this.signatureProvider = new JsSignatureProvider(keys);
        this.eos = new Api({ rpc: this.rpc, signatureProvider: this.signatureProvider, textDecoder: new TextDecoder("utf-8"), textEncoder: new TextEncoder() });
    }
    
    get_eos_rpc(){
        return this.eos;
    }

    gen_keys() {
        let keys = {};
        return new Promise((resolve, reject) => {
            ecc.randomKey().then(privateKey => {
                keys.pri_key = privateKey;
                keys.pub_key = ecc.privateToPublic(privateKey);
                return keys;
            }).then(key => {
                resolve(key);
            }).catch(error => {
                reject(error);
            })
        });

    }

    gen_account() {
        let chars = "12345abcdefghiklmnopqrstuvwxyz";
        let string_length = 10;
        let eos_account = 'tr';
        for (let i = 0; i < string_length; i++) {
            let rnum = Math.floor(Math.random() * chars.length);
            eos_account += chars.substring(rnum, rnum + 1);
        }

        return eos_account;
    }
}

module.exports = {
    EosManager
}

// let gen_account = (rpc) => {
    //     return new Promise((resolve, reject) => {
        //         let chars = "12345abcdefghiklmnopqrstuvwxyz";
        //         let string_length = 12;
        //         let eos_account = '';
        //         for (let i = 0; i < string_length; i++) {
            //             let rnum = Math.floor(Math.random() * chars.length);
            //             eos_account += chars.substring(rnum, rnum + 1);
            //         }

            //         let account = can_use(eos_account, rpc);
//         resolve(account);
//     });
// }
// let can_use = (eos_acc, rpc) => {

//     rpc.get_account(eos_acc).then(res => {
//         console.log("계정이 이미 있습니다. ");
//         console.log("acc:  ", eos_acc);
//     }).catch(err => {
//         console.log("사용할 수 있는 계정입니다. ");
//         console.log("acc:  ", eos_acc);
//         return eos_acc;
//     });
// }