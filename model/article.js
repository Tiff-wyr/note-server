/**
 * Created by Administrator on 2018/10/6 0006.
 */
const mongoose=require("mongoose");
const Schema=mongoose.Schema
const article=new Schema({
    title:String,
    content:String,
    contentText:String,
    lookNums:{
        type:Number,
        default:0
    },
    commontNums:{
        type:Number,
        default:0
    },
    author:String,
    authorMsg:{type:Schema.Types.ObjectId,ref:'user'},
    category:{type:Schema.Types.ObjectId,ref:'category'},
},{versionKey:false,timestamps:{createdAt:'createdTime',updatedAt:'updateTime'}})

module.exports=mongoose.model('article',article)