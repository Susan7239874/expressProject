var express = require('express');
var router = express.Router();
var models = require('../models');
var Op=models.Sequelize.Op;
/* GET home page. */
// 1-2种写法
router.get('/', function (req, res, next) {//=>/articles/
    models.Article.findAll().then(articles => {
        res.json({data: articles});
    })
});
router.get('/one', async function (req, res, next) {//=>/articles/one
    var articles = await models.Article.findAll({order: [['id', 'DESC']]});//根据id倒序，默认是id正序
    res.json({data: articles});
});
//2-增删改查 （2个查法）
router.post('/', async function (req, res, next) {//=>/articles/add  新增
    await models.Article.create(req.body)
    res.json({code:200,message: '请求成功！'})
})
// router.get('/:id',async function(req,res,next){//=>/articles/2    查询
//   var article=await models.Article.findByPk(req.params.id);//根据主键查数据，主键一般指id
//   res.json({code:200,message:'请求成功！',data:article});
// })
router.get('/find',async function(req,res,next){//=>/articles/find?id=2
  var article=await models.Article.findByPk(req.query.id);//根据主键查数据，主键一般指id，这里是query
  res.json({code:200,message:'请求成功！',data:article});
})
router.put('/:id',async function(req,res,next){ //修改
  var article=await models.Article.findByPk(req.params.id);//这是params
  article.update(req.body);
  res.json({code:200,message:'修改成功！'});
})

router.delete('/:id',async function(req,res,next){
  var article=await models.Article.findByPk(req.params.id);
  article.destroy();
  res.json({code:200,message:'删除成功！'});
})
//3-模糊查询, 上面的get('/:id')注释掉下面才有效，否则路由重复会走上面的
router.get('/search',async function(req,res,next){
  var where={}
  var title=req.query.title;
  if(title){
    where.title={
      [Op.like]:'%'+title+'%'//模糊查询title字段匹配的数据，注意只查title
  }
  }
  var articles=await models.Article.findAll({
    order:[['id','DESC']],
    where:where
  })
    res.json({articles:articles})
})
//4-分页查询
router.get('/pagesearch',async function(req,res,next){
  var currentPage=parseInt(req.query.currentPage)||1;
  var pageSize=parseInt(req.query.pageSize)||2;
  var where={}
  var title=req.query.title;
  if(title){
    where.title={
      [Op.like]:'%'+title+'%'//模糊查询title字段匹配的数据，注意只查title
    }
  }
  var result=await models.Article.findAndCountAll({//查询title有关的，倒序的，分页
    order:[['id','DESC']],
    where:where,
    offset:(currentPage-1)*pageSize,
    limit:pageSize
  })
  res.json({code:200,data:result})
  // offset=(currentPage-1)*pageSize=>offset指请求页的第一项序号
  //   currentPage  offset pageSize
  //    1           0           10
  //    2           10          10
  //    3           20          10
  //    4           30          10
})

// 查询id=1的内容和所有评论（两个表）【models-article+comment =>static associate(models) 内语句是新加的，否则无法关联】
router.get('/findarticle',async function(req,res,next){
  var article=await models.Article.findOne({
    where:{id:req.query.id},
    include:[models.Comment]
  })
  res.json({article:article});
})

module.exports = router;
