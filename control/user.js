/**
 * Created by Administrator on 2018/10/6 0006.
 */
const express = require('express')
const router = express.Router()
const userModel = require('../model/user')
//post请求req.body
//get请求req.query
//动态路由req.params
//注册接口
router.post('/register', async (req, res) => {
    try {
        let {username, password, email} = req.body
        let userInfo = await userModel.findOne({email})
        if (userInfo) {
            throw "邮箱已被注册"
        } else {
            await userModel.create({username, password, email})
            res.json({
                code:200,
                msg:"注册成功"
            })
        }
    } catch (e) {
        res.json({
            code:400,
            msg:e
        })
    }
})
//登录接口
router.post('/login',async (req,res)=>{
    try {
        let {email,password}=req.body
        let userInfo=await userModel.findOne({email})
        if(userInfo){
            if(password == userInfo.password){
                req.session.userInfo=userInfo
                res.json({
                    code:200,
                    msg:"登录成功",
                    data:{
                        username:userInfo.username,
                        desc:userInfo.desc,
                        avatar:userInfo.avatar,
                        email:userInfo.email
                    }
                })
            }else{
                throw "密码错误"
            }
        }else {
           throw "用户不存在"
        }
    }catch (e) {
       res.json({
           code:400,
           msg:e
       })
    }



})
//退出登录接口
router.get('/logout',(req,res)=>{
    if(req.session.userInfo){
        req.session.userInfo=null
        res.json({
            code:200,
            msg:"退出成功"
        })
    }else{
        res.json({
            code:403,
            msg:"用户未登录"
        })
    }
})
module.exports=router
