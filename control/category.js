/**
 * Created by Administrator on 2018/10/6 0006.
 */
const express = require ('express')
const router = express.Router()
const categoryModel=require ('../model/category')

//获取所有分类
router.get('/category',(req,res)=>{
    categoryModel.find().then(data=>{
        res.json({
            code:200,
            data
        })
    })
})
//获取单条分类信息
router.get('/category/:id',(req,res)=>{
    let {id}=req.params
    categoryModel.findOne({_id:id}).then(data=>{
        res.json({
            code:200,
            data
        })
    })
})
module.exports=router