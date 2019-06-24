/*******************************************
* langHelp.js
*
* A script that automatically attaches the
* language modal to all test buttons for
* tests not available in the selected
* language, and one that creates the language
* selection form upon clicking the test button.
*
* Author: Jonathan Taratuta-Titus
* Last Updated: 20 June 2013
******************************************/

$(function() {
	$('.test-btn').each(function(index) {
		var  currentTest = index + 1, thumb = '#thumb' + (currentTest);
		if ($(this).data('lang').indexOf($('#currentLang').data('lang')) >= 0) {
			//$(this).attr('href', $(this).data('url') + "&locale=" + $('#currentLang').data('lang'));
			$(this).attr('href', $(this).data('url'));
			$(thumb).click(function(){
				window.location = $('#test' + currentTest).data('url');
			});
		} else {
			$(this).attr({
				'href': '#langModal',
				'role': 'button',
				'data-toggle': 'modal'
			});
			var langs = $(this).data('lang').split(" ");
			$(thumb).attr({'href': '#langModal', 'data-toggle' : 'modal'});
			$(thumb).click({langArray: langs, url: $('#test' + currentTest).data('url')}, createForm);
			$('#test' + currentTest).click({langArray: langs, url: $('#test' + currentTest).data('url')}, createForm);
		}
	});
});

function createForm(event) {
	$('#testLangForm > select').empty();
	var langName = {
		'en': 'English',
		'fr': 'Français',
		'de': 'Deutsch',
		'zh': '官话',
		'hi': 'हिंदी',
		'ja': '日本語',
		'es': 'Español',
		'ru': 'Русский',
		'pt': 'Português'
		};
	$.each(event.data.langArray,function(index,value) {
		$('#testLangForm > select').append('<option value=\'' + value + '\'>' + langName[value] + '</option>');
	});
	$('#testLangForm').attr('action',event.data.url);
};
