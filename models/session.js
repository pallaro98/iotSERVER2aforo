var {mongoose} = require('../config/mongodb-connect');
var UserHelper = require('../helpers/UserHelper'); 

const Schema = mongoose.Schema;

const sessionSchema = new Schema ({
    userId: String,
    token: String,
    isActive: Boolean
})

sessionSchema.statics.createSession = function (__user) {
    let Session = this;
    let token = UserHelper.createJWT(__user);
    return new Promise((resolve, reject)=>{

        const data = {
            userId: __user,
            token: token,
            isActive: true
        }

        const newSession = new Session(data);

        newSession.save((err)=>{
            if(err){
                reject();
            } else {
                resolve(token);
            }
        });
    })
}

sessionSchema.statics.closeSession = function (__token) {
    let Session = this;
    return new Promise((resolve, reject) => {
        const query = {
         token: __token,
        };
        const update = {
         isActive: false,
        };
        Session.findOneAndUpdate(query, update, function(err,user){
         resolve(user);
        });
    })
}

sessionSchema.statics.checkSession = function (__token) {
    let Session = this;
    var query = Session.find({ token: __token});
    return query.exec();
}

let Session = mongoose.model('session', sessionSchema);

module.exports = {Session};
