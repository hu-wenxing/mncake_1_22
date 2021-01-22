//得到从搜索框中传过来的值
 var content=decodeURI(location.search.substr(1));
//模糊查找商品
	//1.创建对象
	var xhr=new XMLHttpRequest();
	//4.获取响应
	xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200)
			{
				var r=xhr.responseText;
				if(r==0)
				{
				    d1.innerHTML="没有找到该商品";	
				}
				else
                {
			        var arr=JSON.parse(r);
			        var hs=`<div>
			        	`;
			        for(var i=0;i<arr.length;i++)
			        		{   hs+=`<div class="plist">
			        			<div><a href="http://127.0.0.1:8686/sp.html?${arr[i].lid}"><img src="${arr[i].md}" alt="${arr[i].title}"></a></div>
			        			<div class="nm"><a href="http://127.0.0.1:8686/sp.html?${arr[i].lid}">${arr[i].title}</a></div>
			        			<div class="price">￥${arr[i].price}<span class="mk">￥${Math.floor(arr[i].price*1.3)}</span></div>
				    			</div>
				    			`;
			        		}
			        hs+=`</div>`;
			        d1.innerHTML=hs;
			    }
			}
		}
	//2.创建请求
	xhr.open("get",`/product/v1/search/${content}`,true);
	//3.发送请求
	//3.1
	xhr.send();
