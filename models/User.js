const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password : {
        type: String,
        minlength : 5
    },
    lastname : {
        type: String,
        maxlength: 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token :{
        type: String
    },
    tokenExp : {
        type : Number
    }
  
})

userSchema.pre('save', function(next){
    var user = this;

// 비밀번호 암호화 시키기
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt){
            if (err) return next(err); // 에러처리
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err); // 에러처리
                user.password = hash; // user.password에 hash값을 할당
                next();
            });
        });
    } 
})

const User = mongoose.model('User', userSchema);

module.exports = { User }