/**
 * Created by Administrator on 2018/10/8 0008.
 */
const mongoose=require("mongoose");
const category=new mongoose.Schema({
    name:String
},{versionKey:false})
module.exports=mongoose.model('category',category)