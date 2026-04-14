const express = require('express');
const {config} = require('../config/Config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../model/User');

const register = async (userName,password)=>{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    let user = new User({
        username: userName,
        password: hashPassword,
    });
    return user.save();
}
const login = async (userName,password)=>{
    const filter = {
        username:userName
    };
    console.log('Filter', filter);
    const user = await User.findOne(filter);
    if(user)
    {
        const validPass= await bcrypt.compare(password, user.password);
        if(validPass)
        {
            return user;
        }
        else
        {
            throw Error("Invalid user or password");
        }

    }
    throw Error("Invalid user or password");
};
const getUserById = (userId)=>{
    return {
        userId: userId,
    }
}

module.exports = {
    register,
    getUserById,
    login,

}