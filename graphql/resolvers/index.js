const userResolvers = require('./user');
const noteResolvers = require('./note')

module.exports = {
    Query: {
        ...noteResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...noteResolvers.Mutation
    }
}