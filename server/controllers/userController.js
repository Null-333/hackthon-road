const express = require('express');
const router = express.Router();
const User = require('../schema/user');

// 注册的逻辑，先检查数据库中是否有相同的身份证号
// 如果没有，则写入数据库中
const Register = (req, res) => {
    User.findOne({ id: req.body.id })
        .then((resUser) => {
            if (resUser) {
                res.send({
                    success: false,
                    error: '该账户已注册'
                })
            } else {
                const userRegister = new User({
                    name: req.body.name,
                    id: req.body.id,
                    password: req.body.password,
                    is_sign: 0,
                });
                userRegister.save((err, user) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(user);
                    }
                })
            }
        })
        .catch((err) => {
            res.send(err);
        })
}

const Login = (req, res) => {
    User.findOne({ id: req.body.id })
        .then((resUser) => {
            if (!resUser) {
                res.send({
                    success: false,
                    error: '该账户未注册'
                })
            } else if (req.body.password === resUser.password) {
                req.session.user = resUser;
                res.json({
                    success: true,
                    message: "登录成功",
                    id: resUser.id,
                });
            } else {
                res.json({
                    success: false,
                    message: "密码错误"
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
};

const GetSession = (req, res) => {
    if (req.session.user) {
        res.json({
            session: true
        });
    } else {
        res.json({
            error: '未登陆'
        });
    }
}

const Logout = (req, res) => {
    req.session.user = null;
    res.json({
        message: '退出成功'
    });
}

router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);
router.get('/', GetSession);

module.exports = router;