const mongoose = require("mongoose")

const chatSchema  = new mongoose.Schema({
    name : {
        type  :String,
        required : true
    },
    groupChat : {
        type : Boolean,
        default : false
    },
    creator : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    member:[{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }]
},{
    timestamps : true,
}
)

const Chat = mongoose.Model("Chat", chatSchema)

module.exports = Chat