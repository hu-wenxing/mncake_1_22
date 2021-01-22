//引入express
const express=require('express');
//引入连接池模块pool.js
const pool=require('../pool.js');
//创建路由器对象
const r=express.Router();
//首页商品展示路由
r.get("/v1/product_list",(req,res)=>{
	pool.query("select lid,title,price,md from mncake_laptop inner join mncake_laptop_pic on laptop_id=lid",(err,result)=>{
		if(err) throw err;
		if(result.length)
		{
		  var a=[0,1,2,3,4,5,6,7,8,9],b=[];
		  for(i=0;i<a.length;i++)
		  {
			  b[b.length]=result[a[i]];
		  }
		  res.send(b);
		}
		else
		res.send("0");
	});
});
//模糊查找商品路由
r.get("/v1/search/:nr",(req,res)=>{
	pool.query("select lid,title,price,md from mncake_laptop inner join mncake_laptop_pic on lid=laptop_id where title like ?",[`%${req.params.nr}%`],(err,result)=>{
		if(err) throw err;
		if(result.length)
		res.send(result);
		else
		res.send("0");
	});
});
//单个商品详情路由
r.get("/v1/one_product/:lid",(req,res)=>{
	pool.query("select sm,md,lg,lid,title,price,scprice,promise,assess_count,sold_count,spec_1,spec_2,spec_3,spec_4,spec_5,bianhao,material,careful,provide,expl,distribution,details,is_onsale from mncake_laptop inner join mncake_laptop_pic on lid=laptop_id where lid=?",[req.params.lid],(err,result)=>{
		if(err) throw err;
		if(result.length)
		res.send(result);
		else
		res.send("0");
	});
});
//加入购物车路由
r.post("/v1/join_cart",(req,res)=>{
	pool.query("select count from mncake_shopping_cart where user_id=? and lapto_id=?",[req.body.user_id,req.body.lapto_id],(err,result)=>{
		if(err) throw err;
		if(result.length)
		{   var a=result[0].count;
		    pool.query("update mncake_shopping_cart set count=? where user_id=? and lapto_id=?",[req.body.count/1+a,req.body.user_id,req.body.lapto_id],(err1,result1)=>{
		    	if(err1) throw err1;
		    	if(result1.affectedRows)
		    	res.send("1");
		    	else
		    	res.send("0");
			});	
		}
		else
		{
		    pool.query("insert into mncake_shopping_cart set ?",[req.body],(err1,result1)=>{
		    	if(err1) throw err1;
		    	if(result1.affectedRows)
		    	res.send("2");
		    	else
		    	res.send("0");
		    });
		}
	});
});
// 导出路由器对象
module.exports=r;