let userService = require("../service/UserService");
const {config} = require("../config/Config");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require("../routes");
const {getUserById} = require("../service/UserService");

const registerUser = async (req, res)=>
{
    let userName = req.body['userName'];
    let password = req.body['password'];
    try
    {
        let user = await userService.register(userName, password);
        let payload = {id: user.id};
        const token = jwt.sign(payload, config.TOKEN_SECRET);
        res.status(200).send({ token});
    }
    catch(err) {
        console.log(err)
        res.status(400).send({message:"User already exists"});
    }

};
const login = async (req, res,next)=>
{
    let userName = req.body['userName'];
    let password = req.body['password'];
    try
    {
        let user = await userService.login(userName, password);
        let payload = {id: user.id};
        const token = jwt.sign(payload,config.TOKEN_SECRET);
        res.status(200).send({ token});

    }
    catch(err) {
        console.log(err);
        res.status(401).send({message:"Invalid user"});
    }
};
module.exports = {
    registerUser,
    login,
    getUserById : userService.getUserById

}
