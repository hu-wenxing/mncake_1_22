var storage=window.sessionStorage;
var uid=storage.getItem("uid");
//查找商品信息
if(!uid)
{
     alert('您尚未登陆');
	    location.href='http://127.0.0.1:8686/login.html'; 	
}
else{
    //0.获取数据
    //1.创建对象
    var xhr=new XMLHttpRequest();
    //4.获取响应
    xhr.onreadystatechange=function(){
    	if(xhr.readyState==4&&xhr.status==200)
    	{
    		var r=xhr.responseText;
		if(r==0){
			gwc_empty();
		}
    		else{
    		    arr=JSON.parse(r);
			var hs=``;
    		    for(i=0;i<arr.length;i++)
    		     	{   
					j=arr[i].cid;
					var sum=arr[i].price*arr[i].count;
					 hs+=`<div class="item-list-li">
					<div class="item-single">
					    <input type="checkbox" id="jj${j}" class="gxuan">
    				    <span><a href="sp.html?${arr[i].lid}"><img src="${arr[i].md}"></a></span>
						<span><a href="sp.html?${arr[i].lid}">${arr[i].title}</a><a>${arr[i].title}</a></span>
						<span>￥${(arr[i].price).toFixed(2)}</span>
						<a><input type="text" size="1" id="kk${j}" onblur="bb(${j})" value="${arr[i].count}"><span><div class="arr-sty"><span onclick="add(${j})">+</span></div><div class="arr-sty"><span onclick="jj(${j})">-</span></div></span></a>
						<span>￥${sum.toFixed(2)}</span>
					    <button onclick="del(${j})" class="del_btn">删除</button>
					</div>
				  </div>`;
				}
			hs+=``;
			gwcsj.innerHTML=hs;
			}
	}
  }
    //2.创建请求
    xhr.open("get",`/cart/v1/cart_list/${uid}`,true);
    //3.发送请求
    //3.1
    xhr.send();
}
//全选按钮判断
var $anniu_all=$("#mm");
$anniu_all.click(function(){
	$this=$(this);
	var $gxuan=$(".gxuan");
	$gxuan.prop("checked",$this.prop("checked"));
	xzdsl();
	xzdzjg();
})
//单个选择按钮
$("#gwcsj").click(function(e){
 	e.stopPropagation();
	if(e.target.nodeName=="INPUT"){
	    var $gxu=$(".item-list>div>div>input:not(:checked)");
	    if($gxu.length>0){
	       mm.checked=0;
	    }else{
	       mm.checked=1;
	   }
	   xzdsl();
	   xzdzjg();
   }
})
// var chbs=document.getElementById("gwcsj");
//     chbs.onclick=function(e){
// 		e.stopPropagation();
// 		if(e.target.nodeName=="INPUT"){
// 			var unchecked=document.querySelector(".gxuan:not(:checked)");
// 			var chbAll=document.querySelector("#mm");
// 			if(unchecked!=null){
// 				chbAll.checked=false;
// 			}
// 			else{
// 				chbAll.checked=true;
// 			}
// 			xzdsl();
// 			xzdzjg();
// 		}
// 	}
//写入选择的商品数量
function xzdsl(){
    var count=document.querySelectorAll(".gxuan:checked");
	var gwc_sl=document.querySelector("#gwc_sl");
	gwc_sl.innerHTML=count.length;
}
//写入选择的所以商品总价格
function xzdzjg(){
	var ssum=0;
	var count=document.querySelectorAll(".gxuan:checked");
    for(var abc of count){
		ssum+=parseInt(abc.parentElement.children[5].innerHTML.slice(1));
	}
	var zongji=document.querySelector(".zongji");
	zongji.innerHTML=`￥${ssum}.00`;
}
//写入商品的小计
function spxj(j){
	var $th=$(`#kk${j}`);
    var price=$th.parent().prev().html().slice(1)*($th.val());
    $th.parent().next().html(`￥${price}.00`);
}
//写入头部中购物车的数量
function gwc_ssum(){
	sp_count=cart_sum.innerHTML;
	sp_count--;
	cart_sum.innerHTML=sp_count;
	var storage=window.sessionStorage;
	storage.setItem("gwc_count",`${sp_count}`);
}
//输入的数量
function bb(j)
{   
	spxj(j);
    var $this=$(`#kk${j}`);
	$this.val($this.val()/1+1);
	jj(j);
	xzdzjg();
}
//数量加一
function add(j)
{   
    var $this=$(`#kk${j}`);
	var k=$this.val();
	//0.获取数据
	//1.创建对象
	var xhr=new XMLHttpRequest();
	//4.获取响应
	xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200)
			{
			   var r=xhr.responseText;
			   if(r==0)
			    {
			   	 alert("购物车增加数量失败");
			   	}
			   else
			    {
					$this.val($this.val()/1+1);
					spxj(j);
					xzdzjg();
			    }
			}
		}
	//2.创建请求
	xhr.open("put",`/cart/v1/cart_add`,true);
	//3.发送请求
	var formdata=`cid=${j}&count=${k}`;
	xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
	xhr.send(formdata);
}
//数量减一
function jj(j)
{   
	//0.获取数据
	var $this=$(`#kk${j}`);
	var k=$this.val()/1-1;
	if(k<1){
		del(j);return;
	}
	//1.创建对象
	var xhr=new XMLHttpRequest();
	//4.获取响应
	xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200)
			{
				var r=xhr.responseText;
		        if(r==0)
		        {
		           alert("购物车减少数量失败");
		        }
		        else
		        {
					$this.val(k);
					spxj(j);
					xzdzjg();
		        }
			}
		}
	//2.创建请求
	xhr.open("put",`/cart/v1/cart_jj`,true);
	//3.发送请求
	var formdata=`cid=${j}&count=${k}`;
	xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
	xhr.send(formdata);
}
//删除某一个商品
function del(j)
{   
	//0.获取数据
	//1.创建对象
	var xhr=new XMLHttpRequest();
	//4.获取响应
	xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200)
			{
				var r=xhr.responseText;
		        if(r==0)
		        {
		           alert("购物车删除商品失败");
		        }
		        else
		        {
					var $this=$(`#jj${j}`);
					$this.parent().parent().remove();
					var $gwcsj=$("#gwcsj");
					gwc_ssum();
					xzdzjg();
					xzdsl();
					if($gwcsj.children().length===0)
					{
					  gwc_empty();
				    }
		        }
			}
		}
	//2.创建请求
	xhr.open("delete",`/cart/v1/del_one/${j}`,true);
	//3.发送请求
	xhr.send();
}
//删除所勾选的商品
function del_all()
{   
	var gwcsj=document.querySelectorAll(".gxuan:checked");
	var fys=document.querySelector("#gwcsj");
	var storage=window.sessionStorage;
	var arr=[];
	for(var abc of gwcsj){
		sp_id=abc.id.split("jj")[1];
		arr.push(sp_id);
	}
	//0.获取数据
	//1.创建对象
	var xhr=new XMLHttpRequest();
	//4.获取响应
	xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200)
			{
				var r=xhr.responseText;
		        if(r==0)
		        {
		           alert("购物车删除所勾选的商品失败");
		        }
		        else
		        {
					for(var abc of gwcsj){
						fys.removeChild(abc.parentElement.parentElement);
					}
					sp_count=cart_sum.innerHTML;
					sp_count=sp_count-gwcsj.length;
					cart_sum.innerHTML=sp_count;
					storage.setItem("gwc_count",`${sp_count}`);
					xzdzjg();
					xzdsl();
					if(fys.children.length===0)
					{
					  gwc_empty();
					}
		        }
			}
		}
	//2.创建请求
	xhr.open("delete",`/cart/v1/del_all/${arr.toString()}`,true);
	//3.发送请求
	xhr.send();
}
//商品为空时写入的数据
function gwc_empty(){
	sp_kong.innerHTML=`<div>
		<div class="cart-empty">
		  <div class="cart-message">
				<div class="txt">您的购物车中没有商品！</div>
				<div class="info"><a href='http://127.0.0.1:8686/index.html'>马上去逛逛</a></div>
			</div>
		</div>
		<div style="margin-top:50px">
		  <div class="ftit-delr">
			<h3>猜你喜欢</h3>
			</div>
			<div class="gl-list">
				<ul>
					<li class="opacity_img">
						<div><a href="sp.html?1"><img src="1_1lg.jpg" style="transition: opacity .3s ease-out;width: 190px;"></a></div>
						<div style="color:#F2A358;font-size:20px;margin-top:6px;">￥178</div>
						<div style="overflow:hidden;margin-top:5px;"><a href="sp.html?1">草莓棉花糖鲜奶蛋糕</a></div>
						<div style="margin-top: 7px;color: #8c8c8c;">已售 18625件</div>
					</li>
					<li class="opacity_img">
					  <div><a href="sp.html?2"><img src="2_1lg.jpg" style="transition: opacity .3s   ease-out;width: 190px;"></a></div>
					  <div style="color:#F2A358;font-size:20px;margin-top:6px;">￥219</div>
					  <div style="overflow:hidden;margin-top:5px;"><a href="sp.html?2">幸福安康-水果祝寿蛋糕</a></div>
					  <div style="margin-top: 7px;color: #8c8c8c;">已售 18615件</div>
					</li>
					<li class="opacity_img">
					  <div><a href="sp.html?3"><img src="3_1lg.jpg" style="transition: opacity .3s   ease-out;width: 190px;"></a></div>
					  <div style="color:#F2A358;font-size:20px;margin-top:6px;">￥188</div>
					  <div style="overflow:hidden;margin-top:5px;"><a href="sp.html?3">紫色恋人-圆形紫色鲜奶蛋糕</a></div>
					  <div style="margin-top: 7px;color: #8c8c8c;">已售 8103件</div>
					</li>
					<li class="opacity_img">
					  <div><a href="sp.html?4"><img src="4_1lg.jpg" style="transition: opacity .3s   ease-out;width: 190px;"></a></div>
					  <div style="color:#F2A358;font-size:20px;margin-top:6px;">￥169</div>
					  <div style="overflow:hidden;margin-top:5px;"><a href="sp.html?4">ins风小清新奶油蛋糕</a></div>
					  <div style="margin-top: 7px;color: #8c8c8c;">已售 15635件</div>
					</li>
					<li class="opacity_img">
					  <div><a href="sp.html?5"><img src="5_1lg.jpg" style="transition: opacity .3s   ease-out;width: 190px;"></a></div>
					  <div style="color:#F2A358;font-size:20px;margin-top:6px;">￥199</div>
					  <div style="overflow:hidden;margin-top:5px;"><a href="sp.html?5">浓情-爱心形奶油蛋糕</a></div>
					  <div style="margin-top: 7px;color: #8c8c8c;">已售 7003件</div>
					</li>
			  </ul>
			</div>
		</div>
	</div>`;
}
//点击去结算后跳转到结算页面
function qjs()
{
	//把所选择的商品的id缓存住
	var arr=[];
	var gwcsj=document.querySelectorAll(".gxuan:checked");
	if(gwcsj.length<1){
        alert("请您选择要购买的商品！");
	}else{
	    for(var abc of gwcsj){
			var sp_id=Number(abc.nextElementSibling.firstElementChild.href.split("?")[1]);
			arr.push(sp_id);
	    }
	    var storage=window.sessionStorage;
	    storage.setItem("sp_id",arr.toString());
	    location.href=`http://127.0.0.1:8686/order_detail.html`;
    }
}