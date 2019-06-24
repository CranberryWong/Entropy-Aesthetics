BN_DEV=0;
(function (w,d){
if(typeof w.ABN!='undefined')return
function abn(name, param) {
	if (this instanceof abn && !abn.zones[name]) {
		var zone=this
		if(!(zoneDiv=d.getElementById(name))||!param.id)
			return null
		if(param.dev)
			BN_DEV=1
		zone.name=name
		zone.id=param.id
		abn.merge(zone,{div:zoneDiv,param:param,state:0})
		abn.zones[name]=zone
		abn.dbg(abn.zones)
		if(!param.noload)
			zone.load()
	}
	return abn.zones[name]
}

abn.prototype={
	load: function(){
		var zone=this,row=zone.param;
		if(zone.state){
			row.rnd=Math.round(Math.random()*1000000000);
			this.write('');
		}
		if (row.pool)
			abn.q = '&p='+row.pool+abn.q
		abn.run(abn.domain+'load?z='+row.id+'&div='+zone.name+abn.q,function(){zone.done();})
		zone.state=1
	},
	write: function(str){
		if(this.div)this.div.innerHTML=str
	},
	append: function(el) {
		this.div.appendChild(el)
	},
	view: function() {
		var zone=this,row=zone.param
		abn.run(abn.domain+'view?z='+row.id+'&m='+zone.media.id+'&n=')
	},
	done: function(){
		this.state=2;
	}
}

abn.merge=function() {
	var param, name, copy, target=arguments[0] || {};
	for (i=1;i<arguments.length;i++ )
		if((param=arguments[i])!=null)
			for(name in param)
				if(param.hasOwnProperty(name)&&param[name]!==undefined)
					target[name]=param[name];
	return target;
}
abn.dbg=function(str){
	if(BN_DEV)if(w.console)w.console.log('%cabn: %O',"background:#cecece; font-size: 9pt",str);
}
abn.ready=function(str) {//dom ready
	abn.dbg('domReady '+str);
	if (abn.isDomReady)
		return false;
	abn.isDomReady=true;
	abn.list.call(true);//execute the zones loading
}

abn.onload=function(func) {
	if (d.readyState=='complete')
		return func('c');
	if (d.addEventListener) {
		d.addEventListener("DOMContentLoaded", function(){func('el')}, false);
		w.addEventListener("load", function(){func('elw')}, false);
	} else if (d.attachEvent) {
		d.attachEvent(c[1],function(){func('ae')},false);
		w.attachEvent("onload", function(){func('aew')});
	}
}

var z=["SCRIPT","onreadystatechange","WEBGL"]

abn.run=function(src,f){
	var st=z[0],s=d.createElement(st),t=d.getElementsByTagName(st)[0]
	s.async=true
	s.src=src
	if (f)
		s.onload=s[z[1]]=function(evt){st=s.readyState;if(!st||st=='loaded'||st=='complete'){s.onload=s[z[1]]=null;f(s);}}
	t.parentNode.insertBefore(s, t)
}

function v(a, b, c) {
	a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
}
function f(s){
	if((pos=s.indexOf("://"))>=0)s=s.substr(pos+3)
	if(s.length>500)s=s.substr(0,500)
	return escape(s)
}
abn.q=""
abn.zones = {}
abn.protocol=w.location.protocol=='https:'?'https:':'http:'
abn.domain = abn.protocol+(BN_DEV?'//d':'//z.cdn')+'.adbetnet.com/'
w.ABNSl=w.ABNSl||[]
w.ABNSl.push=function(a){
	new abn(a[0], a[1])
}
w.ABN=abn
var vc="0",t=new Date,ws=w.screen,mr=Math.round,hc=1,wn=w.navigator;
try{hc=wn.hardwareConcurrency}catch(p){hc = 0}
try{var ca=d.createElement("canvas"),gl=ca.getContext("experimental-"+z[2].toLowerCase());
vc=gl.getParameter(gl.getExtension(z[2]+"_debug_renderer_info")["UNMASKED_RENDERER_"+z[2]])}catch(p){}
var dc="CSS1Compat"==d.compatMode?d.documentElement:d.body,p={
ban:w.advBanID,
cam:w.advCampID,
df:d.hasFocus()+0,
sr:ws.width+'x'+ws.height,
cw:dc.clientWidth,
ch:dc.clientHeight,
tz:-t.getTimezoneOffset(),
bh:w.history.length,
tl:(pr=w.performance)&&(typeof pr.now!='undefined')&&mr(pr.now()),
pl:wn.plugins&&wn.plugins.length,
mi:wn.mimeTypes&&wn.mimeTypes.length,
me:wn.deviceMemory,
hc:hc,
n:mr(Math.random()*1e16),
url:f(w.location.href),
vc:f(vc),
ref:f(d.referrer)};
for(k in p)if((v=p[k])&&v!='undefined'){abn.q+="&"+k+"="+v}
while(w.ABNSl.length){
	p=w.ABNSl.pop()
	new abn(p[0], p[1])
}
})(window, document)
