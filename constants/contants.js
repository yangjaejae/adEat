require("dotenv").config();

// testnet
const NODE = [
    {url:"http://39.108.231.157", port:"30065"},
    {url:"https://api.kylin-testnet.eospacex.com", port:""},
    {url:"http://kylin.fn.eosbixin.com", port:""},
    {url:"http://api.kylin.eoseco.com", port:""},
    {url:"http://178.62.36.41", port:"8888"},
    {url:"https://api.kylin.alohaeos.com", port:""}, // 5
    {url:"http://api.kylin.helloeos.com.cn", port:""},
    {url:"https://kylin.eoscanada.com", port:""}, // 7
    {url:"http://api-kylin.starteos.io", port:""},
    {url:"http://api.kylin.eosbeijing.one", port:"8880"},
    {url:"http://kylin-testnet.jeda.one", port:"8888"},
    {url:"http://kylin.meet.one", port:"8888"}, // 11
    {url:"https://api-kylin.eosasia.one", port:""}, // 12
    {url:"https://api-kylin.eoslaomao.com", port:""}, // 13
]

// mainnet
// const NODE = [
//     {url:"https://api.eosnewyork.io", port:""},
//     {url:"https://api.eosio.cr", port:"80"},
//     {url:"http://kylin.fn.eosbixin.com", port:""},
//     {url:"http://api.kylin.eoseco.com", port:""},
//     {url:"http://178.62.36.41", port:"8888"},
//     {url:"https://api.kylin.alohaeos.com", port:""}, // 5
//     {url:"http://api.kylin.helloeos.com.cn", port:""},
//     {url:"https://kylin.eoscanada.com", port:""}, // 7
//     {url:"http://api-kylin.starteos.io", port:""},
//     {url:"http://api.kylin.eosbeijing.one", port:"8880"},
//     {url:"http://kylin-testnet.jeda.one", port:"8888"},
//     {url:"http://kylin.meet.one", port:"8888"}, // 11
//     {url:"https://api-kylin.eosasia.one", port:""}, // 12
//     {url:"https://api-kylin.eoslaomao.com", port:""}, // 13
// ]

const PERM = {
    OWNER: "owner",
    ACTIVE: "active" 
}

const BUY = {
    BUY: 0, 
    SELL: 1
}

const RESOURCE = {
    DELEGATE: {
        QUANTITY: {
            CPU: "0.1000 EOS",
            NET: "0.0050 EOS"
        },
        TRANSFER: {
            LOAN: false, 
            GIVE: true
        }
    },
    RAM: {
        QUANTITY: {
            // DEFAULT: 8192
            DEFAULT: 2000
        }
    }
}

const ACC = {
    MGR_ACC: {
        NID: 519082812340090,
        NAME: process.env.MGR_ACC
    },
    TOKEN: {
        NID: 519082812443509,
        NAME: process.env.TOKEN
    },
    USER_ACTION: {
        NID: 519082812712066, 
        NAME: process.env.USERACTION
    },
};

const EOS = {
    ACC: {
        NAME: "eosio", 
        CONTRACT: {
            MAIN: "eosio",
            TOKEN: "eosio.token", 
            MSIG: "eosio.msig",
            SYSTEM: "eosio.system"
        }
    }
}

const FUNC = {
    ACC: {
        NEW: "newaccount"
    },
    SOURCE: {
        RAM: {
            BYTES: {
                BUY: "buyrambytes",
                SELL: "sellram"
            },
            EOS: {
                BUY: "buyram",
                SELL: ""
            }
        },
        STAKE: "delegatebw",
        UNSTAKE: "undelegatebw"
    },
    TOKEN: {
        CREATE: "create",
        TRANSFER: "transfer",
        REWARD: "reward",
        ALLOW: "allow",
        FREEZE: "freeze"
    }, 
    REWARD: [
        "schedule", //1
        "place", //2
        "refundticket", //3 
        "walk", //4
        "airticket", //5
        "logmentbefore", //6
        "logment", //7
        "welcome", //8
        "allow_location", //9
        "walk_throght" //10
    ],
    MGR_ACC: {
        PROFILE: "profile"
    }
}

const TOKEN = {
    SYMBOL: process.env.EOS_TOKEN_SYMBOL
}

const MODEL = {
    NEW_ACCOUNT: "new_account_model", 
    BUY_RAM: "buy_ram_model", 
    STAKING: "staking_model",
    USER_ACTION: "user_action_model", 
    REWARD_TOKEN: "reward_token_model",
    SEND_TOKEN: "send_token_model"
}

