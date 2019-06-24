// JavaScript Document

$(function(){
		   
		   // 電話起動イベント
		   $("#footerTelLink").bind('touchend', function() {
		   		ga('send', 'event', 'call-click', 'footer-tel');
		   });
});