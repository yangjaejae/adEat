const crypto = require("crypto");
const CIPHER = require("../../constants/contants").CIPHER.KEY;

let encrypt_pass = (role, key) => {
    let cipher_key = "";
    switch (role){
        case 1:
            cipher_key = CIPHER[1];
            break; 
        case 2:
            cipher_key = CIPHER[2];
            break; 
        case 3:
            cipher_key = CIPHER[3];
            break; 
        case 4:
            cipher_key = CIPHER[4];
            break; 
        case 5:
            cipher_key = CIPHER[5];
            break; 
    }

    let password = key.toString();
    let cipher = crypto.createCipher("aes192", cipher_key);
    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
}

let decrypt_pass = (role, key) => {
    let cipher_key = "";
    switch (role){
        case 1:
            cipher_key = CIPHER[1];
            break; 
        case 2:
            cipher_key = CIPHER[2];
            break; 
        case 3:
            cipher_key = CIPHER[3];
            break; 
        case 4:
            cipher_key = CIPHER[4];
            break; 
        case 5:
            cipher_key = CIPHER[5];
            break; 
    }
    
    let decipher = crypto.createDecipher("aes192", cipher_key);
    let decrypted = decipher.update(key, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

module.exports = {
    encrypt_pass, 
    decrypt_pass
}