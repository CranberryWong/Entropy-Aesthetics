// JavaScript Document
// @auther lost 
function getAjaxXML()
{
	var xmlhttp = false;
	if(window.ActiveXObject){	 //IE6¡¢IE5
		try {	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");}
		catch (e) 
		{
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	else{
		 xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}
function ajax_request(url, eadystatechange){
	var url = url;
	var pattern = /\?/;
	if(pattern.test(url)) url += '&req_time=' + Math.random();
	else url += '&req_time=' + Math.random();
	var xmlhttp = getAjaxXML();
	xmlhttp.open("GET", url, true);
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			eadystatechange=eadystatechange.toString();
			switch(eadystatechange){
				case '1':document.getElementById('hotBlogTable').innerHTML = xmlhttp.responseText;break;	
				case '2':document.getElementById('hUserTr').innerHTML = xmlhttp.responseText;break;
				case '3':document.getElementById('recommendBlogTable').innerHTML = xmlhttp.responseText;break;	
		 	}	
		}
	};
	xmlhttp.send(null);
}
function changeBlogHot(flag){
	for(var i=1;i<=5;i++){
		document.getElementById('sli_'+i).className = (i==flag ? 's' : '' );
	}
	var ajaxUrl = 'blog.php?mod=hot&type=ajax&op='+flag;
	ajax_request(ajaxUrl,1);	
}
function changeBlogrecommend(flag){
	for(var i=1;i<=5;i++){
		document.getElementById('Resli_'+i).className = (i==flag ? 's' : '' );
	}
	var ajaxUrl = 'blog.php?mod=recommend&type=ajax&op='+flag;
	ajax_request(ajaxUrl,3);	
}
function changehUserList(type){
	var ajaxUrl = 'blog.php?mod=user&type='+type;
	ajax_request(ajaxUrl,2);	
}

