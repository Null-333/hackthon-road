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
                    password: req.body.password
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
    res.send('Login======');
}

router.post('/register', Register);
router.post('/login', Login);

module.exports = router;