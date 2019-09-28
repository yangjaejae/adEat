
let create_tb_user = () => {
    let query = `
        CREATE TABLE user(
            id              VARCHAR(100)    PRIMARY KEY,
            phone           VARCHAR(100)    NOT NULL, 
            pass            VARCHAR(100)    NOT NULL,
            date_reg        DATE, 
            date_last       DATE
        )
        ;`;
    return query;
}

let put_user_info = (datas) => {
    let query = `
        INSERT INTO user(id, phone, pass, date_reg, date_last)
            VALUES(
                "${datas.id}",
                "${datas.phone}",
                "${datas.pass}",
                datetime('now'),
                datetime('now')
            )
        ;`;

    return query;
}

let get_user_pass = (datas) => {
    let query = `
        SELECT  pass, phone 
        FROM    user
        WHERE   id = "${datas.id}"
        ;`
    return query;
}


let create_tb_video = () => {
    let query = `
        CREATE TABLE videos(
            id              VARCHAR(100)    PRIMARY KEY,
            video_url       VARCHAR(100)    NOT NULL
        )
        ;`;
    return query;
}

module.exports = {
    create_tb_user,
    put_user_info,
    get_user_pass,
    create_tb_video
}