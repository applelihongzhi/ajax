function ajax(options){
	//1.整理options
	options=options||{};
	options.data = options.data||{};
	options.type = options.type||'get';
	options.timeout = options.success||null;
	options.error = options.error||null;

	//2.整理data
	options.data.t=Math.random();
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURICompontent(options.data[key]))
	}
	var str=arr.join('&');

	//a.创建ajax
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	//b.连接
	if(options.type=='get'){
		oAjax.open('get',options.url+'?'+str,true);
		//3.发送
		oAjax.send();
	}else{
		oAjax.open('post',options.url,true);
		//设置请求头
		oAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		//3.发送
		oAjax.send(str);
	}

	//c.接收
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status>=200&&oAjax.status<=300||oAjax.status==304){
				options.success&&options.success(oAjax.responseText);
				clearTimeout(timer);
			}else{
				options.error&options.error(oAjax.status);
			}
		}
	};
	//d.超时
	if(options.timeout){
		var timer=setInterval(function(){
			alert('超时了');
			oAjax.abort();//中断ajax请求

		},options.timeout);
	}

}