const {
    model,
    Schema
} = require('mongoose');

const noteSchema = new Schema({
    body: String,
    type: String,
    isDeleted: Boolean,
    username: String,
    createdAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Note', noteSchema);