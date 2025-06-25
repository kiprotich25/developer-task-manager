const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["developer", "admin"], default: "developer" }//The enum option defines a set of allowed values for a string (or number) field.
});

module.exports = mongoose.model("User", userSchema);