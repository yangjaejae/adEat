let hide_string = (str, type) => {

    let result_str = "";
    switch(type){
        case "email":
                result_str = make_email(str);
            break;
    }

    return result_str;
}

let make_email = (email) => {

    let emain_arr = email.split("@");
    let before = emain_arr[0];
    let after = emain_arr[1];
    let before_half_len = parseInt(before.length / 2);
    let ast = "";
    for( let i=0; i<before_half_len; i++ ){
        ast += "*";
    }
    scr_email = ast + before.substring(before_half_len) + "@" + after;
    
    return scr_email;
}

module.exports = {
    hide_string
}
