(function(_, scope) {
    var ua = _.userAgent;
    scope.browserUserAgentCallBack = function(callback) {
        if (typeof(callback) == "function") {
            return callback(ua)
        }
        console.log("The argument must be a function!");
        return null
    }
})(window.navigator, window);
(function(w) {
    var pc_site_home = "http://www.cheshi.com";
    var touch_site_home = "http://a.cheshi.com";
    var simple_site_home = "http://m.cheshi.com";
    w.client_device = "pc";
    var current_url = {
        "pc": w.location.href,
        "touch": w.location.pathname,
        "simple": w.location.pathname + w.location.search
    };
    var is_mobile = w.browserUserAgentCallBack(function(ua) {
        ua = ua.toLowerCase();
        return /mobile/i.test(ua)
    });
    var is_touch = "ontouchstart" in window;
    var is_sbjava = w.browserUserAgentCallBack(function(ua) {
        ua = ua.toLowerCase();
        return /linux/i.test(ua)
    });
    var support_client = w.browserUserAgentCallBack(function(ua) {
        ua = ua.toLowerCase();
        return /pad/i.test(ua)
    });
    if (is_mobile) {
        if (is_touch) {
            w.client_device = "touch"
        } else {
            w.client_device = "simple"
        }
    } else {
        if ((is_sbjava)) {
            w.client_device = "simple"
        }
    } if (support_client) {
        w.client_device = "pc"
    }
    var rules = [{
        regexp: {
            "pc": "^http://product.cheshi.com/$",
            "touch": "^/product/$",
            "simple": "^/product/index.php$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://product.cheshi.com",
                "touch": "/product/",
                "simple": "/product/index.php"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://product.cheshi.com/selectcar/$",
            "touch": "^/product/search/$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://product.cheshi.com/selectcar/",
                "touch": "/product/search/"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://news.cheshi.com/$",
            "touch": "^/news/$",
            "simple": "^/news/index.php$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://news.cheshi.com",
                "touch": "/news/",
                "simple": "/news/index.php"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://pic.cheshi.com/$",
            "touch": "^/pic/$",
            "simple": "^/product/photo_index.php$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com",
                "touch": "/pic/",
                "simple": "/product/photo_index.php"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://price.cheshi.com/jiangjia/$",
            "touch": "^/jiangjia/$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://price.cheshi.com/jiangjia/",
                "touch": "/jiangjia/"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://price.cheshi.com/jiangjia/series_([0-9]+)/$",
            "touch": "^/jiangjia/bseries/([0-9]+)_0_0.html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://price.cheshi.com/jiangjia/series_" + r[1] + "/",
                "touch": "/jiangjia/bseries/" + r[1] + "_0_0.html"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://product.cheshi.com/logo_([0-9]+)/$",
            "touch": "^/logo_([0-9]+)/$",
            "simple": "^/product/logo_info.php\\?id=([0-9]+)$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://product.cheshi.com/logo_" + r[1] + "/",
                "touch": "/logo_" + r[1] + "/",
                "simple": "/product/logo_info.php?id=" + r[1]
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://pic.cheshi.com/logopic_([0-9]+).html$",
            "touch": "^/pic/logo_([0-9]+).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/logopic_" + r[1] + ".html",
                "touch": "/pic/logo_" + r[1] + ".html"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://ask.cheshi.com/detail_([0-9]+).html$",
            "touch": "^/detail_([0-9]+).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://ask.cheshi.com/detail_" + r[1] + ".html",
                "touch": "/detail_" + r[1] + ".html"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://seller.cheshi.com/([0-9]+)/$",
            "touch": "^/seller_([0-9]+)/$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://seller.cheshi.com/" + r[1] + "/",
                "touch": "/seller_" + r[1] + "/"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://seller.cheshi.com/([0-9]+)/news.html$",
            "touch": "^/seller/([0-9]+)/news.html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://seller.cheshi.com/" + r[1] + "/news.html",
                "touch": "/seller/" + r[1] + "/news.html"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://product.cheshi.com/bseries_([0-9]+)/$",
            "touch": "^/bseries_([0-9]+)/$",
            "simple": "^/product/bseries_info.php\\?id=([0-9]+)$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://product.cheshi.com/bseries_" + r[1] + "/",
                "touch": "/bseries_" + r[1] + "/",
                "simple": "/product/bseries_info.php?id=" + r[1]
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://product.cheshi.com/bseries_([0-9]+)/jiangjia.html$",
            "touch": "^/jiangjia/bseries_([0-9]+).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://product.cheshi.com/bseries_" + r[1] + "/jiangjia.html",
                "touch": "/jiangjia/bseries_" + r[1] + ".html"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://product.cheshi.com/bseries_([0-9]+)/price.html$",
            "touch": "^/bseries_([0-9]+)/price.html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://product.cheshi.com/bseries_" + r[1] + "/price.html",
                "touch": "/bseries_" + r[1] + "/price.html"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://pic.cheshi.com/bseriespic_([0-9]+).html$",
            "touch": "^/pic/view_([0-9]+)_all.html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/bseriespic_" + r[1] + ".html",
                "touch": "/pic/view_" + r[1] + "_all.html"
            };
            return uri[w.client_device]
        }
    },
	{
        regexp: {
            "pc": "^http://pic.cheshi.com/photo/bseries/([0-9]+?)/(\\?.+?)?$",
            "touch": "^/pic/view_([0-9]+?)_all.html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/photo/bseries/"+r[1]+"/",
                "touch": "/pic/view_"+r[1]+"_all.html"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://product.cheshi.com/bseries_([0-9]+)/param.html$",
            "touch": "^/bseries_([0-9]+)/param.html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://product.cheshi.com/bseries_" + r[1] + "/param.html",
                "touch": "/bseries_" + r[1] + "/param.html"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://product.cheshi.com/bseries_([0-9]+)/news.html$",
            "touch": "^/bseries_([0-9]+)/news.html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://product.cheshi.com/bseries_" + r[1] + "/news.html",
                "touch": "/bseries_" + r[1] + "/news.html"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://news.cheshi.com/[0-9]+/([0-9]+)(_)?([0-9]+)?(_all)?.shtml",
            "touch": "^/news/([0-9]+).html$",
            "simple": "^/news/news_info.php\\?storyid=([0-9]+)"
        },
        to: function(r) {
			var uri = {
				"pc": "http://news.cheshi.com/",
				"touch": "/news/" + r[1] + ".html",
				"simple": "/news/news_info.php?storyid=" + r[1]
			};
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://news.cheshi.com/seller/([0-9]+).html",
            "touch": "^/seller/newsdetail_([0-9]+).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://news.cheshi.com/seller/" + r[1] + ".html",
                "touch": "/seller/newsdetail_" + r[1] + ".html"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://product.cheshi.com/model_([0-9]+)/$",
            "touch": "^/model_([0-9]+)/$",
            "simple": "^/product/model_info.php\\?id=([0-9]+)$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://product.cheshi.com/model_" + r[1] + "/",
                "touch": "/model_" + r[1] + "/",
                "simple": "/product/model_info.php?id=" + r[1]
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://product.cheshi.com/model_([0-9]+)/price.html$",
            "touch": "^/model_([0-9]+)/price.html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://product.cheshi.com/model_" + r[1] + "/",
                "touch": "/model_" + r[1] + "/price.html"
            };
            return uri[w.client_device]
        }
    }, {
        regexp: {
            "pc": "^http://product.cheshi.com/model_([0-9]+)/param.html$",
            "touch": "^/model_([0-9]+)/param.html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://product.cheshi.com/model_" + r[1] + "/param.html",
                "touch": "/model_" + r[1] + "/param.html"
            };
            return uri[w.client_device]
        }
    },{
        regexp: {
            "pc": "^http://pic.cheshi.com/model_([0-9]+?)/$",
            "touch": "^/pic/view_[0-9]+?_(?:all|[0-9]+?)_y([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/model_"+r[1]+"/",
                "touch": "/pic/prd_"+r[1]+"_all.html"
            };
            return uri[w.client_device]
        }
    },{
        regexp: {
            "pc": "^http://pic.cheshi.com/model_([0-9]+?)/c([0-9]+?).html$",
            "touch": "^/pic/prd_[0-9]+?_(?:all|[0-9]+?)_c([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/model_"+r[1]+"/c"+r[2]+".html",
                "touch": "/pic/prd_"+r[1]+"_all_c"+r[2]+".html"
            };
            return uri[w.client_device]
        }
    },{
        regexp: {
            "pc": "^http://pic.cheshi.com/model_([0-9]+?)/t([0-9]+?).html$",
            "touch": "^/pic/prd_([0-9]+?)_([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/model_"+r[1]+"/t"+r[2]+".html",
                "touch": "/pic/prd_"+r[1]+"_"+r[2]+".html"
            };
            return uri[w.client_device]
        }
    },{
        regexp: {
            "pc": "^http://pic.cheshi.com/model_([0-9]+?)/t([0-9]+?)_c([0-9]+?).html$",
            "touch": "^/pic/prd_([0-9]+?)_([0-9]+?)_c([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/model_"+r[1]+"/t"+r[2]+"_c"+r[3]+".html",
                "touch": "/pic/prd_"+r[1]+"_"+r[2]+"_c"+r[3]+".html"
            };
            return uri[w.client_device]
        }
    },
    {
        regexp: {
            "pc": "^http://pic.cheshi.com/(?:big)?photo/bseries/([0-9]+?)/(all|[0-9]+?)/([0-9]+?).html(?:#big)?$",
            "touch": "^/pic/pview_([0-9]+?)_(all|[0-9]+?)_([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/photo/bseries/"+r[1]+"/"+r[2]+"/"+r[2]+".html",
                "touch": "/pic/pview_"+r[1]+"_"+r[2]+"_"+r[3]+".html"
            };
            return uri[w.client_device]
        }
    },
	{
        regexp: {
            "pc": "^http://pic.cheshi.com/photo/bseries/color/([0-9]+?)/([0-9]+?)/(\\?.+?)?(?:#big)?$",
            "touch": "^/pic/prd_([0-9]+?)_(?:all|[0-9]+?)_(c[0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/photo/bseries/color/"+r[1]+"/"+r[2]+"/",
                "touch": "/pic/prd_"+r[1]+"_all_c"+r[2]+".html"
            };
            return uri[w.client_device]
        }
    },
	{
        regexp: {
            "pc": "^http://pic.cheshi.com/photo/(?:prd|bseries)/([0-9]+?)/([0-9]+?)/(\\?.+?)?(?:#big)?$",
            "touch": "^/pic/prd_([0-9]+?)_([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/photo/prd/"+r[1]+"/"+r[2]+"/",
                "touch": "/pic/prd_"+r[1]+"_"+r[2]+".html"
            };
            return uri[w.client_device]
        }
    },
	{
        regexp: {
            "pc": "^http://pic.cheshi.com/photo/([0-9]+?)/([0-9]+?)/([0-9]+?).html(?:#big)?$",
            "touch": "^/pic/pview_([0-9]+?)_([0-9]+?)_([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/photo/"+r[1]+"/"+r[2]+"/"+r[3]+".html",
                "touch": "/pic/pview_"+r[1]+"_"+r[2]+"_"+r[3]+".html"
            };
            return uri[w.client_device]
        }
    },
	{
        regexp: {
            "pc": "^http://pic.cheshi.com/bigphoto/([0-9]+?)/([0-9]+?)/([0-9]+?).html(?:#big)?$",
            "touch": "^/pic/pview_([0-9]+?)_([0-9]+?)_([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/bigphoto/"+r[1]+"/"+r[2]+"/"+r[3]+".html",
                "touch": "/pic/pview_"+r[1]+"_"+r[2]+"_"+r[3]+".html"
            };
            return uri[w.client_device]
        }
    },
    {
        regexp: {
            "pc": "^http://pic.cheshi.com/photo/prd/color/([0-9]+?)/([0-9]+?)/([0-9]+?)/(\\?.+?)?(?:#big)?$",
            "touch": "^/pic/prd_([0-9]+?)_([0-9]+?)_c([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/photo/prd/color/"+r[1]+"/"+r[3]+"/"+r[2]+"/",
                "touch": "/pic/prd_"+r[1]+"_"+r[3]+"_c"+r[2]+".html"
            };
            return uri[w.client_device]
        }
    },
	{
        regexp: {
            "pc": "^http://pic.cheshi.com/photo/([0-9]+?)-([0-9]+?)-([0-9]+?)-([0-9]+?).html(?:#big)?$",
            "touch": "^/pic/pview_([0-9]+?)_([0-9]+?)_([0-9]+)_c([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/photo/"+r[1]+"-"+r[4]+"-"+r[2]+"-"+r[3]+".html",
                "touch": "/pic/pview_"+r[1]+"_"+r[3]+"_"+r[4]+"_c"+r[2]+".html"
            };
            return uri[w.client_device]
        }
    },
    {
        regexp: {
            "pc": "^http://pic.cheshi.com/prdcategory_([0-9]+?)_t([0-9]+?).html$",
            "touch": "^/pic/view_([0-9]+?)_([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/prdcategory_"+r[1]+"_t"+r[2]+".html",
                "touch": "/pic/view_"+r[1]+"_"+r[2]+".html"
            };
            return uri[w.client_device]
        }
    },
    {
        regexp: {
            "pc": "^http://pic.cheshi.com/prdcategory_([0-9]+?)_c([0-9]+?).html$",
            "touch": "^/pic/view_([0-9]+?)_all_c([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/prdcategory_"+r[1]+"_c"+r[2]+".html",
                "touch": "/pic/view_"+r[1]+"_all_c"+r[2]+".html"
            };
            return uri[w.client_device]
        }
    },
    {
        regexp: {
            "pc": "^http://pic.cheshi.com/prdcategory_([0-9]+?)_t([0-9]+?)_c([0-9]+?).html$",
            "touch": "^/pic/view_([0-9]+?)_([0-9]+?)_c([0-9]+?).html$"
        },
        to: function(r) {
            var uri = {
                "pc": "http://pic.cheshi.com/prdcategory_"+r[1]+"_t"+r[2]+"_c"+r[3]+".html",
                "touch": "/pic/view_"+r[1]+"_"+r[2]+"_c"+r[3]+".html"
            };
            return uri[w.client_device]
        }
    }
    ];
    w.get_redirect_url = function(current_site, client_device) {
        var target_url = "";
        w.client_device = client_device;
        if (current_site != w.client_device) {
            for (var i = 0; i < rules.length; i++) {
                if (rules[i].regexp[current_site]) {
                    var res = (new RegExp(rules[i].regexp[current_site])).exec(current_url[current_site]);
                    if (res) {
                        var goto_url = {
                            "pc": rules[i].to(res),
                            "touch": rules[i].to(res) ? touch_site_home + rules[i].to(res) : touch_site_home,
                            "simple": rules[i].to(res) ? simple_site_home + rules[i].to(res) : simple_site_home
                        };
                        target_url = goto_url[w.client_device]
                    }
                }
            }
            if (!target_url) {
                if (w.client_device == "touch") {
                    target_url = pc_site_home + '/webapp/jump.html'
                } else {
                    if (w.client_device == "simple") {
                        target_url = simple_site_home
                    } else {
                        target_url = pc_site_home
                    }
                }
            }
        }
        return target_url
    };
	var now_url = w.location.href;
    if ((new RegExp("(webapp_ref=1)")).test(document.cookie) || now_url.indexOf("from")>0) {
        return false
    }
    if ((current_site != w.client_device) && w.client_device == "pc") {
        w.client_device = "touch"
    }
    var url = w.get_redirect_url(current_site, w.client_device);
    if (url) {
        w.location.href = url
    }
})(window);