const userResolver = require("./userResolver");
const beerResolver = require("./beerResolver");


const resolvers = {
    Query: {
        current: userResolver.getCurrentUser,
        beer: beerResolver.getById,
        beers: beerResolver.getByBrand
    },

    Mutation: {
        register: userResolver.register,
        login: userResolver.login,
        createBeer: beerResolver.create
    },
};  

module.exports = resolvers;