const { gql } = require('apollo-server');

module.exports = gql `
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    type Note {
        id: ID!
        body: String!
        type: String!
        username: String!
        isArchived: Boolean!
        createdAt: String!
    }
    
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getNotes: [Note]
        getNote(noteId: ID!): Note
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String): User!
        createNote(body: String!, type: String!): Note!
        deleteNote(noteId: ID!): String!
        editNote(noteId: ID!, body: String!): Note!
    }
`;