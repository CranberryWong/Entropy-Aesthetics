$(function(){var b="",e="",g="",f="";b=($("#nhrWidget").size()>0)?$("#nhrWidget").attr("data-site"):$("#nhrWidgetSP").attr("data-site");if(b==="undefined"){return false}e=a();g=m(e);f="tech-sv.nikkeihr.co.jp/";$.ajax({type:"POST",url:"https://"+f+"jobRecApi/",dataType:"json",timeout:2000,data:{callback:"HrJobInfo",SITE_ID:b,ID:g}}).done(function(o){if(o.Status==9){l(b,e,g,f)}else{d(o,e,g,f)}}).fail(function(){l(b,e,g,f)});function l(o,r,p,q){$.ajax({type:"POST",url:"/js/n/hr/2018/json/jobRec"+o+".js",dataType:"jsonp",jsonpCallback:"HrJobInfo"}).done(function(s){d(s,r,p,q)}).fail(function(){var t=h();var s='<p class="errMsg">読み込みエラー</p>';if(t=="pc"){$("#nhrWidget").html(s)}else{if(t=="sp"){$("#nhrWidgetSP").html(s)}}})}function d(G,p,z,r){var q="",o="",x="";var C=h();var B=($("#nhrWidget").size()>0)?$("#nhrWidget").attr("data-site"):$("#nhrWidgetSP").attr("data-site");var v="SITE_ID="+B;if(G.HeaderType==1){q="https://tech.nikkeihr.co.jp/?adid=BP_TP_K";o="bnr_hdr_ntc_"+C+".png";x="日経TECHキャリア"}else{if(G.HeaderType==2){q="https://career.nikkei.co.jp/?adid=BP_TP_K";o="bnr_hdr_ncn_"+C+".png";x="日経キャリアNET"}}var A="",I="";if(C=="pc"){A=G.BannerImageFilePc+"?20171124";I=16}else{if(C=="sp"){A=G.BannerImageFileSp+"?20171124";I=21}}var t=k(G.BannerLinkUrl);var w="";w+='<h2 class="nhrWidgetHeader"><a href="'+q+"&"+v+'" target="_blank"><img src="/images/n/hr/2018/parts/'+o+'" alt="'+x+'"></a></h2>';w+='<form class="nhrWidgetOptOutButtonArea" action="https://'+r+'setting/" target="_blank" method="POST">';if(p){w+='<input name="id" value="'+z+'" type="hidden">'}w+='<input type="submit" value="" class="nhrWidgetOptOutButton">';w+="</form>";w+='<div class="tse-scrollable tse-wrapper"><div class="tse-content"><div class="nhrWidgetInnnerBox">';w+='<ul class="nhrWidgetList">';if(p==false){w+='<li class="nhrWidgetNotLogin">日経ＩＤ未ログイン</li>'}for(var E=0;E<G.Job.length;E++){w+="<li>";w+='<a href="'+G.Job[E].DetailUrl+"&"+v+'" target="_blank">';if(G.ItemType==2){var y="",J="";if(E<3){y=" no"+G.Job[E].JobNo}w+='<span class="nhrWidgetIcon"><span class="nhrWidgetJobNo'+y+'"><img src="/images/n/hr/2018/parts/icon_rank'+G.Job[E].JobNo+'.png" width="34" height="14"></span></span>'}else{if(G.Job[E].NewIconFlg==1){w+='<span class="nhrWidgetIcon"><img src="/images/n/hr/2018/parts/icon_new.png" width="30"></span>'}else{if(G.Job[E].PrJobFlg==1){}}}w+='<p class="nhrWidgetOccupation"><img src="/images/n/hr/2018/type/'+G.Job[E].MainOccupation+'.png" width="60"></p>';w+="<div>";var s=G.Job[E].Subject;w+="<h5>";if(G.Job[E].OfferDistinction!=""){w+='<span class="nhrWidgetOffer">'+G.Job[E].OfferDistinction+"</span>"}var D=15;if(G.Job[E].OfferDistinction!=""){D=D-G.Job[E].OfferDistinction.length}w+='<span class="nhrWidgetCompanyName">'+G.Job[E].CompanyName.replace(new RegExp("^(.{"+D+"}).+$",""),"$1…")+"</span>";w+="</h5>";var F="",H="",u="";if(G.Job[E].ProviderSiteName!=""){F="提供元："+G.Job[E].ProviderSiteName;u="nhrWidgetProviderSiteName"}else{u="nhrWidgetOfferDistinction"}w+='<p class="'+u+'">'+s+"</p>";w+='<p class="nhrWidgetSpec">';if(G.Job[E].Income!=""){w+='<span class="nhrWidgetIncome">'+G.Job[E].Income+"</span>"}w+='<span class="nhrWidgetMainWorkLocation">'+G.Job[E].MainWorkLocation+"</span>";w+="</p></div>";w+="</a>";w+="</li>";if((C=="sp"&&E==4&&p==true)||(C=="sp"&&E==3&&p==false)){w+="</ul>\n";w+='<ul class="nhrWidgetList">'}if(E==7&&p==false){break}}w+="</ul>";w+="</div></div></div><!-- /.nhrWidgetInnnerBox -->";w+='<div class="nhrWidgetSendMail"><a href="#">求人情報をスマホに送る</a></div>';if(G.SearchNums>0){w+='<ul class="nhrWidgetSearchLinks">';G.Search.forEach(function(K){w+='<li><a href="'+K.LinkUrl+"&"+v+'">'+K.LinkName+"</a></li>"});w+="</ul>"}w+='<div class="nhrWidgetUnderBanner"><a href="'+G.BannerLinkUrl+t+v+'" target="_blank"><img src="/images/n/hr/2018/banner/'+A+'" alt=""></a></div>';w+="</section>";if(C=="pc"){$("#nhrWidget").html(w);$(".tse-wrapper").TrackpadScrollEmulator()}else{if(C=="sp"){$("#nhrWidgetSP").html(w);c()}}j()}function i(q){if(document.cookie.length>0){var p=document.cookie.indexOf(q+"=");if(p!=-1){p=p+q.length+1;var o=document.cookie.indexOf(";",p);if(o==-1){o=document.cookie.length}return unescape(document.cookie.substring(p,o))}}}function a(){var o=false;if($('meta[name="sso"]').length>0&&i("NID-Serial-Cookie")){o=true}return o}function m(o){var p="";if(o==true){p=i("NID-Serial-Cookie");if(!p.match(/^[0-9]+$/)){p=""}}return p}function n(){var q=document.getElementsByTagName("meta");var p="";for(var o=0;o<q.length;o++){if(q[o].name=="author"){if(q[o].content=="日経アーキテクチュア"||q[o].content=="省エネNext"){p="NA"}else{if(q[o].content=="日経コンストラクション"){p="NCR"}}return p}}}function h(){var o="";if($("#nhrWidget").length){o="pc"}else{if($("#nhrWidgetSP").length){o="sp"}}return o}function k(p){var o="?";if(p.match(/\?/)){o="&"}return o}function c(){$(".nhrWidgetInnnerBox").slick({accessibility:true,dots:true,infinite:true,initialSlide:0,swipe:true})}function j(){$(".nhrWidgetSendMail a").on("click",function(){var o='<form action="https://'+f+'jobMailTransfer/" method="post" target="_blank" id="nhrJobMailTransfer">';o+='<input type="hidden" name="SITE_ID" value="'+b+'">';o+='<input type="hidden" name="ID" value="'+g+'">';o+='<input type="hidden" name="JOB_URL" value="">';o+="</form>";$("body").append(o);$("#nhrJobMailTransfer").submit();$("#nhrJobMailTransfer").remove();return false})}});