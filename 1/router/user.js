//引入express
const express=require('express');
//引入连接池模块pool.js
const pool=require('../pool.js');
//创建路由器对象
const r=express.Router();
//检测用户名是否存在路由
r.get("/v1/check_phone/:phone",(req,res)=>{
	pool.query("select uid from mncake_user where phone=?",[req.params.phone],(err,result)=>{
		if(err) throw err;
		if(result.length)
		res.send("1");
		else
		res.send("0");
	});
});
//注册路由
r.post("/v1/reg",(req,res)=>{
	pool.query("insert into mncake_user set ?",[req.body],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows)
		res.send("1");
		else
		res.send("0");
	});
});
//登录路由
r.get("/v1/login/:phone&:upwd",(req,res)=>{
	pool.query("select uid,uname,count(cid) sum from mncake_user inner join mncake_shopping_cart on uid=user_id where phone=? and upwd=?",[req.params.phone,req.params.upwd],(err,result)=>{
		if(err) throw err;
		if(result[0].uid!=null)
		res.send(result);
		else
		res.send("0");
	});
});
// 导出路由器对象
module.exports=r;