/* parts.js
  - Coolkie control
  - Footer setting
  - Textsize change
  - Print view control
  - Current status control for menu
--------------------------------------------------------- */

////////// cookie control
var Cookie = {
	set: function(name,val) {
		if(val) {
			theDate = (new Date()).getDate();
			setDate = new Date();
			setDate.setTime(setDate.getTime() + (theDate*1000*60*60*24*3));// valid for 3 days
			expDate = setDate.toGMTString();
			document.cookie = name + "=" + escape(val) + ";path=/;expires=" + expDate;
			return true;
		}
		return false;
	},
	get: function(name) {
		theCookie = document.cookie + ";";
		name += "=";
		start = theCookie.indexOf(name);
		if(start>-1) {
			end = theCookie.indexOf(";",start);
			return unescape(theCookie.substring(start + name.length,end));
		}
		return false;
	}
};


////////// footer setting
var Bindfooter = {
	set: function() {
		var footer = document.getElementById('area-footer');
		if (footer) {
			var footerH = jQuery(footer).find('.wrap').height();
			var dummyFooter = document.getElementById('blank-footer');
			if (dummyFooter) {
				dummyFooter.style.height = footerH + 'px';
				var page = document.getElementById('page');
				if (page) page.style.marginBottom = footerH * -1 + 'px';
				
				// reset
				footer.style.height = footerH + 'px';
			}
		}
	}
};


////////// textsize change
var Textsize = {
	start: function() {
		if (bindobj.printstate) return;
		Textsize.effects();
	},
	effects: function() {
		if (!bindobj.isLegacy) {
	 		var resize = new Fx.Style($E('body'), 'font-size', {duration: 250, fps: 60, unit: 'px'}).set(12);
			$$('.bindtexts').addEvent('click', function() { resize.start(10); return false;});
			$$('.bindtextm').addEvent('click', function() { resize.start(12); return false;});
			$$('.bindtextl').addEvent('click', function() { resize.start(14); return false;});
		}
		else {
			var as = document.getElementsByTagName('a');
			var resize = function(size) { document.body.style.fontSize = size;}
			for (var i=0;i<as.length;i++) {
				if (as[i].className == 'bindtexts') as[i].onclick = function() { resize('10px'); return false;}
				if (as[i].className == 'bindtextm') as[i].onclick = function() { resize('12px'); return false;}
				if (as[i].className == 'bindtextl') as[i].onclick = function() { resize('14px'); return false;}
			}
		}
	},
	resize: function(size) {
		if (!bindobj.isLegacy) {
			jQuery(document.body).animate({
				fontSize: size + 'px'
			}, 250, 'linear');
		} else {
			document.body.style.fontSize = size + 'px';
		}
	}
};