const SUCCESS = {
    CODE: {
        OK: 200, 
    },
    MESSAGE: {
        OK: "success"
    },
    FUNC: {
        NEW_ACCOUNT: 0, 
        BUY_RAM: 1, 
        STAKING: 2,
        USER_ACTION: 3,
        CREATE_TOKEN: 4, 
        REWARD_TOKEN: 5,
        SEND_TOKEN: 6,
        GET_ACCOUNT: 7,
        GET_TOTAL_CURRENCY: 8,
        GET_ACCOUNTS_CNT: 9
    }
}

const MESSAGE = {
    ALLOW: "allow this account",
    NOT_ALLOW: "not allow this account",
    TOKEN_REQUIRED: "cert token is required",
    NOT_FOUND_TOKEN: "can not found access token",
    INVALID_TOKEN: "access token is invalid"
}

const ERROR = {
    ERROR: "error",
    TYPE: {
        REQUEST: {
            CODE: 600,
            MESSAGE: "bad request error"
        },
        FORBIDDEN: {
            CODE: 603,
            MESSAGE: "cert token is required"
        },
        TOKEN_INVALID: {
            CODE: 604,
            MESSAGE: "access token is invalid"
        },
        NID_INVALID: {
            CODE: 605,
            MESSAGE: "NID is not equal"
        },
        DATABASE: {
            CODE: 609, 
            MESSAGE: "database error"
        },
        BLOCKCHAIN: {
            CODE: 601, 
            MESSAGE: "blockchain error"
        },
        ETC: {
            CODE: 610, 
            MESSAGE: "other error"
        }
    },
    // eos network / account name validation
    01: "Error: account names can only be 12 chars long",
    02: "Error: Cannot create account named chainscott12, as that name is already taken",
    03: "Error: assertion failure with message: no active bid for name",
    // eos network / permission error
    04: "Error: transaction declares authority '{\"actor\":\"trl5cisibotx\",\"permission\":\"active\"}', but does not have signatures for it.",
    05: "Error: the transaction was unable to complete by deadline, but it is possible it could have succeeded if it were allowed to run to completion",
    // eos network / resource error
    06: "Error: assertion failure with message: no balance object found",
    07: "Error: billed CPU time (895 us) is greater than the maximum billable CPU time for the transaction (404 us)",
    // eos network / node fetch error
    08: "FetchError: invalid json response body at http://39.108.231.157/v1/chain/get_info reason: Unexpected token < in JSON at position 0",
    09: "FetchError: request to https://api.kylin-testnet.eospacex.com/v1/chain/get_info failed, reason: getaddrinfo ENOTFOUND api.kylin-testnet.eospacex.com api.kylin-testnet.eospacex.com:443",
    10: "FetchError: request to http://kylin.fn.eosbixin.com/v1/chain/get_info failed, reason: connect ETIMEDOUT 47.56.38.135:80",
    11: "FetchError: request to http://178.62.36.41/v1/chain/get_info failed, reason: connect ECONNREFUSED 178.62.36.41:80",
    // contract error 
    12: "Error: fetching abi for trkx4ultouht: Read past end of buffer",
    // contract error / token / policy
    13: "Error: assertion failure with message: overdrawn balance",
    14: "Error: assertion failure with message: unable to find key",
    15: "Error: assertion failure with message: symbol precision mismatch",
    16: "Error: assertion failure with message: cannot transfer to self",
    // contract error / token / type validation
    17: "Error: number is out of range",
    18: "Error: Asset must begin with a number",
    19: "Error: assertion failure with message: memo has more than 256 bytes",
    // contract error / user action / function
    20: "Error: Unknown action walk in contract chainscott13",
}

const CERT_LEVEL = {
    LEVEL: process.env.TOKEN_CERT
}

const DATABASE_LEVEL = {
    LEVEL: process.env.DATABASE_ENV
}

const LOG_ENV = {
    LEVEL: process.env.LOGGER_ENV
}

const SERVER_CONFIG = {
    PORT: "3000",
}

const CIPHER = {
    KEY: [
        "none",
        "fastball",
        "four-seam", 
        "two-seam", 
        "curve", 
        "changeup"
    ]
}

const SERVICE = {
    NAME: "travelre"
}

module.exports = {
    NODE,
    PERM,
    BUY,
    RESOURCE,
    ACC,
    EOS,
    FUNC,
    TOKEN,
    MODEL,
    SUCCESS,
    MESSAGE,
    ERROR,
    CERT_LEVEL,
    DATABASE_LEVEL,
    LOG_ENV, 
    SERVER_CONFIG,
    CIPHER,
    SERVICE
}
