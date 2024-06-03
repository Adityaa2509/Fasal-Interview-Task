const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    movies:[
        {type:String}
    ],
    isPublic:{
        type:Boolean,
        default:true
    },
    sharableLink:{
        type:String,
        unique:true
    }
})


const List = mongoose.model('List',listSchema)

module.exports = List;