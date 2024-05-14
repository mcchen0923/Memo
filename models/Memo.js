const mongoose = require('mongoose')

const MemoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'need somrthing'],
        trim:true,
        maxlength:[20,'can not more than 20']
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Memo', MemoSchema)