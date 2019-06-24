function currentPage (page) {
	document.getElementById(page.concat("-item")).className = "active";
	document.getElementById(page.concat("-link")).href = "#";
}

if (getFileName() == "index.php" || getFileName() == "") {
	currentPage("experiment");
} else if (getFileName() == "about.php") {
	currentPage("about");
}
else if (getFileName() == "blog.php") {
	currentPage("blog");
}
else if (getFileName() == "researchers.php") {
	currentPage("researchers");
}

// http://befused.com/javascript/get-filename-url
function getFileName() {
	var url = document.location.href;
	//this removes the anchor at the end, if there is one
	url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
	//this removes the query after the file name, if there is one
	url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
	//this removes everything before the last slash in the path
	url = url.substring(url.lastIndexOf("/") + 1, url.length);
	//return
	return url;
}

/*
$(function() {
	$('form[name="langForm"]').attr('action', window.location.href.split('?')[0]);
	$('.language-selection').click(function() {
		$('input[name="locale"]').attr('value', $(this).data('lang'));
		$('form[name="langForm"]').submit();
	});
});
*/

/*
$( ".language-selection" ).on("click", function() {
	url = "www.labinthewild.org/index.php?locale=" + $(this).attr("data-lang");
	window.location(url);
});
*/