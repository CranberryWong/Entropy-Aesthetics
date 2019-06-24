var selectPageNum = 1;
var pageNum;

jQuery(document).ready(function($)
{
	main();

	function main()
	{
		if(document.getElementById("pre_msg") == null
			|| document.getElementById("pre_msg") == null
			|| document.getElementById("next_msg") == null
			){
				return 0;
		}

		pageNum = $('#post_image_gallery table').length;

		if( pageNum == null ) {
			pageNum = 1;
		}
		if(pageNum > 1){
			document.getElementById("next_msg").style.display = "block";
		}


		showPage();

		$("#pre_msg").click(function(){
				selectPageNum--;
				setMoveMsg();
				showPage();
		});
		$("#next_msg").click(function(){
				selectPageNum++;
				setMoveMsg();
				showPage();
		});
	}

		
	//viewControll next/prev img
	function showPage()
	{
		for(i = 1;i <= pageNum;i++){
			if(i == selectPageNum){
				$('#page-' + i + ' td' ).each(function()
				{
					if( $(this).find('img').attr('src') == '' && $(this).find('input[type="hidden"]').length > 0 ) {
						var thisImgPath = $(this).find('input[type="hidden"]').attr('path');
						$(this).find('img').attr('src', thisImgPath);
					}
				})
				document.getElementById("page-" + i).style.display = "block";
			}
			else{
				if( document.getElementById("page-" + i) != null ) {
					document.getElementById("page-" + i).style.display = "none";
				}
			}
		}
	}


	//viewControll pagerLink
	function setMoveMsg()
	{
		if(selectPageNum == 1){
			document.getElementById("pre_msg").style.display = "none";
			document.getElementById("next_msg").style.display = "block";
		}
		else if(selectPageNum === pageNum){
			document.getElementById("pre_msg").style.display = "block";
			document.getElementById("next_msg").style.display = "none";
		}	
		else{
			document.getElementById("pre_msg").style.display = "block";
			document.getElementById("next_msg").style.display = "block";
		}
	}

});

