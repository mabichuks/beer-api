const { Beer } = require("../models");
const sequelize = require("sequelize");


var beerResolver = {};

beerResolver.getById = async (root, { id }, { user })  =>{
    if (user) {
        return await Beer.findOne({where : {id}});
    }
    throw new Error("Sorry, you're not an authenticated user!");
};

beerResolver.getByBrand = async (_, { brand }, { user }) => {
    var lookUpValue = brand.toLowerCase();
    if (user) {
        return await Beer.findAll({
            where : {
                brand: sequelize
                .where(sequelize.fn('LOWER', sequelize.col('brand')), 'LIKE', '%' + lookUpValue + '%')
            }
        });
    }
    throw new Error("Sorry, you're not an authenticated user!");
};

beerResolver.create = async (root, {name, brand, price}, {user}) => {
    if(!user){
        throw new Error("Sorry, you're not an authenticated user!");
    }

    const beer = await Beer.create({
        name,
        brand,
        price
    });

    console.log("Beer created");

    return name;
};

module.exports = beerResolver;