const eos = require("eosjs");

const { ACC, EOS, FUNC, PERM, BUY, RESOURCE }  = require("../../constants/contants");

/*
** 사용자 계정 생성 트랜젝션
@receiver 계정 사용자
@owner_spec 계정 owner권한 spec
@active_cpen 계정 active 권한 spec
*/
let tx_enroll_user = (receiver, own_pub, act_pub) => {
    
    let new_acc_action = {
        account: EOS.ACC.CONTRACT.MAIN,
        name: FUNC.ACC.NEW,
        authorization: [{
          actor: ACC.MGR_ACC.NAME,
          permission: PERM.ACTIVE,
        }],
        data: {
            creator: ACC.MGR_ACC.NAME,
            name: receiver,
            owner: perm_data(own_pub),
            active: perm_data(act_pub),
        },
    }
    return new_acc_action;
}

/*
** ram 구매 트랜젝션
@is_buy 구매인지 판매인지
@buyer 구매자 
@receiver 계정 사용자
*/
let tx_rams = (is_buy, buyer, owner) => {
    
    let buy_or_delegate = '';
    let ram_data = {};
    ram_data.bytes = RESOURCE.RAM.QUANTITY.DEFAULT;
    
    if(is_buy == BUY.BUY){
        buy_or_delegate = FUNC.SOURCE.RAM.BYTES.BUY;
        ram_data.payer = buyer;
        ram_data.receiver = owner;
    }else if(is_buy = BUY.SELL){
        buy_or_delegate = FUNC.SOURCE.RAM.BYTES.SELL;
        ram_data.account = owner
    }
    let buy_rams_action = {
        account: EOS.ACC.CONTRACT.MAIN,
        name: buy_or_delegate,
        authorization: [{
            actor: buyer,
            permission: PERM.ACTIVE,
        }],
        data: ram_data
    }
    return buy_rams_action;
}

/*
** cpu, net 리소스 부여 트랜젝션
@is_stake 구매인지 판매인지
@buyer 구매자
@receiver 계정 사용자
*/
let tx_stake = (is_stake, buyer, owner) => {

    let is_stake_or_unstake = "";
    let stake_data = {};
    stake_data.from = ACC.MGR_ACC.NAME
    stake_data.receiver = owner
    stake_data.transfer = RESOURCE.DELEGATE.TRANSFER.LOAN

    if(is_stake == BUY.BUY){
        is_stake_or_unstake = FUNC.SOURCE.STAKE
        stake_data.stake_cpu_quantity = RESOURCE.DELEGATE.QUANTITY.CPU
        stake_data.stake_net_quantity = RESOURCE.DELEGATE.QUANTITY.NET
    }else if(is_stake == BUY.SELL){
        is_stake_or_unstake = FUNC.SOURCE.UNSTAKE
        stake_data.unstake_cpu_quantity = RESOURCE.DELEGATE.QUANTITY.CPU
        stake_data.unstake_net_quantity = RESOURCE.DELEGATE.QUANTITY.NET
    }
    let stake_action = {
        account: EOS.ACC.CONTRACT.MAIN,
        name: is_stake_or_unstake,
        authorization: [{
            actor: buyer,
            permission: PERM.ACTIVE,
        }],
        data: stake_data
    }
    return stake_action;
}

/*
** 회원 가입 액션 로그 트랜젝션
@user 사용자
@action 행동
*/
let tx_enroll_user_log = (service, user, time_stamp, email, owner_pub, active_pub) => {
    
    let new_acc_action = {
        account: ACC.USER_ACTION.NAME,
        name: FUNC.MGR_ACC.PROFILE,
        authorization: [{
          actor: user,
          permission: PERM.ACTIVE,
        }],
        data: {
            service_name: service,
            user:user ,
            time_stamp: time_stamp,
            email: email,
            owner_public: owner_pub,
            active_public: active_pub
        },
    }
    return new_acc_action;
}

