const mongoose = require("mongoose");
const { DB_URL } = require("./config");
const argon2 = require("argon2");
mongoose.connect(DB_URL);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength:3,
        maxLength:40,
    },
    password: {
        type: String,
        required:true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength:40,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength:40,
    }
});

userSchema.methods.createHash = async (pass)=>{
    return await argon2.hash(pass);
}

userSchema.methods.validatePassword = async function(pass){
    return await argon2.verify(this.password, pass);
}

const User = mongoose.model("User",userSchema);

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type: Number,
        required:true
    }
})

const Account = mongoose.model("Account",accountSchema)

module.exports = {User,Account};