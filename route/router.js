const express = require('express');
const router = express.Router();
const app = express();

const controller = require("../controller/controller");
const verifyToken_auth = require("../utils/certtificate/jwt").verifyToken_auth;

router.post('/signin', (req, res) => {
    console.log("signin")
    controller.signin(req).then((result) => {
        console.log(result);
        res.send(result);
    })
    .catch( error => {
        res.send(error);
    });
});

router.post('/login', verifyToken_auth, (req, res) => {
    controller.login(req).then((result) => {
        console.log(result);
        res.send(result);
    })
    .catch( error => {
        res.send(error);
    });
});

router.post('/get_videos', verifyToken_auth, (req, res) => {
    controller.get_videos(req).then((result) => {
        res.send(result);
    })
    .catch( error => {
        res.send(error);
    });
});

module.exports = router;