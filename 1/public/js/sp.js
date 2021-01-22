var storage=window.sessionStorage;
var uid=storage.getItem("uid");//从缓存获取用户id
var txt=decodeURI(location.search.substr(1));//从上个网页(首页)获取商品id
//1.创建对象
var xhr=new XMLHttpRequest();
//4.获取响应
xhr.onreadystatechange=function(){
	if(xhr.readyState==4&&xhr.status==200)
		{
			var r=xhr.responseText;
			if(r==0)
			tt.innerHTML="商品未找到";
			else
			{
			    var arr=JSON.parse(r);
			    var hs=`<div>`;
					hs+=`<div class="sp-style">
					        <div class="sp-style-1">
					          <div class="proview">
							        <div><img src="${arr[0].md}" alt="${arr[0].title}"></div>
							        <div class="spec-list">
                        <a class="spec-prev"></a>
										    <div>
										      <span>
											    <span><img src="${arr[0].sm}" class="actived"></span>
												  <span><img src="${arr[0].md}"></span>
												  <span><img src="${arr[0].lg}"></span>
										      </span>
									    	</div>
										    <a class="spec-next"></a>
                      </div>
							      </div>
						        <div class="pro_info">
								    <div>${arr[0].title}<a class="collection">收藏</a></div>
						            <div><span>优惠价：</span><span>¥${arr[0].price}</span></div>
						            <div><span>市场价：</span><span>¥${arr[0].scprice}</span></div>
									<div id="hr1"></div>
						            <div><span>配送：</span><span>${arr[0].promise}</span></div>
						            <div><span>数量：</span><div class="si-warp"><span><button onclick="jd()">-</button> <input type="text" size="1" id="dd" value="1"> <button onclick="add()">+</button></span><span>累计评价 ${arr[0].assess_count}</span><span id="dd2">累计销量 ${arr[0].sold_count}</span></div></div>
						            <div><span>尺寸：</span><div class="chi-warp"><p class="cur">${arr[0].spec_1}</p><p class="cur">${arr[0].spec_2}</p><p class="cur">${arr[0].spec_3}</p><p class="cur">${arr[0].spec_4}</p><p class="cur">${arr[0].spec_5}</p></div></div>
						            <div id="dd5"><button onclick="cc()">放入购物车</button><button onclick="cc()">立即购买</button></div>
									<div id="dd3"><span>支付：</span><span>微信支付</span><span class="dd4"></span><span>支付宝支付</span><span class="dd4"></span><span></span></div>
									<div class="ten-div"><span>服务：</span><span>15年品牌</span><span class="dd4"></span><span>一小时送达</span><span class="dd4"></span><span>VIP一对一服务</span><span class="dd4"></span><span>100%退赔</span></div>
							    </div>
							    <div class="clear"></div>
						    </div>
						    <div class="sp-style-2">
							  <div class="g-m-left">
							    <div class="mt">
								<span>最近浏览</span><button>清空</button>
								</div>
								<div class="mc-warp">
								    <ul>
									   <li>
								      	<div><a href="#"><img src="${arr[0].md}" alt="${arr[0].title}"></a></div>
								      	<div><a href="#">${arr[0].title}</a></div>
								      	<div>¥${arr[0].price}.00</div>
								      </li>
								      <li>
								      	<div><a href="#"><img src="${arr[0].md}" alt="${arr[0].title}"></a></div>
								      	<div><a href="#">${arr[0].title}</a></div>
								      	<div>¥${arr[0].price}.00</div>
								      </li>
								      <li>
								      	<div><a href="#"><img src="${arr[0].md}" alt="${arr[0].title}"></a></div>
								      	<div><a href="#">${arr[0].title}</a></div>
								      	<div>¥${arr[0].price}.00</div>
								      </li>
								      <li>
								      	<div><a href="#"><img src="${arr[0].md}" alt="${arr[0].title}"></a></div>
								      	<div><a href="#">${arr[0].title}</a></div>
								      	<div>¥${arr[0].price}.00</div>
								      </li>
									  <li>
									  	<div><a href="#"><img src="${arr[0].md}" alt="${arr[0].title}"></a></div>
									  	<div><a href="#">${arr[0].title}</a></div>
									  	<div>¥${arr[0].price}.00</div>
									  </li>
									</ul>
								</div>
							  </div>
							  <div class="g-m-detail">
							    <div>
								   <a href="#">商品详情</a><a href="#pinglun">用户评论(1325)</a>
							    </div>
								<div class="gm-f-item">
								     <div class="goods_desc_title"><img src="goods_desc_tit1.png" alt=""></div>
							         <div class="column fs-ys"><span>编号：</span><span>${arr[0].bianhao}</span></div>
						             <div class="column"><span>材料：</span><span>${arr[0].material}</span></div>
						             <div class="column"><span>注意：</span><span>${arr[0].careful}</span></div>
						             <div class="column"><span>附送：</span><span>${arr[0].provide}</span></div>
						             <div class="column"><span>说明：</span><span id="dd6">${arr[0].expl}</span></div>
						             <div class="column la-ys"><span>配送：</span><span>${arr[0].distribution}</span></div>
						             <div class="goods_desc_title"><img src="goods_desc_tit2.png" alt=""></div>
									 <div class="img-ys"><img class="img-mar" src="${arr[0].sm}"><img class="img-mar" src="${arr[0].md}"><img class="img-mar" src="${arr[0].lg}" alt=""></div>
								     <div class="img-mar2"><img src="${arr[0].details}"></div>
							    </div>
							    <div id="pinglun">
							      <div class="gm-title">
							      <span>评论晒单</span><span>全部(1325)</span>
							      </div>
							      12
							    </div>
							  </div>
						    </div>
						    <div class="clear"></div>
						</div>`
				hs+=`</div>`;
				tt.innerHTML=hs;
				var span_img=document.querySelector(".spec-list");
				var imgs=document.querySelectorAll(".spec-list>div>span>span>img");
				var img=document.querySelector(".proview>div>img");
				for(var key of imgs){
					if(key.getAttribute("src")=="")
					key.style.display="none";
				}
				var ps=document.querySelectorAll(".chi-warp>p");
				for(var p of ps){
					if(p.innerHTML=="")
					p.style.display="none";
				}
				span_img.onmouseover=function(e){
					if(e.target.nodeName==="IMG"){
						img.src=e.target.getAttribute("src");
						for(var k of imgs){
							k.className="";//修改className等效于修改class
						}	
						e.target.className="actived";
					}	
				}
				span_img.onclick=function(e){
					var img_1=document.querySelector(".actived");
					if(e.target.className=="spec-prev"){
				   	var img_prev=img_1.parentElement.previousElementSibling.firstElementChild;
						img.src=img_prev.getAttribute("src");
						for(var k of imgs){
							k.className="";//修改className等效于修改class
						}	
						img_prev.className="actived";
					}	
					if(e.target.className==="spec-next"){
					  var img_next=img_1.parentElement.nextElementSibling.firstElementChild;
						img.src=img_next.getAttribute("src");
						for(var k of imgs){
							k.className="";//修改className等效于修改class
						}	
						img_next.className="actived";
					}	
				}
			}
		}
}
//2.创建请求
xhr.open("get",`/product/v1/one_product/${txt}`,true);
//3.发送请求
//3.1
xhr.send();
function cc()
{
	if(!uid)
	{
	     alert('您尚未登陆');
		 location.href='http://127.0.0.1:8686/login.html'; 	
	}
	else{
    var xhr=new XMLHttpRequest();
	//4.获取响应
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200)
		{
		var r=xhr.responseText;
		 if(r==0)
		 alert('添加购物车失败');
		 else{
			 if(r==2){
				sp_count=cart_sum.innerHTML;
				sp_count++;
				var storage=window.sessionStorage;
				storage.setItem("gwc_count",`${sp_count}`);
			 }
		    location.href=`http://127.0.0.1:8686/gwc.html`;
		 }
        }
    }
    //2.创建请求
    xhr.open("post",`/product/v1/join_cart`,true);
    //3.发送请求
    var formdata=`lapto_id=${txt}&count=${dd.value}&user_id=${uid}`;
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send(formdata);
	}
}
function add(){
	   var a=dd.value;
	   a++;
	   dd.value=a;
}
function jd(){
	   var a=dd.value;
	   a--;
	   if(a==0)
	   dd.value="1";
	   else
	   dd.value=a;   
}
