const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieGenreModelSchema = new Schema({
    gen_id: Number,
    name: String
   },
    { autoIndex : false}
)
module.exports = mongoose.model('MovieGenreModel', MovieGenreModelSchema);