/*
** 사용자 행동 트랜젝션
@user 사용자
@action 행동
*/
let tx_user_action = (user, act_type, serial, act_time, rwd_amt) => {

    let func = FUNC.REWARD[act_type];
    let user_action = {
        account: ACC.USER_ACTION.NAME,
        name: func,
        authorization: [{
            actor: user,
            permission: PERM.ACTIVE,
        }],
        data: {
            user: user,
            action_type: func, 
            serial: serial,
            time_stamp: act_time,
            reward_amount: rwd_amt,
        }
    }
    return user_action;
}
/*
** 사용자 행동 트랜젝션 추가
@user 사용자
@action 행동
*/
let tx_user_action_add = (user, act_time, data) => {

    let user_action = {
        account: ACC.USER_ACTION.NAME,
        name: "other",
        authorization: [{
            actor: user,
            permission: PERM.ACTIVE,
        }],
        data: {
            user: user, 
            time_stamp: act_time,
            data: data
        }
    }
    return user_action;
}

/*
** 토큰 전송 트랜젝션
@from 전송자
@to 수신자
@quantity 수량
@memo 메모
*/
let tx_create_token = (max_supply) => {
    
    let create_action = {
        account: ACC.TOKEN.NAME,
        name: FUNC.TOKEN.CREATE,
        authorization: [{
            actor: ACC.TOKEN.NAME,
            permission: PERM.ACTIVE,
        }],
        data: {
            issuer: ACC.TOKEN.NAME,
            maximum_supply: max_supply,
        }
    }
    return create_action;
}

/*
** 토큰 리워드 트랜젝션
@to 수신자
@quantity 수량
@memo 메모
*/
let tx_reward_token = (to, quantity, memo) => {

    let reward_action = {
        account: ACC.TOKEN.NAME,
        name: FUNC.TOKEN.REWARD,
        authorization: [{
            actor: ACC.TOKEN.NAME,
            permission: PERM.ACTIVE,
        }],
        data: {
            to: to,
            quantity: quantity, 
            memo: memo
        }
    }
    return reward_action;
}

/*
** 토큰 전송 트랜젝션
@from 전송자
@to 수신자
@quantity 수량
@memo 메모
*/
let tx_send_token = (from, to, quantity, memo) => {
    
    let send_action = {
        account: ACC.TOKEN.NAME,
        name: FUNC.TOKEN.TRANSFER,
        authorization: [{
            actor: from,
            permission: PERM.ACTIVE,
        }],
        data: {
            from: from,
            to: to,
            quantity: quantity, 
            memo: memo
        }
    }
    return send_action;
}

/*
** 계정별 토큰 홀딩 트랜젝션
@user 홀딩할 사용자
@token 홀딩할 토큰
@is_allow 홀딩(0) / 허가(1) 여부
@memo 홀딩 사유
*/
let tx_allow_transfer = (user, token, is_allow, memo) => {

    let allow_action = {
        account: ACC.TOKEN.NAME,
        name: FUNC.TOKEN.ALLOW,
        authorization: [{
            actor: ACC.TOKEN.NAME,
            permission: PERM.ACTIVE,
        }],
        data: {
            account: user, 
            token: token, 
            isAllow: is_allow, 
            memo: memo
        }
    }
    return allow_action; 
}

/*
** 전체 토큰 홀딩 트랜젝션
@token 홀딩할 토큰
@is_freeze 홀딩(0) / 허가(1) 여부
*/
let tx_freeze_token = (token, is_freeze) => {

    let freeze_action = {
        account: ACC.TOKEN.NAME,
        name: FUNC.TOKEN.FREEZE,
        authorization: [{
            actor: ACC.TOKEN.NAME,
            permission: PERM.ACTIVE,
        }],
        data: {
            token: token, 
            isFreeze: is_freeze
        }
    }
    return freeze_action;
}

/*
** 트랜젝션의 permossion 데이터
@key 사용자의 key
*/
let perm_data = (key) => {

    let data = {
        threshold: 1,
        keys: [{
            key: eos.Numeric.convertLegacyPublicKey(key),
            weight: 1
        }],
        accounts: [],
        waits: []
    }
    return data;
}

module.exports = {
    tx_enroll_user,
    tx_rams,
    tx_stake,
    tx_enroll_user_log,
    tx_user_action,
    tx_user_action_add,
    tx_create_token,
    tx_reward_token,
    tx_send_token,
    tx_allow_transfer,
    tx_freeze_token
}
