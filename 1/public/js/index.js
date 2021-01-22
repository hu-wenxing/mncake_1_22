//1.创建对象
var xhr=new XMLHttpRequest();
//4.获取响应
xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200)
		{
			var r=xhr.responseText;
			if(!r.length)
			{
			    d1.innerHTML="没有找到一个商品";	
			}
			else
			{
			    var arr=JSON.parse(r);
			    var hs=`<div class="sp_list">
			    	`;
			    for(var i=0;i<arr.length/2;i++)
			    		{   
						hs+=`<div class="plist">
			    			    <div><a href="http://127.0.0.1:8686/sp.html?${arr[i].lid}"><img src="${arr[i].md}" alt="${arr[i].title}"></a></div>
			    			    <div class="nm"><a href="http://127.0.0.1:8686/sp.html?${arr[i].lid}">${arr[i].title}</a></div>
			    			    <div class="price">￥${arr[i].price}<span class="mk">￥${Math.floor(arr[i].price*1.3)}</span></div>
							 </div>`;
			    		}
			    hs+=`<div id="sty"></div></div>`;
			    d1.innerHTML=hs+hs;
				var hs1=`<div class="sp_list">
					`;
				for(var i=arr.length/2;i<arr.length;i++)
						{   
						hs1+=`<div class="plist">
							    <div><a href="http://127.0.0.1:8686/sp.html?${arr[i].lid}"><img src="${arr[i].md}" alt="${arr[i].title}"></a></div>
							    <div class="nm"><a href="http://127.0.0.1:8686/sp.html?${arr[i].lid}">${arr[i].title}</a></div>
							    <div class="price">￥${arr[i].price}<span class="mk">￥${Math.floor(arr[i].price*1.3)}</span></div>
							</div>
							`;
						}
				hs1+=`<div id="sty"></div></div>`;
				d2.innerHTML=hs1+hs1;
			}
		}
	}
//2.创建请求，查找全部的商品
xhr.open("get",`/product/v1/product_list`,true);
//3.发送请求
//3.1
xhr.send();
//轮播图播放
nmb=1;count_st=0;
function zdbf(){
	count_st++;
	if(count_st==1)
	{
	    if(nmb==1){
		   qblbt.style='transform:translate(-3804px);transition: 2s;';
		   dyd1.style="background: url(bottomNavOFF.png) no-repeat;";
		   ded1.style="background: url(bottomNavON.png) no-repeat;";
		   dsd1.style="background: url(bottomNavOFF.png) no-repeat;";
		   setTimeout(()=>{
		   count_st=0;nmb=2;
		   },2000);
		   return;
		}
		if(nmb==2){
		   qblbt.style='transform:translate(-5706px);transition: 2s;';
		   dyd1.style="background: url(bottomNavOFF.png) no-repeat;";
		   ded1.style="background: url(bottomNavOFF.png) no-repeat;";
		   dsd1.style="background: url(bottomNavON.png) no-repeat;";
		   setTimeout(()=>{
		   count_st=0;nmb=3;
		   },2000);
		   return;
		}
		if(nmb==3){
		   qblbt.style='transform:translate(-7608px);transition: 2s;';
		   dyd1.style="background: url(bottomNavON.png) no-repeat;";
		   ded1.style="background: url(bottomNavOFF.png) no-repeat;";
		   dsd1.style="background: url(bottomNavOFF.png) no-repeat;";
		   setTimeout(()=>{
		   qblbt.style='transform:translate(-1902px);transition: 0s;';
		   count_st=0;nmb=1;
		   },2000);
		   return;
		}
		if(nmb==0){
		   qblbt.style='transform:translate(0);transition: 2s;';
		   dyd1.style="background: url(bottomNavOFF.png) no-repeat;";
		   ded1.style="background: url(bottomNavOFF.png) no-repeat;";
		   dsd1.style="background: url(bottomNavON.png) no-repeat;";
		   setTimeout(()=>{
		   qblbt.style='transform:translate(-5706px);transition: 0s;';
		   count_st=0;nmb=3;
		   },2000);
		   return;
		}
		if(nmb==4){
		   qblbt.style='transform:translate(-1902px);transition: 2s;';
		   dyd1.style="background: url(bottomNavON.png) no-repeat;";
		   ded1.style="background: url(bottomNavOFF.png) no-repeat;";
		   dsd1.style="background: url(bottomNavOFF.png) no-repeat;";
		   setTimeout(()=>{
		   count_st=0;nmb=1;
		   },2000);
		   return;
		}
	} 
} 
lbt=setInterval(zdbf,5000);
function xyy(){
	clearInterval(lbt);
	zdbf();
	lbt=setInterval(zdbf,5000);
	return;
}
function sbxt(){
	clearInterval(lbt);
}
function sblk(){
	lbt=setInterval(zdbf,5000);
}
function syy(){
	if(nmb==1){
		clearInterval(lbt);
		nmb=0;
		zdbf();
		lbt=setInterval(zdbf,5000);
		return;
	}
	if(nmb==2){
		clearInterval(lbt);
		nmb=4;
		zdbf();
		lbt=setInterval(zdbf,5000);
		return;
	}
	if(nmb==3){
		clearInterval(lbt);
		nmb=1;
		zdbf();
		lbt=setInterval(zdbf,5000);
		return;
	}
}
function dyd(){
	    clearInterval(lbt);
		nmb=4;
		zdbf();
		lbt=setInterval(zdbf,5000);
		return;
}
function ded(){
	    clearInterval(lbt);
		nmb=1;
		zdbf();
		lbt=setInterval(zdbf,5000);
		return;
}
function dsd(){
	    clearInterval(lbt);
		nmb=2;
		zdbf();
		lbt=setInterval(zdbf,5000);
		return;
}