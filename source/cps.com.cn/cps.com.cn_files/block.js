/* 
 * 所有模块初始化
 */
var ASY_URL = 'http://asy.cps.com.cn';
var SPE_URL = 'http://spe.cps.com.cn';
String.prototype.strLen = function() {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
            len += 2;
        else
            len++;
    }
    return len;
};
//将字符串拆成字符，并存到数组中
String.prototype.strToChars = function() {
    var chars = new Array();
    for (var i = 0; i < this.length; i++) {
        chars[i] = [this.substr(i, 1), this.isCHS(i)];
    }
    String.prototype.charsArray = chars;
    return chars;
};
//判断某个字符是否是汉字
String.prototype.isCHS = function(i) {
    if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
        return true;
    else
        return false;
};
//截取字符串（从start字节到end字节）
String.prototype.subCHString = function(start, end) {
    var len = 0;
    var str = "";
    this.strToChars();
    for (var i = 0; i < this.length; i++) {
        if (this.charsArray[i][1])
            len += 2;
        else
            len++;
        if (end < len)
            return str;
        else if (start < len)
            str += this.charsArray[i][0];
    }
    return str;
};
//截取字符串（从start字节截取length个字节）
String.prototype.subCHStr = function(start, length) {
    return this.subCHString(start, start + length);
};

