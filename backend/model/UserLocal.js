let mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let Schema = mongoose.Schema;


let userModelSchema = new Schema({
    userName: { type: String, unique: true, require: true },
    passWord: { type: String, require: true },
    creationDate: { type: Date, require: true },
    role: String
});
userModelSchema.statics.bcryptHash = function bcryptHash(password) {
    return bcrypt.hashSync(password, 10);
}
userModelSchema.methods.isValid = function (hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.passWord);
}
module.exports = mongoose.model('User', userModelSchema);
