const { SUCCESS, TOKEN, ERROR } = require("../../constants/contants");

let res_format = (txRes, type) => {

    // success ------------------------------------
    let block_datas = txRes.processed;
    let format = {};

    if (type === SUCCESS.FUNC.NEW_ACCOUNT) {
        format = enroll_account_form(format, block_datas);
    }
    if (type === SUCCESS.FUNC.BUY_RAM) {
        format = buy_resource_form(format, block_datas);
    }
    if (type === SUCCESS.FUNC.STAKING) {
        format = buy_resource_form(format, block_datas);
    }
    if (type === SUCCESS.FUNC.USER_ACTION) {
        format = action_form(format, block_datas);
    }
    if (type === SUCCESS.FUNC.CREATE_TOKEN) {
        format = action_form(format, block_datas);
    }
    if (type === SUCCESS.FUNC.REWARD_TOKEN) {
        format = action_form(format, block_datas);
    }
    if (type === SUCCESS.FUNC.SEND_TOKEN) {
        format = action_form(format, block_datas);
    }
    return format;
}

let get_format = (getRes, type) => {

    let format = {};
    // success ------------------------------------
    let account = getRes;
    if (type === SUCCESS.FUNC.GET_ACCOUNT) {
        format = get_account_form(format, account);
    }
    if (type === SUCCESS.FUNC.GET_TOTAL_CURRENCY) {
        format = get_total_currency_form(getRes);
    }
    if (type === SUCCESS.FUNC.GET_ACCOUNTS_CNT) {
        format = get_accounts_cnt_form(getRes);
    }

    return format;
}
let res_error = (err_msg, type, serial) => {
    
    let error_str = err_msg.toString();
    let format = {};
    if (serial) {
        format["serial"] = serial;
    }
    let error_msg = "";
    switch (type) {
        case 300:
            error_msg = ERROR.TYPE.REDIRECT.MESSAGE;
            break;
        case 600:
            error_msg = ERROR.TYPE.REQUEST.MESSAGE;
            break;
        case 603:
            error_msg = ERROR.TYPE.FORBIDDEN.MESSAGE;
            break;
        case 604:
            error_msg = ERROR.TYPE.TOKEN_INVALID.MESSAGE;
            break;
        case 605:
            error_msg = ERROR.TYPE.NID_INVALID.MESSAGE;
            break;
        case 609:
            error_msg = ERROR.TYPE.DATABASE.MESSAGE;
            break;
        case 601:
            error_msg = ERROR.TYPE.BLOCKCHAIN.MESSAGE;
            break;
        case 610:
            error_msg = ERROR.TYPE.ETC.MESSAGE;
            break;
    }
    format["result"] = ERROR.ERROR;
    format["result_code"] = type;
    format["err_message"] = error_msg;
    format["err_details"] = error_str;
    console.log(format);
    return format;
}

let get_account_form = (format, account) => {
    format = {
        result_code: SUCCESS.CODE.OK,
        result: SUCCESS.MESSAGE.OK,
        account_name: account.account_name,
        head_block: account.head_block_num,
        created: account.created,
        ram_quota: account.ram_quota,
        resource: {
            net: {
                weight: account.net_weight,
                weight_eos: account.total_resources.net_weight,
                used: account.net_limit.used,
                available: account.net_limit.available,
            },
            cpu: {
                weight: account.cpu_weight,
                weight_eos: account.total_resources.cpu_weight,
                used: account.cpu_limit.used,
                available: account.cpu_limit.available,
            },
            ram: {
                used: account.ram_usage,
                total: account.total_resources.ram_bytes,
            }
        }
    }
    let perms = [];
    account.permissions.forEach((element, index, array) => {
        perms.push(element);
    });
    format["permission"] = perms;
    return format;
}