function getLocalTime(tm) {     
       var tt=new Date(parseInt(tm) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").replace(/上午|下午/g, "")
       return tt;     
    }     
        
   
/**
 * 二级栏目初始化
 * 
 * @returns {undefined}
 */
function n_list_init(n_catid) {
    $.ajax({
        type: "get",
        dataType: 'jsonp',
        url: ASY_URL + '/block/get',
        jsonpCallback: "callback",
        data: {
            catid: n_catid,
            id: '28,40,41,31'
        },
        success: function(data) {
            if (data.status) {
				
                //新闻排行
                var n_arr = ['day', 'week', 'month'];
                var n_tabText = ['每日', '每周', '每月'];
                var n_html = '';
                var styleName2 = '';
                $.each(n_arr, function(i, d) {
                    if (data.data['28'][d].length > 0) {
                        if (i == 0){var styleName = '';}else{var styleName = 'style="display:none"';}
                        n_html += '<div class="info" '+styleName+'>' +
                        '<ul>';
                        $.each(data.data['28'][d], function(n, v) {
                            if (n == 9){
                                var className = 'class="last1"';
                            }else{
                                var className = '';
                            }
                            if(n < 3){styleName2 = 'class="nub1 han"';}else{styleName2 = 'class="nub2 han"';}
                            var index = n+1;
                            n_html += '<li '+className+'><a target="_blank" href="'+v.url+'"><div '+styleName2+'>'+index+'</div>'+v.title.subCHString(0,30)+'</a></li>';
                        });
                        n_html += '</ul></div>';
                    }
                });
				
                $('#block_28').html(n_html);
                //论坛热点
                var n_arr = ['hot','new'];
                    n_html = '';
                $.each(n_arr, function(i, d) {
                    if (data.data['41'][d].length > 0) {
                        if (d == 'new'){var display = 'style="display:none"';}else{var display = '';}
                        n_html += '<div class="info" ' + display + '><ul>';
                        $.each(data.data['41'][d], function(n, v) {
                            var index = n+1;
                            var styleName = '';
                            var styleName2 = '';
                            var link = 'http://bbs.cps.com.cn/cps-'+v.tid+'-1-1.html';
                            if (index == data.data['41'][d].length){styleName = 'class="last1"';}
                            if(n < 3){styleName2 = 'class="nub1 han"';}else{styleName2 = 'class="nub2 han"';}
                            n_html += '<li '+styleName+'><a target="_blank" href="'+link+'"><div '+styleName2+'>'+index+'</div>'+ v.subject.subCHString(0,30) +'</a></li>';
                        });
                        n_html += '</ul></div>';
                    }
                });
                $('#block_41').html(n_html);
                //n_tabs();
                //推荐资讯(今日推荐)
                if (data.data['40'].length > 0) {
                    var n_html = '<div class="title1">' +
                        '<h3>' +
                        '<span>今日推荐</span>' +
                        '<a target="_blank" href="http://news.cps.com.cn/top/">更多 >></a>' +
                        '</h3>' +
                        '</div>' +
                        '<div>' +
                        '<ul class="tj">';
                    $.each(data.data['40'], function(i, v) {
                        n_html += '<li><a target="_blank" href="' + v.url + '"><img src="' + v.thumb + '" />' +
                        '<div class="tj_name">' +
                        v.title.subCHString(0,20) +
                        '</div>' +
                        '</a>' +
                        '</li>';
                    });
                    n_html += '</ul></div>';

                    $('#block_40').html(n_html);
                }

                //专题策划
                if (data.data['31'].length > 0) {
                    var number = data.data['31'].length;
                    var n_html = '<div class="title1">' +
                            '<h3><span>专题推荐</span><a target="_blank" href="'+SPE_URL+'">更多 >></a></h3></div>' +
                            '<div style="width:300px;margin:0px auto;padding-top: 5px;"><div class="roll-news-keleyi-com"><div class="roll-news-image">';
                    $.each(data.data['31'], function(i, v) {
                        if (i != 0){var style = 'style="display: none;"';}else{var style = '';}
                        n_html += '<a target="_blank"  title="' + v.title + '" href="' + v.url + '">' +
                                  '<img onerror="javascript:n_noImge(this)" '+style+' src="' + v.thumb + '" title="' + v.title + '" />' +
                                  '</a>';
                    });
                    n_html += '</div>' +
                        '<div class="roll-news-index">' +
                        '<ul style="overflow:hidden">' +
                        '<li class="roll-news-index-hover">1</li>';
                    for (var i=2;i<=number;i++) {
                        n_html += '<li>'+i+'</li>';
                    }
                    n_html += '</ul></div>' +
                        '<div class="roll-news-title">';
                    $.each(data.data['31'], function(i, v) {
                        if (i != 0){var style = 'style="display: none;"';}else{var style = '';}
                        n_html += '<a target="_blank" '+style+' title="' + v.title + '" href="' + v.url + '">' + v.title.subCHString(0,30) + '</a>';
                    });
                    n_html += '</div></div></div>';
                    $('#block_31').html(n_html);
                    $.cpsSlide();
                }

            }
        },
        error: function()
        {
            alert('服务器无响应，请联系管理员!');
        }
    });
}

/**
 * 二级栏目初始化
 * 
 * @returns {undefined}
 */
function n_pingce_init(n_catid) {
    $.ajax({
        type: "get",
        dataType: 'jsonp',
        url: ASY_URL + '/block/get',
        jsonpCallback: "callback",
        data: {
            catid: n_catid,
            id: '28,42,43,44'
        },
        success: function(data) {
            if (data.status) {
				
                //新闻排行
                var n_arr = ['day', 'week', 'month'];
                var n_tabText = ['每日', '每周', '每月'];
                var n_html = '';
                var styleName2 = '';
                $.each(n_arr, function(i, d) {
                    if (data.data['28'][d].length > 0) {
                        if (i == 0){var styleName = '';}else{var styleName = 'style="display:none"';}
                        n_html += '<div class="info" '+styleName+'>' +
                        '<ul>';
                        $.each(data.data['28'][d], function(n, v) {
                            if (n == 9){
                                var className = 'class="last1"';
                            }else{
                                var className = '';
                            }
                            if(n < 3){styleName2 = 'class="nub1 han"';}else{styleName2 = 'class="nub2 han"';}
                            var index = n+1;
                            n_html += '<li '+className+'><a target="_blank" href="'+v.url+'"><div '+styleName2+'>'+index+'</div>'+v.title.subCHString(0,30)+'</a></li>';
                        });
                        n_html += '</ul></div>';
                    }
                });
				
                $('#block_28').html(n_html);
				
				 //n_tabs();
                //评测百科
                if (data.data['42'].length > 0) {
                    var n_html = '<ul>';
                    $.each(data.data['42'], function(i, v) {
                        n_html += '<li><div class="right3_img"><img src="' + v.thumb + '" />' +
                        '</div>' +
						'<div class="right3_text"><h3><a href="'+v.url+'"> '+
						   v.title.subCHString(0,20) +
						'</a></h3><p>'+getLocalTime(v.inputtime); +'</p></div>'+
                        '</li>';
                    });
                    n_html += '</ul>';

                    $('#block_42').html(n_html);
                }
				
				
				
                //n_tabs();
                //最新评测,热门评测
				  var n_arr = ['hot','new'];
                  n_html = '';
                $.each(n_arr, function(i, d) {
					if (data.data['43'][d].length > 0) {
						
						if (d == 'new'){var display = 'style="display:none"';}else{var display = '';}
						 n_html += '<div class="zx_1" '+ display +'>' +
							'<ul class="tj">';
						$.each(data.data['43'][d], function(i, v) {
							n_html += '<li><a target="_blank" href="' + v.url + '"><img src="' + v.thumb + '" />' +
							'<div class="tj_name">' +
							v.title.subCHString(0,20) +
							'</div>' +
							'</a>' +
							'</li>';
						});
						n_html += '</ul></div>';
                   
					}
					
                });
				
				$('#block_43').html(n_html);
               

                //专题策划
                if (data.data['44'].length > 0) {
                    var number = data.data['44'].length;
                    var n_html = '<div class="title11">' +
                            '<h3><a class="lt_name_1">评测专题</a><a class="more3" target="_blank" href="http://pingce.cps.com.cn/list/spe/">更多 >></a></h3>' +
                            '<div style="width:300px;margin:0px auto;"><div class="roll-news-keleyi-com"><div class="roll-news-image">';
                    $.each(data.data['44'], function(i, v) {
                        if (i != 0){var style = 'style="display: none;"';}else{var style = '';}
                        n_html += '<a target="_blank"  title="' + v.title + '" href="' + v.url + '">' +
                                  '<img onerror="javascript:n_noImge(this)" '+style+' src="' + v.thumb + '" title="' + v.title + '" />' +
                                  '</a>';
                    });
                    n_html += '</div>' +
                        '<div class="roll-news-index">' +
                        '<ul style="overflow:hidden">' +
                        '<li class="roll-news-index-hover">1</li>';
                    for (var i=2;i<=number;i++) {
                        n_html += '<li>'+i+'</li>';
                    }
                    n_html += '</ul></div>' +
                        '<div class="roll-news-title">';
                    $.each(data.data['44'], function(i, v) {
                        if (i != 0){var style = 'style="display: none;"';}else{var style = '';}
                        n_html += '<a target="_blank" '+style+' title="' + v.title + '" href="' + v.url + '">' + v.title.subCHString(0,30) + '</a>';
                    });
                    n_html += '</div></div></div></div>';
                    $('#block_44').html(n_html);
                    $.cpsSlide();
                }

            }
        },
        error: function()
        {
            alert('服务器无响应，请联系管理员!');
        }
    });
}

function n_search_init() {
    $.ajax({
        type: "get",
        dataType: 'jsonp',
        url: ASY_URL + '/block/get',
        jsonpCallback: "callback",
        data: {          
            id: '31'
        },
        success: function(data) {
            if (data.status) {              

                //专题策划
                if (data.data.length > 0) {
                    var n_html = '<div class="fdnewstt2">' +
                            ' <p class="p-r-tit">专题策划</p>' +
                            '</div>' +
                            '<div style="width:278px;padding:12px 0 0 10px;">';
                    $.each(data.data, function(i, v) {
                        n_html += '<div style="font-size:14px; width:270px; float:left; height:25px; line-height:25px; overflow:hidden; font-weight:bold;">' +
                                '<a target="_blank"  title="' + v.title + '" href="' + v.url + '">' + v.title.subCHString(0,30) + '</a>' +
                                '</div>' +
                                '<div class="zhuantipic pic2px">' +
                                '<a target="_blank"  href="' + v.url + '">' +
                                '<img onerror="javascript:n_noImge(this)" onload=" resizeImg(this,120,100);" src="' + v.thumb + '" title="' + v.title + '" />' +
                                '</a>' +
                                '</div>' +
                                '<div style="width:140px; float:left; height:95px;">' +
                                '<a target="_blank" style="color:rgb(153, 153, 153);" title="' + v.title + '" href="' + v.url + '">'+ 　　
                                v.description.subCHString(0,50) +
                                '</a>' +
                                '</div>';
                    });
                    n_html += '</div>';

                    $('#block_31').html(n_html);
                }

            }
        },
        error: function()
        {
            alert('服务器无响应，请联系管理员!');
        }
    });
}

/**
 * 内页初始化
 * 
 * @returns {undefined}
 */
function n_show_init(n_brandid) {
    $.ajax({
        type: "get",
        dataType: 'jsonp',
        url: ASY_URL + '/block/get',
        jsonpCallback: "callback",
        data: {id: '28,29,30,31,37,40,41', brandid: n_brandid},
        success: function(data) {
            if (data.status) {
                //新闻排行
                var n_arr = ['day', 'week', 'month'];
                var n_html = '';
                var styleName2 = '';
                $.each(n_arr, function(i, d) {
                    if (data.data['28'][d].length > 0) {
                        if (i == 0){var styleName = '';}else{var styleName = 'style="display:none"';}
                        n_html += '<div class="info" '+styleName+'>' +
                        '<ul>';
                        $.each(data.data['28'][d], function(n, v) {
                            if (n == 9){
                                var className = 'class="last1"';
                            }else{
                                var className = '';
                            }
                            if(n < 3){styleName2 = 'class="nub1 han"';}else{styleName2 = 'class="nub2 han"';}
                            var index = n+1;
                            n_html += '<li '+className+'><a target="_blank" href="'+v.url+'"><div '+styleName2+'>'+index+'</div>'+v.title.subCHString(0,30)+'</a></li>';
                        });
                        n_html += '</ul></div>';
                    }
                });
                $('#block_28').html(n_html);
                


                if (!$.isEmptyObject(data.data['29']['list'])) {
                    //最新产品
                    var j, productCpsUrl = data.data['29']['productCpsUrl'],
                            bbsServerUrl = data.data['29']['bbsServerUrl'];

                    var n_html = '<div class="r_2_a2"><h5>最新产品</h5></div>' +
                            '<div class="TabContent_brand_product">' +
                            '<div id="myTab_Content_new">' +
                            '<div class="star">';
							
							
							
			var n_html = '<div class="title1 ">'
            	+'<h3  style="border-bottom:0px">'
                	+'<span style="border-bottom:0px">相关产品</span>'
                    +'<a target="_blank" href="'+productCpsUrl+'">更多 >></a>'
                +'</h3>'
             +'</div>';
              n_html += '<div class="cp">'
              	+'<ul>';
				$.each(data.data['29']['list'], function(i, v) {
					var label = '';
					if(i<3){
						label = '<p class="shu1">'+(i+1)+'</p>';
					}else{
						label = '<p">'+(i+1)+'</p>';
					}
                	n_html += '<li>'
                    	+'<a target="_blank" href="' + productCpsUrl + '/product_' + v.productid + '.html">'
                        	+'<div class="prod_img">'
                        		+'<img onload="resizeImgA(this,50,37)" src="' + productCpsUrl + '/uploadfile/' + v.thumb + '" alt="' + v.name + '" onerror="javascript:n_noImge(this)" />'
                              +'</div>'
                        	+'<div class="prod_name">'
                        		+'<p>' + v.name + '</p>'
                                +'<p><span>' + v.price + '</span></p>'
                            +'</div>'
                            +'<div class="prod_shu">'
                        		+label
                            +'</div>'
                        +'</a>'
                    +'</li>';
					});
                n_html += '</ul></div>';
              
										
										
                    $('#block_29').html(n_html);
                }

                // 关联品牌
                if (!$.isEmptyObject(data.data['37'])) {
                    var v = data.data['37'];
                    var n_html = '<div class="ls_qykj">';
					
					
					var n_html = '<div class="list_pro" >';
            		n_html += '<div class="pro_img">';
                    	n_html += '<a target="_blank" href="' + v.url + '"><img onload="this.style.display=\'\';resizeImgA(this,80,60);" onerror="javascript:n_noImge(this);" src="' + v.logo + '" /></a>';
                    n_html += '</div>';
                    n_html += '<div class="pro_name">';
                    	n_html += '<h3><a target="_blank"  href="' + v.url + '">' + v.name + '</a></h3>';
						n_html += '<p>' + v.content + '<a target="_blank" href="' + v.url + '" class="xianxi">【详细】</a></p>';
                    n_html += '</div>';
					n_html += '</div>';
                    $('#block_37').html(n_html);
                }
				
				//推荐资讯(今日推荐)
                if (data.data['40'].length > 0) {
                    var n_html = '<div class="title1">' +
                        '<h3>' +
                        '<span>今日推荐</span>' +
						'<a target="_blank" href="http://news.cps.com.cn/top/">更多 >></a>' +
                        '</h3>' +
                        '</div>' +
                        '<div>' +
                        '<ul class="tj">';
                    $.each(data.data['40'], function(i, v) {
                        n_html += '<li><a href="' + v.url + '"><img src="' + v.thumb + '" />' +
                        '<div class="tj_name">' +
                        v.title.subCHString(0,20) +
                        '</div>' +
                        '</a>' +
                        '</li>';
                    });
                    n_html += '</ul></div>';

                    $('#block_40').html(n_html);
                }
				
				
				//论坛热点
                var n_arr = ['hot','new'];
                    n_html = '';
                $.each(n_arr, function(i, d) {
                    if (data.data['41'][d].length > 0) {
                        if (d == 'new'){var display = 'style="display:none"';}else{var display = '';}
                        n_html += '<div class="info" ' + display + '><ul>';
                        $.each(data.data['41'][d], function(n, v) {
                            var index = n+1;
                            var styleName = '';
                            var styleName2 = '';
                            var link = 'http://bbs.cps.com.cn/cps-'+v.tid+'-1-1.html';
                            if (index == data.data['41'][d].length){styleName = 'class="last1"';}
                            if(n < 3){styleName2 = 'class="nub1 han"';}else{styleName2 = 'class="nub2 han"';}
                            n_html += '<li '+styleName+'><a target="_blank" href="'+link+'"><div '+styleName2+'>'+index+'</div>'+ v.subject.subCHString(0,30) +'</a></li>';
                        });
                        n_html += '</ul></div>';
                    }
                });
                $('#block_41').html(n_html);
                //专题策划
                if (data.data['31'].length > 0) {
                    var number = data.data['31'].length;
                    var n_html = '<div class="title1">' +
                            '<h3><span>专题推荐</span><a target="_blank" href="'+SPE_URL+'">更多 >></a></h3></div>' +
                            '<div style="width:300px;margin:0px auto;padding-top: 5px;"><div class="roll-news-keleyi-com"><div class="roll-news-image">';
                    $.each(data.data['31'], function(i, v) {
                        if (i != 0){var style = 'style="display: none;"';}else{var style = '';}
                        n_html += '<a target="_blank"  title="' + v.title + '" href="' + v.url + '">' +
                                  '<img onerror="javascript:n_noImge(this)" '+style+' src="' + v.thumb + '" title="' + v.title + '" />' +
                                  '</a>';
                    });
                    n_html += '</div>' +
                        '<div class="roll-news-index">' +
                        '<ul style="overflow:hidden">' +
                        '<li class="roll-news-index-hover">1</li>';
                    for (var i=2;i<=number;i++) {
                        n_html += '<li>'+i+'</li>';
                    }
                    n_html += '</ul></div>' +
                        '<div class="roll-news-title">';
                    $.each(data.data['31'], function(i, v) {
                        if (i != 0){var style = 'style="display: none;"';}else{var style = '';}
                        n_html += '<a target="_blank" '+style+' title="' + v.title + '" href="' + v.url + '">' + v.title.subCHString(0,30) + '</a>';
                    });
                    n_html += '</div></div></div>';
                    $('#block_31').html(n_html);
                    $.cpsSlide();
                }
            }
        },
        error: function()
        {
            alert('服务器无响应，请联系管理员!');
        }
    });
}

/**
 * 404 页面
 * 
 * 初始化区块载入
 */
function n_404_init() {
    $.ajax({
        type: "get",
        url: ASY_URL + '/block/get',
        dataType: 'jsonp',
        jsonpCallback: "callback",
        data: {id: '32,33,31'},
        success: function(data) {
            if (data.status) {
                //左侧是调用首页2个头条              
                if (data.data['32'].length > 0) {
                    var n_html = '';
                    $.each(data.data['32'], function(i, v) {
                        n_html += '<div class="xw"><div class="xw_tit"><a href="' + v.url + '">' + v.title + '</a></div>';
                        n_html += '<div class="xw_txt"><div class="left_img"><a href="' + v.url + '"><img width="200" height="135" onerror="javascript:n_noImge(this);" src="' + v.thumb + '"></a></div>';
                        n_html += '<div class="right_p"><p class="ppp">' + v.description + '<a href="' + v.url + '">[详情]</a></p></div></div>';
                        n_html += '<div class="xw_ly"><p class="xw_gx">' + v.inputtime + '更新&#12288;</p><p class="xw_pl"><img src="/static/images/404/xw_pl_1.jpg">';
                        n_html += '<span><a href="' + v.url + '" target="_blank">查看全文</a></span><img src="/static/images/404/xw_pl_2.jpg"><span><a href="http://comment.cps.com.cn/764461.html?title=' + v.title + '" target="_blank">我要评论</a></span></p></div>';
                        n_html += ' </div><div class="line"><img src="/static/images/404/line.jpg"></div>';
                    });
                    $('#block_32').html(n_html);
                }

                //右侧是热点资讯       
                if (data.data['33'].length > 0) {
                    var n_html = '';
                    $.each(data.data['33'], function(i, v) {
                        n_html += '<div class="title"><a href="' + v.url + '" target="_blank">' + v.title + '</a></div>';
                        n_html += '<div class="hot_zt"><a href="' + v.url + '" target="_blank"><img onerror="javascript:n_noImge(this);" src="' + v.thumb + '"></a>';
                        n_html += '<p>' + v.description.subCHStr(0, 40) + '..<a href="' + v.url + '">&nbsp;详细</a></p></div>';
                        n_html += '<div class="line line_1"><img src="/static/images/404/line_1.jpg"></div>';
                    });
                    $('#block_33').html(n_html);
                }
                
                //右侧是热点专题       
                if (data.data['31'].length > 0) {
                    var n_html = '';
                    $.each(data.data['31'], function(i, v) {                                         
                        n_html += '<div class="title">' +
                                '<a href="'+v.url+'" target="_blank">' +
                                v.title.subCHStr(0, 30) +
                                '</a>' +
                                '</div>' +
                                '<div class="hot_zt">' +
                                '<a href="'+v.url+'" target="_blank">' +
                                    '<img src="'+v.thumb+'">' +
                                '</a>' +
                                '<p>'+v.description.subCHStr(0, 50)+'<a href="'+v.url+'">详细</a></p>' +
                                '</div>' +
                                '<div class="line line_1">' +
                                    '<img src="/static/images/404/line_1.jpg">' +
                                '</div>';
                        });
                    $('#block_31').html(n_html);
                }
            }
        },
        error: function()
        {
            alert('服务器无响应，请联系管理员!');
        }
    });

}

function n_getUserLoginInfo(urlKey) {

    $.ajax({
        type: "get",
        dataType: 'jsonp',
        url: ASY_URL + '/user/getLoginInfo',
        jsonpCallback: "callbackUserinfo",
        data: {urlKey: urlKey},
        success: function(data) {
            if (data.status) {
                $('#user_login_wrap').html(data.content);
            }
        },
        error: function(data) {
            alert('服务器无响应，请联系管理员!');
        }
    });
}

function n_noImge(obj) {
    $(obj).attr('src', '/static/images/news/no_pic.gif');
}


;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
    $.cpsSlide = function(options){
        var defaults = {
            image:'.roll-news-image img',
			pointer: '.roll-news-index li',
            hoverClass: 'roll-news-index-hover',
            title: '.roll-news-title a',
			all:'.roll-news-keleyi-com',
            time: 3000
    };
    var opts = $.extend(defaults, options);
    if($(opts.pointer).length == 0 ){
        return;
    }

    (function init(){
		var index = 0;
		var length = $(opts.pointer).length;
		var picTimer;
        showImg(index);

        $(opts.pointer).mouseover(function () {
            index = $(opts.pointer).index(this);
            showImg(index);
            slideFlag = false;
        });
		
		//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
		$(opts.all).hover(function() {
			clearInterval(picTimer);
		},function() {
			picTimer = setInterval(function() {
				showImg(index);
				index++;
				if(index == length) {
					index = 0;
				}
			}, opts.time); //代表自动播放的间隔，单位：毫秒
		}).trigger("mouseleave");
    })();



    function showImg(i) {
        $(opts.image).eq(i).stop(true, true).fadeIn(800).parent().siblings().find("img").hide();
        $(opts.pointer).removeClass(opts.hoverClass);
        $(opts.pointer).eq(i).addClass(opts.hoverClass);
        $(opts.title).eq(i).stop(true, true).fadeIn(800).siblings().hide();
    }

    
}
}));