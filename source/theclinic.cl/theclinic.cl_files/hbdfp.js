(function(){var M=window,F=M.document,aJ={},b,aF=0,C={166:{o:0,h:"outstream"}},H={storageRenderPrefix:"hbsr_",storageViewPrefix:"hbvi_",VI_MINIMOS_MILISEGUNDOS_VISIBLES:1000,VI_INTERVALOS_CHEQUEO:5,VI_MINIMO_RATIO_VISIBLE:0.5,DOMAIN_BIDDERS:["oftmedia","districtmDMX"],DFP_CT_KEY:"EPL_HB"},G,d=false,c={r:false,eplAds:{},dfpRenders:{},eSi:"",slots:[],targetings:{},h:[],e:{},helpers:{},hqs:{},requestedCS:{},timers:{sent:false,epl:{ts:0,done:false},pb:{ts:0,done:false}},debs:{},hbpb:{ls:R(),ignPconf:false,PCONF_KEY:"hbpbepl-pconf",PBJS_VARIABLE:"hbeplpb",DEFAULT_TMT:1000,brs:{},requested:false,responded:false,i:[]},rH:function(aU){var aX,aY,aT,w,aZ,aW,aV=[];this.r=true;if(!aU){aq();return false;}if(!c.timers.epl.done){c.timers.epl.done=true;c.timers.epl.ts=Date.now()-c.timers.epl.ts;}if(aU.RoC){d=true;}if(aU.fa){if(aU.fa.bc){V(aU.fa.bc);}this.hbpb.fi=aU.fa.fi||this.hbpb.fi;this.hbpb.S=aU.fa.S||this.hbpb.S;this.hbpb.i=this.hbpb.i.concat(aU.fa.impids||[]);if(aE()&&!this.hbpb.requested){m();}}aJ.hxl=aU.hxl?true:false;if(aU&&aU.sp){this.rsp=aU;this.eSi=aU.sI.k;for(aX=0;aX<aU.sp.length;aX++){aY=aU.sp[aX];aT=Z(aY.k);aZ=S(aY.k);w=F.getElementById(aT);if(aU.de){this.debs[aT]=aU.de.indexOf("http")===0?aU.de:k()+"://"+aU.de+"/";}if(aY.a){aW=aZ.getDfpSlot();if(E()){aW.setTargeting(H.DFP_CT_KEY,"slot "+aW.getSlotElementId());}aV.push(aW);}A(aT,aY);}if(v()){if(E()){O(aV);}else{googletag.destroySlots(aV);}aD();}if(aU.cs){aK(aU.cs);}}else{for(aX=0;aX<c.slots.length;aX++){aT=ab(c.slots[aX].getSlotElementId());if(aT){(aT.style.visibility="");}}}if(aU&&aU.test1mimp){au();}},showByType:function(aU){var w,aT,aV=this.helpers[aU];if(!aV){throw"No helper for: "+aU;}w=this.hqs[aU];while(typeof(aT=w.shift())!=="undefined"){aV.show(aT);F.getElementById(Z(aT.name)).style.visibility="";if(!aJ.hxl){aQ(c.eplArgs.spbn[aT.name].d,aT);}}},deferedRender:function(aT){var w=aT.split(" ")[1];if(c.eplAds[w]){Q(w);}}};F.hbepl=c;M.hbepl=c;function O(w){w.forEach(function(aU){var aT=ab(aU.getSlotElementId());if(aT){aT.style.visibility="";}});}function aD(){googletag.pubads().refresh();}function v(){return aJ.disableInitialLoad;}function aK(aU){var aT,aV=c.requestedCS,w;for(w=0;w<aU.length;w++){if(typeof aU[w]==="object"){if(!aV[aU[w].u]){if(aU[w].j){aT=F.createElement("script");aT.src=aU[w].u;}else{if(aU[w].ifr){aT=F.createElement("iframe");aT.src=aU[w].u;aT.style.width=aT.style.height="1px";aT.style.display="none";}}if(aU[w].data){for(data in aU[w].data){if(aU[w].data.hasOwnProperty(data)){aT.setAttribute("data-"+data,aU[w].data[data]);}}}F.body.appendChild(aT);aV[aU[w].u]=true;}}else{if(typeof aU[w]==="string"){if(!aV[aU[w]]){im=new Image();im.src=aU[w];aV[aU[w]]=true;}}}}}function ar(aT){aT.innerHTML="";var w=F.createElement("iframe");w.id=aT.id+"iframe";w.src="about:blank";w.width="100%";w.height="100%";w.scrolling="no";w.style.border="0px";aT.appendChild(w);window.setTimeout(function(){w.contentDocument.body.style.margin=0;},50);return w;}function ah(aV,aT){var aW,aU=aV.a,w=aT.id;c.eplAds[w]=aU[0];aT.innerHTML="";aW=F.createElement("div");aW.id="eplAdDiv"+aV.k;aT.appendChild(aW);c.eplAds[w].dfpDiv=aT;c.eplAds[w].div=aW;c.eplAds[w].name=aV.k;}function ab(w){return document.getElementById(w)||document.getElementById(w+"_ad_container");}function X(){var w=aJ.sV+"hba/";if(!c.timers.sent&&c.timers.epl.done&&c.timers.pb.done){if(c.timers.pb.ts>=c.hbpb.DEFAULT_TMT){c.timers.pb.ts="to";}h(w+"?pbt="+c.timers.pb.ts+"&eplt="+c.timers.epl.ts);c.timers.sent=true;}}function ax(aV,w){var aT=aV.fp,aU=c.hbpb.brs[w.id]||{},aW=aV.a[0];aU.cpm=aU.cpm||0;if(aW.pr>=aU.cpm){ah(aV,w);}else{U(aV,w);}}function U(aW,w){var aV=M[c.hbpb.PBJS_VARIABLE],aT=aW.fp,aU=c.hbpb.brs[w.id]||{},aX,aY=S(aW.k);aU.cpm=aU.cpm||0;if(aU.cpm>=aT){aX=ar(w).contentDocument;aV.renderAd(aX,aU.adId);aQ(w.id,{div:w,crid:"f"+aU.adId});W(aU,aW);G.visibilityHandler(aU);}else{if(c.slots[aY.slotIndex].getResponseInformation()){G.visibilityHandler({name:aW.k,w:aY.s[0],h:aY.s[1],div:w});}}w.style.visibility="";}function W(aV,aT){var aX=c.hbpb.pconf.bds[aV.bidder],aU=aX.did,aZ=aX.pb,aY=aV.adId,aW,w,a0=c.debs[Z(aT.k)]||c.eplArgs.sV;if(aT.a&&aT.a.length){aW=aT.a[0];}w=aW?aW.pr:aT.fp;url=a0+"eli/4/"+c.eSi+"/"+aT.ec;url+="?fadid="+encodeURIComponent(aU);url+="&fafp="+encodeURIComponent(aV.cpm);url+="&fasp="+encodeURIComponent(w);url+="&pb="+encodeURIComponent(aZ);url+="&S="+encodeURIComponent(c.hbpb.S);url+="&fi="+encodeURIComponent(c.hbpb.fi);url+="&i="+encodeURIComponent(c.hbpb.i.pop());url+="&nfc=1";url+="&rnd="+encodeURIComponent(j());aO(url);}function A(aT,aY){var w=ab(aT),aU=aY.fp,aV=aY.a&&aY.a.length,aX=c.hbpb.S&&c.hbpb.fi&&c.hbpb.i.length,aZ=z(aT),aW;if(w){if(aY.e){w.style.visibility="hidden";c.e[aT]=true;N([aY.k],1);}else{if(!aV&&!aU){w.style.visibility="";if(c.slots[aZ.slotIndex].getResponseInformation()){G.visibilityHandler({name:aY.k,w:aZ.s[0],h:aZ.s[1],div:w});}}else{X();if(c.hbpb.responded&&aX){if(aV){ax(aY,w);}else{if(aU){U(aY,w);}}}else{if(c.hbpb.requested&&aX){setTimeout(function(){A(aT,aY);},100);}else{if(aV){ah(aY,w);}else{w.style.visibility="";if(c.slots[aZ.slotIndex].getResponseInformation()){G.visibilityHandler({name:aY.k,w:aZ.s[0],h:aZ.s[1],div:w});}}}}}}}else{if(F.readyState!=="complete"){setTimeout(function(){A(aT,aY);},150);}}}function at(aT,aV,aZ,aU,aW,w){var aY=aT,aX=aT.replace(/\/\d+(\/.*)/,"$1");if(!aJ.eIshb){aJ.eIshb=[];}if(aJ.useDivName){aT=aZ;}else{if(aT.match(/\/\d+?\/.+?\//)){aT=aT.replace(/\/\d+?\/[\w\d\.\/]+\/(.+)/,"$1");}else{aT=aT.replace(/\/\d+?\/(.+)/,"$1");}aT=aN(aT);}aJ.eIshb.push({f:aY.replace(/^\//,""),n:aT,s:aV,d:aZ,targkeys:aU,slotIndex:aW,geteIs:function(){var a2=this.s,a0,a3=[],a1;if(a2&&a2.length&&a2[0]!=="object"){a1=this.n+":"+a2[0]+"x"+a2[1];}else{if(a2[0]==="object"){for(a0=0;a0<a2.length;a0++){a3.push(a2[a0][0]+"x"+a2[a0][1]);}a1=this.n+":"+a3.join(",");}}a1=a1||this.n;return a1+"!"+aX;},getdfpI:function(){return this.f.split("/")[0];},dfpSlot:w,getDfpSlot:function(){return this.dfpSlot;}});}function S(w){var aT,aU=aJ.eIshb;for(aT=0;aT<aJ.eIshb.length;aT++){if(aU[aT].n==w){return aU[aT];}}}function Z(w){var aT=S(w);if(aT){return aT.d;}}function z(aU){var w,aT=aJ.eIshb;for(w=0;w<aJ.eIshb.length;w++){if(aT[w].d===aU){return aT[w];}}}function am(aU){var w,aT=aJ.eIshb;for(w=0;w<aJ.eIshb.length;w++){if(aT[w].d===aU){return aT[w].n;}}}function aP(w){return w.split("$RANDOM").join(j());}function B(aU){var aT=aU.f,w=aT.split(/\/+/);w.shift();w.pop();if(w&&w.length){return w.join("/");}}function aN(w){return w.replace(/_|\.|-|\//g,"").replace(/\)\(|\(|\)/g,"_").replace(/^_+|_+$/g,"");}function t(){var aU,w=aJ.eIshb,aT="",aV;for(aU=w.length-1;aU>=0;aU--){if(w[aU].d){aV=w[aU].geteIs();aJ.eIs.push(aV);aJ.eIsbn[w[aU].n]=aV;aJ.spbn[w[aU].n]=w[aU];}}aT=B(w[0]);aJ.dfpI=encodeURIComponent(w[0].getdfpI()||"");aJ.sec=aT||"ROS";aJ.sI=M.location.hostname||"file";aJ.dom=M.location.hostname||"file";aJ.dmps=ae();aJ.dmpsQueryStr=f(aJ.dmps);c.eplArgs=aJ;c.hbpb.pconf=aG();c.targetings=ad();if(aE()){m();}N();}function aG(){var aU,w;if(c.hbpb.ls){aU=window.localStorage;try{w=JSON.parse(aU.getItem(c.hbpb.PCONF_KEY));}catch(aT){aU.removeItem(c.hbpb.PCONF_KEY);}}return w||c.hbpb.pconf;}function V(aT){var aU,w,aX,aY,aV=0;if(c.hbpb.ls){aU=aT.bds;for(w in aU){if(aU.hasOwnProperty(w)){aX=aU[w];aV=aX.tot>aV?aX.tot:aV;if(typeof aX.cfg==="string"){try{aX.cfg=JSON.parse(aX.cfg);}catch(aW){aX.cfg={};}}}}aV=aV||c.hbpb.DEFAULT_TMT;aT.tot=aV;aY=window.localStorage;try{aY.setItem(c.hbpb.PCONF_KEY,JSON.stringify(aT));}catch(aW){}c.hbpb.pconf=aT;}}function P(){var w=c.hbpb.pconf;return w&&w.md5?w.md5:"0";}function aE(){if(!c.hbpb.ls){return false;}function aT(aU){var aV=aU.bds;if(aV&&aV!=={}){for(var aW in aV){if(aV.hasOwnProperty(aW)&&!aV[aW].disabled){return true;}}}return false;}var w=c.hbpb.pconf;return w&&w!=={}&&aT(w);}function ao(aU){var w=aU.exp,aV=Math.floor(aU.ts/1000),aT=Math.floor(Date.now()/1000);return aT>(aV+w);}function m(){M[c.hbpb.PBJS_VARIABLE]=M[c.hbpb.PBJS_VARIABLE]||{};var w=M[c.hbpb.PBJS_VARIABLE];w.que=w.que||[];w.que.push(aB);c.hbpb.requested=true;h(c.eplArgs.isV+"/layers/eplbid.js");}function aB(){var w=M[c.hbpb.PBJS_VARIABLE],aT=aR();w.que.push(function(){w.addAdUnits(aT);c.timers.pb.ts=Date.now();w.requestBids({bidsBackHandler:aS,timeout:c.hbpb.DEFAULT_TMT});});}function aS(aU){var aV=c.hbpb.brs,aX,w;if(!c.timers.pb.done){c.timers.pb.ts=Date.now()-c.timers.pb.ts;c.timers.pb.done=true;}function aW(aZ,aY){return aY&&aY.cpm>aZ.cpm?aY:aZ;}for(var aT in aU){w=undefined;if(aU.hasOwnProperty(aT)){aX=aU[aT].bids;aX.forEach(function(aY){if(aY.statusMessage==="Bid available"){w=aW(aY,w);}});if(w){aV[w.adUnitCode]=w;}}}c.hbpb.responded=true;}function aR(){var w=c.hbpb.pconf,aT=c.slots,aU=[];aT.forEach(function(aX){var aW,aV=aj(aX);if(aV.length){aW={code:aX.getSlotElementId(),sizes:aI(aX.getSizes()),bids:aV};aU.push(aW);}});return aU;}function aj(a0){var aZ=c.hbpb.pconf.bds,aX=window.location.hostname,a2,aW,a1,aY,aT,aV=[];aX=aX.replace("www.","");function w(a4){var a3=[];a4.forEach(function(a5){a3.push(a5.l+"x"+a5.j);});return a3;}for(bidder in aZ){if(aZ.hasOwnProperty(bidder)){a2=aZ[bidder].cfg;if(H.DOMAIN_BIDDERS.indexOf(bidder)!=-1){if(a2[aX]){aV.push({bidder:bidder,params:a2[aX]});}}else{a1=w(a0.getSizes());for(var aU=0;aU<a1.length;aU++){aT=a2[a1[aU]];if(aT){aY={bidder:bidder,params:aT};aV.push(aY);break;}}}}}return aV;}function aI(aT){var w=[];aT.forEach(function(aU){w.push([aU.l,aU.j]);});return w;}function ay(){return(!c.hbpb.ignPconf&&c.hbpb.ls);}function R(){return af("localStorage");}function af(aT){try{var aV=window[aT],w="__storage_test__";aV.setItem(w,w);aV.removeItem(w);return true;}catch(aU){return aU instanceof DOMException&&(aU.code===22||aU.code===1014||aU.name==="QuotaExceededError"||aU.name==="NS_ERROR_DOM_QUOTA_REACHED")&&aV.length!==0;}}function ae(){var aT,w=r("cxSegmentos");if(!aJ.dmps){aJ.dmps={};aT=aJ.dmps;}if(window.NVG_QRY&&(!aT.nvg)){aT.nvg=s(window.NVG_QRY);}if(window._ttprofiles&&(!aT.ttg)){aT.ttg=av(window._ttprofiles);}if(w&&(!aT.cxs)){aT.cxs=o(w);}else{setTimeout(function(){var aV=window.CX_SEGMENTS,aU;if(aV instanceof Array||Object.prototype.toString.apply(aV)==="[object Array]"){aU=new Date();aU.setDate(aU.getDate()+7);aC("cxSegmentos",aV.join("|"),"/",aU);}},5000);}if(window.bk_results&&(!aT.bki)){aT.bki=J(window.bk_results);}return aT;}function s(w){var aT;for(aT in w){if(w[aT].indexOf(",")!==-1){w[aT]=w[aT].split(",");}}return w;}function av(aU){var w,aV={},aT=["Age","Gender","Team","Subjects","Profiles","SocialClass","Equipment","CustomAudience","Microsegments"];for(w=aT.length-1;w>=0;w--){i(aU,aT[w],aV);}return aV;}function i(aT,w,aV){var aU=aT["get"+w];if(!aU){return;}if(aU==="na"||aU===""){return;}if(typeof(aU)==="object"&&aU.length&&aU[0]==="na"){return;}aV[w.toLowerCase()]=aU;}function o(w){if(w&&typeof(w)==="string"){return{"segments":w.split("|")};}else{return{};}}function J(aV){var w,aU,aT=[];if(aV){aU=aV.campaigns;for(w=0;w<aU.length;w++){aT.push(aU[w].campaign);}return{"campaigns":aT};}else{return{};}}function f(aY){var w,aV,aX="",aW,aT,aU;for(w in aY){if(aY.hasOwnProperty(w)){for(aV in aY[w]){if(aY[w].hasOwnProperty(aV)){aW=aY[w][aV];aT=[];if("object"===typeof aW){for(aU=0;aU<aW.length;aU++){aT.push(escape(aW[aU]));}}else{aT.push(escape(aW));}aX+="&d_"+w+"_"+aV+"="+aT.join("|");}}}}return aX;}function T(){var w=F.querySelector("script#hbepl");if(w){return w.dataset;}}function y(){var w=T();aJ.ext=false;aJ.isV=k()+"://"+w.isv;aJ.sV=k()+"://"+w.sv+"/";c.sV=aJ.sV;aJ.cI=w.ci;aJ.tdm=w.testdomain;aJ.eIs=[];aJ.eIsbn={};aJ.spbn={};aJ.useDivName=w.usedivname?true:false;aJ.tout=w.timeout?parseInt(w.timeout,10):2500;aJ.gtout=w.gtimeout?parseInt(w.gtimeout,10):300;aJ.ma=w.ma?parseInt(w.ma,10):false;aJ.disableInitialLoad=w.disableinitialload?true:false;if(w.be){try{aJ.be=JSON.parse(w.be.replace(/'/g,'"'));}catch(aT){}}aJ.tip=[];Object.keys(w).filter(function(aU){return aU.indexOf("tip")===0;}).forEach(function(aU){aJ.tip.push(w[aU]);});}function k(){return(F.location.protocol==="https:")?"https":"http";}function aA(w){return Object.keys(w).map(function(aT){var aU=w[aT].map(function(aV){return escape(aV);});return escape(aT)+":"+aU.join(",");}).join(";");}function K(){return F.charset||F.characterSet;}function L(w){return w.n;}function aM(aV){var aX=L(aV),aU=0,w=0,aT;try{aU=window.localStorage.getItem(H.storageRenderPrefix+aX)||0;w=window.localStorage.getItem(H.storageViewPrefix+aX)||0;}catch(aW){}aT=aU>0?(w/aU):0;return{render:window.parseInt(aU,10),ratio:window.parseInt((aT*10)+0.5,10)};}function N(aW,a2){var aU,aV,a1,w=aW?S(aW):null,a0=aJ,aZ=aW?a0.eIsbn[aW]:a0.eIs.join("+"),aX="rnd="+j()+"&e="+aZ+"&fv="+p()+ak()+e()+"&cb=hbepl.rH";aX+=ac()+n();aU=a0.sV+"hb/1/"+a0.cI+"/"+a0.dfpI+"/"+(a0.tdm?a0.tdm:a0.dom)+"/"+a0.sec+"?"+aX+a0.dmpsQueryStr;if(typeof(tid_epl)!=="undefined"&&tid_epl!==null){aU+="&tid="+tid_epl;}if(a2){aU+="&dc="+a2;}if(ay()){aU+="&facmd5="+P();}if(aw()){aU+="&in=1";}aU+="&srvtarg="+aA(c.targetings);if(aW){aU+="&sltarg="+aA(w.targkeys);}else{var aY=a0.eIshb.map(function(a3){return aA(a3.targkeys)||"~";}).reverse();aU+="&sltarg="+aY.join("!");}var aT=K();if(aT){aU+="&crs="+aT;}if(aW){a1=aM(w);aV=(a1.render>=4?a1.ratio.toString(16):"F");}else{aV=a0.eIshb.map(function(a3){var a4=aM(a3);return(a4.render>=4?a4.ratio.toString(16):"F");}).reverse().join("");}aU+="&vs="+aV;if(!c.timers.epl.done){c.timers.epl.ts=Date.now();}h(aU);}function h(aT){var w=F.createElement("script");w.async="async";w.src=aT;F.body.appendChild(w);}function aO(aT){var w=F.createElement("img");w.style.display="none";w.src=aT;F.body.appendChild(w);}function j(){if(!b){b=Math.random();}return b;}function p(){var a4=0,aX=navigator.mimeTypes,a2="application/x-shockwave-flash",w=(aX&&aX[a2])?aX[a2].enabledPlugin:0,aT=navigator.userAgent.toLowerCase(),aU=navigator.appVersion.toLowerCase(),aZ,aV,a1,a0,aW,aY;if(w){aV=navigator.plugins;a1="Shockwave Flash";if(aV[a1]){aZ=aV[a1].description;}}else{if(aT&&aT.indexOf("msie")>=0&&(aU.indexOf("win")!==-1)){try{a0=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");a0.AllowScriptAccess="always";aZ=a0.GetVariable("$version");}catch(a3){}}}if(aZ){aW=aZ.split(" ");for(aY=0;aY<aW.length;++aY){if(isNaN(parseInt(aW[aY],10))){continue;}a4=aW[aY];}}return a4;}function ak(){return"&ur="+escape(u());}function e(){var w=aa(),aT=u();if(w&&!aw(w,aT)){return"&fr="+escape(w);}return"";}function aa(){return(F.referrer&&!Y())?F.referrer:false;}function aw(w,aT){w=w||aa();aT=aT||u();return w&&ag(w)===ag(aT);}function u(){if(aJ.tdm){return"http://"+aJ.tdm;}return(Y()&&F.referrer)?F.referrer:F.location.href;}function Y(){return(F.location.href.indexOf(".e-planning.net")!==-1);}function ag(w){var aT=w.match(/^https?\:\/\/(?:www\.)?([^\/:?#]+)(?:[\/:?#]|$)/i);return(aT&&aT[1])?aT[1]:"";}function g(aU){var aW=c.slots,w=aW.length,aX,aV,aT=0;aF++;for(aV=0;aV<w;aV++){aX=null;aX=ab(aW[aV].getSlotElementId());if(aX){az(aW[aV]);aT++;}}if(aT===w||aF>aU){t();for(aV=0;aV<w;aV++){an(aW[aV].getSlotElementId());}}else{if(aF<=aU){setTimeout(function(){g(aU);},50);}}}function x(){if(googletag.pubadsReady){setTimeout(function(){c.slots=typeof googletag.getSlots==="function"?googletag.getSlots():googletag.pubads().getSlots();if(aJ.be&&aJ.be.length){c.slots=c.slots.filter(function(aU){var aT=aJ.be;for(var w=0;w<aT.length;w++){if(aU.getName()===aT[w]){return false;}}return true;});}if(aJ.ma){c.slots=c.slots.slice(0,aJ.ma);}ai();g(Math.floor(aJ.tout/50));},aJ.gtout);}else{setTimeout(function(){x();},100);}}function a(){if(M.googletag){x();}else{setTimeout(function(){a();},100);}}function E(){return d&&v();}function ad(){var aT=googletag.pubads();var aU=aT.getTargetingKeys();var w={};aU.forEach(function(aV){w[aV]=aT.getTargeting(aV);});return w;}function ai(){var aV,aX=c.slots,aY,aU,aT,aW;for(aV=0;aV<aX.length;aV++){aY=aX[aV];aU=aY.getSizes()[0];if(aU){if(aU==="fluid"){aT=1;aW=1;}else{aT=aU.getWidth();aW=aU.getHeight();}}at(aY.getName(),(aT&&aW)?[aT,aW]:"",aY.getSlotElementId(),aY.getTargetingMap(),aV,aY);}}function az(aU){var w=aU.getSlotElementId(),aT=ab(w);if(aT){aT.style.visibility="hidden";if(c.h.indexOf(w)===-1){c.h.push(w);}}}function an(w){var aT=function(aU){if(c.r&&c.eplAds[aU]){if(!E()){Q(aU);}}else{setTimeout(function(){aT(aU);},150);}};aT(w);return 1;}function aQ(a3,a6){var aU,a0,aT,aW,aX,a2,a1=31,aY=15,aZ="http://www.e-planning.net",a5,aV,w=a6.crid||c.eplAds[a3].crid,a4=a6.div;aX="data:image/bmp;base64,Qk0GAwAAAAAAADYAAAAoAAAADwAAAA8AAAABABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////////////////////////////////////////AAAA////////////////////////////////+fb/qGX/kU//kU//lVX/3sz/////AAAA////////////////////////////////oE7/ghP/gBH/ZAH/vJX//f3+////AAAA////////////////////////////wHDyoy7/oy7/oy7/3bP/////////////AAAA////////////////////////wnX1qz/urUbfoy//2Kb/////////////////AAAA//////78//78//78//78+fH9qTzzqz/ur0fdt1ji////////////////////AAAA//3z//e3/+o7/+o7/9dI/9xr+PH+qz/uslDgt1bnuFvm////////////////AAAA//////////ay/9dH/9VJ/9VJ/+B/9un9wWnxwWnxwWnxy3v4////////////AAAA/////////////+Ov/8BJ/8BJ/7dC/853+vX9xG31ynj41In/1I3+////////AAAA/////////////////+i8/7dC/7Q+/7xE/8Zk/Pv9+vL++vL++vL++e//////AAAA////////////////+bZs/KZA/7Q+/7xE/+e/////////////////////////AAAA////////////+bdu+KA/+KA//6lA/+S0////////////////////////////AAAA////////34hH3n8y44Q044Q09dW6////////////////////////////////AAAA/v794phe2Xct2Xct3n4x9ta7////////////////////////////////////AAAA////////////////////////////////////////////////////////////AAAA";a2="data:image/bmp;base64,Qk0GAwAAAAAAADYAAAAoAAAADwAAAA8AAAABABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8/Pz////////////////////////////////////////////////////+/v7AAAA/////f39////////////////////////////////////////////9vb2////AAAA/////////f39/v7+/////////////////////////////v7+////////////AAAA/////////f396Lc66Lc6////////////////////6Lc66Lc6/Pz8////////AAAA////////////6Lc66Lc66Lc6////////////6Lc66Lc66Lc6////////////AAAA////////////////6Lc66Lc66Lc6////6Lc66Lc66Lc6////////////////AAAA////////////////////6Lc66Lc66Lc66Lc66Lc6////////////////////AAAA////////////////////////6Lc66Lc66Lc6////////////////////////AAAA////////////////////6Lc66Lc66Lc66Lc66Lc6////////////////////AAAA////////////////6Lc66Lc66Lc6////6Lc66Lc66Lc6////////////////AAAA////////////6Lc66Lc66Lc6////////////6Lc66Lc66Lc6////////////AAAA/////////v7+6Lc66Lc6////////////////////6Lc66Lc6/f39////////AAAA/////////v7+9/f3////////////////////////////+Pj4////////////AAAA////////////////////////////////////////////////////8/Pz////AAAA/v7+/////////////////////////////////////////////////////f39AAAA";IMG_CROSS_HOVER="data:image/bmp;base64,Qk0GAwAAAAAAADYAAAAoAAAADwAAAA8AAAABABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8/Pz////////////////////////////////////////////////////+/v7AAAA/////f39////////////////////////////////////////////9vb2////AAAA/////////f39/v7+/////////////////////////////v7+////////////AAAA/////////f39dBrrdBrr////////////////////dBrrdBrr/Pz8////////AAAA////////////dBrrdBrrdBrr////////////dBrrdBrrdBrr////////////AAAA////////////////dBrrdBrrdBrr////dBrrdBrrdBrr////////////////AAAA////////////////////dBrrdBrrdBrrdBrrdBrr////////////////////AAAA////////////////////////dBrrdBrrdBrr////////////////////////AAAA////////////////////dBrrdBrrdBrrdBrrdBrr////////////////////AAAA////////////////dBrrdBrrdBrr////dBrrdBrrdBrr////////////////AAAA////////////dBrrdBrrdBrr////////////dBrrdBrrdBrr////////////AAAA/////////v7+dBrrdBrr////////////////////dBrrdBrr/f39////////AAAA/////////v7+9/f3////////////////////////////+Pj4////////////AAAA////////////////////////////////////////////////////8/Pz////AAAA/v7+/////////////////////////////////////////////////////f39AAAA";aT=F.createElement("div");aT.id="epl_logo_div_"+a3;aV=aT.style;aV.zIndex="2147483647";aV.position="absolute";aV.overflow="hidden";aV.width="100%";aV.height=aY+"px";aV.marginTop="0px";aV.right=0;aV.display="table";aU=F.createElement("img");aU.id="epl_logo_"+a3;aU.src=aX;aV=aU.style;aV.position="absolute";aV.cursor="pointer";aV.display="table-cell";aV.right="15px";a0=F.createElement("img");a0.id="epl_close_"+a3;a0.src=a2;aV=a0.style;aV.position="absolute";aV.display="table-cell";aV.cursor="pointer";aV.right="0px";a5=F.createElement("div");a5.textContent="Ad: "+w;aV=a5.style;aV.width="0px";aV.height=aY+"px";aV.background="black";aV.color="white";aV.opacity="0.8";aV.textAlign="center";aV.display="table-cell";aV.verticalAlign="middle";aV.fontSize="12px";aV.fontFamily="monospace";aV.visibility="hidden";a0.onclick=function(){var a7=a6.t===166?F.querySelector("iframe#eploutstream-"+a6.name):F.getElementById(a3);a7.parentNode.removeChild(a7);};a0.onmouseover=function(){var a7;a7=aW.getElementById("epl_close_"+a3);if(a7){a7.src=IMG_CROSS_HOVER;}};a0.onmouseout=function(){var a7;a7=aW.getElementById("epl_close_"+a3);if(a7){a7.src=a2;}};aU.onclick=(function(){var a7=false;return function(){var a8;if(aJ.hxl){aU.style.cursor="default";}else{if(a7){M.open(aZ);return;}}aV.visibility="";a5.style.width=(aT.clientWidth-a1)+"px";a7=true;};})();aT.appendChild(a5);aT.appendChild(aU);aT.appendChild(a0);aW=(a6.t===166?F.querySelector("iframe#eploutstream-"+a6.name):a4.querySelector("iframe")).contentWindow.document;aW.body.insertBefore(aT,aW.body.firstChild);}function l(aT){var aU=C[aT.t].h,w=F.createElement("script");w.src=aJ.isV+"/layers/v4_"+aU+".js";w.type="text/javascript";aT.div.appendChild(w);}G={data:{},findObjPos:function(aT){var aZ=0,aU=0,aW=F.querySelector('div[id="'+aT.id+'"]'),aV,w,aY=0,aX=this.findCurrentLeftTop();if(aW&&aW.offsetParent&&aW.offsetParent!==F.querySelector("body")){do{aZ+=aW.offsetLeft;aU+=aW.offsetTop;w=window.getComputedStyle(aW);if(w&&w.position&&w.position==="fixed"){aZ+=aX[0];aU+=aX[1];aY=1;}aW=aW.offsetParent;}while(aW);}else{if(aW){aV=aW.getBoundingClientRect();aZ=window.parseInt((aV.x||aV.left)+aX[0],10);aU=window.parseInt((aV.y||aV.top)+aX[1],10);}}return[aZ,aU];},findCurrentLeftTop:function(){var w=(F.documentElement||F.body);if(F.documentElement&&F.body){return[F.documentElement.scrollLeft||F.body.scrollLeft,F.documentElement.scrollTop||F.body.scrollTop];}else{return[w.scrollLeft,w.scrollTop];}},getVisibleRatio:function(aZ,w){var aY,aU,aX,aT,a0,aV,aW;aY=(aZ.x1<w.x1)?w.x1:(aZ.x1>w.x2)?w.x2:aZ.x1;aU=(aZ.y1<w.y1)?w.y1:(aZ.y1>w.y2)?w.y2:aZ.y1;aX=(aZ.x2<w.x1)?w.x1:(aZ.x2>w.x2)?w.x2:aZ.x2;aT=(aZ.y2<w.y1)?w.y1:(aZ.y2>w.y2)?w.y2:aZ.y2;a0=(aZ.x2-aZ.x1)*(aZ.y2-aZ.y1);aV=(aX-aY)*(aT-aU);aW=(a0>0)?(aV/a0):0;return aW;},isSpaceVisible:function(w){return(w&&w.style.opacity!==0&&w.style.visibility!=="hidden"&&w.style.display!=="none");},checkVisibility:function(aT,aY,a3,aX,aU){var aV=this.findCurrentLeftTop(),a0=this,a1=this.findObjPos(aT),a4,aW,a2,aZ;aY=aT.clientHeight||30;a3=aT.clientWidth||30;a4={x1:a1[0],y1:a1[1],x2:a1[0]+a3,y2:a1[1]+aY};aW={x1:aV[0],y1:aV[1],x2:aV[0]+this.getSW(),y2:aV[1]+this.getSH()};a2=this.getVisibleRatio(a4,aW);this.data["viINTs"+aU]=(a2>=H.VI_MINIMO_RATIO_VISIBLE&&this.isSpaceVisible(aT))?(this.data["viINTs"+aU]+1):0;if(this.data["viINTs"+aU]<H.VI_INTERVALOS_CHEQUEO){aZ=function(){a0.checkVisibility(aT,aY,a3,aX,aU);};this.data["viTO"+aU]=setTimeout(aZ,H.VI_MINIMOS_MILISEGUNDOS_VISIBLES/H.VI_INTERVALOS_CHEQUEO);}else{this.registerView(aX);}},getSW:function(){return(F.body.clientWidth||800);},getSH:function(){if(window.innerHeight||(F.documentElement&&F.documentElement.clientHeight)){return F.documentElement.clientHeight;}return(F.body.clientHeight||600);},visibilityHandler:function(aX){var aY,aW=this,aU=Math.random(),aZ=aX.div,aV=aX.h,aT=aX.w;if(R()&&this.registerRender(aX)){aY=function(){if(aZ){aW.checkVisibility(aZ,aV,aT,aX,aU);}};this.data["viINTs"+aU]=0;this.data["viTO"+aU]=setTimeout(aY,H.VI_MINIMOS_MILISEGUNDOS_VISIBLES/H.VI_INTERVALOS_CHEQUEO);}},registerRender:function(aV){var aU,aT=H.storageRenderPrefix+aV.name;try{aU=window.localStorage.getItem(aT);window.localStorage.setItem(aT,aU?window.parseInt(aU,10)+1:1);}catch(w){return false;}return true;},registerView:function(aV){var aU,aT=H.storageViewPrefix+aV.name;try{aU=window.localStorage.getItem(aT);window.localStorage.setItem(aT,aU?window.parseInt(aU,10)+1:1);}catch(w){return false;}return true;}};function Q(aY){var a1,a0=c.eplAds[aY],aW=F.createElement("iframe"),aV=D(a0),w=al(a0,aY),aX,aU,aZ,aT=C[a0.t]&&C[a0.t].h;if(aJ.tip){aJ.tip.forEach(function(a2){aO(a2);});}if(aT){c.hqs[aT]=c.hqs[aT]||[];c.hqs[aT].push(a0);if(c.helpers[aT]){c.showByType(aT);}else{l(a0);}return;}I(aW,a0,aV);aX=am(aY);a1=F.querySelector('div[id="eplAdDiv'+aX+'"]');if(!a1){a1=F.createElement("div");a1.id="eplAdDiv"+aX;a0.dfpDiv.innerHTML="";a0.dfpDiv.appendChild(a1);a0.div=a1;}a1.appendChild(aW);aZ=ab(aY);if(aZ&&aZ.style&&aZ.style.display==="none"){aZ.style.display="";}aU=function(a2,a6,a4){var a7,a3=c.window||window,a5=(a3&&a3.frames)?a3.frames[a2.id]:null;aW.sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts";if(a6.adm){if(a6.w===1&&a6.h===1){a6.adm="<script>var inIframe = inDapIF = inDapMgrIf = true;<\/script>"+a6.adm;}a7=a2.contentDocument||a2.contentWindow||a2.document||a2.window;if(a5&&!a7){a7=a5.contentDocument||a5.contentWindow||a5.document||a5.window;}if(a7.document){a7=a7.document;}a7.write(a6.adm);a7.close();if(!aJ.hxl){aQ(aY,a6);}}else{a2.src=a4+"&fr=do";}a1.parentElement.style.visibility="";G.visibilityHandler(a6);};setTimeout(aU(aW,a0,w),200);}function D(w){return((new Date()).getTime()*Math.random()).toString(16);}function al(aW,aT){var aU,aV=aJ,w=c.debs[aT]||aV.sV;aU=w+"eat/5/"+c.eSi+"/"+aV.sec+"/"+am(aT)+"?o=f"+"&rnd="+j()+"&pb="+aW.id+"&i="+aW.i+"&fi="+aW.fi+"&eip="+aW.ip+"&bk="+aW.bk+ak();return aU;}function I(w,aT,aU){w.src="about:blank";w.id="ifr"+aT.id+"_"+aU;w.name="ifr"+aT.id+"_"+aU;if(aT.w&&aT.h){w.width=aT.w+"px";w.height=aT.h+"px";}else{w.width="0px";w.height="0px";}w.frameBorder="0";w.marginwidth="0px";w.marginheight="0px";w.scrolling="no";}function ac(){return"&ts="+Math.floor((new Date()).getTime()/1000);}function n(){return"&tz="+(new Date()).getTimezoneOffset()/-60;}function aH(w){return w.replace(/^\s+|\s+$/gm,"");}function r(w){var aV=F.cookie.split(";"),aU,aT;for(aU=0;aU<aV.length;aU++){aT=aV[aU].split("=");if(w===aH(aT[0])){return aT[1];}}return null;}function aC(w,aW,aU,aV){var aT;aT=w+"="+escape(aW);if(aV){aT+="; expires="+aV.toUTCString();}if(aU){aT+="; path="+aU;}F.cookie=aT;}function aq(){q();if(v()){aD();}}function q(){var aU=c.h,aV,aT,w;for(aT=aU.length-1;aT>=0;aT--){w=aU[aT];if(!c.e[w]){aV=F.getElementById(aU[aT]);if(aV&&aV.style.visibility==="hidden"){aV.style.visibility="";}}}}function ap(){y();a();}function aL(){if(c.r){q();}else{setTimeout(aL,150);}}function au(){var w=60000;if(c.pagePermanence){return;}c.pagePermanence=setInterval(function(){h(aJ.sV+"/mtr/1/");},w);}if(!Date.now){Date.now=function(){return new Date().getTime();};}ap();F.addEventListener("DOMContentLoaded",aL);})();