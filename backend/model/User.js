const mongo = require('mongoose');

const userSchema = mongo.Schema(
    {
        name: { type: String, reuqired: true },
        email: { type: String, reuqired: true, unique: true },
        password: { type: String, reuqired: true }
    },
    { timestamps: true }
)

module.exports = mongo.model('User', userSchema);