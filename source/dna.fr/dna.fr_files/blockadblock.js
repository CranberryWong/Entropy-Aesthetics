(function(n){var t=function(t){this._options={checkOnLoad:!1,resetOnEnd:!1,loopCheckTime:50,loopMaxNumber:5,baitClass:"pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",baitStyle:"width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",debug:!1};this._var={version:"3.2.0",bait:null,checking:!1,loop:null,loopNumber:0,event:{detected:[],notDetected:[]}};t!==undefined&&this.setOption(t);var i=this,r=function(){setTimeout(function(){i._options.checkOnLoad===!0&&(i._options.debug===!0&&i._log("onload->eventCallback","A check loading is launched"),i._var.bait===null&&i._creatBait(),setTimeout(function(){i.check()},1))},1)};n.addEventListener!==undefined?n.addEventListener("load",r,!1):n.attachEvent("onload",r)};t.prototype._options=null;t.prototype._var=null;t.prototype._bait=null;t.prototype._log=function(n,t){console.log("[BlockAdBlock]["+n+"] "+t)};t.prototype.setOption=function(n,t){var r,i;t!==undefined&&(r=n,n={},n[r]=t);for(i in n)this._options[i]=n[i],this._options.debug===!0&&this._log("setOption",'The option "'+i+'" he was assigned to "'+n[i]+'"');return this};t.prototype._creatBait=function(){var t=document.createElement("div");t.setAttribute("class",this._options.baitClass);t.setAttribute("style",this._options.baitStyle);this._var.bait=n.document.body.appendChild(t);this._var.bait.offsetParent;this._var.bait.offsetHeight;this._var.bait.offsetLeft;this._var.bait.offsetTop;this._var.bait.offsetWidth;this._var.bait.clientHeight;this._var.bait.clientWidth;this._options.debug===!0&&this._log("_creatBait","Bait has been created")};t.prototype._destroyBait=function(){n.document.body.removeChild(this._var.bait);this._var.bait=null;this._options.debug===!0&&this._log("_destroyBait","Bait has been removed")};t.prototype.check=function(n){if(n===undefined&&(n=!0),this._options.debug===!0&&this._log("check","An audit was requested "+(n===!0?"with a":"without")+" loop"),this._var.checking===!0)return this._options.debug===!0&&this._log("check","A check was canceled because there is already an ongoing"),!1;this._var.checking=!0;this._var.bait===null&&this._creatBait();var t=this;return this._var.loopNumber=0,n===!0&&(this._var.loop=setInterval(function(){t._checkBait(n)},this._options.loopCheckTime)),setTimeout(function(){t._checkBait(n)},1),this._options.debug===!0&&this._log("check","A check is in progress ..."),!0};t.prototype._checkBait=function(t){var i=!1,r;this._var.bait===null&&this._creatBait();(n.document.body.getAttribute("abp")!==null||this._var.bait.offsetParent===null||this._var.bait.offsetHeight==0||this._var.bait.offsetLeft==0||this._var.bait.offsetTop==0||this._var.bait.offsetWidth==0||this._var.bait.clientHeight==0||this._var.bait.clientWidth==0)&&(i=!0);n.getComputedStyle!==undefined&&(r=n.getComputedStyle(this._var.bait,null),(r.getPropertyValue("display")=="none"||r.getPropertyValue("visibility")=="hidden")&&(i=!0));this._options.debug===!0&&this._log("_checkBait","A check ("+(this._var.loopNumber+1)+"/"+this._options.loopMaxNumber+" ~"+(1+this._var.loopNumber*this._options.loopCheckTime)+"ms) was conducted and detection is "+(i===!0?"positive":"negative"));t===!0&&(this._var.loopNumber++,this._var.loopNumber>=this._options.loopMaxNumber&&this._stopLoop());i===!0?(this._stopLoop(),this._destroyBait(),this.emitEvent(!0),t===!0&&(this._var.checking=!1)):(this._var.loop===null||t===!1)&&(this._destroyBait(),this.emitEvent(!1),t===!0&&(this._var.checking=!1))};t.prototype._stopLoop=function(){clearInterval(this._var.loop);this._var.loop=null;this._var.loopNumber=0;this._options.debug===!0&&this._log("_stopLoop","A loop has been stopped")};t.prototype.emitEvent=function(n){var t,i;this._options.debug===!0&&this._log("emitEvent","An event with a "+(n===!0?"positive":"negative")+" detection was called");t=this._var.event[n===!0?"detected":"notDetected"];for(i in t)this._options.debug===!0&&this._log("emitEvent","Call function "+(parseInt(i)+1)+"/"+t.length),t.hasOwnProperty(i)&&t[i]();return this._options.resetOnEnd===!0&&this.clearEvent(),this};t.prototype.clearEvent=function(){this._var.event.detected=[];this._var.event.notDetected=[];this._options.debug===!0&&this._log("clearEvent","The event list has been cleared")};t.prototype.on=function(n,t){return this._var.event[n===!0?"detected":"notDetected"].push(t),this._options.debug===!0&&this._log("on",'A type of event "'+(n===!0?"detected":"notDetected")+'" was added'),this};t.prototype.onDetected=function(n){return this.on(!0,n)};t.prototype.onNotDetected=function(n){return this.on(!1,n)};n.BlockAdBlock=t;n.blockAdBlock===undefined&&(n.blockAdBlock=new t({checkOnLoad:!0,resetOnEnd:!0}))})(window)