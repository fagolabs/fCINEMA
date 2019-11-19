let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userFbSchema = new Schema({
    id: String,
    name: String, 
    email: String
})
module.exports = mongoose.model('UserFb', userFbSchema);
