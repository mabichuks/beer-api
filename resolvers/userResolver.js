const { User } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require('dotenv').config();


const JWT_SECRET = require("../constants");

var userResolver = {};

userResolver.getCurrentUser = async (_, args, { user }, info) => {
    console.log("user resolver reached");

    if (user) {
        return await User.findOne({ where: { id: user.id } });
    }
    throw new Error("Sorry, you're not an authenticated user!");
};

userResolver.register = async (_, { login, password }) => {
    const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
    });

    return jsonwebtoken.sign({ id: user.id, login: user.login }, process.env.JWT_SECRET, {
        expiresIn: "30m",
    });
};

userResolver.login = async (_, { login, password }) => {
    const user = await User.findOne({ where: { login } });

    if (!user) {
        throw new Error(
            "This user doesn't exist. Please, make sure to type the right login."
        );
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new Error("You password is incorrect!");
    }

    return jsonwebtoken.sign({ id: user.id, login: user.login }, provess.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

module.exports = userResolver;