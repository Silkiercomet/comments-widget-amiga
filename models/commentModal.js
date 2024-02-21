const mongoose = require("mongoose")

const { Schema } = mongoose;

const ReplySchema = new Schema({
    user: String,
    comment: String
});

const CommentSchema = new Schema({
    user: {type:String, required:true},
    comment: {type:String, required:true},
    course: {type:String, required:true},
    replies: [ReplySchema]
});



// el primer parametro es el nombre de la colleccion a la que pertenece el model, es segundo es la schema
const Course = mongoose.model('comments', CommentSchema);

module.exports = Course