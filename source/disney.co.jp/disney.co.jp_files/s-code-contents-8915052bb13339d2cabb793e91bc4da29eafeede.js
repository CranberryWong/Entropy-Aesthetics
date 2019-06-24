/* SiteCatalyst code version: H.27.2.
Copyright 1996-2014 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

// Disney RS
// 2015.02.09 changed to comment 
// var s_account="wdgintjpdev";
var s_account = function() {
	/* default (staging) */
	var _ret = "wdgintjpdev";
	var _mode = "staging";
	
	/* main rsid */
	var host = location.hostname;
	var href = location.href;  // 2016.06.27 add 

	// 2016.06.27 add 
	var _isStaging = (typeof window._satellite.settings.isStaging === "boolean") ? window._satellite.settings.isStaging : false;
	if (!_isStaging) {
		try {
			_isStaging = (typeof window.localStorage !== "object" || typeof window.localStorage.getItem !== "function" || window.localStorage.getItem("sdsat_stagingLibrary") != "true" ) ? false : true;
		} catch (e) {};
	}

	if (
		_isStaging
		 || host.indexOf("www2") > -1
		 || host.indexOf("prev.disney.co.jp") > -1
		 || host.indexOf("prev.kids.disney.co.jp") > -1
		 || host.indexOf("prev.marvel.disney.co.jp") > -1
		 || host.indexOf("origin.disney.co.jp") > -1
		 || host.indexOf("origin2.disney.co.jp") > -1
		 || host.indexOf("kids2.disney.co.jp") > -1
		 || host.indexOf("wdaj.disney.co.jp") > -1
		 || host.indexOf("waltdisneyjapan.pbcv.sitesearch.jp") > -1
		 || host.indexOf("prev.secured.disney.co.jp") > -1
		 || host.indexOf("stg.disney.co.jp") > -1
		 || host.indexOf("stg.secured.disney.co.jp") > -1
		 || host.indexOf("staging.cpn.disney.co.jp") > -1 // 2015.04.06 add 
		 || host.indexOf("dev.cpn.disney.co.jp") > -1     // 2015.04.06 add 
		 || host.indexOf("staging.dlife.jp") > -1     // 2015.06.16 add 
		 || host.indexOf("prev-dlife.disney.co.jp") > -1	//2017.03.01 add
		 || host.indexOf("staging.idnx.disney.co.jp") > -1 
     || host.indexOf("stg.secured.disney.co.jp") > -1 
		 || host.match(/^(dev|staging|stg)\./)
  ) {
		/* staging */
	} else if (
		host.indexOf("disney.co.jp") > -1
		 || host.indexOf("dlife.jp") > -1
		 || host.indexOf("disneystore.co.jp") > -1
		 || host.indexOf("disneycardclub.jp") > -1
		 || host.indexOf("disneyvacationclub.jp") > -1
		 || host.indexOf("cpn.disney.co.jp") > -1 // 2015.04.06 add 
		 || host.indexOf("disney-studio.jp") > -1 // 2017.01.20 add 
  ) {
		/* production */
		_mode = "production";
		_ret = "wdgintjp";
	}
	
	/* add rsid */
	var path = location.pathname;
	if (
		path.indexOf("/mobile/disneypass.html") > -1
		 || path.indexOf("/mobile/disneypass/") > -1
		 || path.indexOf("/mobile/s-style.html") > -1
		 || path.indexOf("/mobile/s-style/") > -1
		 || path.indexOf("/mobile/s-market.html") > -1
		 || path.indexOf("/mobile/s-market/") > -1
	) {
		_ret += ",";
		if (_mode == "staging") {
			_ret += "wdgintjpsmartdev";
		} else {
			_ret += "wdgintjpsmart";
		}
	}
	
	/* dlog 2018.06.13 add */
	if (host.indexOf("dlog.disney.co.jp") > -1) {
		if (
		path.indexOf("/blog/dfanblog") > -1
		|| path.indexOf("/comment/dmevent_dailyphoto/") > -1
		|| path.indexOf("/comment/dmevent_weeklyvoice/") > -1
     || path.indexOf("/blog/sphelp") > -1
		) {
			// Int-JP Smatphone
			if (_mode == "staging") {
				_ret = "wdgintjpsmartdev";
			} else {
				_ret = "wdgintjpsmart";
			}
		} else {
			if (_mode == "staging") {
				_ret = "wdgintjpdev";
			} else {
				_ret = "wdgintjp";
			}
		}
	}
	
	
	return _ret;
}();
var s_omni=s_gi(s_account);

s_omni.debugTracking=true;
// 2015.02.09 changed to comment start 
// s_omni.dynamicAccountMatch = window.location.host+window.location.pathname;
// 2015.02.09 changed to comment end 

/*
if (!window.localStorage || localStorage.getItem("sdsat_stagingLibrary") != "true") {
	s_omni.debugTracking=false; // debug mode should be false for production
	s_omni.dynamicAccountSelection=true;
	s_omni.dynamicAccountList="wdgintjpdev=www2;wdgintjp=disney.co.jp,dlife.jp,disneystore.co.jp,disneycardclub.jp,disneyvacationclub.jp;";
}
*/

if (!window.localStorage || localStorage.getItem("sdsat_stagingLibrary") != "true") {
	s_omni.debugTracking=false; // debug mode should be false for production
	// 2015.02.09 changed to comment start 
	// s_omni.dynamicAccountSelection=true;
	// s_omni.dynamicAccountList="wdgintjpdev,wdgintjpsmartdev=prev.disney.co.jp/mobile/disneypass.html,prev.disney.co.jp/mobile/disneypass/,origin.disney.co.jp/mobile/disneypass.html,origin.disney.co.jp/mobile/disneypass/,origin2.disney.co.jp/mobile/disneypass.html,origin2.disney.co.jp/mobile/disneypass/,wdaj.disney.co.jp/mobile/disneypass.html,wdaj.disney.co.jp/mobile/disneypass/;wdgintjpdev=www2,prev.disney.co.jp,prev.kids.disney.co.jp,prev.marvel.disney.co.jp,origin.disney.co.jp,origin2.disney.co.jp,kids2.disney.co.jp,wdaj.disney.co.jp,waltdisneyjapan.pbcv.sitesearch.jp,prev.secured.disney.co.jp,stg.disney.co.jp,stg.secured.disney.co.jp;wdgintjp,wdgintjpsmart=www.disney.co.jp/mobile/disneypass.html,www.disney.co.jp/mobile/disneypass/;wdgintjp=disney.co.jp,dlife.jp,disneystore.co.jp,disneycardclub.jp,disneyvacationclub.jp;"
	// 2015.02.09 changed to comment end 
}
else{
	s_omni.debugTracking=true; // debug mode should be false for production
	// 2015.02.09 changed to comment start 
	// s_omni.dynamicAccountSelection=true;
	// s_omni.dynamicAccountList="wdgintjpdev,wdgintjpsmartdev=/mobile/disneypass.html,/mobile/disneypass/;" 
	// 2015.02.09 changed to comment end 
}

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s_omni.usePlugins=true;

/* Disney Configs */
s_omni.visitorNamespace="disneyinternational"
s_omni.trackingServer="w88.go.com"
s_omni.trackingServerSecure="sw88.go.com"

/* E-commerce Config */
s_omni.currencyCode="USD";
s_omni.cookieDomainPeriods="2"; //do not alter--determines location of omniture s_vi cookie (set at go.com)
s_omni.fpCookieDomainPeriods="3"; //set to '3' for sites like .co.uk and .com.au--determines location of cookies set by JS (clickmap cookie, plugin cookies, etc.)

/* Link Tracking Config */
s_omni.trackDownloadLinks=true;
s_omni.trackExternalLinks=true;
s_omni.trackInlineStats=true;
s_omni.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,docx,pdf,xls,xlsx,ppt,pptx";
//s_omni.linkInternalFilters="javascript:,disney-studio.jp,disney.co.jp,disneycardclub.jp,disneychannel.jp,disneymobile.jp,disneystore.co.jp,disneyvacationclub.jp,dlife.jp,disney.jp,disneystore.jp,disneypass.jp"; 
//s_omni.linkInternalFilters="javascript:,disneyaulani.jp,disneycardclub.jp,disneychannel.jp,disney.jp,disneylandparis.com,disneymobile.jp,disneypass.jp,disneystore.co.jp,disneystore.jp,disney-studio.jp,disneyvacationclub.jp,dlife.jp,go.com,hongkongdisneyland.com,marvel-japan.com,shanghaidisneyresort.com.cn,disney.co.jp,disneyparks.disney.go.com,disneycruise.disney.go.com,park.hongkongdisneyland.com,www.disneylandparis.com,shanghaidisneyresort.com";
// 2017.01.30 for disney-studio.jp 
s_omni.linkInternalFilters="javascript:,disneyaulani.jp,disneycardclub.jp,disneychannel.jp,disney.jp,disneylandparis.com,disneymobile.jp,disneypass.jp,disneystore.co.jp,disneystore.jp,disney-studio.jp,disneyvacationclub.jp,dlife.jp,go.com,hongkongdisneyland.com,marvel-japan.com,shanghaidisneyresort.com.cn,disney.co.jp,disneyparks.disney.go.com,disneycruise.disney.go.com,park.hongkongdisneyland.com,www.disneylandparis.com,shanghaidisneyresort.com,disney-studio.jp";

s_omni.linkLeaveQueryString=true;
s_omni.linkTrackVars="server,prop1,prop2,prop4,prop9,prop11,prop12,prop13,prop14,prop20,prop23,prop29";
s_omni.linkTrackEvents="None";
s_omni.useForcedLinkTracking=false;

s_omni.forcedLinkTrackingTimeout = 500;  // 2016.05.25 test 

/* Page Name Config */
s_omni.siteID="";
s_omni.defaultPage="index";
s_omni.queryVarsList="pid"; // pid: program id
s_omni.pathExcludeDelim=";";
s_omni.pathConcatDelim=":";
s_omni.pathExcludeList=".html";

/* Media Module Config */
s_omni.loadModule('Media');
s_omni.Media.onLoad=function(s,m){
	s.Media.autoTrack=false;
	s.Media.playerName='My Media Player';
	s.Media.segmentByMilestones=true;
	s.Media.trackMilestones='25,50,75';
	s.Media.trackUsingContextData=true;
	s.Media.contextDataMapping={
		'a.contentType':'prop4',
		'a.media.name':'eVar2,prop3',
		'a.media.segment':'eVar20',
		'a.media.view':'event1',
		'a.media.segmentView':'event12',
		'a.media.timePlayed':'event10',
		'a.media.complete':'event11',
		'a.media.milestones':{
			25:'event16',
			50:'event17',
			75:'event18'
		}
	}
  
	s.Media.trackVars='events,eVar2,eVar20,prop3,prop4';
	s.Media.trackEvents='event1,event10,event11,event12,event16,event17,event18';

  if(s.linkTrackVars&&s.linkTrackVars!='None')s.Media.trackVars=s.apl(s.Media.trackVars,s.linkTrackVars,',',1);
	if(s.linkTrackEvents&&s.linkTrackEvents!='None')s.Media.trackEvents=s.apl(s.Media.trackEvents,s.linkTrackEvents,',',2);

};


/* site profile config */
s_omni.site_profiles = {
	"default": {
		"category":"dcore",
		"business_unit":"dim",
		"section":location.hostname
	},
	"dlife.jp": {
		"category":"dlife",
		"business_unit":"bsd",
		"section":"dlife"
	}

	// 2016.07.28 Add new domain 
	,"idnx.disney.co.jp": {
		"category":"dcore",
		"business_unit":"did",
		"section":"idnx"
	}
	,"id-profile.disney.co.jp": {
		"category":"dcore",
		"business_unit":"did",
		"section":"id-profile"
	}
	,"id-cancellation.disney.co.jp": {
		"category":"dcore",
		"business_unit":"did",
		"section":"id-cancellation"
	}
	,"id-subscription.disney.co.jp": {
		"category":"dcore",
		"business_unit":"did",
		"section":"id-subscription"
	}
	,"id.disney.co.jp": {
		"category":"dcore",
		"business_unit":"did",
		"section":"id"
	}

	// 2017.01.19 disney-studio.jp 
	,"disney-studio.jp": {
		"category":"dmov",
		"business_unit":"wdshe",
		"section":""  // no section 
	}  

	// 2017.07.24 dlog.disney.co.jp
	,"dlog.disney.co.jp": {
		"category":"dugc",
		"business_unit":"dimg",
		"section":"dlog" 
	} 


};


//2018.06.13 dlog section override
if (location.hostname.match(/dlog\.disney\.co\.jp/)) {
  var _dlogpath = location.pathname.match(/^\//) ?  location.pathname : "/" +  location.pathname;
  if (_dlogpath.match(/^\/blog\/dfanblog[\/]?/)) {
    s_omni.site_profiles["dlog.disney.co.jp"].section = "dlog-blog-dfanblog";
  } else if  (_dlogpath.match(/^\/comment\/dmevent_dailyphoto\//)) {
    s_omni.site_profiles["dlog.disney.co.jp"].section = "dlog-comment-dmevent_dailyphoto";
  } else if  (_dlogpath.match(/^\/comment\/dmevent_weeklyvoice\//)) {
    s_omni.site_profiles["dlog.disney.co.jp"].section = "dlog-comment-dmevent_weeklyvoice";
  } else if  (_dlogpath.match(/^\/blog\/sphelp[\/]?/)) {
    s_omni.site_profiles["dlog.disney.co.jp"].section = "dlog-blog-sphelp";
  }
}


s_omni.site_sections = {
	"www.disney.co.jp":"disney",
	"www2.disney.co.jp":"disney",
	"marvel.disney.co.jp":"marvel",
	"starwars.disney.co.jp":"starwars",
	"kids.disney.co.jp":"disneykids",
	"find.disney.co.jp":"find",
	"secured.disney.co.jp":"secured",
	"cpn.disney.co.jp":"cpn"
};

s_omni.site_profile = (function(s_omni){
	var profile = {};
	var host = location.hostname;

	// Load Site Profile
	if (host.match(/idnx\.disney\.co\.jp$/)) {
		profile = s_omni.site_profiles["idnx.disney.co.jp"];
	} else if (host.match(/id-profile\.disney\.co\.jp$/)) {
		profile = s_omni.site_profiles["id-profile.disney.co.jp"];
	} else if (host.match(/id-cancellation\.disney\.co\.jp$/)) {
		profile = s_omni.site_profiles["id-cancellation.disney.co.jp"];
	} else if (host.match(/id-subscription\.disney\.co\.jp$/)) {
		profile = s_omni.site_profiles["id-subscription.disney.co.jp"];
	} else if (host.match(/id\.disney\.co\.jp$/)) {
		profile = s_omni.site_profiles["id.disney.co.jp"];
	} else if (host.match(/dlife\.jp$/)) {
		profile = s_omni.site_profiles["dlife.jp"];
// 2017.03.01 dlife.disney.co.jp
	} else if (host.match(/dlife\.disney\.co\.jp$/)) {
		profile = s_omni.site_profiles["dlife.jp"];
// 2017.01.19 disney-studio.jp 
  } else if (host.match(/disney-studio\.jp$/)) {
		profile = s_omni.site_profiles["disney-studio.jp"];
// 2017.07.24 dlog.disney.co.jp
  } else if (host.match(/dlog\.disney\.co\.jp$/)) {
		profile = s_omni.site_profiles["dlog.disney.co.jp"];
  } else if (host in s_omni.site_profiles) {
		profile = s_omni.site_profiles[host];
  } else {
		profile = s_omni.site_profiles["default"];
	}

	// Extend site section 
	if (typeof s_omni.site_sections === "object" && typeof s_omni.site_sections[host] !== "undefined") {
		profile["section"] = s_omni.site_sections[host];
	}
	return profile;
})(s_omni);


function s_omni_doPlugins(s_omni) {  

  	// 2016.11.25 spoil page view tracking at /music/****.html
    var _path = location.pathname;
    var _q = location.search + "";
    if (_path.slice(0,1) != "/") _path = "/" + _path;
    if ( _path.match(/^\/music\/[^\/]+\.html$/) ) {
        if (_q || s_omni.lnk) {
            s_omni.abort = false;
        } else {
            s_omni.abort = true;
        }
    }  
  
  // campaign
	s_omni.campaign = s_omni.getQueryParam("ex_cmp,source,creative",":");
	s_omni.campaign = s_omni.getValOnce(s_omni.campaign, "s_v0", "");
	
/*********
  // internal promotion (eVar3) - copied from old s_code with CTO
	s_omni.linkidT = s_omni.setLinkId("lpos,lid","addata","goto","|","+","3","s_omni_lid","1",s_omni.pageName,"^") || " ";
	s_omni.linkidS = s_omni.linkidT.indexOf("|");
	s_omni.linkidX = s_omni.linkidT.indexOf("^");
	s_omni.linkidT = s_omni.linkidX > -1 ? s_omni.linkidT.substring(0, s_omni.linkidX) : s_omni.linkidT;
	
	s_omni.eVar3   = s_omni.linkidS > -1 ?  s_omni.linkidT.substring(s_omni.linkidS+1) : s_omni.getQueryParam("int_cmp,pid,addata",":");
	s_omni.eVar3   = s_omni.getValOnce(s_omni.eVar3, "s_v3", 0);
	
	if (s_omni.linkidS < 0) {
		s_omni.prop9 = s_omni.linkidT;
	} else if ( s_omni.linkidS > 0 ) {
		s_omni.prop9 = s_omni.linkidT.substring(0,s_omni.linkidS);
	} else {
		s_omni.prop9 = s_omni.linkidT.substring(s_omni.linkidS+1);
	}
 **********/
	// 2016.1.19 spoil double tracking on link click
	s_omni.eVar3 = s_omni.getQueryParam("int_cmp,pid,addata",":");
	s_omni.eVar3 = s_omni.getValOnce(s_omni.eVar3, "s_v3", 0);
  
	// previous page (prop12)
	s_omni.prop12 = s_omni.getPreviousValue(s_omni.pageName, "gpv_c12", "");
	
  var bUnqFlg = false;
	// previous section (prop58)
	s_omni.currSection = s_omni.channelExtract(":", 6, s_omni.eVar16, 1).replace(/:$/,""); // apac:jp:category:BU:domain:path_lv1
	s_omni.prevSection = s_omni.getPreviousValue(s_omni.currSection, "gpv_sec", "");

	// 2016.09.13 not tracking event49, event50 under th OneID NX area 
	// if (s_omni.prevSection != "no value" && s_omni.prevSection != s_omni.currSection) {
	if (s_omni.prevSection != "no value" && s_omni.prevSection != s_omni.currSection 
      && !s_omni.pageName.match(/^dcore:did:idnx:/)
      && !s_omni.prevSection.match(/:dcore:did:idnx:/)
	) {
		s_omni.prop58 = s_omni.prevSection;
		bUnqFlg = true;
	}
  
	// events
	if (s_omni.prop7 && s_omni.getValOnce(s_omni.prop7, "s_c7", 0)) {
		s_omni.events = s_omni.apl(s_omni.events, "event2", ",", 1);
	}
	s_omni.events = s_omni.eVar3  ? s_omni.apl(s_omni.events, "event7", ",", 1)  : s_omni.events; // internal promotion
	
	// section change event (event49)
	//s_omni.events = s_omni.prop58 ? s_omni.apl(s_omni.events, "event49", ",", 1) : s_omni.events;
  s_omni.events = bUnqFlg ? s_omni.apl(s_omni.events, "event49", ",", 1) : s_omni.events;
	
	// section change event (event50), but set only once per visit
	// NOTE: This calls s_omni.c_wr (original c_w) instead of s_omni.c_w (overwritten by cookie combine util)
	// to have separate cookie. Because section might be too long to be stored for combined cookie
	s_omni.viewedSection = s_omni.c_rr("vwd_sec");

	// 2016.09.13 not tracking event49, event50 under th OneID NX area 
//  if (s_omni.viewedSection.indexOf(s_omni.currSection) < 0) { // the section is viewed at first time in the session
  if (s_omni.viewedSection.indexOf(s_omni.currSection) < 0 && !s_omni.pageName.match(/^dcore:did:idnx:/)) { // the section is viewed at first time in the session
    s_omni.viewedSection = s_omni.apl(s_omni.viewedSection, s_omni.currSection, ",", 1);
		
		var _exp = new Date();
		_exp.setTime(_exp.getTime()+(30*60*1000));
		s_omni.c_wr("vwd_sec", s_omni.viewedSection, _exp);
		
		//s_omni.events = s_omni.prop58 ? s_omni.apl(s_omni.events, "event50", ",", 1) : s_omni.events;
    s_omni.events = bUnqFlg ? s_omni.apl(s_omni.events, "event50", ",", 1) : s_omni.events;
	}
	
	// Set Dynamic Variables
	s_omni.eVar4  = s_omni.prop7  ? "D=c7"  : "";
	s_omni.eVar25 = s_omni.prop25 ? "D=c25" : "";
	//s_omni.eVar72 = s_omni.prop58 ? "D=c58" : "";
  s_omni.eVar6 = s_omni.prop58 ? "D=c58" : "";
	s_omni.hier1  = s_omni.eVar16 ? "D=v16" : "";
	s_omni.prop19 = "D=pageName";
	s_omni.prop37 = "D=User-Agent";
	s_omni.prop46 = "D=g";
	s_omni.prop47 = "D=r";
  
  // Set Library Version and DTM Type
  if(s_omni.un && s_omni.un === "wdgintjpdev"){
  var a=_satellite.buildDate.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})/);
	var d=new Date(a[1]+'/'+a[2]+'/'+a[3]+' '+a[4]+':'+a[5]+':'+a[6]+" UTC");
	  s_omni.prop39 = s_omni.version + ":" + d.toLocaleString();
  	if(window.localStorage.getItem("sdsat_stagingLibrary") === "true"){
  		s_omni.prop40 = "Staging";
  	} else {
  		s_omni.prop40 = "Live";
  	}
  }
  
    /* Test&Target Integration */
  s_omni.tnt = s_omni.trackTNT();
  if (window.mboxLoadSCPlugin && typeof s_omni.mboxloadscpluginsflag === "undefined") {
    s_omni.mboxloadscpluginsflag  = true;
    // mboxLoadSCPlugin(s_omni);
    s_omni.sendAnalyticsToTarget(s_omni);
  }
  
}

s_omni.doPlugins=s_omni_doPlugins


/************************** PLUGIN SECTION **************************/
/*
 * Plugin Utility: apl v1.1
 */
s_omni.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");

/*                                                                                       
 * Plugin: channelExtract : 1.0 - returns site section based on delimiter
 */
s_omni.channelExtract=new Function("d","p","u","pv",""
+"var s=this,v='';u=u?u:(s.pageURL?s.pageURL:s.wd.location);if(u=='f'"
+")u=s.gtfs().location;u=u+'';li=u.lastIndexOf(d);if(li>0){u=u.substr"
+"ing(0,li);var i,n,a=s.split(u,d),al=a.length;if(al<p){if(pv==1) p=a"
+"l;else return '';}for(i=0;i<p;i++){n=a[i];v=v+n+d;}return v}return "
+"'';");

/*
 * Plugin: Cookie Combining Utility
 * Function - read combined cookies v 0.37
 */
/********** 
 * org
if(!s_omni.__ccucr)
{
    s_omni.c_rr=s_omni.c_r;
    s_omni.__ccucr=true;
    function c_r(k)
    {
        var s=this,d=new Date,v=s.c_rr(k),c=s.c_rspers(),i, m, e;
        if(v)return v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;
        i=c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|', i);e=i<0?i:c.indexOf(';', i);
        m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length, m<0?c.length:m));
        return v;
    }
    function c_rspers()
    {
        var s=this,cv=s.c_rr("s_pers");var date=new Date().getTime();var expd=null;
        var cvarr=[];var vcv="";if(!cv)return vcv;cvarr=cv.split(";");for(var i=0,l=cvarr.length;i<l;i++)
        {expd=cvarr[i].match(/\|([0-9]+)$/);if(expd && parseInt(expd[1]) >= date){vcv += cvarr[i]+";";}}return vcv;
    }
    s_omni.c_rspers=c_rspers;
    s_omni.c_r=c_r;
}
 **********/
/*
 * Function - write combined cookies v 0.37
 */
/********** 
 * org
if(!s_omni.__ccucw)
{
    s_omni.c_wr=s_omni.c_w;s_omni.__ccucw=true;
    function c_w(k, v, e)
    {
        var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv, sv, c, i, t;d.setTime(d.getTime() - 60000);
        if(s.c_rr(k))s.c_wr(k, '', d);k=s.ape(k);pv=s.c_rspers();i=pv.indexOf(' '+k+'=');if(i>-1){
        pv=pv.substring(0, i)+pv.substring(pv.indexOf(';', i)+1);pc=1;}sv=s.c_rr(sn);i=sv.indexOf(' '+k+'=');
        if(i>-1){sv=sv.substring(0, i)+sv.substring(sv.indexOf(';', i)+1);sc=1;}d=new Date;
        if(e){if(e.getTime()>d.getTime()){pv += ' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}
        else{sv += ' '+k+'='+s.ape(v)+';';sc=1;}sv=sv.replace(/%00/g, '');pv=pv.replace(/%00/g, '');
        if(sc)s.c_wr(sn, sv, 0);if(pc){t=pv;while(t && t.indexOf(';') != -1){var t1=parseInt(t.substring(t.indexOf('|')+1, t.indexOf(';')));
        t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.setTime(ht);s.c_wr(pn, pv, d);}return v==s.c_r(s.epa(k));
    }
    s_omni.c_w=c_w;
}
 **********/

/*
 * New Cookie Combine 
 */
/*
 * Cookie Combining Utility v.5
 */

if (!s_omni.__ccucr) {
	s_omni.c_rr = s_omni.c_r;
	s_omni.__ccucr = true;
	function c_r(k) {
		var s = this,
		d = new Date,
		v = s.c_rr(k),
		c = s.c_rspers(),
		i,
		m,
		e;
		if (v)
			return v;
		k = s.escape ? s.escape(k) : encodeURIComponent(k);
		i = c.indexOf(' ' + k + '=');
		c = i < 0 ? s.c_rr('s_sess') : c;
		i = c.indexOf(' ' + k + '=');
		m = i < 0 ? i : c.indexOf('|', i);
		e = i < 0 ? i : c.indexOf(';', i);
		m = m > 0 ? m : e;
		v = i < 0 ? '' : s.unescape ? s.unescape(c.substring(i + 2 + k.length, m < 0 ? c.length : m)) : decodeURIComponent(c.substring(i + 2 + k.length, m < 0 ? c.length : m));
		return v;
	}
	function c_rspers() {
		var s = this,
		cv = s.c_rr("s_pers"),
		date = new Date().getTime(),
		expd = null,
		cvarr = [],
		vcv = "";
		if (!cv)
			return vcv;
		cvarr = cv.split(";");
		for (var i = 0, l = cvarr.length; i < l; i++) {
			expd = cvarr[i].match(/\|([0-9]+)$/);
			if (expd && parseInt(expd[1]) >= date) {
				vcv += cvarr[i] + ";";
			}
		}
		return vcv;
	}
	s_omni.c_rspers = c_rspers;
	s_omni.c_r = s_omni.cookieRead = c_r;
}
if (!s_omni.__ccucw) {
	s_omni.c_wr = s_omni.c_w;
	s_omni.__ccucw = true;
	function c_w(k, v, e) {
		var s = this,
		d = new Date,
		ht = 0,
		pn = 's_pers',
		sn = 's_sess',
		pc = 0,
		sc = 0,
		pv,
		sv,
		c,
		i,
		t,
		f;
		d.setTime(d.getTime() - 60000);
		if (s.c_rr(k))
			s.c_wr(k, '', d);
		k = s.escape ? s.escape(k) : encodeURIComponent(k);
		pv = s.c_rspers();
		i = pv.indexOf(' ' + k + '=');
		if (i > -1) {
			pv = pv.substring(0, i) + pv.substring(pv.indexOf(';', i) + 1);
			pc = 1;
		}
		sv = s.c_rr(sn);
		i = sv.indexOf(' ' + k + '=');
		if (i > -1) {
			sv = sv.substring(0, i) + sv.substring(sv.indexOf(';', i) + 1);
			sc = 1;
		}
		d = new Date;
		if (e) {
			if (e == 1)
				e = new Date, f = e.getYear(), e.setYear(f + 5 + (f < 1900 ? 1900 : 0));
			if (e.getTime() > d.getTime()) {
				pv += ' ' + k + '=' + (s.escape ? s.escape(v) : encodeURIComponent(v)) + '|' + e.getTime() + ';';
				pc = 1;
			}
		} else {
			sv += ' ' + k + '=' + (s.escape ? s.escape(v) : encodeURIComponent(v)) + ';';
			sc = 1;
		}
		sv = sv.replace(/%00/g, '');
		pv = pv.replace(/%00/g, '');
		if (sc)
			s.c_wr(sn, sv, 0);
		if (pc) {
			t = pv;
			while (t && t.indexOf(';') != -1) {
				var t1 = parseInt(t.substring(t.indexOf('|') + 1, t.indexOf(';')));
				t = t.substring(t.indexOf(';') + 1);
				ht = ht < t1 ? t1 : ht;
			}
			d.setTime(ht);
			s.c_wr(pn, pv, d);
		}
		return v == s.c_r(s.unescape ? s.unescape(k) : decodeURIComponent(k));
	}
	s_omni.c_w = s_omni.cookieWrite = c_w;
}

/*
 * Plugin: getPageName v2.1 - parse URL and return
 * @requires p_c
 */
s_omni.getPageName=new Function("u",""
+"var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+"x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+"queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+"string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+"ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"
+"efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"
+"z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."
+"substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"
+";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"
+"ubstring(x+1)}return n");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s_omni.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * Plugin: getQueryParam 2.4
 */
s_omni.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s_omni.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s_omni.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");

/*
 * Plugin: getValOnce_v1.11
 */
s_omni.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");

/*
 * Utility Function: p_c
 */
s_omni.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");

/*
 * Plugin Utility: Replace v1.0
 */
s_omni.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s_omni.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");


// Legacy Analytics -> Target Integration Module
// @version 2.0

s_omni.sendAnalyticsToTarget = function(s) {
    if ("mboxDefine" in window && "mboxUpdate" in window) {
        var arr_analytics_param = [];
        var str_mbox_name = "SiteCatalyst: event";

        if("linkType" in s && s.linkType != "" && s.linkType != "0" && s.linkType != undefined){
          if("linkType" in s){ arr_analytics_param.push("linkType="+s.linkType)}
          if("linkName" in s){ arr_analytics_param.push("linkName="+s.linkName)}
          if(s.linkType == "e" ){
            var e = s.linkObject;
            if(e) {
              arr_analytics_param.push("eo=" +e.href );
            }
          }          
        }else{
          if("channel" in s){ arr_analytics_param.push("channel="+s.channel)}
          if("server" in s){ arr_analytics_param.push("server="+s.server)}
          if("pageName" in s){ arr_analytics_param.push("pageName="+s.pageName)}
        }

        function getDynamicVariable(s,val){
          val += "";
          if(val.indexOf("D=v") > -1){
            return s["eVar" + val.slice(3)];
          }else if(val.indexOf("D=c") > -1){
            return s["prop" + val.slice(3)];
          }
          return val;
        }

        for (var i_prop = 1; i_prop <= 75; i_prop++) {
            if (typeof s["prop" + i_prop] === "undefined" || s["prop" + i_prop] == "" || s["prop" + i_prop] == null || s["prop" + i_prop] == "N/A") {
                continue;
            }

            if("linkType" in s && s.linkType != "" && s.linkType != "0" && s.linkType != undefined){
              if("linkTrackVars" in s && s.linkTrackVars != ""){
                if(s.linkTrackVars.indexOf("prop" + i_prop) > -1){
                  arr_analytics_param.push("prop" + i_prop + "=" + encodeURI(getDynamicVariable(s,s["prop" + i_prop])));
                }
              }
            }else{
              if(s["prop" + i_prop].indexOf("D=") > -1){
                var dynamic_var = getDynamicVariable(s,s["prop" + i_prop]);
                if (typeof dynamic_var === "undefined" || dynamic_var == "" || dynamic_var == null || dynamic_var == "N/A") {
                  continue;
                }
                s["prop" + i_prop] = dynamic_var;
              }
              arr_analytics_param.push("prop" + i_prop + "=" + encodeURI(getDynamicVariable(s,s["prop" + i_prop])));
            }          
        }

        for (var i_evar = 1; i_evar <= 250; i_evar++) {
            if (typeof s["eVar" + i_evar] === "undefined" || s["eVar" + i_evar] == "" || s["eVar" + i_evar] == null || s["eVar" + i_evar] == "N/A") {
                continue;
            }

            if("linkType" in s && s.linkType != "" && s.linkType != "0" && s.linkType != undefined){
              if("linkTrackVars" in s && s.linkTrackVars != ""){
                if(s.linkTrackVars.indexOf("eVar" + i_evar) > -1){
                  arr_analytics_param.push("eVar" + i_evar + "=" +  encodeURI(getDynamicVariable(s,s["eVar" + i_evar])));
                }
              }
            }else{
              if(s["eVar" + i_evar].indexOf("D=") > -1){
                var dynamic_var = getDynamicVariable(s,s["eVar" + i_evar]);
                if (typeof dynamic_var === "undefined" || dynamic_var == "" || dynamic_var == null || dynamic_var == "N/A") {
                  continue;
                }
                s["eVar" + i_evar] = dynamic_var;
              }
              arr_analytics_param.push("eVar" + i_evar + "=" + encodeURI(getDynamicVariable(s,s["eVar" + i_evar])));
            }
        }

        if (s.events) {
            if("linkType" in s && s.linkType != "" && s.linkType != "0" && s.linkType != undefined){
              if("linkTrackEvents" in s && s.linkTrackEvents != ""){
                var events_arr = s.events.split(",");
                var events_result_arr = [];
                for(var i=0,len=events_arr.length;i<len;i++){
                    if(s.linkTrackEvents.indexOf(events_arr[i]) > -1){
                      events_result_arr.push(events_arr[i]);
                    }
                }
                if(events_result_arr.length > 0){
                  arr_analytics_param.push("events=" + events_result_arr.join(","));
                }
              }
            }else{
                arr_analytics_param.push("events=" + s.events);
            }

            if (s.events.indexOf("purchase") > -1) {
                str_mbox_name = "SiteCatalyst: purchase";
            }
            if(s.products)arr_analytics_param.push("products=" + s.products);
            if(s.purchaseID)arr_analytics_param.push("purchaseID=" + s.purchaseID);
        }

        if (s.contextData) {
            for (var item in s.contextData) {
                arr_analytics_param.push(item + "=" + s.contextData[item]);
            }
        }

        arr_analytics_param.unshift(str_mbox_name);

        var tagdiv = document.createElement("div");
        tagdiv.id = "_AdobeAnalytics_AA-AT";
        if(!document.getElementById(tagdiv.id)){
          document.getElementsByTagName("body")[0].appendChild(tagdiv);
          mboxDefine("_AdobeAnalytics_AA-AT", str_mbox_name);
        }
        mboxUpdate.apply(window, arr_analytics_param);
    }
}

/*
 * Plugin: YouTube plugin v1.54
 */

/* YouTube plugin tracking object */
window.s_YTO={
    s_name: 's_omni' //text name of SiteCatalyst object
}
 
/* onYouTubePlayerReady(id) - Automatically called by YouTube Flash Player on initialization */
window.onYouTubePlayerReady=function(id){
    if(id&&document.getElementById(id)&&!s_YTO.v[id])s_YTO.v[id]=new s_YTv(id,1) //start tracking player if not already being tracked
}
 
/* Poll function, scan page for IFRAME YouTube players; register players with the YouTube API and initiate SiteCatalyst tracking */
window.s_YTp=function(){
    try{
        var D=document,f=D.getElementsByTagName('iframe'),k,id,t,i,j,
            I=function(n){ //return 1 if n is an invalid Javascript variable name
                var i=0; //assume valid name
                try{ //try...catch block to see if we can create a variable named n
                    eval('var '+n) //create a variable named n
                }catch(e){i=1}; //if n is an invalid name, i will be set to 1
                return i //return invalid flag
            };
        if(s_YTisa())s_YTO.ya=2; //is the YouTube API already loaded?
        /* loop through every iframe on page, checking if iframe is a YouTube player */
        for(i=0;i<f.length;i++){
            k=s_YTgk(f[i].src); //YouTube video key (if iframe is a YouTube player) */
            id=f[i].id; //id of iframe
            if(k){ //if the iframe is a YouTube video...
                if(!id||I(id)){ //if the iframe doesn't have an ID or if the ID is an invalid variable name, assign a valid ID
                    id='YouTubeV'; //ID prefix
                    for(j=1;j<99;j++) //append an ID suffix such that the ID is not already used
                        if(!D.getElementById(id+j))break; //if this prefix+suffix isn't already in use, we have the new name
                    id=j<99?id+j:''; //...else increment suffix name, going up to 100
                    f[i].id=id //set the iframe's id to the new name
                }
                if(id) //if iframe has an ID, add it to the plugin tracking array
                    if(!s_YTO.ya){ //if YouTube API load not yet loaded, dynamically load it...
                        s_YTO.ya=1; //set YouTube API state to 'loading'
                        t=D.createElement('script'),f;
                        t.src='//www.youtube.com/player_api';
                        f=D.getElementsByTagName('script')[0];
                        f.parentNode.insertBefore(t,f)
                    }else if(s_YTO.ya==2&&!s_YTO.v[id]) {//if the YouTube API is loaded and the player is not yet being tracked...
                        s_YTO.v[id]=new s_YTv(id) //create new video tracking object
                    }
                    if(s_YTO.v[id]){
                        s_YTO.v[id].gps();//check the player state and call open/start if needed
                    }
            }
        }
    }catch(e){};
    s_YTO.ut=setTimeout('s_YTp()', 1000) //poll again in one second
}
 
/* is the YouTube API loaded and ready? */
window.s_YTisa=function(){
    return typeof window.YT=='object'&&YT.Player
}
 
/* is the media module loaded? */
window.s_YTism=function(){
    var s=s_YTO.s=window[s_YTO.s_name||'s']||0;
    return typeof s=='object'&&typeof s.Media=='object'&&s.Media.open?s:0
}
 
/* if url is for a YouTube embedded player iframe tag or an active player, return the unique YouTube identifier from the url */
window.s_YTgk=function(u){
    var r='',a,f='',v=u.toLowerCase();
    if(v.indexOf('//www.youtube.com')>-1){
        if(v.indexOf('/watch')>-1)f='v';
        if(!f&&v.indexOf('/apiplayer')>-1)f='video_id';
        if(!f&&v.indexOf('/v/')>-1)f='/v/';
        if(!f&&v.indexOf('/embed/')>-1)f='/embed/';
        if(f>'A'){
            a=v.indexOf('?'+f+'=');
            if(a<0)a=v.indexOf('&'+f+'=');
            if(a>-1)r=u.substring(a+f.length+2)
        }else if(f){
            a=v.indexOf(f);
            r=u.substring(a+f.length)
        }
        if(r){
            a=r.indexOf('?');
            if(a<0)a=r.indexOf('&');
            if(a<0)a=r.indexOf('#');
            if(a>-1)r=r.substring(0,a)
        }
    }
    return r
}
 
/* onYouTubePlayerAPIReady() - Automatically called when the YouTube IFRAME Player API loads */
window.onYouTubePlayerAPIReady=function(){
    try{
        s_YTO.ya=2; //Set YouTube API state to 'loaded'
        if(s_YTO.ut)clearTimeout(s_YTO.ut); //Clear poll timeer and poll immediately...
        s_YTp()
    }catch(e){}
}
 
/* disable interstitial calls that fire based on the s.Media.trackSeconds parameter */
window.s_YTdi=function(){
    var s=s_YTism();
    if(s){
        if(typeof s.Media.trackWhilePlaying!='undefined'){
            s_YTO.twp=s.Media.trackWhilePlaying;
            s.Media.trackWhilePlaying=false
        }
        if(typeof s.Media.trackSeconds!='undefined'){
            s_YTO.ts=s.Media.trackSeconds;
            delete s.Media.trackSeconds
        }
    }
}
 
/* enable interstitial calls that fire based on the s.Media.trackSeconds parameter */
window.s_YTei=function(){
    var s=s_YTism();
    if(s){
        if(typeof s_YTO.twp!='undefined'){
            s.Media.trackWhilePlaying=s_YTO.twp;
            delete s_YTO.twp
        }
        if(typeof s_YTO.ts!='undefined'){
            s.Media.trackSeconds=s_YTO.ts;
            delete s_YTO.ts
        }
    }
}
 
/* data underrun timer ended */
window.s_YTut=function(){
    s_YTO.uf=0; //turn off the underrun flag
    s_YTei() //re-enable interstititial calls
}
 
/* s_YTdv - video array element "deconstructor" */
window.s_YTdv=function(id){
    try{
        if(!id)return; //quit if no video ID provided
        var v=s_YTO.v[id]||0; //point to the required video array element
        if(v){ //if there's a YouTube video object...
            if(v.ss){//if the video state is not 'not open'...
                if(s_YTism())s_YTO.s.Media.close(v.vn); //log closing of video
                v.ss=0 //set video state to 'not open'
            }
        }
        delete v.vp;
        v.vc() //zero out the video properties
    }catch(e){}
}

/* s_YTcl - stop and close video player*/
window.s_YTcl=function(id){
    try{
        if(!id)return; //quit if no video ID provided
        var v=s_YTO.v[id]||0; //point to the required video array element
        if(v){ //if there's a YouTube video object...
            if(v.ss!=1) {
                /* Try to get current queue point */
                v.qs=0;
                if(v.yp.getCurrentTime){
                    var x=v.yp.getCurrentTime();
                    var N='number';
                    v.qs=typeof x==N?Math.round(x):0 //set video's current queue point (sec rounded to whole seconds)
                }
                if(s_YTism())s_YTO.s.Media.stop(v.vn,v.qs); //log video stop for the prior video
                v.ss=1; //set video state to 'not open'
                v.ql=v.qs; //save queue point
            }
        }
    }catch(e){}
    s_YTdv(id);
    delete s_YTO.v[id];
    s_YTO.v[id] = null;
}

/* s_YTcl2 - stop and close video player added on 28th Oct 2016*/ 
function s_YTcl2(id) {
    var $playerWindow = $('#'+id)[0].contentWindow;
    $playerWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    try{
        if(!id)return; //quit if no video ID provided
        var v=s_YTO.v[id]||0; //point to the required video array element
        if(v){ //if there's a YouTube video object...
            if(v.ss){//if the video state is not 'not open'...
                if(s_YTism())s_YTO.s.Media.close(v.vn); //log closing of video
                v.ss=0 //set video state to 'not open'
            }
        }
    }catch(e){}
}

/* s_YTv - video array element constructor */
window.s_YTv=function(id){
 
    var t=this;
 
    /***** Define video array element methods *****/
 
    /* Clear video array element properties */
    t.vc=function(){
            var t=this;
            t.id= //Video HTML element ID (set to this object's index in the video array index)
            t.sn= //Video name
            t.vn= //Video name for Media module control
            t.sl= //Previous video name (set when a new video is opened in a player)
            t.yt= //YouTube Video title
            t.yk= //YouTube player video key
            t.kl=''; //YouTube player previous video key
            t.yd= //YouTube player data object (populated by youtube feed api callback)
            t.yp= //YouTube player object (assigned by object creator method)
            t.ys= //YouTube player state; -1:unstarted, 0:ended, 1:playing, 2:paused, 3:buffering/underrun, 5:video queued
            t.pt= //Player type; 1:Flash, 2:IFRAME
            t.ss= //Video state; 0:not open, 1: stopped/paused 2:playing
            t.ts= //video length in seconds
            t.qs= //video queue point (video current location in seconds from start)
            t.ql=0 //last video queue point
    };
 
    /* Get YouTube video properties using the YouTube player API */
    t.vg=function(yp){
 
        var t=this,D=document,N='number',u='',a,b,c,i,x=0,y;
 
        if(yp){
 
            /* Try to get video url */
            if(yp.getVideoUrl)u=yp.getVideoUrl();
            if(!u)u=yp.a.src||'';
 
            /* Try to get video title */
            if(yp.getVideoData)x=yp.getVideoData();
            if(x&&x.title)t.yt=x.title;
 
            /* Try to get video id (the youtube unique video key) */
            y=x&&x.video_id?x.video_id:s_YTgk(u);
 
            /* Setup video data if it's new */
            if(y&&y!=t.yk){ //if there's a key and it's different from the current one...
                t.kl=t.yk; //save the old key
                t.yk=y; //set the current key
                t.ts=t.qs=t.ys=0; //reset the video duration, queue point, and video state
                if(t.yd){delete t.yd;t.yd=0} //if there's an old video data block, delete it
                t.yt=''; //reset the video title
                /* Call the YouTube video data api and place it's results in a script block */
                a='s_YTdata_'+t.id+'_'+t.yk; //construct the script block's name
                b=D.getElementById(a); //see if the script block already exists
                if(b)b.parentNode.removeChild(b);
                b=D.createElement('script'); //create the script block
                b.id=a; //assign the id of the script block
                b.src='//gdata.youtube.com/feeds/api/videos/'+t.yk+'?v=2&alt=json-in-script&callback=window.s_YTO.v.'+t.id+'.fc'; //async call to the youtube feeds api
                a=D.getElementsByTagName('script')[0]; //find the first script block on the page
                a.parentNode.insertBefore(b,a) //insert the new script block at the beginning
            }
 
            /* Try to get video duration */
            if(yp.getDuration){
                x=yp.getDuration();
                t.ts=typeof x==N?Math.round(x):0 //set video duration (sec rounded to whole seconds)
            }
 
            /* Try to get current queue point */
            t.qs=0;
            if(yp.getCurrentTime){
                x=yp.getCurrentTime();
                t.qs=typeof x==N?Math.round(x):0 //set video's current queue point (sec rounded to whole seconds)
            }
 
            /* Try to get player state */
            if(yp.getPlayerState){
                x=yp.getPlayerState();
                t.ys=x||0 //if we got a valid value back, save it
            }
 
        }
 
    };
 
    /* Processes YouTube video event */
    t.ve=function(){
 
        var s=s_YTism();
        if(s){ //if the Media Module is loaded
 
            var
                t=this,
                d, //used for difference between current and last queue point
 
                O=function(){ //log video open
                    t.sl=t.sn; //save the old video name
                    t.sn='YouTube|'+(t.yk||t.id||'')+'|'+(t.yt||''); //set video name to "YouTube|" followed by either the video title, video key, or iframe ID
                    t.vn=t.sn;
                    s.Media.open(t.vn,t.ts,s_YTO.vp); //make s.Media open call
                    t.ss=1 //set state to "opened/stopped"
                },
                P=function(){ //log video play
                    s.Media.play(t.vn,t.qs);
                    t.ql=t.qs; //save queue point
                    t.ss=2 //set state to "playing"
                },
                S=function(n,q){ //log video stop
                    s.Media.stop(n||t.vn,q||t.qs); //log video stop for the prior video
                    t.ss=1; //set state to "opened/stopped"
                    t.ql=t.qs //save queue point
                },
                C=function(n){ //log video close
                    s.Media.close(n||t.vn); //log video close if needed
                    t.ss= //set state to "not open"
                    t.qs=t.ql=0 //set current and last que point to start
                };
 
            t.vg(t.yp); //refresh the video properties
 
            /* Process new or unopened video */
            if(t.sk&&t.sk!=t.kl){ //if we have a video key and it's different from the prior one...
                if(t.ss){ //if the video key has changed and we have an active state for the prior video...
                    if(t.ss==2)S(t.sl,t.ql); //if state was "playing", log video stop for the prior video
                    C(t.sl) //log video close for the prior video
                }
            }
 
            switch(t.ys){
            case 1: //YouTube event: Playing
                if(t.ss==2){ //if already in the play state...
                    d=Math.abs(t.qs-t.ql); //see how far away the queue point was when that last play was logged
                    if(d>1)S(t.vn,t.ql) //if the last play log was made more than 1 sec from the current queue point, make stop call at last known play point
                }
                if(!t.ss){ //if state is "unopened"...
                    O(); //log video open
                    t.qs=t.ql=0 //work-around for YouTube API bug (que point does not get reset on "replay" button click)
                }
                P(); //log video play
                break;
            case 0: //YouTube event: Ended
                if(t.ss){ //if state something other than "not open"...
                    if(t.ss!=1){ //if state is not already "stopped"...
                        if(Math.abs(t.qs-t.ts)<=1)t.qs=t.ts; //if we're within one second from the end, consider this the end
                        S() //log video stop
                    }
                    C() //close current video
                }
                break;
            case 2: //YouTube event: Paused
                if(!t.ss)O(); //make open call if not already made
                if(t.ss!=1)S(); //if state is not already paused, make pause call
                break;
            case 3: //YouTube event: Buffering (data underrun)
                if(s_YTO.uf)
                    clearTimeout(s_YTO.uf); //if a data underrun timer is active, clear it (so that we can restart the timer)
                else
                    s_YTdi(); //disable interstitial calls
                s_YTO.uf=setTimeout('s_YTut()', 3000); //set timer to enable interstitial calls 3 seconds from now
                break;
            case -1: //YouTube event: Unstarted
            case 5: //YouTube event: Video cued
            default: //YouTube event: Unknown
                break
            }
        }
    };
 
    /* Call back handler for YouTube Flash player state changes */
    t.fsc=function(ye){
        try{
            t.ys=ye; //save YouTube event for processing
            t.vg(t.yp); //get video properties
            setTimeout('s_YTO.v["'+t.id+'"].ve()', 10) //Invoke ve() in 10ms (simulated multi-threading)
        }catch(e){}
    };
 
    /* Call back handler for YouTube IFRAME player state changes */
    t.isc=function(ye){
        try{
            t.ys=ye.data; //save YouTube event for processing
            t.vg(ye.target); //get video properties
            setTimeout('s_YTO.v["'+t.id+'"].ve()', 10) //Invoke ve() in 10ms (simulated multi-threading)

            // if video streaming is end and if you want callback.
            if(ye.data === 0){
                window.s_YTef(t,ye);
            }
        }catch(e){}
    };
 
    /* Call back handler for YouTube feed api, used to get video data */
    t.fc=function(d){
        try{
            t.yd=d;
            var T=d.entry&&d.entry.title?t.sn=d.entry.title.$t:'';
            if(T)t.yt=T
        }catch(e){}
    };

    /* Check Youtube state and if already started due to AutoPlay, get started */
    t.gps=function(){
        var x = -1;
        if(t.yp.getPlayerState){
            x=t.yp.getPlayerState();
        }
        if (x == 1) {
            if(!t.ss){ //if state is "unopened"...
                try{
                    t.ys=x; //save YouTube event for processing
                    t.vg(t.yp); //get video properties
                    
                    setTimeout('s_YTO.v["'+t.id+'"].ve()', 10) //Invoke ve() in 10ms (simulated multi-threading)
                }catch(e){}
            }
        }       
    };    
 
    /****** Video object constructor ******/
 
    try{
        var o=id&&typeof id=='string'?document.getElementById(id):'';
        if(!o)return null; //quit if id empty or player object not found
        t.vc(); //clear video object values
        t.id=id; //set the video object divID
        var
            W=window,
            ar=arguments; //"ar" is shorthand for "arguments"
        if(ar.length>1&&ar[1]==1){ //if this is a Flash player...
            t.pt=1; //set the player type to 'Flash'
            t.yp=o; //save pointer to the embeded Flash player
            if(W.addEventListener) //if Mozilla...
                t.yp.addEventListener('onStateChange','s_YTO.v.'+id+'.fsc',false); //listen for YouTube Flash player events
            else if(W.attachEvent) //if IE...
                W.attachEvent('onStateChange','s_YTO.v.'+id+'.fsc')
        }else{ //else we have an IFRAME (HTML5) player...
            t.pt=2; //set the player type to 'IFRAME'
            var a=new Object(); //create object for specifying YouTube player properties
            if(ar.length>1)a.videoId=ar[1]; //save video ID if present (for registering existing players)
            if(ar.length>3){ //if width and height parameters are present, save them
                a.width=w;
                a.height=h
            }
            a.events=new Object(); //create object for specifying YouTube call-back functions
            a.events.onStateChange=t.isc; //call back when IFRAME player state changes
            t.yp=new YT.Player(id,a); //create new YouTube player object
            t.vg(t.yp)
        }
    }catch(e){}
    return t
}
 
/* Adds an event listener */
window.s_aE=function(o,e,f){
    if(arguments.length<3){
        f=e;
        e=o;
        o=window
    }
    if(o.attachEvent){
        o['e'+e+f]=f;
        o[e+f]=function(){o['e'+e+f](window.event)};
        o.attachEvent('on'+e,o[e+f])
    }else
        o.addEventListener(e,f,false)
}
 
/* Initialize YouTube player plugin */
window.s_YTi=function(){
    if(typeof s_YTO.v!='object')s_YTO.v={}; //Create empty object of YouTube players
    s_YTO.ya=s_YTisa()?2:0; //Set the status of the YouTube API (0:not loaded  1:currently loading  2:loaded)
    s_YTO.ut= //Clear s_YTp() timeout pointer
    s_YTO.uf=0; //Clear the YouTube stream under-run flag
    s_YTO.vp='YouTube Player'; //SiteCatalyst Media player name
    s_YTp() //Start polling routine
}
 
window.s_aE('load',s_YTi); //Add event listener to initialize plugin when the page load event occurs

/* YouTube player end function */
window.s_YTef = function(t,ye){};
/************************** CUSTOM FUNCTIONS SECTION **************************/

/*
 * Utility Function: getinnerHTML v1.0
 */
s_omni.getinnerHTML=new Function("o",""
+"var ih=''+o.innerHTML,ihl=ih.toLowerCase(),i=ihl.indexOf('<img');if(ih&&i>-1){eval(\"evl=/ src\s*=\s*['\\\"]?([^'\\\" ]+)['\\\"]?/i\");evl.exec(ih);if(RegExp.$1) ih=RegExp.$1}return(ih);");

/*
 * Utility Function: getLinkId v1.1
 * @requires getQueryParam
 */
s_omni.getLinkId=new Function("p1","p2","qp","d","id","L","v1","vd",""
+"var s=this,h,n,r,h1,h2,h3,a,e,q;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk;var y=s.ot(o);var n=s.oid(o);var x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o=o.parentElement?o.parentElem"
+"ent:o.parentNode;if(!o)return '';y=s.ot(o);n=s.oid(o);x=o.s_oidt;}}d=d?d:'|';id=id?id:':';if(!o.href)return '';r=o.href;q=r.indexOf('?');e=!o.name?'':o.name.indexOf('&')!=0?'&'+o.name:o.name;h=q>-1"
+"?r.substring(q)+e:e?'?'+e:'';if(s.linkLeaveQueryString==false) r=q>0?r.substring(0,q):r;h1=p1?s.getQueryParam(p1,id,h):'';h2=p2?s.getQueryParam(p2,id,h):'';h3=qp?s.getQueryParam(qp,id,h):'';if(h3&&"
+"s.getQueryParam(p2,id,h3)) h2=p2?s.getQueryParam(p2,id,h3):'';if(!h1&&!h2)h=L<1?'atxt'+id:'atxt'+id+s.getinnerHTML(o);else h=h1+=h2?d+h2:'';h=v1?h+vd+v1:h;a=new Array;a[0]=r?r:'';a[1]=h;return a?a:"
+"'';");

/*
 *  Plugin: getLinkParams 1.3
 * @requires getQueryParam
 */
s_omni.getLinkParams=new Function("p","qp","m","q","ev",""
+"var s=this,a='',t=0,l,ll,l2,r,e,la,ap,ev=ev?';;;'+ev+'=1':'';if(s.d.links){for(i=0;i<s.d.links.length;i++){l=s.d.links[i];r=l.href;e=l.name;e=!e?'':e.indexOf('&')!=0?'&'+e:e;la=r.indexOf('?')>-1?"
+"r.substring(r.indexOf('?'))+e:e?'?'+e:'';ll=la.toLowerCase();if(qp&&ll.indexOf(qp.toLowerCase())>0) l2=qp?s.getQueryParam(qp,'',ll):'';else l2='';if(l2&&l2.indexOf(p.toLowerCase())>0){ap=s.getQueryParam(p,'',"
+"l2+'');if(ap!=''&&ap.indexOf('#')<0){a=s.apl(a,q+ap+ev,',',2);t=t+1;}}else if(ll.indexOf(p.toLowerCase())>0){ap=s.getQueryParam(p,'',la+'');if(ap!=''&&ap.indexOf('#')<0){a=s.apl(a,q+ap+ev,',',2);t="
+"t+1;}}if(t==m)return a;}return a;}");

/*
 * Utility Function: setLinkId v1.1
 * @requires getLinkId
 */
s_omni.setLinkId=new Function("p1","p2","qp","d","id","t","k","L","v1","vd",""
+"var s=this;if(s.c_r(k)=='customlink'){s.c_w(k,'');return'';}var h=s.getLinkId(p1,p2,qp,d,id,L,v1,vd);var v,kv,wh=s.c_gd().substring(1);if(!h[0]){kv=s.c_r(k);s.c_w(k,'');return kv;}wh=h[0].indexOf(w"
+"h)>-1?'0':'1';v=h[1].indexOf('atxt:')>-1?'1':'-1';if(s.linkType||s.linkName){s.c_w(k,'customlink');return h[1];}else if(t=='0'||s.lt(h[0])=='d'||s.lt(h[0])=='e'){s.c_w(k,'');return h[1];}else if(wh"
+"=='1'){s.linkName=h[1];s.linkType='o';return h[1];}else if(t=='1'){if(v>-1){s.c_w(k,h[1]);return '';}else{s.linkName=h[1];s.linkType='o';return h[1];}}else if(t=='2'){s.linkName=h[1];s.linkType='o'"
+";return h[1];}else{s.c_w(k,h[1]);return '';}s.c_w(k,'');return '';");

/*
* TNT Integration Plugin v1.0
*/
/*
 * org 
s_omni.trackTNT =new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");
 */

/*
 * New TNT Integration Plubin 
 */
/*
 * TNT Integration Plugin v2.0H
 */
s_omni.trackTNT = new Function("v", "p", "b", "" 
		 + "var s=this,n='s_tnt',q='s_tntref',p=(p)?p:n,v=(v)?v:n,r='',pm=false"
		 + ",b=(b)?b:true;if(s.getQueryParam(q)!=''){s.referrer=s.getQueryParam"
		 + "(q);}else if(s.c_r(q)!=''){s.referrer=s.c_r(q);document.cookie=q+'="
		 + ";path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;';}else if((document."
		 + "cookie.indexOf(q)!=-1&&s.c_r(q)=='')||(location.search.indexOf(q+'="
		 + "')!=-1&&s.getQueryParam(q)=='')){s.referrer='Typed/Bookmarked';docu"
		 + "ment.cookie=q+'=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;';}if"
		 + "(s.getQueryParam(p)!=''){pm=s.getQueryParam(p);}else if(s.c_r(p)){p"
		 + "m=s.c_r(p);document.cookie=p+'=;path=/;expires=Thu, 01-Jan-1970 00:"
		 + "00:01 GMT;';}else if(s.c_r(p)==''&&s.getQueryParam(p)==''){pm='';}i"
		 + "f(pm)r+=(pm+',');if(s.wd[v]!=undefined)r+=s.wd[v];if(b)s.wd[v]='';r"
		 + "eturn r;");

/***** Media MODULE *****/
s_omni.m_Media_c="var m=s.m_i('Media');if(m.completeByCloseOffset==undefined)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==undefined)m.completeCloseOffsetThreshold=1;m.cn=function(n){var m="
+"this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=new Object;"
+"if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerName?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm"
+".getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.ad=0;i.adpn;i.adpp;i.adppp;i.clk;i.CPM;i.co=0;i.cot=0;i.lm=0;i.l"
+"om=0;m.l[n]=i}};m.openAd=function(n,l,p,pn,pp,ppp,CPM,b){var m=this,i=new Object;n=m.cn(n);m.open(n,l,p,b);i=m.l[n];if(i){i.ad=1;i.adpn=m.cn(pn);i.adpp=pp;i.adppp=ppp;i.CPM=CPM}};m._delete=function"
+"(n){var m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1,o,sn,sx,sl);if(i&&!i.m){i.m=new "
+"Object;i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}');i.m.m()}};m.click=function(n,o"
+"){this.e(n,7,o)};m.complete=function(n,o){this.e(n,5,o)};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=v"
+"o.linkTrackEvents,pe='m_i',pev3,c=vo.contextData,x;if(i.ad){ns+='ad.';if(i.adpn){c['a.media.name']=i.adpn;c[ns+'pod']=i.adpp;c[ns+'podPosition']=i.adppp;}if(!i.vt)c[ns+'CPM']=i.CPM;}if (i.clk) {c[n"
+"s+'clicked']=true;i.clk=0}c['a.contentType']='video'+(i.ad?'Ad':'');c['a.media.channel']=m.channel;c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0)c[ns+'length']=i.l;if(Math.floor(i.ts)>0)c[ns+'ti"
+"mePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view']=true;pe='m_s';i.vt=1}if(i.sx){c[ns+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView'"
+"]=true}if(!i.cot&&i.co){c[ns+\"complete\"]=true;i.cot=1}if(i.lm>0)c[ns+'milestone']=i.lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v)for(x in c)v+=',contextData.'+x;pev3=c['a.contentType'];vo.pe="
+"pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo.events2='';if(v)v+=',events';for(x in d){if(x.substring(0,ns.length)==ns)y=x.substring(ns.length);else y=\"\";a=d[x];if(typeof(a)=='strin"
+"g'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a.contentType\"){if(v)v+=','+a;vo[a]=c[x]}else if(y=='view'||y=='segmentView'||y=='clicked'||y=='complete'||y=='timePlayed'||y=='CPM'){if("
+"e)e+=','+a;if(y=='timePlayed'||y=='CPM'){if(c[x])vo.events2+=(vo.events2?',':'')+a+'='+c[x];}else if(c[x])vo.events2+=(vo.events2?',':'')+a}else if(y=='segment'&&c[x+'Num']){if(v)v+=','+a;vo[a]=c[x"
+"+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}else if(y=='milestones'||y=='offsetMilestones'){x=x.substring(0,x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];vo.events2+=(vo.even"
+"ts2?',':'')+d[x+'s'][c[x]]}}if(c[x])c[x]=undefined;if(y=='segment'&&c[x+'Num'])c[x+\"Num\"]=undefined}}vo.linkTrackVars=v;vo.linkTrackEvents=e};m.bpe=function(vo,i,x,o){var m=this,pe='m_o',pev3,d='"
+"--**--';pe='m_o';if(!i.vt){pe='m_s';i.vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.floor(i.t)+d+i.s+d+(i.to>=0?'L'+Math.floor(i.to):'')+i.e+(x!=0&&x!"
+"=2?'L'+Math.floor(o):'');vo.pe=pe;vo.pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),c,l,v=m.trackVars,e=m.trackEvents,ti=m.trackSeconds,tp=m.tr"
+"ackMilestones,to=m.trackOffsetMilestones,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,tc,vo=new Object;if(!m.channel)m.channel=m.s.wd.location.hostnam"
+"e;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){if(i.ad){ti=m.adTrackSeconds;tp=m.adTrackMilestones;to=m.adTrackOffsetMilestones;sm=m.adSegmentByMilestones;so=m.adSegmentByOffsetMilestones}if(o<0){if(i"
+".lx==1&&i.lt>0)o=(ts-i.lt)+i.lo;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name=n;w.ad=i.ad;w.length=i.l;w.openTi"
+"me=new Date;w.openTime.setTime(i.s*1000);w.offset=i.o;w.percent=i.x;w.playerName=i.p;if(i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP':(x==3?'MONITOR':(x==4?"
+"'TRACK':(x==5?'COMPLETE':(x==7?'CLICK':('CLOSE')))))));if(!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd;if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i.lo=o;if("
+"(x<=3||x>=5)&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o){l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i.l)*100<c"
+"&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.milestone=c}}z=to?m.s.sp(to,','):0;if(z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z.length;w"
+".mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m.s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0"
+";if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if(so&&to){z=m.s.sp(to,',');if(z){z[z.length]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c||z[j]=="
+"'E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}if(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if((x>=2||i.x>=100)&&i.lo<o){i.t+=o-i.lo;i.ts+"
+"=o-i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=(x==3?1:x)}if(!t&&i.to>=0&&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}i.lt=ts;i.lo=o}if(!x||("
+"x<=3&&i.x>=100)){if(i.lx!=2)i.e+='E'+Math.floor(o);x=0;v=e=\"None\";w.mediaEvent=w.event=\"CLOSE\"}if(x==7){w.clicked=i.clk=1;t=1}if(x==5||(m.completeByCloseOffset&&(!x||i.x>=100)&&i.l>0&&o>=i.l-m."
+"completeCloseOffsetThreshold)){w.complete=i.co=1;t=1}ek=w.mediaEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILESTONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime"
+"=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePlayed=i.t;w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!=4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new "
+"Object;vo.contextData=new Object;vo.linkTrackVars=v;vo.linkTrackEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEvents)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i)"
+";else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx=sx;i.sc=1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i.ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,"
+"pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthRequired||(length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b);r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){"
+"var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7"
+"='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new"
+" Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch("
+"e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p="
+"'Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8"
+")x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x."
+"type='text/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p=="
+"2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTime"
+"Scale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x"
+"!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c"
+");o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetL"
+"ength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10|"
+"|!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new"
+" Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack"
+"&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd."
+"addEventListener)s.wd.addEventListener('load',m.as,false);if(m.onLoad)m.onLoad(s,m)";s_omni.m_i("Media");
/**** END Media MODULE COMMENT ***/

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27.2';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackin"
+"gServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLow"
+"erCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.vers"
+"ion+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if"
+"(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]"
+"=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd["
+"imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!"
+"s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e"
+".getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'"
+"+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,"
+"l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='ht"
+"tps://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l="
+"',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'"
+"+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextDat"
+"a\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(n"
+"fn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){n"
+"k=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLi"
+"ghtData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(s"
+"p=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return "
+"qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe"
+"=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if"
+"(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv|"
+"|fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';e"
+"lse if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocationHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='pageURL'"
+"){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigratio"
+"nKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}"
+"else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='co"
+"okieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='"
+"resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='br"
+"owserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v=''"
+";else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q"
+"='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k"
+"],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev"
+"'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring("
+"0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function("
+"h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',"
+"h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e'"
+";return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.d"
+"ispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s"
+"._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useFor"
+"cedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.targe"
+"t;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h="
+"0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}"
+"catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX"
+",e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediateP"
+"ropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||"
+"(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)"
+"!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase()"
+":'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;"
+"if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''"
+"),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o"
+".s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')"
+">=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un)"
+";return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){v"
+"ar s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if"
+"(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+"
+"=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o="
+"s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s"
+".apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s."
+"n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,"
+"s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n"
+"){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0"
+"&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,"
+"i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.u"
+"n.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n"
+",a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._"
+"il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}"
+"else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)"
+"g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\"
+"'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m="
+"function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m"
+"[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};"
+"s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s."
+"h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){"
+"if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a("
+"\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c"
+"','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendC"
+"hild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g"
+".length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"|"
+"|k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!"
+"'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}"
+"else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTi"
+"me();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketi"
+"ngCloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloudVisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrac"
+"kCheck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID = false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analytic"
+"sVisitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._a"
+"udienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s.audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;"
+"s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWaitingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s"
+".audienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.v"
+"isitor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisitorID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s._waitingForMarketingCloudVisi"
+"torID = true;s.marketingCloudVisitorID = visitor.getMarketingCloudVisitorID([s,s._marketingCloudVisitorIDCallback]);if (s.marketingCloudVisitorID) {s._doneWaitingForMarketingCloudVisitorID = true;}"
+"}if ((!s._waitingForAnalyticsVisitorID) && (!s.analyticsVisitorID) && (visitor.getAnalyticsVisitorID)) {s._waitingForAnalyticsVisitorID = true;s.analyticsVisitorID = visitor.getAnalyticsVisitorID(["
+"s,s._analyticsVisitorIDCallback]);if (s.analyticsVisitorID) {s._doneWaitingForAnalyticsVisitorID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (vis"
+"itor.getAudienceManagerLocationHint)) {s._waitingForAudienceManagerLocationHint = true;s.audienceManagerLocationHint = visitor.getAudienceManagerLocationHint([s,s._audienceManagerLocationHintCallba"
+"ck]);if (s.audienceManagerLocationHint) {s._doneWaitingForAudienceManagerLocationHint = true;}}if ((!s._waitingForAudienceManagerBlob) && (!s.audienceManagerBlob) && (visitor.getAudienceManagerBlob"
+")) {s._waitingForAudienceManagerBlob = true;s.audienceManagerBlob = visitor.getAudienceManagerBlob([s,s._audienceManagerBlobCallback]);if (s.audienceManagerBlob) {s._doneWaitingForAudienceManagerBl"
+"ob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarketingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)          && (!s."
+"_doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingForAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceManagerLocati"
+"onHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceManagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._callbackWhen"
+"ReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToTrack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo.callbackThis"
+" = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;if (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWhenReadyToTra"
+"ckQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReadyToTrackCheck"
+"=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack()) {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._callbackWhen"
+"ReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._callbackWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();callbackInfo.ca"
+"llback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrack=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = null;if (!s."
+"isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {};for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}setVariables ="
+" {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s.callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this,d='01234567"
+"89ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);"
+"l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTrack,trk=1,tm"
+"=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?"
+"y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if ((!s.supplementalDataID) &&"
+" (s.visitor) && (s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}if(s.mpc('t',argum"
+"ents))return;s.gl(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,o,i,x='',c='"
+"',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)"
+"j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a."
+"reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?"
+"'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.do"
+"cumentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}ca"
+"tch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.p"
+"l.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeigh"
+"t=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins"
+")s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s."
+"eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid("
+"o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf("
+"'?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s."
+"ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAt"
+"tribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_object"
+"ID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(o"
+"cq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=n"
+"ew Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.a"
+"pe(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,"
+"ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.supplementalDataID=s.pageU"
+"RLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t"
+",n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s."
+"t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;"
+"i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeo"
+"f(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);e"
+"lse y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.ge"
+"tElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE ')"
+",o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if"
+"(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parse"
+"Float(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l="
+"'supplementalDataID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrat"
+"ionServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLight"
+"Profiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreFo"
+"rSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,linkName,linkType';var n;"
+"for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,p"
+"ev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+"
+"',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamic"
+"AccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo"
+",lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs="
+"function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()

