const { gql } = require("apollo-server-express");

const typeDefs = gql `
    type User {
        id: Int!
        login: String!
    }

    type Beer {
        id: Int!
        name: String!
        brand: String!
        price: Float!
    }

    type Query {
        current: User
        beer(id: Int!): Beer
        beers(brand: String!): [Beer]
    }

    type Mutation {
        register(login: String!, password: String!): String
        login(login: String!, password: String!): String
        createBeer(name: String!, brand: String!, price: Float!): String
    }
`;

module.exports = typeDefs;