////////// print view control
var Bindprint = {
	e: function(id) {
		return document.getElementById(id);
	},
	control: function() {
		///// shortcut to each area
		var printpage = Bindprint.e('page');
		var billboard = Bindprint.e('area-billboard');
		var contents = Bindprint.e('area-contents');
		var main = Bindprint.e('area-main');
		var sideA = Bindprint.e('area-side-a');
		var sideB = Bindprint.e('area-side-b');
		var links = document.links;
		var layout = document.body.id;
				
		///// hide elements 1
		Bindprint.e('area-header').style.display = 'none';
		Bindprint.e('area-footer').style.display = 'none';
		
		///// edit h1 title
		var uri = document.URL.split('?');
		Bindprint.e('page-title').innerHTML += '<br /><span>' + uri[0] + '</span>';
		
		///// prepare numbers
		var billbowidth = billboard ? billboard.offsetWidth : 0;
		var contentswidth = contents ? contents.offsetWidth : 0;
		var mainwidth = main ? main.offsetWidth  : 0;
		var sideAwidth = sideA ? sideA.offsetWidth : 0;
		var sideBwidth = sideB ? sideB.offsetWidth : 0;
		
		var addpx = function(val) { val += 'px'; return val;}
		
		///// change id for print
		printpage.id = 'area-print';
		printpage.style.width = billbowidth < contentswidth ? addpx(contentswidth) : addpx(billbowidth);
		if (document.getElementById) { printpage.style.minWidth = printpage.style.width; printpage.style.width = '80%';}
		
		///// hide elements 2
		billboard.style.display = 'none';
		contents.style.display = 'none';
		
		var table1, table2;
		if (billboard) {
			table1 = document.createElement('table'); table1.style.width = addpx(billbowidth); printpage.appendChild(table1);
			if (!bindobj.ie60 && document.getElementById) { table1.style.minWidth = addpx(billbowidth); table1.style.width = '100%';}
			var tbody1 = document.createElement('tbody'); table1.appendChild(tbody1);
			var tr1 = document.createElement('tr'); tbody1.appendChild(tr1);
			var td1 = document.createElement('td'); td1.id = 'area-billboard'; td1.innerHTML = billboard.innerHTML; tr1.appendChild(td1);
		}
		
		table2 = document.createElement('table'); table2.style.width = addpx(contentswidth); printpage.appendChild(table2);
		if (!bindobj.ie60 && document.getElementById) { table2.style.minWidth = addpx(contentswidth); table2.style.width = '100%';}
		var tbody2 = document.createElement('tbody'); table2.appendChild(tbody2);
		var tr2 = document.createElement('tr'); tbody2.appendChild(tr2);
		
		var widthrate = Math.floor(640/contentswidth * 100) / 100;
		if (bindobj.ie60) {
			var img = document.getElementsByTagName('img');
			for (i=0;i<img.length;i++) {
				img[i].width = Math.floor(img[i].width * widthrate);
				img[i].height = Math.floor(img[i].height * widthrate);
			}
			table1.style.width = '640px';
			table2.style.width = '640px';
		}
		
		var printsideA = function(arg) {
			var td2a = document.createElement('td');
			td2a.id = 'area-side-a';
			td2a.style.width = bindobj.ie60 ? addpx(sideAwidth * widthrate) : addpx(sideAwidth);
			if (!bindobj.ie60 && document.getElementById) {
				td2a.style.minWidth = addpx(sideAwidth);
				if (arg == 2) td2a.style.width = '30%';
				if (arg == 3) td2a.style.width = '20%';
			}
			td2a.innerHTML = sideA.innerHTML;
			tr2.appendChild(td2a);
		};
		var printmain = function(arg) {
			td2m = document.createElement('td');
			td2m.id = 'area-main';
			td2m.style.width = bindobj.ie60 ? addpx(mainwidth * widthrate) : addpx(mainwidth);
			if (!bindobj.ie60 && document.getElementById) {
				td2m.style.minWidth = addpx(mainwidth);
				if (arg == 1) td2m.style.width = '100%';
				if (arg == 2) td2m.style.width = '66%';
				if (arg == 3) td2m.style.width = '55%';
			}
			td2m.innerHTML = main.innerHTML;
			tr2.appendChild(td2m);
		};
		var printsideB = function(arg) {
			td2b = document.createElement('td');
			td2b.id = 'area-side-b';
			td2b.style.width = bindobj.ie60 ? addpx(sideBwidth * widthrate) : addpx(sideBwidth);
			if (!bindobj.ie60 && document.getElementById) {
				td2b.style.minWidth = addpx(sideAwidth);
				if (arg == 2) td2b.style.width = '30%';
				if (arg == 3) td2b.style.width = '20%';
			}
			td2b.innerHTML = sideB.innerHTML;
			tr2.appendChild(td2b);
		};
		var printgap = function() {
			td2g = document.createElement('td');
			tr2.appendChild(td2g);
		};
		
		switch (layout) {
			case 'L01':		printmain(1);break;
			case 'L02':		printmain(2); printsideA(2); break;
			case 'L03':		printsideA(2); printmain(2); break;
			case 'L04':		printsideA(2); printmain(2); break;
			case 'L05':		printsideA(3); printmain(3); printsideB(3); break;
			case 'L06':		printmain(2); printsideA(2); break;
			case 'L07':		printsideA(2); printmain(2); break;
			case 'L08':		printmain(2); printsideA(2); break;
		}
		
		///// deactivate links
		for (var i=0;i<links.length;i++) links[i].onclick = function() { return false;}
		
		///// print memo
		var box = document.createElement('div');
		box.id = "bind-print-note";
		printpage.insertBefore(box,printpage.childNodes[0]);
		
		var form = document.createElement('form');
		box.appendChild(form);
		
		form.innerHTML = '<p><input type="button" value="PRINT" onclick="print();" />　<input type="button" value="CLOSE" onclick="window.close();" /></p>';
		
		return false;
	},
	set: function() {
		var spans = document.getElementsByTagName('span');
		for (var i=0;i<spans.length;i++) {
			if (spans[i].className.indexOf('bdprint')>-1) {
				spans[i].onclick = function() {
					var w = bindobj.ie60 ? 710 : 880;
					var url = document.URL.replace(/#.*$/,'$1');
					window.open(url + '?printstate=true','_blank','width=' + w + ',resizable=1,menubar=1,scrollbars=1');
					return false;
				}
			}
		}
	}
};

function bd_tracking(link, cat, tid, afterlink) {
	if (link == null) return;
	if (tid == '') return;
	
	if (tid != null) {
		var pt = null;
		if (typeof(pageTracker) == 'undefined') {
			if (typeof(_gat) == 'undefined') {
				alert('Google Analyticsが設定されていません。\n' +
					'「サイト設定」−「アクセス解析設定」に' +
					'Google Analyticsのトラッキングコードを' +
					'設定してください。');
			} else {
				pt = _gat._createTracker('');
			}
		} else {
			pt = pageTracker;
		}
		
		if (pt != null) {
			try {
				pt._trackEvent(cat, tid);
			} catch(err) {}
		}
	}
}

function bd_download(link, cat, tid, afterlink) {
	bd_tracking(link, cat, tid, afterlink);
	
	if (afterlink != null) {
		setTimeout('document.location = "' + afterlink + '"', 200);
	}
}
