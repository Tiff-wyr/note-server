/**
 * Created by Administrator on 2018/10/8 0008.
 */
const express=require('express')
const router=express.Router()
const user=require('../control/user')
const article=require('../control/article')
const category=require('../control/category')
const comment=require('../control/comment')

router.use(user)
router.use(article)
router.use(category)
router.use(comment)

module.exports=router

