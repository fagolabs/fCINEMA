const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieGenreModelSchema = new Schema({
    id: Number,
    name: String
})
module.exports = mongoose.model('MovieGenreModel', MovieGenreModelSchema);