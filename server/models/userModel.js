const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        //space allowed
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    lastvisit: {
        type: String,
        required: true,
    }
},
// {
//     timeStamps: true,
// }
);
const User = mongoose.model("users", userSchema);

module.exports = User;