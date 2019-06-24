jQuery(document).ready(function($)
{
	var c2SpFlag = $('input[name="c2SpFlag"]').val();

	//ie8 decision
	if(!jQuery.support.opacity && !jQuery.support.style)
	{
		isIe8 = true
	}
	else
	{
		isIe8 = false
	}

	// isIpad ?
	var agent = navigator.userAgent;
	if( agent.match(/iPad/) )
	{
		isIpad = true
	}
	else
	{
		isIpad = false
	}

	/* ------------------------------------------
	 *
	 * load
	 *
	 * ----------------------------------------- */
	if ( $('.mailArchiveItem').length > 0 )
	{

		htid = ''
		mid = ''
		thumbnail = ''
		periodType = ''
		period = ''
		pageNo = ''

		htidTmp = thisUrl.match(/htid=.+?\&/)
		if ( htidTmp != null ) {
			htid = htidTmp[0].replace('htid=' , '').replace('&' , '')
		}

		midTmp = thisUrl.match(/mid=.+?\&/)
		if ( midTmp != null ) {
			mid = midTmp[0].replace('mid=' , '').replace('&' , '')
		}

		periodTypeTmp = thisUrl.match(/periodType=.+?\&/)
		if ( periodTypeTmp != null ) {
			periodType = periodTypeTmp[0].replace('periodType=' , '').replace('&' , '')
		}

		periodTmp = thisUrl.match(/period=.+?\&/)
		if ( periodTmp != null ) {
			period = periodTmp[0].replace('period=' , '').replace('&' , '')
		}

		pageNoTmp = thisUrl.match(/pageNo=.+?\&/)
		if ( pageNoTmp != null ) {
			pageNo = pageNoTmp[0].replace('pageNo=' , '').replace('&' , '')
		}

		thumbnail = thisUrl.match('thumbnail=on') ? 'on' : 'off';


		$('.mailArchiveItem').each(function()
		{
			pan = $(this).attr('id');
			if ( c2SpFlag == 'true' || isIpad )
			{
				deviceFlag = 'Sp'
			}
			else
			{
				deviceFlag = 'Pc'
			}

			ajaxUrl = D_PROXY_PREFIX + '/indexNew.php?com=mailArchive_getMailAjax' + deviceFlag + '&cid=' + uid + '&pan=' + pan
			ajaxUrl += 	'&htid=' + htid + '&mid=' + mid + '&thumbnail=' + thumbnail + '&periodType=' + periodType + '&period=' + period + '&pageNo=' + pageNo

			$.ajax({
				type: 'GET',
				context: this,
				url: ajaxUrl,
				success: function( data )
				{
					//remove script tag
					data = data.replace(/<script(?:[ \t\r\n][^>]*)?>[\S\s]*?<\/script[ \t\r\n]*>/gi, "");

					$(this).html(data)
					$(this).find('a').addClass('ajax')

					if ( c2SpFlag == 'false' )
					{
						setIpadBg()
						addClassScrBtn()
					}
				},
				error: function()
				{
					$(this).html('データの読み込みができませんでした。');
				}
			})
		})
	}
	
	/* ------------------------------------------
	 *
	 * pager
	 *
	 * ----------------------------------------- */
	$(document).on('click' , '.c2mailArchivePager a' , function(e)
	{
		e.preventDefault();

		//showIndicator2( '.c2mailArchivePager' )

		$($.browser.webkit ? 'body' : 'html').animate({ scrollTop: $(this).parents('.mailArchiveItem').offset().top } , 1500 )

		pagerUrl = '/' + $(this).attr('href');

		$.ajax({
			type: 'GET',
			url: pagerUrl,

			success: function( data )
			{

				//remove script tag
				data = data.replace(/<script(?:[ \t\r\n][^>]*)?>[\S\s]*?<\/script[ \t\r\n]*>/gi, "");

				$('.mailArchiveItem').html(data);
				$(this).find('a').addClass('ajax')

				if ( c2SpFlag == 'false' )
				{
					setIpadBg()
					addClassScrBtn()
				}
			},
			error: function() {
				$('.mailArchiveItem').html('データの読み込みができませんでした。');
			}
		})
	})

	/* ------------------------------------------
	 *
	 * unLink
	 *
	 * ----------------------------------------- */
	
	$(document).on('click' , '.notRunLink' , function(e)
	{
		e.preventDefault()
		e.stopPropagation()
		return false
	})


	/* ------------------------------------------
	 *
	 * up & down
	 *
	 * ----------------------------------------- */
	$(document).on('click' , '.c2mailArchiveDown' , function()
	{
		$(this).parents('.c2mailArchive').find('.c2mailArchiveWrapper').scrollTo({left:'+=0', top:'+=200px'},'normal');
	})

	$(document).on('click' , '.c2mailArchiveUp' , function()
	{
		$(this).parents('.c2mailArchive').find('.c2mailArchiveWrapper').scrollTo({left:'+=0', top:'-=200px'},'normal');
	})


	/* ------------------------------------------
	 *
	 * set Ipad Height
	 *
	 * ----------------------------------------- */
	$(window).resize(function()
	{
		setIpadHeight()
	})

	setIpadHeight = function()
	{
		ipadWidth = $('.c2mailArchiveIpadBg').width();
		ipadHeight = 802 * ipadWidth / 600
		$('.c2mailArchiveIpadBg').css('height' , ipadHeight + 'px')
	}

	/* ------------------------------------------
	 *
	 * set Ipad BgImg
	 *
	 * ----------------------------------------- */
	function setIpadBg()
	{
		$('.c2mailArchiveIpadBg').each(function()
		{
			if ( isIe8 == true )
			{
				$(this).addClass('ie8')
			}
			else
			{
				$(this).addClass('expIe8')
			}
		})

	}

	/* ------------------------------------------
	 *
	 * set scrollBtn Img
	 *
	 * ----------------------------------------- */
	function addClassScrBtn()
	{
		$('.c2mailArchiveScroll > div').each(function()
		{
			if ( isIe8 == true )
			{
				$(this).addClass('ie8')
			}
			else
			{
				$(this).addClass('expIe8')
			}
		})

	}

	/* ------------------------------------------
	 *
	 * show period
	 *
	 * ----------------------------------------- */
	$(document).on( 'click' , '.c2MailPeriodYear img' , function()
	{
		that= $(this)
		$(this).parents('.c2mailArchiveLink').find('.c2MailPeriodMonth').slideToggle('normal' , function()
		{
			that.parents('.c2MailPeriodButton').find('img').each(function()
			{
				if( $(this).is(":hidden") )
				{
					$(this).css('display' , 'block')
				}
				else
				{
					$(this).css('display' , 'none')
				}
			}) //end each
		})
	})

}) // end of document Ready fn





