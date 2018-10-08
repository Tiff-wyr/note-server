/**
 * Created by Administrator on 2018/10/6 0006.
 */
const express=require('express')
const router=express.Router()
const commentModel=require('../model/comment')

//获取一篇文章的所有评论
router.get('/comment/:id',(req,res)=>{
    if (req.session.userInfo){
        let {id}=req.params
        commentModel.find({articleId:id}).then(data=>{
            res.json({
                code:200,
                data
            })
        })
    } else{
        res.json({
            code:403,
            msg:'登录状态失效'
        })
    }
})
//添加评论
router.post('/comment',(req,res)=>{
    let {content,articleId}=req.body
    if(req.session.userInfo){
        let authorMsg=req.session.userInfo._id
        commentModel.create({content,authorMsg,articleId}).then(data=>{
            res.json({
                code:200,
                msg:'添加成功'
            })
        })
    }

})
module.exports=router