let get_total_currency_form = (data) => {
    
    let res_data = {
        symbol: TOKEN.SYMBOL,
        supply: JSON.stringify(data[TOKEN.SYMBOL]["supply"]).replace(/\"|A|\s/g, ""),
        max_supply: JSON.stringify(data[TOKEN.SYMBOL]["max_supply"]).replace(/\"|A|\s/g, ""),
        issuer: data[TOKEN.SYMBOL]["issuer"]
    }
    
    let format = {
        result_code: SUCCESS.CODE.OK,
        result: SUCCESS.MESSAGE.OK,
        data: res_data
    }
    return format;
}

let get_accounts_cnt_form = (data) => {
    
    let res_data = {
        func: data.func,
        total: data.cnt,
    }
    
    let format = {
        result_code: SUCCESS.CODE.OK,
        result: SUCCESS.MESSAGE.OK,
        data: res_data
    }
    return format;
}

let enroll_account_form = (format, block_datas) => {

    format = {
        result_code: SUCCESS.CODE.OK,
        result: SUCCESS.MESSAGE.OK,
        tx_data: {
            txHash: block_datas.id,
            blockNum: block_datas.block_num,
            blockTime: block_datas.block_time,
            cpuUse: block_datas.receipt.cpu_usage_us,
            netUse: block_datas.receipt.net_usage_words,
            ram: {
                payer: block_datas.action_traces[1].act.data.payer,
                delta: block_datas.action_traces[0].account_ram_deltas[0].delta
            }
        },
        action_data: {
            action: {
                contract: block_datas.action_traces[0].act.account,
                func: block_datas.action_traces[0].act.name,
                auth: block_datas.action_traces[0].act.authorization[0].actor + "@" + block_datas.action_traces[0].act.authorization[0].permission,
                creator: block_datas.action_traces[0].act.data.creator
            },
            auth: {
                name: block_datas.action_traces[0].act.data.name,
                owner: block_datas.action_traces[0].act.data.owner,
                active: block_datas.action_traces[0].act.data.active
            }
        }
    }

    return format;
}

let buy_resource_form = (format, block_datas) => {

    format = {
        result_code: SUCCESS.CODE.OK,
        result: SUCCESS.MESSAGE.OK,
        tx_data: {
            txHash: block_datas.id,
            blockNum: block_datas.block_num,
            blockTime: block_datas.block_time,
            cpuUse: block_datas.receipt.cpu_usage_us,
            netUse: block_datas.receipt.net_usage_words,
            ram: {
                payer: block_datas.action_traces[0].act.data.payer,
                delta: 0
            }
        },
        action_data: {
            action: {
                contract: block_datas.action_traces[0].act.account,
                func: block_datas.action_traces[0].act.name,
                auth: block_datas.action_traces[0].act.authorization[0].actor + "@" + block_datas.action_traces[0].act.authorization[0].permission,
                payer: block_datas.action_traces[0].act.data.payer,
                receiver: block_datas.action_traces[0].act.data.receiver
            },
            buy: {
                buy: {
                    payer: block_datas.action_traces[0].act.data.payer,
                    receiver: block_datas.action_traces[0].act.data.receiver,
                    amount: block_datas.action_traces[0].act.data.bytes,
                },
                fee: {
                    payer: block_datas.action_traces[0].inline_traces[0].act.data.from,
                    receiver: block_datas.action_traces[0].inline_traces[0].act.data.to,
                    amount: block_datas.action_traces[0].inline_traces[0].act.data.quantity
                }
            }
        }
    }

    return format;
}

let action_form = (format, block_datas) => {

    format = {
        result_code: SUCCESS.CODE.OK,
        result: SUCCESS.MESSAGE.OK,
        tx_data: {
            txHash: block_datas.id,
            blockNum: block_datas.block_num,
            blockTime: block_datas.block_time,
            cpuUse: block_datas.receipt.cpu_usage_us,
            netUse: block_datas.receipt.net_usage_words,
            ram: {
                payer: block_datas.action_traces[0].act.data.payer,
                delta: 0
            }
        },
        action_data: {
            action: {
                contract: block_datas.action_traces[0].act.account,
                func: block_datas.action_traces[0].act.name,
                auth: block_datas.action_traces[0].act.authorization[0].actor + "@" + block_datas.action_traces[0].act.authorization[0].permission,
                creator: block_datas.action_traces[0].act.authorization[0].actor
            },
            data: block_datas.action_traces[0].act.data
        }
    }
    return format;
}

module.exports = {
    res_format,
    get_format,
    res_error
}