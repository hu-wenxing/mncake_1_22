//  function show(){
	//   var c=phone.value;
	//   if(!c.length)
//      aa.innerHTML='请输入手机号';
//   }
//  function show2(){
	//   var c=upwd.value;
	//   if(!c.length)
//      bb.innerHTML='请输入6~16位密码';
//   }
//  function sh(){
//       var c=phone.value;
//       if(!c.length)
//   	   aa.innerHTML='手机号不能为空';
//   	   else
//   	   aa.innerHTML=' ';
//   }
//  function sh2(){
	//     var c=upwd.value;
	//     if(!c.length)
	// 	bb.innerHTML='你的密码不能为空';
	// 	else if(c.length<6)
	// 	bb.innerHTML='你的密码少于6位';
	// 	else if(c.length>16)
	// 	bb.innerHTML='你的密码多于16位';
	// 	else
	// 	bb.innerHTML=' ';
  // }
//按下enter键触发登录的点击事件
$("#upwd").keyup(function(e){
    if(e.keyCode==13){
     $("#show4").click();
    }
})  
$("#phone").keyup(function(e){
  if(e.keyCode==13){
   $("#show4").click();
  }
}) 
//登录的点击事件
$("#show4").click(function(){
  if(phone.value.length<1){
  dd.innerHTML='对不起，请输入注册手机号！';
  dd.className='ddddd';
  setTimeout(()=>{dd.innerHTML='';dd.className='';},1000);
  }
  else if(phone.value.length<11){
  dd.innerHTML='对不起，手机号格式不正确！';
  dd.className='ddddd';
  setTimeout(()=>{dd.innerHTML=''; dd.className='';},1000);
  }
  else if(upwd.value.length<1){
  ddd.innerHTML='对不起，请输入密码！';
  ddd.className='ddddd';
  setTimeout(()=>{ddd.innerHTML='';ddd.className='';},1000);
  }
  else if(upwd.value.length && phone.value.length==11)
  {
      var xhr=new XMLHttpRequest();
      //4.获取响应
      xhr.onreadystatechange=function(){
      if(xhr.readyState==4&&xhr.status==200)
      {
      	var r=xhr.responseText;
      	 if(r==0){
      	 dddd.innerHTML='手机号或者密码错误';
		 dddd.className='ddddd';
		 setTimeout(()=>{dddd.innerHTML='';dddd.className='';},1000);
		 }
      	 else
      	 { 
		   var arr=JSON.parse(r);
           //1.本页面得到缓存对象
           var storage=window.sessionStorage;
           //2.放入缓存信息（phone-->键，要缓存的信息--->值）
		   storage.setItem("uname",`${arr[0].uname}`);
           storage.setItem("uid",`${arr[0].uid}`);
		   storage.setItem("phone",`${phone.value}`);
		   storage.setItem("gwc_count",`${arr[0].sum}`);
           location.href="http://127.0.0.1:8686/index.html";
      	 }
       }
      }
     //2.创建请求
     xhr.open("get",`/user/v1/login/${phone.value}&${upwd.value}`,true);
     //3.发送请求
     xhr.send();
   }
})