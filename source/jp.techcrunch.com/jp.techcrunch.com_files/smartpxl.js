(function () {
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position){
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }

    var pathname = location.hostname + location.pathname;
    var defaulttag = '';
    var tagid = '00000';
    var type = 'NA';
    var category = 'n/a';
    var dot = null;
    var dot2 = null;

    var handler = function () {
        var smrtPxlDiv = document.createElement('div');
        smrtPxlDiv.style.display='none';
        var random = Math.floor( Math.random() * 100000 );
        var divid = 'smtpxl' + random.toString();
        smrtPxlDiv.id = divid;

// treasure define
        var tdeg = document.createElement('script');
        tdeg.type = 'application/javascript';
        tdeg.innerHTML = "// get meta\nvar getmeta = function(metaName, str1) {var metas = document.getElementsByTagName('meta');var re = new RegExp('\\b' + metaName + '\\b', 'i');var i = 0;var mLength = metas.length;for (i; i < mLength; i++) {if (re.test(metas[i].getAttribute(str1))) {return metas[i].getAttribute('content');}}return '';}";
        tdeg.innerHTML += "\n// get cookie\nvar getcookie = function(k){var cs = document.cookie; if(cs) {var acs = cs.split('; ');for(var i=0;i<acs.length;i++){ var cs = acs[i].split('=');if(cs[0] === k){return cs[1];}}}return '';}";
        tdeg.innerHTML += "\n// sanitize&encode\nfunction sanitize(k) {if (k === null || k === undefined) {return \"\";}return encodeURIComponent(String(k).replace(/\"/g, \"&quot;\").replace(/'/g, \"&#39;\").replace(/</g, \"&lt;\").replace(/>/g, \"&gt;\"));}";
        tdeg.innerHTML += "\n// set custom params\nvar obj = [ getmeta('sailthru.tags','name'),getmeta('description','name'),location.hostname,document.referrer,window.location,window.location.pathname,document.title,getcookie('data1'),navigator.userAgent,getmeta('pubdate','name'),getmeta('published_at','name'),getmeta('author','name'),getmeta('category','property'),getmeta('post_id','name')];if ( typeof obj === 'undefined' || obj === null){var obj = '';} else {var obj = obj;};var cstmprm =  '&sailthru_tags=' + sanitize(obj[0])+ '&td_description=' + sanitize(obj[1])+ '&td_host=' + sanitize(obj[2])+ '&td_referrer=' + sanitize(obj[3])+ '&td_url=' + sanitize(obj[4])+ '&td_path=' + sanitize(obj[5])+ '&td_title=' + sanitize(obj[6])+ '&test_cookie=' + sanitize(obj[7])+ '&td_user_agent=' + sanitize(obj[8])+ '&pubdate=' + sanitize(obj[9])+ '&published_at=' + sanitize(obj[10])+ '&author=' + sanitize(obj[11])+ '&category=' + sanitize(obj[12])+ '&post_id=' + sanitize(obj[13]);";
        tdeg.innerHTML += "\n//Send to TD\nvar el = document.createElement('img');el.src = (('https:' == document.location.protocol) ? 'https://' : 'http://')+ 'in.treasuredata.com/postback/v3/event/td_eg/td_eg?td_format=pixel&td_write_key=9576/a2148756cc5cfadaa217244f6a77a8de6ff6fbc8&td_global_id=td_global_id&td_ip=td_ip&td_ua=td_ua'+ cstmprm;el.width=1;el.height=1;el.style.display='none';\n//console.log(el);\ndocument.body.appendChild(el);";

        var tdtc = document.createElement('script');
        tdtc.type = 'application/javascript';
        tdtc.innerHTML = "// get meta\nvar getmeta = function(metaName, str1) {var metas = document.getElementsByTagName('meta');var re = new RegExp('\\b' + metaName + '\\b', 'i');var i = 0;var mLength = metas.length;for (i; i < mLength; i++) {if (re.test(metas[i].getAttribute(str1))) {return metas[i].getAttribute('content');}}return '';};";
        tdtc.innerHTML += "\n// get cookie\nvar getcookie = function(k){var cs = document.cookie; if(cs) {var acs = cs.split('; ');for(var i=0;i<acs.length;i++){ var cs = acs[i].split('=');if(cs[0] === k){return cs[1];}}}return '';};";
        tdtc.innerHTML += "\n// sanitize&encode\nfunction sanitize(k) {if (k === null || k === undefined) {return \"\";}return encodeURIComponent(String(k).replace(/\"/g, \"&quot;\").replace(/'/g, \"&#39;\").replace(/</g, \"&lt;\").replace(/>/g, \"&gt;\"));}";
        tdtc.innerHTML += "\n// set custom params\nvar obj = [ getmeta('sailthru.tags','name'),getmeta('description','name'),location.hostname,document.referrer,window.location,window.location.pathname,document.title,getcookie('data1'),navigator.userAgent,getmeta('pubdate','name'),getmeta('published_at','name'),getmeta('author','name'),getmeta('category','property'),getmeta('post_id','name')];if ( typeof obj === 'undefined' || obj === null){var obj = '';} else {var obj = obj;};var cstmprm =  '&sailthru_tags=' + sanitize(obj[0]) + '&td_description=' + sanitize(obj[1]) + '&td_host=' + sanitize(obj[2]) + '&td_referrer=' + sanitize(obj[3]) + '&td_url=' + sanitize(obj[4]) + '&td_path=' + sanitize(obj[5]) + '&td_title=' + sanitize(obj[6]) + '&test_cookie=' + sanitize(obj[7]) + '&td_user_agent=' + sanitize(obj[8]) + '&pubdate=' + sanitize(obj[9]) + '&published_at=' + sanitize(obj[10]) + '&author=' + sanitize(obj[11]) + '&category=' + sanitize(obj[12]) + '&post_id=' + sanitize(obj[13]);";
        tdtc.innerHTML += "\n//Send to TD\nvar el = document.createElement('img');el.src = (('https:' == document.location.protocol) ? 'https://' : 'http://') + 'in.treasuredata.com/postback/v3/event/td_tc/td_tc?td_format=pixel&td_write_key=9576/a2148756cc5cfadaa217244f6a77a8de6ff6fbc8&td_global_id=td_global_id&td_ip=td_ip&td_ua=td_ua' + cstmprm;el.width=1;el.height=1;el.style.display='none';document.body.appendChild(el);";

        var tdab = document.createElement('script');
        tdab.type = 'application/javascript';
        tdab.innerHTML = "// get meta\nvar getmeta = function(metaName, str1) {var metas = document.getElementsByTagName('meta');var re = new RegExp('\\b' + metaName + '\\b', 'i');var i = 0;var mLength = metas.length;for (i; i < mLength; i++) {if (re.test(metas[i].getAttribute(str1))) {return metas[i].getAttribute('content');}}return '';};";
        tdab.innerHTML += "\n// get cookie\nvar getcookie = function(k){var cs = document.cookie; if(cs) {var acs = cs.split('; ');for(var i=0;i<acs.length;i++){ var cs = acs[i].split('=');if(cs[0] === k){return cs[1];}}}return '';};";
        tdab.innerHTML += "\n// sanitize&encode\nfunction sanitize(k) {if (k === null || k === undefined) {return \"\";}return encodeURIComponent(String(k).replace(/\"/g, \"&quot;\").replace(/'/g, \"&#39;\").replace(/</g, \"&lt;\").replace(/>/g, \"&gt;\"));}";
        tdab.innerHTML += "\n// set custom params\nvar obj = [ getmeta('sailthru.tags','name'),getmeta('description','name'),location.hostname,document.referrer,window.location,window.location.pathname,document.title,getcookie('data1'),navigator.userAgent,getmeta('pubdate','name'),getmeta('published_at','name'),getmeta('author','name'),getmeta('category','property'),getmeta('post_id','name')];if ( typeof obj === 'undefined' || obj === null){var obj = '';} else {var obj = obj;};var cstmprm =  '&sailthru_tags=' + sanitize(obj[0])+ '&td_description=' + sanitize(obj[1])+ '&td_host=' + sanitize(obj[2])+ '&td_referrer=' + sanitize(obj[3])+ '&td_url=' + sanitize(obj[4])+ '&td_path=' + sanitize(obj[5])+ '&td_title=' + sanitize(obj[6])+ '&test_cookie=' + sanitize(obj[7])+ '&td_user_agent=' + sanitize(obj[8])+ '&pubdate=' + sanitize(obj[9])+ '&published_at=' + sanitize(obj[10])+ '&author=' + sanitize(obj[11])+ '&category=' + sanitize(obj[12])+ '&post_id=' + sanitize(obj[13]);";
        tdab.innerHTML += "\n//Send to TD\nvar el = document.createElement('img');el.src = (('https:' == document.location.protocol) ? 'https://' : 'http://')+ 'in.treasuredata.com/postback/v3/event/td_ab/td_ab?td_format=pixel&td_write_key=9576/a2148756cc5cfadaa217244f6a77a8de6ff6fbc8&td_global_id=td_global_id&td_ip=td_ip&td_ua=td_ua'+ cstmprm;el.width=1;el.height=1;el.style.display='none';document.body.appendChild(el);";

        var TDDiv = document.createElement('div');
        TDDiv.style.display='none';
        TDDiv.id = '_tdDiv';
        document.body.appendChild(TDDiv);
        var eleTd = document.getElementById("_tdDiv");

// public Dot define
        var ab = '<img src="https://sp.analytics.yahoo.com/spp.pl?a=10000&.yp=428726&country=jp&property=autoblog"/>';
        var ab_ele = '<img src="https://sp.analytics.yahoo.com/spp.pl?a=10000&.yp=428726&country=jp&property=autoblog&sub=electric"/>';
        var an = '<img src="https://sp.analytics.yahoo.com/spp.pl?a=10000&.yp=428726&country=jp&property=aolnews"/>';
        var tc = '<img src="https://sp.analytics.yahoo.com/spp.pl?a=10000&.yp=428726&country=jp&property=techcrunch"/>';
        var eg = '<img src="https://sp.analytics.yahoo.com/spp.pl?a=10000&.yp=428726&country=jp&property=engadget"/>';
        var eg_iphone = '<img src="https://sp.analytics.yahoo.com/spp.pl?a=10000&.yp=428726&country=jp&property=engadget&article=iphone"/>';

// new rt tag and public dot rule		
        if (pathname.match(/^news.aol.jp\//))
        {
            smrtPxlDiv.innerHTML += an;
        }
        else if (pathname.match(/aol.jp\//))
        {
            tagid = '57384';
        }
        else if (pathname.match(/^japanese.engadget.com/))
        {
            tagid = '57382';
            smrtPxlDiv.innerHTML += eg;
            // Treasure tag insert
            eleTd.appendChild(tdeg);
            if  (pathname.match(/iphone/))
            {
                smrtPxlDiv.innerHTML += eg_iphone;
            }        
        }
        else if (pathname.match(/^jp.techcrunch.com/))
        {
            tagid = '57383';
            smrtPxlDiv.innerHTML += tc;
            // Treasure tag insert
            eleTd.appendChild(tdtc);
        }
        else if (pathname.match(/^jp.autoblog.com/))
        {
            tagid = '57381';
            smrtPxlDiv.innerHTML += ab;
            if  (pathname.match(/^jp.autoblog.com\/category\/electric\//))
            {
                smrtPxlDiv.innerHTML += ab_ele;
            }        
            else if  (pathname.match(/^jp.autoblog.com\/category\/minivans-mpvs\//))
            {
            }
            else if  (pathname.match(/^jp.autoblog.com\/category\/wagons-estates\//))
            {
            }
            // Treasure tag insert
            eleTd.appendChild(tdab);
        }

        if (tagid != '00000')
        {
            smrtPxlDiv.innerHTML += '<img src="//pixel.advertising.com/ups/' + tagid + '/rt" height="1" width="1" style="display:none" />';
        }
        tagid = '00000';

// 04/06/18 for BMW    
        if (pathname.match(/^japanese.engadget.com\/pr\/bmw-ev-2018\/$/))
        {
            tagid = '57894';
            smrtPxlDiv.innerHTML += '<img src="//pixel.advertising.com/ups/' + tagid + '/rt" height="1" width="1" style="display:none" /><img src="https://adserver.adtechjp.com/adserv/3.0/5072.140/4485678/0/0/ADTECH;loc=100;adid=10430936;bnid=-1" height="1" width="1" style="display:none" />';
        }
        tagid = '00000';

// 04/04/18 for IIJ
        var iijRTDiv = document.createElement('div');
        iijRTDiv.style.display='none';
        iijRTDiv.id = '_iijRTDiv';
        if (pathname.match(/^japanese.engadget.com\/pr\/sim-iijmio\/$/))
        {
            document.body.appendChild(iijRTDiv);
            var gRMDiv = document.createElement('div');
            gRMDiv.id = '_gRMDiv';
            var yRTDiv = document.createElement('div');
            yRTDiv.id = '_yRTDiv';
            var ele = document.getElementById("_iijRTDiv");
            ele.appendChild(gRMDiv);
            ele.appendChild(yRTDiv);

            var gs1 = document.createElement('script');
            gs1.type = 'text/javascript';
            gs1.innerHTML = '\n/* <![CDATA[ */\nvar google_conversion_id = 856818836;\nvar google_custom_params = window.google_tag_params;\nvar google_remarketing_only = true;\n/* ]]> */\n';
            var ele2 = document.getElementById("_gRMDiv");
            ele2.appendChild(gs1);
            var gs2 = document.createElement('script');
            gs2.type = 'text/javascript';
            gs2.src = '//www.googleadservices.com/pagead/conversion.js';
            ele2.appendChild(gs2);

            var ys1 = document.createElement('script');
            ys1.type = 'text/javascript';
            ys1.innerHTML = '\n/* <![CDATA[ */\nvar yahoo_retargeting_id = \'ZTD4XZXAJ6\';\nvar yahoo_retargeting_label = \'\';\nvar yahoo_retargeting_page_type = \'\';\nvar yahoo_retargeting_items = [{item_id: \'\', category_id: \'\', price: \'\', quantity: \'\'}];\n/* ]]> */\n';
            var ele3 = document.getElementById("_yRTDiv");
            ele3.appendChild(ys1);
            var ys2 = document.createElement('script');
            ys2.type = 'text/javascript';
            ys2.src = 'https://b92.yahoo.co.jp/js/s_retargeting.js';
            ele3.appendChild(ys2);
        }

// 02/27/18 for Samsung
        if (pathname.match(/^japanese.engadget.com\/special\/Galaxy2018\//))
            tagid = '57635';
        else if (pathname.match(/^japanese.engadget.com\//))
        {
            var cat = document.getElementsByTagName('meta');
            for(i=0;i<cat.length;i++){
                if(cat[i].getAttribute("property")=="category"){
                    category = cat[i].getAttribute("content").toLowerCase().replace(/\s+/g, "");
                }
            }
            
            switch(true) {
                case /galaxy/.test( category ):
                case /note8/.test( category ):
                case /s8/.test( category ):
                case /samsung/.test( category ):
                    tagid = '57635';
            }
        }
        if (tagid != '00000')
        {
            smrtPxlDiv.innerHTML += '<img src="//pixel.advertising.com/ups/' + tagid + '/rt" height="1" width="1" style="display:none" />';
        }

        document.body.appendChild(smrtPxlDiv);
        category = 'n/a';	

// for au iphone8 campaign 
        if (pathname == 'www.au.com/iphone/')
        {
            type = 'au_iphone';
        }
        else if (pathname.match(/^www.au.com\/pr\/wadai/))
        {
            type = 'au_wadai';
        }
        else if (pathname.match(/^www.au.com\/pr\/tac/))
        {
            type = 'au_tac';
        }
        else if (pathname.match(/^japanese.engadget.com/))
        {
            var pi = document.getElementsByTagName('meta');
            for(i=0;i<pi.length;i++){
                if(pi[i].getAttribute("property")=="category"){
                    category = pi[i].getAttribute("content").toLowerCase().replace(/\s+/g, "");
                }
            }
    
            if (category.match(/iphonex/))
            {
                type = 'iphone8';
            }
            else if (category.match(/iphone8/))
            {
                type = 'iphone8';
            }
            else if (category.match(/iphone/))
            {
                type = 'iphone';
            }
        }
        var tagjs = document.createElement("script");
        var s = document.getElementsByTagName("script")[0];
        tagjs.async = true;
        if (type != 'NA')
        {
            tagjs.src = "https://smrtpxl.advertising.com/S?spid=625&type=" + type;
        }
        s.parentNode.insertBefore(tagjs, s);

    };
    
    function bindReady(handler) {
        var called = false;
    
        function ready() { 
            if (called) return;
            called = true;
            handler();
        }
    
        // First check to see if we are ready to go.
        if(document.readyState === "complete" || document.readyState === "interactive") {
            ready();
        } else {
            if ( document.addEventListener ) { // native event
                document.addEventListener( "DOMContentLoaded", ready, false );
            } else if ( document.attachEvent ) {  // IE
                var isFrame = window.frameElement != null;
    
                // IE, the document is not inside a frame
                if ( document.documentElement.doScroll && !isFrame ) {
                    function tryScroll(){
                        if (called) return;
                        try {
                            document.documentElement.doScroll("left");
                            ready();
                        } catch(e) {
                            setTimeout(tryScroll, 10);
                        }
                    }
                    tryScroll();
                } else {
                    // IE, the document is inside a frame
                    document.attachEvent("onreadystatechange", 
                        function(){
                            if ( document.readyState === "complete" ) {
                                ready();
                            }
                    });
                }
            } else {
                // Old browsers
                if (window.addEventListener)
                    window.addEventListener('load', ready, false);
                else if (window.attachEvent)
                    window.attachEvent('onload', ready);
                else {
                    var fn = window.onload; // very old browser, copy old onload
                    window.onload = function() { // replace by new onload and call the old one
                        fn && fn();
                        ready();
                    };
                }
            }
        }
    }
    bindReady(handler);
            
}());