$(function(){
	var parse_emg = function(info){
		var infoLength = $(info['open_information']).length;
		if( infoLength !== 0){
			//緊急情報あり 
			$('#openInfo').append('<div id="emergency"><h2><img src="./image/emergency_title.png" alt=""></h2></div>');
			$.each(info['open_information'],function(i, value){
				var message = '<div class="emgBox"><a href="' + value.url + '"><div class="emgText">' + value.title + '<img src="./image/emergency_btn.png" alt=""></div></a></div>';
				$('#emergency').append(message);
			});
		}else{
			//緊急情報なし 
			$('#openInfo').empty();
		}
	}
	
	var error = function(){
		//console.log('取得失敗');
	}
	
	$.ajax({
		type: 'GET',
		url: './tgo/pc/coverage_open.json',
		dataType: 'json',
		cache : false,
		timeout: 1000,
		error: error,
		success: parse_emg
	});
});
