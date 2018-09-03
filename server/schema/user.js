const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    id: {
        type: String,
        unique: true,
    },
    password: String
});

module.exports = mongoose.model('UserSession', userSchema);
