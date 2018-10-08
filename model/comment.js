/**
 * Created by Administrator on 2018/10/8 0008.
 */
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const comment=new Schema({
    content:String,
    authorMsg:{type:Schema.Types.ObjectId,ref:'user'},
    articleId:String
},{versionKey:false,timestamps:{createdAt:'createdTime',updatedAt:'updateTime'}})
module.exports=mongoose.model('comment',comment)