$(function () {
	//事業用 チェンジバナー
	$('.listBnr').each(function (index) {
		var bnrLen = $('.listBnr').eq(index).children('li').length;
		var i = 0;
		setInterval(function () {
			i++;
			if (i < bnrLen) {
				$('.listBnr').eq(index).children('li').removeClass('view');
				$('.listBnr').eq(index).children('li').eq(i).addClass('view');
			} else {
				i = 0;
				$('.listBnr').eq(index).children('li').removeClass('view');
				$('.listBnr').eq(index).children('li').eq(i).addClass('view');
			}
		}, 4000);
	});
});
document.oncontextmenu = function(){
	return false;
};