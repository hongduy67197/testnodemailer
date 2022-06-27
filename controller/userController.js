const usersModel = require('../models/userSchema')
const { hashPassword, comparePassword } = require('../services/auth')
const { transporter, generateCode, sendEMail } = require("../utils/utils");
const { CodeCheck } = require("../utils/utils");
const { validateEmail, validatePassPartern } = require('../utils/validate')
const codeCheck = new CodeCheck();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async function (req, res) {
    try {
        const { password, email, username } = req.body;
        if (validateEmail(email) && validatePassPartern(password)) {
            const alreadyExistEmail = await usersModel.findOne({ email: email });
            if (alreadyExistEmail) {
                return res.status(400).json({ status: "Email already exists" });
            } else {
                const hashed = await hashPassword(password);
                const newUser = await usersModel.create({
                    // email: email,
                    username: username,
                    password: hashed,
                });
                codeCheck.setCode(generateCode());
                await sendEMail(newUser._id, email, codeCheck.getCode(), transporter);
                newUser.code = codeCheck.getCode();
                await newUser.save();
                return res.status(200).json({ message: "create user success, please check your email" });
            }
        }
    } catch (error) {
        res.json(error);
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.params;
        const user = await usersModel.findOne({ code }).catch((err) => {
            console.log(err);
        })
        user.email = email;
        user.code = '';
        await user.save()
        res.status(200).send(`<p>create user succes</p>`)
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOne({ email });
        console.log(user);
        if (!user) {
            return res.json({ status: 'account not avilable' })
        } else {
            if (user.timeLock > Date.now()) {
                return res.json({ status: 'account was lock please back at 1 hour later' })
            } else if (user.loginExpired > new Date()) {
                return res.json({ status: 'account was login at another device' })
            }
            else {
                const matchPassword = await comparePassword(password, user.password);
                if (!matchPassword) {
                    if (user.wrongCount == 4) {
                        await usersModel.updateOne({ _id: user._id }, { wrongCount: 0, timeLock: Date.now() + 3600 * 1000 });
                        return res.json({ status: "try 1 hour late" });
                    } else {
                        await usersModel.updateOne({ _id: user._id }, { $inc: { wrongCount: 1 } });
                        return res.json({ status: 'undifind password' });
                    }
                } else {
                    let token = jwt.sign({ id: user._id }, "testNodemailer", { expiresIn: 900000 });
                    await usersModel.updateOne({ _id: user._id }, {
                        token: token, wrongCount: 0,
                        loginExpired: new Date(Date.now() + 900000)
                    });
                    res.cookie("user", token, { expires: new Date(Date.now() + 900000) });
                    res.json({
                        data: { token: token, userData: user },
                        mess: "oke",
                    });
                }
            }
        }
    } catch (error) {
        res.json(error);
    }
};

exports.logOut = async function (req, res) {
    try {
        console.log(req.params.id);
        let user = await usersModel.updateOne(
            { _id: req.params.id },
            {
                token: "",
                loginExpired: new Date()
            }
        );
        res.status(200).json({ message: "logout success" });
    } catch (error) {
        console.log(102, error);
        res.json(error);
    }
};
