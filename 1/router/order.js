//引入express
const express=require('express');
const { config } = require('../pool.js');
//引入连接池模块pool.js
const pool=require('../pool.js');
//创建路由器对象
const r=express.Router();
//订单生成路由
r.get("/v1/order/:lid&:user_id",(req,res)=>{
	var sql='select cid,count,title,price,md,lid from (mncake_laptop inner join mncake_laptop_pic on lid=laptop_id) inner join mncake_shopping_cart on lid=lapto_id where lid in ('+req.params.lid+') and user_id='+req.params.user_id+' order by cid';
   pool.query(sql,(err,result)=>{
   if(err) throw err;
   if(result.length)
   res.send(result);
   else
   res.send("0");
	 });
});
//添加地址
r.post("/v1/join_address",(req,res)=>{
   pool.query("insert into mncake_receiver_address set ?",[req.body],(err1,result1)=>{
      if(err1) throw err1;
      var a=result1.insertId+"";
      if(result1.affectedRows)
      res.send(a);
      else
      res.send("0");
   });
});
//查询地址
r.get("/v1/search_address/:user_id",(req,res)=>{
   pool.query("select aid,shou_name,shou_tel,buyer_name,buyer_tel,address from mncake_receiver_address where user_id=? order by aid desc",[req.params.user_id],(err1,result)=>{
      if(err1) throw err1;
      if(result.length)
      res.send(result);
      else
      res.send("0");
   });
});
//删除地址
r.delete("/v1/del_address/:aid",(req,res)=>{
   pool.query("delete from mncake_receiver_address where aid=?",[req.params.aid],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows)
      res.send("1");
      else
      res.send("0");
   });
});
//添加订单
r.post("/v1/join_order",(req,res)=>{
   pool.query("insert into mncake_order_detail set ?",[req.body],(err1,result1)=>{
      if(err1) throw err1;
      var a=result1.insertId+"";
      if(result1.affectedRows)
      res.send(a);
      else
      res.send("0");
   });
});
// 导出路由器对象
module.exports=r;