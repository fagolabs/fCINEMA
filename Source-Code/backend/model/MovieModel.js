let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let movieGenreModel = require('./MovieGenreModel');

let movieModelSchema = new Schema({
   id: Number,
   name: String,
   release_year: Number,
   run_time: Number,
   rate: Number,
   poster_path: String,
   genre: [String],
   theater: Boolean
});
movieModelSchema.query.byName = function(name) {
   return this.where({name: new RegExp(name,"gi")});
};
module.exports = mongoose.model('Movie', movieModelSchema);
