const { UserInputError } = require('apollo-server');

const Note  = require('../../models/Note');
const checkAuth = require('../../utils/check-auth');

const {
    AuthenticationError
} = require('apollo-server');

module.exports = {
    Query: {
        async getNotes(_,{}, context) {
            const user = checkAuth(context);
            try {
                const notes = await Note.find({username: user.username}).sort({
                    createdAt: 1
                });
                return notes;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getNote(_, { noteId }, context) {
            const user = checkAuth(context);
            try {
                const note = await Note.findOne({_id: noteId, username: user.username})
                if (note) {
                    return note;
                } else {
                    throw new Error('Post not found')
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createNote(_, {body, type}, context) {
            const user = checkAuth(context);

            const newNote = new Note({
                body,
                type,
                isArchived: false,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const note = await newNote.save();
            return note;
        },
        async deleteNote(_, { noteId }, context) {
            const user = checkAuth(context);

            try {
                const note = await Note.findById(noteId);
                if (user.username === note.username) {
                    await note.delete();
                    return 'Note deleted successfully'
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async editNote(_, { noteId, body }, context) {
            const user = checkAuth(context);

            try {
                const note = await Note.findById(noteId);
                if (user.username === note.username) {
                    note.body = body;
                    const newBody = await note.save();
                    return newBody;
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}