/* ------------------------------------------
 *
 * switch scroll on/off
 * after pageLoad / pager clicked
 *
 * ----------------------------------------- */

jQuery(document).ajaxStop(function($)
{
	//setIpadHeight();
	ipadWidth = jQuery('.c2mailArchiveIpadBg').width();
	ipadHeight = 802 * ipadWidth / 600
	jQuery('.c2mailArchiveIpadBg').css('height' , ipadHeight + 'px')

	/* ----------------------------------
	 * not using
	 * --------------------------------- */

	/*
	var $j = jQuery.noConflict();

	if ( $j('.mailArchiveItem').length > 0 )
	{

		var ln = 1;
		var itemNum = $j('.c2mailArchive').length;

		$j('.mailArchiveItem').find('.c2mailArchiveInner').each(function()
		{

			//getIpadSize
			wrapperWidth = $j(this).find('.c2mailArchiveIpadBg').width()
			wrapperHeight = wrapperWidth * 802 / 600
			wrapperMarginBottom =  parseInt( $j(this).find('.c2mailArchiveWrapper').css('margin-bottom') )

			//remove margin-bottom( with tolerance )
			checkHeight = parseInt( wrapperHeight - wrapperMarginBottom - 60 )

			//is mailbody height
			mailHeight = $j(this).find('.c2mailArchiveBody').outerHeight({margin : true})

			if ( checkHeight > mailHeight )
			{
				$j(this).find('.c2mailArchiveScroll').css('display' , 'none')
			}

			// ajust run-timing
			if ( ln == itemNum )
			{
				setIpadHeight();
			}

			ln++
		})

	}

	*/

})
