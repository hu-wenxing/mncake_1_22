#设置客户端连接服务器端的编码
set names utf8;
#丢弃数据库如果存在
drop database if exists mncake;
#创建数据库，设置存储的编码
create database mncake charset=utf8;
#进入数据库
use mncake;
/*用户信息表*/
create table mncake_user(
uid	INT	PRIMARY KEY NOT NULL AUTO_INCREMENT,#用户的ID,为用户的唯一标识，由系统自动生成
phone VARCHAR(11) NOT NULL UNIQUE,#手机号码
upwd VARCHAR(32),#密码
uemail VARCHAR(64),#邮箱地址
uname VARCHAR(16),#昵称
udate DATETIME#用户生日
);
/*用户地址表*/
create TABLE mncake_receiver_address(
aid	INT PRIMARY KEY AUTO_INCREMENT,
user_id INT,#用户编号
province VARCHAR(16),#省
city VARCHAR(16),#市
county VARCHAR(16),#县
address VARCHAR(128),#详细地址
shou_name VARCHAR(16),#收货人姓名
shou_tel VARCHAR(16),#收货人手机
buyer_name VARCHAR(16),#订购人姓名
buyer_tel VARCHAR(16),#订购人手机
foreign KEY(user_id) REFERENCES mncake_user(uid)
);
/*商品类别表*/
create TABLE mncake_laptop_family(
fid INT PRIMARY KEY AUTO_INCREMENT,
fname VARCHAR(15) #蛋糕种类
);
/*商品表*/
create TABLE mncake_laptop(
lid INT PRIMARY KEY AUTO_INCREMENT,
family_id INT NOT NULL,#所属型号家族编号
title VARCHAR(128),#主标题
price int,#优惠价格
scprice int,#市场价格
promise VARCHAR(64),#配送承诺
assess_count INT,#累计评价
sold_count INT,#累计销量
spec_1 VARCHAR(64),#尺寸1
spec_2 VARCHAR(64),#尺寸2
spec_3 VARCHAR(64),#尺寸3
spec_4 VARCHAR(64),#尺寸4
spec_5 VARCHAR(64),#尺寸5
bianhao	VARCHAR(100),#蛋糕编号
material VARCHAR(100),#材料
careful VARCHAR(100),#注意
provide	VARCHAR(100),#附送
expl VARCHAR(100),#说明
distribution VARCHAR(100),#配送
details VARCHAR(1024),#产品详细说明
is_onsale bool,#是否促销中
FOREIGN KEY(family_id) REFERENCES mncake_laptop_family(fid)
);
/*商品详情图表*/
create TABLE mncake_laptop_pic(
pid INT PRIMARY KEY AUTO_INCREMENT,
laptop_id INT,#蛋糕编号
sm VARCHAR(128),#小图片路径
md VARCHAR(128),#中图片路径
lg VARCHAR(128),#大图片路径
FOREIGN KEY(laptop_id) REFERENCES mncake_laptop(lid)
);
/*用户订单表*/
create TABLE mncake_order(
aid INT PRIMARY KEY AUTO_INCREMENT,#订单号
user_id INT, #用户编号
laptop_id INT,#商品编号
order_time DATETIME,#下单时间
FOREIGN KEY(user_id) REFERENCES mncake_user(uid),
FOREIGN KEY(laptop_id) REFERENCES mncake_laptop(lid)
);
/*用户订单详情表*/
create TABLE mncake_order_detail(
did INT PRIMARY KEY AUTO_INCREMENT,
user_id INT, #用户编号
address_id INT,#地址编号
sp_id INT,#商品编号
order_id INT,#订单号
sp_count VARCHAR(128),#购买数量
sp_spec VARCHAR(128),#选择的蛋糕尺寸
sp_price VARCHAR(128),#选择的蛋糕尺寸对应的价格
peisong_price VARCHAR(128),#配送的费用
order_time DATETIME,#下单时间
peisong_date VARCHAR(128),#配送的日期
peisong_time VARCHAR(128),#配送时间
zf_time DATETIME,#支付时间
zz_time DATETIME,#制作时间
deliver_time DATETIME,#发货时间
received_time DATETIME,#签收时间
placeholder VARCHAR(128),#贺卡留言
kf_id int,#客户编号
payment int,#支付方式
status INT,#订单状态  1-等待付款  2-等待发货  3-运输中  4-已签收  5-已取消  
FOREIGN KEY(order_id) REFERENCES mncake_user(uid),
FOREIGN KEY(address_id) REFERENCES mncake_receiver_address(aid),
FOREIGN KEY(sp_id) REFERENCES mncake_laptop(lid)
);
/*收藏表*/
create TABLE mncake_collect(
pid	INT PRIMARY KEY AUTO_INCREMENT,
user_id INT,#用户编号
laptop_id INT,#商品编号
FOREIGN KEY(user_id) REFERENCES mncake_user(uid),
FOREIGN KEY(laptop_id) REFERENCES mncake_laptop(lid)
);
/*用户购物车表*/
create TABLE mncake_shopping_cart(
cid INT PRIMARY KEY AUTO_INCREMENT,
user_id INT,#用户编号
lapto_id INT,#商品编号
collect_id INT,#收藏表编号
xuan_spec INT,#选择的蛋糕尺寸
xuan_price INT,#选择的蛋糕尺寸对应的价格
count INT,#购买数量
FOREIGN KEY(user_id) REFERENCES mncake_user(uid),
FOREIGN KEY(lapto_id) REFERENCES mncake_laptop(lid),
FOREIGN KEY(collect_id) REFERENCES mncake_collect(pid)
);
/*首页轮播图表*/
create TABLE mncake_index_carousel(
cid INT,
img	VARCHAR(128),#图片路径
title VARCHAR(64),#图片描述
href VARCHAR(128)#图片链接
);
/*首页商品栏目表*/
create TABLE mncake_index_product(
pid INT,
title VARCHAR(64),#商品标题
details VARCHAR(128),#详细描述
pic VARCHAR(128),#图片
price DECIMAL(10,2),#商品价格
href VARCHAR(128),#链接地址
seq_recommended TINYINT,	
seq_new_arrival TINYINT,	
seq_top_sale TINYINT
);
/*足迹表*/
create TABLE mncake_footprint(
pid	INT,
user_id INT,#用户编号
laptop_id INT,#商品编号
FOREIGN KEY(user_id) REFERENCES mncake_user(uid),
FOREIGN KEY(laptop_id) REFERENCES mncake_laptop(lid)
);
/*评分表*/
create TABLE mncake_score(
pid INT,
laptop_id INT,#商品编号
fraction INT,#分数
content VARCHAR(64),#内容
FOREIGN KEY(laptop_id) REFERENCES mncake_laptop(lid)
);
INSERT INTO mncake_user VALUES(1,'12345678910','123456','123@456.com','小明','1994-1-1');
INSERT INTO mncake_user VALUES(null,'12345678911','12345678','12345@456.com','小红','1994-5-1');
INSERT INTO mncake_user VALUES(null,'12345678912','123456789','12345678@456.com','小李','1994-10-1');
/*INSERT INTO mncake_receiver_address VALUES(1,1,'湖南省','长沙市','天心区','1号楼1单元','小明1','22345678910','小明','12345678910');
INSERT INTO mncake_receiver_address VALUES(null,2,'湖南省','长沙市','雨花区','2号楼2单元','小李1','32345678910','小李','12345678911');
INSERT INTO mncake_receiver_address VALUES(null,3,'湖南省','长沙市','芙蓉区','3号楼3单元','小红1','42345678910','小红','12345678912');
*/
INSERT INTO mncake_laptop_family VALUES(1,'child_cake');#儿童蛋糕
INSERT INTO mncake_laptop_family VALUES(null,'birthday_cake');#祝寿蛋糕
INSERT INTO mncake_laptop_family VALUES(null,'lover_cake');#情人蛋糕
INSERT INTO mncake_laptop_family VALUES(null,'fruit_cake');#水果蛋糕
INSERT INTO mncake_laptop_family VALUES(null,'cream_cake');#奶油蛋糕
INSERT INTO mncake_laptop_family VALUES(null,'flower_cake');#鲜花&蛋糕组合
INSERT INTO mncake_laptop VALUES(1,4,'草莓棉花糖鲜奶蛋糕',178,231,'全国(可配送至全国1000多城市，市区免配送费)',1325,18625,'6寸(2-3人食用)','8寸(4-6人食用)','10寸(7-10人食用)','12寸(11-13人食用)','14寸(14-19人食用)','Jd001294','圆形鲜奶蛋糕，内层原味海绵蛋糕胚+草莓乳脂奶油（含水果果肉）叠加，表层棉花糖、草莓、蓝莓装饰。','因为蛋糕的新鲜制作时间为2-6小时不等，请尽量提前一天预定，如需当天订购请提前5-7小时下单。','免费送一次性刀、叉、盘、蜡烛一套以及精美贺卡，代写您的祝福。(您下单时可填写留言栏)','蛋糕乃手工制作产品，不同的糕点师对图片上花型的理解不同以及制作手工不同，另外受当地原料因素等原因影响，当某些材料和颜色缺乏时，我们会以相近的替代，收货人实际收到的产品可能与网页上看到的图片存在一些差异。','全国（可配送至全国1000多城市，市区免配送费）','1.png',1);
INSERT INTO mncake_laptop VALUES(2,2,'幸福安康-水果祝寿蛋糕',219,284,'全国(可配送至全国1000多城市，市区免配送费)',1179,18615,'','8寸(4-6人食用)','10寸(7-10人食用)','12寸(11-13人食用)','14寸(14-19人食用)','Jd001327','内层海绵蛋糕胚+乳脂奶油（含水果果肉、巧克力扁桃仁脆片）叠层，表层草莓、猕猴桃、芒果、寿星摆件装饰。','因为蛋糕的新鲜制作时间为2-6小时不等，请尽量提前一天预定，如需当天订购请提前5-7小时下单。','免费送一次性刀、叉、盘、蜡烛一套以及精美贺卡，代写您的祝福。(您下单时可填写留言栏)','蛋糕乃手工制作产品，不同的糕点师对图片上花型的理解不同以及制作手工不同，另外受当地原料因素等原因影响，当某些材料和颜色缺乏时，我们会以相近的替代，收货人实际收到的产品可能与网页上看到的图片存在一些差异。','全国（可配送至全国1000多城市，市区免配送费）','1.png',0);
INSERT INTO mncake_laptop VALUES(3,3,'紫色恋人-圆形紫色鲜奶蛋糕',188,244,'全国(可配送至全国1000多城市，市区免配送费)',7167,8103,'','8寸(4-6人食用)','10寸(7-10人食用)','12寸(11-13人食用)','14寸(14-19人食用)','ECS000038','圆形鲜奶蛋糕，内层原味海绵蛋糕胚+草莓乳脂奶油（含水果果肉）叠加，表层棉花糖、草莓、蓝莓装饰。','因为蛋糕的新鲜制作时间为2-6小时不等，请尽量提前一天预定，如需当天订购请提前5-7小时下单。','免费送一次性刀、叉、盘、蜡烛一套以及精美贺卡，代写您的祝福。(您下单时可填写留言栏)','蛋糕乃手工制作产品，不同的糕点师对图片上花型的理解不同以及制作手工不同，另外受当地原料因素等原因影响，当某些材料和颜色缺乏时，我们会以相近的替代，收货人实际收到的产品可能与网页上看到的图片存在一些差异。','全国（可配送至全国1000多城市，市区免配送费）','1.png',0);
INSERT INTO mncake_laptop VALUES(4,5,'ins风小清新奶油蛋糕',169,219,'全国(可配送至全国1000多城市，市区免配送费)',1263,15635,'6寸(2-3人食用)','8寸(4-6人食用)','10寸(7-10人食用)','12寸(11-13人食用)','14寸(14-19人食用)','Jd001308','内层原味海绵蛋糕胚+原味乳脂奶油（含水果果肉填充）叠层，外层芒果味乳脂奶油等装饰。','因为蛋糕的新鲜制作时间为2-6小时不等，请尽量提前一天预定，如需当天订购请提前5-7小时下单。','免费送一次性刀、叉、盘、蜡烛一套以及精美贺卡，代写您的祝福。(您下单时可填写留言栏)','蛋糕乃手工制作产品，不同的糕点师对图片上花型的理解不同以及制作手工不同，另外受当地原料因素等原因影响，当某些材料和颜色缺乏时，我们会以相近的替代，收货人实际收到的产品可能与网页上看到的图片存在一些差异。','全国（可配送至全国1000多城市，市区免配送费）','1.png',0);
INSERT INTO mncake_laptop VALUES(5,3,'浓情-爱心形奶油蛋糕',199,258,'全国(可配送至全国1000多城市，市区免配送费)',7182,7003,'','8寸(4-6人食用)','10寸(7-10人食用)','12寸(11-13人食用)','14寸(14-19人食用)','ECS000034','爱心形奶油蛋糕：鲜奶油、樱桃果酱、巧克力屑。','因为蛋糕的新鲜制作时间为2-6小时不等，请尽量提前一天预定，如需当天订购请提前5-7小时下单。','免费送一次性刀、叉、盘、蜡烛一套以及精美贺卡，代写您的祝福。(您下单时可填写留言栏)','蛋糕乃手工制作产品，不同的糕点师对图片上花型的理解不同以及制作手工不同，另外受当地原料因素等原因影响，当某些材料和颜色缺乏时，我们会以相近的替代，收货人实际收到的产品可能与网页上看到的图片存在一些差异。','全国（可配送至全国1000多城市，市区免配送费）','1.png',0);
INSERT INTO mncake_laptop VALUES(6,4,'幸福在敲门-方形水果蛋糕',179,232,'全国(可配送至全国1000多城市，市区免配送费)',7153,7621,'','8寸(4-6人食用)','10寸(7-10人食用)','12寸(11-13人食用)','14寸(14-19人食用)','ECS000034','爱心形奶油蛋糕：鲜奶油、樱桃果酱、巧克力屑。','因为蛋糕的新鲜制作时间为2-6小时不等，请尽量提前一天预定，如需当天订购请提前5-7小时下单。','免费送一次性刀、叉、盘、蜡烛一套以及精美贺卡，代写您的祝福。(您下单时可填写留言栏)','蛋糕乃手工制作产品，不同的糕点师对图片上花型的理解不同以及制作手工不同，另外受当地原料因素等原因影响，当某些材料和颜色缺乏时，我们会以相近的替代，收货人实际收到的产品可能与网页上看到的图片存在一些差异。','全国（可配送至全国1000多城市，市区免配送费）','1.png',0);
INSERT INTO mncake_laptop VALUES(7,1,'小熊儿童奶油蛋糕',168,218,'全国(可配送至全国1000多城市，市区免配送费)',1313,14436,'6寸(2-3人食用)','8寸(4-6人食用)','10寸(7-10人食用)','12寸(11-13人食用)','14寸(14-19人食用)','Jd001297','可爱小熊儿童奶油蛋糕，内层原味海绵蛋糕胚+原味乳脂奶油（含芒果果肉填充），表层奥利奥+巧克力+草莓装饰。','因为蛋糕的新鲜制作时间为2-6小时不等，请尽量提前一天预定，如需当天订购请提前5-7小时下单。','免费送一次性刀、叉、盘、蜡烛一套以及精美贺卡，代写您的祝福。(您下单时可填写留言栏)','蛋糕乃手工制作产品，不同的糕点师对图片上花型的理解不同以及制作手工不同，另外受当地原料因素等原因影响，当某些材料和颜色缺乏时，我们会以相近的替代，收货人实际收到的产品可能与网页上看到的图片存在一些差异。','全国（可配送至全国1000多城市，市区免配送费）','1.png',0);
INSERT INTO mncake_laptop VALUES(8,2,'寿比南山-圆形鲜奶水果蛋糕',199,258,'全国(可配送至全国1000多城市，市区免配送费)',7178,7131,'','8寸(4-6人食用)','10寸(7-10人食用)','12寸(11-13人食用)','14寸(14-19人食用)','ECS000035','圆形鲜奶水果蛋糕，时令水果装饰，红色果酱写有“寿”字。','因为蛋糕的新鲜制作时间为2-6小时不等，请尽量提前一天预定，如需当天订购请提前5-7小时下单。','免费送一次性刀、叉、盘、蜡烛一套以及精美贺卡，代写您的祝福。(您下单时可填写留言栏)','蛋糕乃手工制作产品，不同的糕点师对图片上花型的理解不同以及制作手工不同，另外受当地原料因素等原因影响，当某些材料和颜色缺乏时，我们会以相近的替代，收货人实际收到的产品可能与网页上看到的图片存在一些差异。','全国（可配送至全国1000多城市，市区免配送费）','1.png',0);
INSERT INTO mncake_laptop VALUES(9,5,'鲜花主题奶油蛋糕',199,258,'全国(可配送至全国1000多城市，市区免配送费)',1409,15525,'6寸(2-3人食用)','8寸(4-6人食用)','10寸(7-10人食用)','12寸(11-13人食用)','14寸(14-19人食用)','Jd001275','内层原味海绵蛋糕胚+原味乳脂奶油（含水果果肉填充）叠层，外层芒果味乳脂奶油等装饰。','因为蛋糕的新鲜制作时间为2-6小时不等，请尽量提前一天预定，如需当天订购请提前5-7小时下单。','免费送一次性刀、叉、盘、蜡烛一套以及精美贺卡，代写您的祝福。(您下单时可填写留言栏)','蛋糕乃手工制作产品，不同的糕点师对图片上花型的理解不同以及制作手工不同，另外受当地原料因素等原因影响，当某些材料和颜色缺乏时，我们会以相近的替代，收货人实际收到的产品可能与网页上看到的图片存在一些差异。','全国（可配送至全国1000多城市，市区免配送费）','1.png',0);
INSERT INTO mncake_laptop VALUES(10,1,'网红皇冠双层蛋糕',999,1298,'全国(可配送至全国1000多城市，市区免配送费)',1381,14077,'','','6+10寸(16-20人食用)','8+12寸(21-24人食用)','10+14寸(25-30人食用)','Jd001275','双层网红蛋糕，内层经典原味蛋糕胚+香醇奶油+时令水果夹层，表层精美皇冠+羽毛装饰物+可食用金箔+装饰糖珠装饰。（本款产品适宜食用温度为0-5摄氏度之间，请收到蛋糕后立即放入冰箱贮存）','因为蛋糕的新鲜制作时间为2-6小时不等，请尽量提前一天预定，如需当天订购请提前5-7小时下单。','免费送一次性刀、叉、盘、蜡烛一套以及精美贺卡，代写您的祝福。(您下单时可填写留言栏)','蛋糕乃手工制作产品，不同的糕点师对图片上花型的理解不同以及制作手工不同，另外受当地原料因素等原因影响，当某些材料和颜色缺乏时，我们会以相近的替代，收货人实际收到的产品可能与网页上看到的图片存在一些差异。','全国（可配送至全国1000多城市，市区免配送费）','1.png',0);
/*
INSERT INTO mncake_order VALUES(1,1,1,'2020-11-26',1);
INSERT INTO mncake_order VALUES(null,2,1,'2020-11-25',1);
INSERT INTO mncake_order VALUES(null,3,1,'2020-11-24',1);
INSERT INTO mncake_order_detail VALUES(1,2,2,1,null,null,null,null,1,1);
INSERT INTO mncake_order_detail VALUES(null,1,1,1,null,null,null,null,2,1);
INSERT INTO mncake_order_detail VALUES(null,3,3,2,null,null,null,null,3,1);
*/
INSERT INTO mncake_laptop_pic VALUES(1,1,'1_1lg.jpg','1_2lg.jpg','1_3lg.jpg');
INSERT INTO mncake_laptop_pic VALUES(2,2,'2_1lg.jpg','2_2lg.jpg','2_3lg.jpg');
INSERT INTO mncake_laptop_pic VALUES(3,3,'','3_1lg.jpg','');
INSERT INTO mncake_laptop_pic VALUES(4,4,'','4_1lg.jpg','');
INSERT INTO mncake_laptop_pic VALUES(5,5,'','5_1lg.jpg','');
INSERT INTO mncake_laptop_pic VALUES(6,6,'','6_1lg.jpg','');
INSERT INTO mncake_laptop_pic VALUES(7,7,'7_2lg.jpg','7_1lg.jpg','7_3lg.jpg');
INSERT INTO mncake_laptop_pic VALUES(8,8,'','8_1lg.jpg','8_2lg.jpg');
INSERT INTO mncake_laptop_pic VALUES(9,9,'','9_1lg.jpg','');
INSERT INTO mncake_laptop_pic VALUES(10,10,'','10_1lg.jpg','');
INSERT INTO mncake_collect VALUES(1,1,1);
INSERT INTO mncake_collect VALUES(2,2,2);
/*
INSERT INTO mncake_shopping_cart VALUES(1,1,1,null,1);
INSERT INTO mncake_shopping_cart VALUES(2,1,2,null,10);
INSERT INTO mncake_shopping_cart VALUES(3,2,2,null,13);
*/
INSERT INTO mncake_index_carousel VALUES(1,'asdfghj.img','草莓棉花糖鲜奶蛋糕','href15');
INSERT INTO mncake_index_carousel VALUES(2,'dfghj.img','幸福安康-水果祝寿蛋糕','href18');
INSERT INTO mncake_index_product VALUES(1,'热销推荐','草莓棉花糖鲜奶蛋糕','asdfghj.img','178','href15',null,null,null);
INSERT INTO mncake_index_product VALUES(2,'好评榜单','幸福安康-水果祝寿蛋糕','dfghj.img','219','href18',null,null,null);
INSERT INTO mncake_footprint VALUES(1,1,1);
INSERT INTO mncake_footprint VALUES(2,2,2);
INSERT INTO mncake_score VALUES(2,1,5,'东西很好，味道很好，好吃的蛋糕');
INSERT INTO mncake_score VALUES(2,2,4.5,'吃起来口感还可以~棒棒的，好评');