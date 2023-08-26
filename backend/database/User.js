const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model("users", userSchema);
//Note :This model can then be used to interact with the "users" collection, such as creating, updating, deleting, and querying documents.