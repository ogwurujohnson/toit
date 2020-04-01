const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB } = require("./config");

const typeDefs = gql`
    type Note {
        id: ID!
        body: String!
        createdAt: String!
    }

    type Query {
        getNotes: [Note]
    }
`;

const resolvers = {
    Query: {
        getNotes() {
        return [];
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
    .connect(MONGODB, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log("MongoDB connected");
        return server.listen({
        port: 5000
        });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    });
