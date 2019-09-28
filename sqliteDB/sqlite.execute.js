const conn = require("./sqlite.connection").conn;

const { 
        create_tb_user,
        put_user_info,
        get_user_pass,
        create_tb_video
    } = require("./sqlite.query");

class SqlQueryObj{

    constructor(){
        this.conn = conn;
    }

    create_tb_user(){
        let query = create_tb_user();
        this.conn.all(query, (err) => {
            if(err){
                console.log(err);
            }else{
                console.log(this.conn.open);
            }
        });
    }

    put_user_info(id, phone, pass){

        let datas = {
            id: id,
            phone: phone,
            pass: pass,
        }
        
        return new Promise((resolve, reject) => {
            let query = put_user_info(datas);
            this.conn.run(query, (err) => {
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(this.conn.open)
                }
            });
        });
    }

    get_user_pass(id){

        let datas = {
            id: id
        }
        
        return new Promise((resolve, reject) => {
            let query = get_user_pass(datas);
            this.conn.all(query, (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    if(rows.length === 0){
                        reject("no such colomn : []");
                    }
                    resolve(rows);
                }
            });
        });
    }

    create_tb_video(){
        let query = create_tb_video();
        this.conn.all(query, (err) => {
            if(err){
                console.log(err);
            }else{
                console.log(this.conn.open);
            }
        });
    }
}

module.exports = {
    SqlQueryObj
}