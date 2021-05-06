var {mongoose} = require('../config/mongodb-connect');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: String,
    password: String
})

userSchema.statics.loginUser = function (__email, __password) {
    let User = this;
    console.log(__email);
    var query = User.find({ email: __email, password: __password});
    return query.exec();
}

userSchema.statics.registerUser = function (__email, __password) {
    let User = this;
    return new Promise((resolve, reject)=>{
        const data = {
            email: __email,
            password: __password
        }

        const newUser = new User(data);

        newUser.save((err)=>{
            if(err){
                reject();
            } else {
                resolve(newUser);
            }
        });
    })
}

let User = mongoose.model('user', userSchema);

module.exports = {User};
