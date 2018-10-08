/**
 * Created by Administrator on 2018/10/6 0006.
 */
const express = require('express')
const router = express.Router()
const articleModel = require('../model/article')

//保存文章
router.post('/article',async (req,res)=>{
    try {
        if(req.session.userInfo){
            let {title,content,contentText,category}=req.body
            let author=req.session.userInfo.username
            let authorMsg=req.session.userInfo._id
            await articleModel.create({title,content,contentText,category,author,authorMsg})
            res.json({
                code:200,
                msg:"保存成功"
            })
        }else{
            res.json({
                code:403,
                msg:"登录状态失效"
            })
        }
    }catch(e){

    }
})
//获取单个文章
router.get('/article/:id',async (req,res)=>{
    try {
        let { id }=req.params
        let data = await articleModel.findOne({_id:id})
            .populate({
                path:'authorMsg',
                select:'-password'
            })
            .populate({
                path:'category'
            })
        res.json({
            code:200,
            data
        })

    }catch(e){

    }
})
//增加阅读数
router.put('/lookNums/:id',(req,res)=>{
    let {id}=req.params
    articleModel.updateOne({_id:id},{$inc:{lookNums:1}}).then(data=>{
        res.json({
            code:200,
            msg:"阅读数加一"
        })
    })
})
//增加评论数
router.put('/commentNums/:id',(req,res)=>{
    let {id}=req.params
    articleModel.updateOne({_id:id},{$inc:{commentNums:1}}).then(data=>{
        res.json({
            code:200,
            msg:"评论数加一"
        })
    })
})
//获取个人所有文章
router.get('/personalArticle',(req,res)=>{
    if(req.session.userInfo){
        let id=req.session.userInfo._id
        articleModel.find({authorMsg:id}).then(data=>{
            res.json({
                code:200,
                data
            })
        })

    }else{
        res.json({
            code:403,
            msg:"登录状态失效"
        })
    }
})
//获取文章默认前十篇
router.get('/article',async (req,res)=>{
    try {
        let {pn=1,size=10}=req.query
        pn=parseInt(pn)
        size=parseInt(size)
        if(req.session.userInfo){
           let data=await articleModel.find()
                .skip((pn-1)*size)
                .limit(size)
                .sort({lookNums:-1})
                .populate({
                    path:'authorMsg',
                    select:'-password'
                })
                .populate({
                    path:'category'
                })
            res.json({
                code:200,
                data
            })
        }else{
            res.json({
                code:403,
                msg:'登录状态失效'
            })
        }
    }catch(e){

    }
})
module.exports=router