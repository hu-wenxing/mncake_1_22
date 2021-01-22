function show1(){
  var c=phone.value;
  if(!c.length){
  aa.className='greybg';
   aa.innerHTML='请输入注册手机号';
  }
}
function show2(){
  var c=upwd.value;
  if(!c.length)	  if(!c.length){
  bb.innerHTML='6~16个字符，请使用英文字母（区分大小写）或符号+数字';
  bb.className='greybg';
  }
}
function show3(){
  var c=cpwd.value;
  if(!c.length){
  cc.innerHTML='请输入确认密码';
  cc.className='greybg';
  }
}
function show5(){
    if(phone.value.length!=0 && aa.innerHTML==' ' && bb.innerHTML==' ' && cc.innerHTML==' ')
	{
		    var xhr=new XMLHttpRequest();
			//4.获取响应
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200)
				{
				  var r=xhr.responseText;
				  if(r==0){
				  dd.innerHTML='注册失败';
				  dd.className='ddddd';
				  setTimeout(()=>{dd.innerHTML='';dd.className='';},1000);
				  }
				  else
		          location.href='http://127.0.0.1:8686/login.html';
	            }
		   }
		   //2.创建请求
		   xhr.open("post",`/user/v1/reg`,true);
		   //3.发送请求
		   var formdata=`phone=${phone.value}&upwd=${upwd.value}`;
		   xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
		   xhr.send(formdata);
	}
	else{
	dd.innerHTML='格式错误';
	dd.className='ddddd';
	setTimeout(()=>{dd.innerHTML='';dd.className='';},1000);
	}
}
function show6(){
  var c=txyzm.value;
  if(!c.length){
  hh.className='greybg';
  hh.innerHTML='请输入图形验证码';
  }
}
function show7(){
  var c=dxyzm.value;
  if(!c.length){
  ff.className='greybg';
  ff.innerHTML='请输入短信验证码';
  }
}
function sh1(){	
	var c=phone.value;
	if(!c.length){
	aa.innerHTML='请输入注册手机号!';
	aa.className='verifi';
	}
	if(c.length!=0)
	{
	    for(var i=0,sum=0;i<c.length;i++)
	    {
	    	if(c[i].indexOf(' ')!=-1)
			{
			 aa.innerHTML='请不要输入空格';
			 aa.className='verifi';
			 return;
			}
			if(Number(c[i])>=0)
			sum++;
	    }
		if(sum!=c.length)
		{
			aa.innerHTML='请不要输入字符';
			aa.className='verifi';
		}
		else if(c.length<11)
		{
			aa.innerHTML='请输入11位数字';
			aa.className='verifi';
		}
		else
		{
			aa.innerHTML='';
			aa.className='';
		}
	}
	if(c.length==11)
	{
	    var xhr=new XMLHttpRequest();
		//4.获取响应
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200)
			{
			var r=xhr.responseText;
			 if(r==1)
			 {
			 aa.innerHTML='手机号码已存在';
			 aa.className='verifi';
			 }
			 else
	         aa.innerHTML=' ';
			 aa.className='';
	        }
	    }
	   //2.创建请求
	   xhr.open("get",`/user/v1/check_phone/${c}`,true);
	   //3.发送请求
	   xhr.send();
    }
 }
function sh2(){
    var c=upwd.value;
    if(!c.length){
	bb.innerHTML='请输入密码';
	bb.className='verifi';
	}
	if(c.length)
	{
	    for(var i=0,sum=0;i<c.length;i++)
	    {
	    	if(Number(c[i])==0)
			{
			 bb.innerHTML='请不要输入空格';
			 bb.className='verifi';
			 return;
			}
			if(Number(c[i])>0)
			sum++;
	    }
	    if(sum==c.length)
	    {
			bb.innerHTML='不能为纯数字';
			bb.className='verifi';
	    }
	    else
		{
		   bb.innerHTML=' ';
		   bb.className='';
		   if(cpwd.value.length){sh3();}
		}
	}	
	if(c.length<6||c.length>16){
	bb.innerHTML='必须输入6-16位的字符';
	bb.className='verifi';
	}
}
function sh3(){
    var c=cpwd.value;
    if(!c.length){
	cc.innerHTML='请输入确认密码';
	cc.className='verifi';
	}
	else
	{
	    if(c==upwd.value){
	    cc.innerHTML=' ';
	    cc.className='';
	    }
	    else{
	    cc.innerHTML='两次密码不一致';
	    cc.className='verifi';
	    }
	}
}
function sh6(){
	var c=txyzm.value;
	if(!c.length)
	{
	hh.innerHTML='请输入图形验证码！';
	hh.className='verifi';
	}
	else
	{
		hh.innerHTML=' ';
		hh.className='';
	}
}
function sh7(){
	var c=dxyzm.value;
	if(!c.length)
	{
	ff.innerHTML='请输入短信验证码！';
	ff.className='verifi';
	}
	else
	{
		ff.innerHTML=' ';
		ff.className='';
	}
}