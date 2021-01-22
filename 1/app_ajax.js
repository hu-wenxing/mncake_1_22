//引入express模块
const express=require('express');
//引入用户路由器user.js
const userRouter=require('./router/user.js');
//引入商品路由器product.js
const productRouter=require('./router/product.js');
//引入购物车路由器shopping_cart.js
const cartRouter=require('./router/shopping_cart.js');
//引入订单路由器order.js
const orderRouter=require('./router/order.js');
//引入body-parser中间件
const bp=require('body-parser');
//创建web服务器
const app=express();
//设置端口
app.listen(8686);
//托管静态资源到public目录
app.use(express.static('./public/html'));
app.use(express.static('./public/img/head_foot'));
app.use(express.static('./public/img/index'));
app.use(express.static('./public/img/user'));
app.use(express.static('./public/img/product'));
app.use(express.static('./public/img/gwc'));
app.use(express.static('./public/css'));
app.use(express.static('./public/js'));
//应用body-parser中间件，将post请求的数据解析为对象
app.use(bp.urlencoded({
	extended:false
}));
//把路由器挂载到web服务器下
//参数1：给每个路由添加的前缀    /user/list
//参数2：引入的路由器
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter);