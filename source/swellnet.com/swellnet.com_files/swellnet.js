
//bandaid to stop PII being included in ad requests by stopping initialisation and removing insertAd method 
if ( top.document.location.href.match(/(((email|password|user|username)(=|%3d))|.+?@.+?\.[a-z]{2,})/i) ) {
 	 _mcn.amf.disableAllAds();
 	if (_mcn.amf.ad('id', 'mcn-111')) {
 		_mcn.amf.ad('id', 'mcn-111').disable();
	}
	if (_mcn.amf.insertAd) {
		_mcn.amf.insertAd = null;
		delete _mcn.amf.insertAd;
	}
	if (_mcn.amf.build) {
		_mcn.amf.build = null;
		delete _mcn.amf.build;
	}
 } else {
 	 _mcn.amf.initialise("MCN.SWELLNET.SPORT","$");
 }

if (_mcn.amf.tag("device") && _mcn.amf.tag("device").value().toLowerCase() === "desktop") {
  //enable skin
  _mcn.amf.skin({
    pageContainer: top.document.getElementById("main-section"),
    contentWidth: 1170,
    containerOffsetWidth: 10
  });
}

//add half page to all pages
if(_mcn.amf.tag('device').value().match(/^Desktop$/i) && (_mcn.amf.area().indexOf('home') !=-1||_mcn.amf.area().indexOf('news') !=-1||_mcn.amf.area().indexOf('reports/forecaster_notes') !=-1||_mcn.amf.area().indexOf('surfcams') !=-1) ){
	var array = _mcn.amf.ad(),
	i = array.length;
	while (i) {
		i--;
		if (array[i].adSize === "300x250") {
			array[i].size("300x250,300x600");
			
		}
	}
}

//add in 970x250 billboard size
if (_mcn.amf.ad("id", "mcn-9902501")){
			_mcn.amf.ad("id", "mcn-9902501").size("990x40,990x250,970x40,970x250");
		}

// Celtra Interscroller Mobile
if(document.querySelector && document.querySelector("div.field-name-body > p:nth-of-type(n+5)") && _mcn.amf.tag("device").value() === "Mobile" && _mcn.amf.area().indexOf("news/")!=-1){
    var my_elem = document.querySelector("div.field-name-body > p:nth-of-type(n+4)");
    var span = document.createElement('div');
        span.innerHTML = '';
        span.title = '320x528,320x300';
        span.className = 'mcnamf';
        span.id = 'celtra-interscroller';
    my_elem.parentNode.insertBefore(span, my_elem);
    _mcn.amf.insertAd('celtra-interscroller');
}
// End Celtra Interscroller Mobile

/*
 * Author: Steven
 * Change News Article Areas to give title/date as keywords.
*/
if (_mcn.amf.area().indexOf("news/")!=-1){
	var amf = _mcn.amf;
	var area=amf.area();
	var narea= area.split("/");
	var date="";
	var newarea="";
	var keyword;
	for (var i = 0; i < narea.length; i++) {
		if (isNaN(narea[i])){
			if(i<narea.length-1) 
				newarea=newarea+"/"+narea[i];
		}else{
			date=date+"/"+narea[i];             
		}
	}
	keyword=narea[narea.length-1];
	_mcn.amf.area(newarea);
	_mcn.amf.targeting("keyword",[keyword,date]);

} else {
  //take last part of area and add to keyword to allow for cross section targeting
  var nKey = _mcn.amf.area().split("/");
  nKey = nKey[nKey.length - 1];
  if (_mcn.amf.area != nKey) {
    _mcn.amf.targeting("keyword", nKey);
  }
}



/*
 * PLISTA
 * @Sammy
 * Drops the 'Recommended Articles' at the end of each article
 */
if (document.location.href.indexOf("plista") != -1){
	if (_mcn.amf.area().indexOf('news') === 0){
		var date = document.location.href;
		date = date.slice(date.indexOf("20"));
		date = date.slice(0, date.indexOf("/",8));
		
		_mcn.plista({
			library: "static.plista.com/swellnet.com.au_v1.js", 
			insertBefore: function(qwery){return qwery("ul.links")}, 
			title: function(qwery){return qwery("div.node-article > h2")[0].innerHTML}, 
			text: function(qwery){return 'By: ' + qwery("span.username")[0].innerHTML}, 
			image: function(qwery){return ''}, 
			category: "news", 
			created: date
		});
	}
	else{
		_mcn.plista({
			library: "static.plista.com/swellnet.com.au_v1.js", 
			widgetOnly: true,
			insertAfter: function(qwery){return qwery("div.panel-left").length ? [qwery("div.panel-left")[0].lastChild] : false}
		});
	}
}


// Author: Sammy
// criteo drop
_mcn.drop("criteo",[['2674','mcn_rta']]);
_mcn.drop("em");
_mcn.cache.write('drop',["em"], 3600 /**hour*/* 24 /**day*/* 3);
_mcn.drop("ga");
_mcn.cache.write('drop',["ga"], 3600 /**hour*/* 24 /**day*/* 3);


_mcn.amf.targeting("!c","Porn");
_mcn.amf.targeting("!c","Gambling");
_mcn.amf.targeting("!c","Media");

// enable absense to log ad blocking activity for Swellnet
_mcn.absense({
    timeout: 4000
});

_mcn.amf.vpm({"surfcams":{"728x90":{"1":0.8,"Position Not Defined":0.8},"300x600":{"1":1,"Position Not Defined":1}},"home":{"300x600":{"1":0.8}},"_ROOT":{"728x90":{"Position Not Defined":0.8}},"news":{"300x600":{"1":0.9,"Position Not Defined":0.8}}});
