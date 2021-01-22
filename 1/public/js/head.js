// var n1=location.href.length;
// var n2=location.href.indexOf('l');
// var txt=decodeURI(location.href.substr(n2+2,n1-n2));
// var txt=decodeURI(location.search.substr(1));
// if(txt.length)
// tt.innerHTML=txt;
var storage=window.sessionStorage;
var uid=storage.getItem("uid");
var phone1=storage.getItem("phone");
var uname=storage.getItem("uname");
var gwc_count=storage.getItem("gwc_count");
if(uname&&uname!='null')
{
ttt.innerHTML=`<a href="user.html">你好！${uname}</a> <button onclick="fff()">退出</button>`;
cart_sum.innerHTML=gwc_count;
}
else if(phone1)
{
ttt.innerHTML=`<a href="user.html">你好！${phone1}</a> <button onclick="fff()">退出</button>`;
cart_sum.innerHTML=gwc_count;
}
//固定导航栏位置
window.onload=function(){
    var oDiv=document.getElementById("fixed"),H=0,Y=oDiv;
    while (Y) {H+=Y.offsetTop; Y=Y.offsetParent;}
    window.onscroll=function()
    {
        var s=document.body.scrollTop || document.documentElement.scrollTop;
        if(s>H) {
            oDiv.style="position:fixed;top:0px;width:100%;z-index:999;";
        } 
		else {
            oDiv.style="";
        }
    }
}
//退出按钮，清除缓存
function fff()
{
	sessionStorage.clear();
	location.href="http://127.0.0.1:8686/index.html";
}
//button点击时判断输入框是否输入内容
$("#show").click(function(){
    if(!nrr.value.length)
	{
	   alert('请输入要查找的内容');
	}
	else
	{
	   location.href=`search.html?${nrr.value}`;
	}
})
//输入框也绑定button点击事件
$("#nrr").keyup(function(e){
   if(e.keyCode==13){
		$("#show").click();
	 }
})
//导航栏点击时的样式
function dj0(n){
	for(i=0;i<8;i++)
	 {
		if(i==n){
		   eval(`djsj${i}.className="xianshi";`);
		}
		else{
		   eval(`djsj${i}.className="";`); 
		}
	 }
}
