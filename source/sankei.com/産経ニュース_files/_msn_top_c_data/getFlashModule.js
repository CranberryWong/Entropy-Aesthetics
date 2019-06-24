/*! Copyright (c) 2009 SANKEI DIGITAL INC. All rights reserved.
 *  name: スポーツCMS　フロント側コンテンツ生成　対応ライブラリ
 *  Date: 2018.03.14
 *  version: 2.0.0
 *  license: 著作権者の許可なく、改変・複製・商用利用・再配布等の行為を禁じる。
 *  note: JQuery1.7+に依存する
*/
!function(e){function t(e,t){return(null==t[e]||"object"!=typeof t[e]||"object"==typeof t[e]&&"length"in t[e])&&(t[e]={}),t[e]}var s=t("scms",e);t("$scms",e),$.each({control:["flash"],model:["flash"],view:["flash"],config:null,util:["view","request","data"]},function(e,a){var r=t(e,s);a&&$.each(a,function(e,s){t(s,r)})})}(window),scms.VERSION="2.0.0",scms.config.location={domain:"www.sankei.com",rootDir:{xml:"/parts/board/config",json:""}},scms.config.file={xml:{board:"/board.xml",soccer:"/soccer.xml",soccer_japan:"/soccer_japan.xml",soccer_jleague:"/soccer_jleague.xml",soccer_international:"/soccer_international.xml",soccer_other:"/soccer_other.xml",soccer_italy:"/soccer_italy.xml",soccer_england:"/soccer_england.xml",soccer_germany:"/soccer_germany.xml",soccer_spain:"/soccer_spain.xml",soccer_france:"/soccer_france.xml",baseball:"/baseball.xml",baseball_pro:"/baseball_pro.xml",baseball_highschool:"/baseball_highschool.xml",baseball_university:"/baseball_university.xml",baseball_mlb:"/baseball_mlb.xml",baseball_wbc:"/baseball_wbc.xml",rugby:"/rugby.xml",rugby_japan:"/rugby_japan.xml",rugby_topleague:"/rugby_topleague.xml",rugby_university:"/rugby_university.xml",rugby_highschool:"/rugby_highschool.xml",rugby_other:"/rugby_other.xml",sumo:"/sumo.xml"},json:{sc_jp:"/soccer/board/japan.json",sc_jl:"/soccer/board/jleague.json",sc_in:"/soccer/board/international.json",sc_eu:"/soccer/europe/board/international.json",sc_oh:"/soccer/board/other.json",sc_it:"/soccer/europe/board/italy.json",sc_eg:"/soccer/europe/board/england.json",sc_gm:"/soccer/europe/board/germany.json",sc_sp:"/soccer/europe/board/spain.json",sc_fr:"/soccer/europe/board/france.json",sc_j1:"/soccer/board/j1.json",sc_j2:"/soccer/board/j2.json",sc_j3:"/soccer/board/j3.json",sc_jn:"/soccer/board/jn.json",bb_pro:"/baseball/ikkyu/board/pro.json",bb_hs:"/parts/board/baseball/highschool.json",bb_uv:"/parts/board/baseball/university.json",bb_mlb:"/mlb/board/mlb.json",bb_wbc:"/parts/board/baseball/wbc.json",rb_jp:"/parts/board/rugby/japan.json",rb_tl:"/parts/board/rugby/topleague.json",rb_uv:"/parts/board/rugby/university.json",rb_hs:"/parts/board/rugby/highschool.json",rb_oh:"/parts/board/rugby/other.json",smo:"/parts/board/sumo/sumo.json"}},scms.config.dom={prefix:"scms",games:0,flag:{small:{path:"/sanspo/common/css/20120301/images/flag/12/",prefix:"12_",ext:"gif"},large:{path:"/sanspo/common/css/20120301/images/flag/20/",prefix:"20_",ext:"gif"}},area:{box:"ScoreBoardSection",board:"SidebarScoreBoardSection"}},scms.config.condition={refresh:12e4,category:{genre:null,subgenre:null}},scms.config.file.limit=scms.config.dom.games,function(e){var t,s,a=$("<div/>");e.cutLen=(t="…",s=!0,function(e,a,r,i){var c="";try{if("string"!==$.type(e)||e.length<=0)return e;if("number"!==$.type(a))return e;if(e.length<=a)return e;var n="boolean"===$.type(i)?i:s,l="string"===$.type(r)&&r.length>0?r:t;return n?(c=e.slice(0,a),l.length>0&&(c+=l)):(a*=-1,c=e.slice(a),l.length>0&&(c=l+c)),c}catch(t){return e}}),e.escHTML=function(e){try{return"string"!==$.type(e)||e.length<=0?e:a.text(e).html().replace(/"/g,"&quot;")}catch(t){return e}},e.unescHTML=function(e){try{return"string"!==$.type(e)||e.length<=0?e:a.html(e).text().replace(/&quot;/g,'"')}catch(t){return e}},e.quotS2D=function(e){return"string"!==$.type(e)?e:e.replace(/'/g,'"')},e.quotD2S=function(e){return"string"!==$.type(e)?e:e.replace(/"/g,"'")}}(scms.util.view),function(e){e.makeObject=function(e,t,s){return e||(e={}),t&&s&&(void 0===e[t]?e[t]=s:"object"==typeof e[t]&&e[t]instanceof Array?e[t].push(s):e[t]=[e[t],s]),e},e.urlEncode=function(e,t){return"array"==$.type(e)||"object"==$.type(e)?"":(null==t&&(t=e),encodeURIComponent(e)+"="+encodeURIComponent(t))},e.urlDecode=function(e){if("string"!==$.type(e)||e.length<=0)return[e];try{var t=e.split("=",2),s=[];return $.each(t,function(e,t){s.push(decodeURIComponent(t.replace(/\+/g,"%20")))}),s}catch(t){return[e]}}}(scms.util.data),function(e){var t=scms.util.data;function s(e,s,a){if(void 0!==a){var r=t.urlEncode(s,a);r.length>0&&e.push(r)}}e.createQString=function(e){if(!$.isPlainObject(e))return e;var t=[];return $.each(e,function(e,a){if("function"==$.type(a))return!0;"array"==$.type(a)?function(e,t,a){for(var r=a.length,i=0;i<r;++i)s(e,t,a[i])}(t,e,a):s(t,e,a)}),t.join("&")},e.parseQString=function(e){var s=null;if("string"==$.type(e)&&e.length>0){s={};var a,r,i=e.replace("?","").split("&");i.length;$.each(i,function(e,i){if(i.length<=0)return!0;1==(a=t.urlDecode(i)).length?r=i=a[0]:(r=a[0],i=a[1]),t.makeObject(s,r,i)})}return s}}(scms.util.request),function(e){var t="yes",s="delay",a=/^(\d+|all)$/;function r(e){var t,s;return t=e.attr("event"),a.test(t)||(t=null),s=e.attr("game"),a.test(s)||(s=null),t&&s?[t,s]:null}var i,c=function(){};c.record={add:function(e){this.resource[e]={url:scms.config.location.rootDir.json+scms.config.file.json[e],status:!1,data:{},events:0,games:0}},update:function(e,t){var s=this;$.each(t,function(t,a){s.resource[e][t]=a})},initialize:function(){$.each(this.resource,function(e,t){t.status=!1,t.data={},t.events=0,t.games=0})}},c.prototype={search:function(){var e=this.resource[this.currentCd].url;return"string"!==$.type(e)&&(e=""),e},status:function(e){return"boolean"===$.type(e)?this.resource[this.currentCd].status=e:this.resource[this.currentCd].status},get:function(e){return this.currentCd=e,this.resource[this.currentCd]?this.resource[this.currentCd].status?this.resource[this.currentCd]:this.send(this.search()):{}},summary:function(e){return{events:this.resource[this.currentCd].events,games:this.resource[this.currentCd].games}},send:(i={async:!1,dataType:"json",timeout:6e4},function(e){return e&&$.ajax(e,i).done(this.func.done).fail(this.func.fail).always(this.func.always),this.resource[this.currentCd]})};var n=function(){this.resource={},this.currentCd=null;var e=this;this.func={done:function(t,s){"success"==s&&(e.resource[e.currentCd].data=t)},fail:$.noop,always:function(){e.status(!0)}},this.sprp=c};n.prototype=new c;var l=function(){this.resource={},this.currentCd=null;var e=this;this.func={done:function(t,s){var a={};try{if("success"==s){a.meta={genre:t.genre,genre_sub:t.genre_sub,group:t.group},a.events=[],a.games=[];var r=0;$.each(t.events,function(e,t){a.events[e]={code:t.code,name:t.name,date:t.date,gref:{start:r,end:0},gcnt:t.games.length},$.each(t.games,function(t,s){a.games[r++]={code:s.code,date:s.date,status_code:s.status_code,status_disp:s.status_disp,url:s.url,teams:s.teams,eref:e}}),a.events[e].gref.end=r-1})}e.sprp.record.update.call(e,e.currentCd,{events:t.events.length,games:r}),e.resource[e.currentCd].data=a}catch(t){e.sprp.record.update.call(e,e.currentCd,{events:0,games:0}),e.resource[e.currentCd].data={}}},fail:$.noop,always:function(){e.status(!0)}},this.sprp=c};l.prototype=new c;var o=function(){this.process={},this.currentId=null,this.amount=0,this.count=0,this.status=!0};o.prototype.add=function(e){this.process[e]=!1,this.amount++},o.prototype.size=function(){return this.amount},o.prototype.initialize=function(){var e=this;$.each(this.process,function(t,s){e.process[t]=!1}),this.currentId=null,this.count=0,this.status=!1},o.prototype.current=function(e){return e&&("src"in e&&(this.currentId=e.src),"boolean"===$.type(e.status)&&(this.process[this.currentId]=e.status,this.status=e.status&&++this.count>=this.amount)),{src:this.currentId,status:this.process[this.currentId]}};var u=function(){this.process=[],this.currentId=0,this.amount=0,this.count=0,this.status=!0,this.indexNumber={eidx:0,gidx:0},this.seekNumber=0};(u.prototype=new function(){}).add=function(e,t,s){this.process.push({src:e,selects:t,scnt:s,status:!1}),this.amount++},u.prototype.size=function(){return this.amount},u.prototype.initialize=function(){var e=this;$.each(this.process,function(t,s){e.process[t][status]=!1}),this.index(0,0),this.currentId=this.count=this.seekNumber=0,this.status=!1},u.prototype.current=function(e){return e&&"boolean"===$.type(e.status)&&(this.process[this.currentId].status=e.status,e.status&&(this.index(0,0),this.seek(0),this.status=(this.currentId=++this.count)>=this.amount)),this.process[this.currentId]},u.prototype.seek=function(){if(!(arguments.length>0))return this.seekNumber;this.seekNumber=arguments[0]},u.prototype.index=function(){if(arguments.length>=2)this.indexNumber.eidx=arguments[0],this.indexNumber.gidx=arguments[1];else{if(!(arguments.length>0))return{eidx:this.indexNumber.eidx,gidx:this.indexNumber.gidx};this.indexNumber.gidx=arguments[0]}};var h=function(){this.status={load:!1,act:!1,refresh:!1},this.sprp=h};h.status={accessor:function(e,t){return"boolean"===$.type(t)?this.status[e]=t:this.status[e]}},h.prototype={load:function(e){this.sprp.status.accessor.call(this,"load",e)},refresh:function(e){this.sprp.status.accessor.call(this,"refresh",e)},act:function(e){this.sprp.status.accessor.call(this,"act",e)},loadReadyCheck:function(){return this.status.load||this.status.act||this.status.refresh?"no":t},refreshReadyCheck:function(){return this.status.load||this.status.refresh?"no":this.status.act?s:t},actReadyCheck:function(){return this.status.load||this.status.refresh?"no":this.status.act?s:t}};var d=function(){};d.prototype={request:function(e,t){this.prc.status||(e&&("src"in e&&this.prc.current({src:e.src}),this.req.limit=e.limit||scms.config.file.limit),this._self.view.funcBeforeRequest(),this.req.select.call(this),this._self.view.makeHtml(this._self.model.jsnParse(this.req.pool),t),this._self.view.funcAfterRequest(),this.req.pool=[],this.req.count=0)}};var f=function(){this.pool=[],this.limit=0};(f.prototype=new d).select=function(){var e=this.prc.current();if("undefined"!==$.type(e.status)&&!0!==e.status){var t=this.src.get(e.src).data;this.req.pool.push(t)}};var m=function(){this.pool=[],this.limit=scms.config.file.limit,this.count=0};(m.prototype=new d).select=function(){function e(e,t){t.push({code:e.code,name:e.name,date:e.date,games:[]})}function t(e,t){t.push({code:e.code,date:e.date,status_code:e.status_code,status_disp:e.status_disp,url:e.url,teams:e.teams})}return function(){var s,a=this.prc.current(),r=this.src.get(a.src);if($.isEmptyObject(r.data))this.prc.current({status:!0});else{var i={genre:(s=r.data.meta).genre,genre_sub:s.genre_sub,group:s.group,events:[]},c=this.req.limit<=0?0:this.req.limit-this.req.count;(function(s,a,r,i,c,n){try{var l=this.prc.seek();if("all"==r[l][0]){var o,u=this.prc.index(),h=n.games-u.gidx,d=a<=0?h:a<h?a:h;for(g=u.gidx,$=1;$<=d;g++,$++)o!==(b=n.data.games[g]).eref&&(e(n.data.events[b.eref],s.events),o=b.eref,p=s.events.length-1),t(b,s.events[p].games);this.req.count+=d,(v=g)<n.games?this.prc.index(v):this.prc.seek(++l)}else{var f=r[l][0]-1,m=n.data.events[f];if(m){e(m,s.events);var p=s.events.length-1;if("all"==r[l][1]){u=this.prc.index();var g,$,b,v,y=m.gref.start+u.gidx;for(h=m.gcnt-y,d=a<=0?h:a<h?a:h,g=y,$=1;$<=d;g++,$++)t(b=n.data.games[g],s.events[p].games);this.req.count+=d,(v=g-m.gref.start)<=m.gref.end?this.prc.index(c,v):this.prc.seek(++l)}else(b=n.data.games[r[l][1]-1])&&b.eref==f&&(t(b,s.events[p].games),this.req.count++),this.prc.seek(++l)}else this.prc.seek(++l)}l>=i?this.prc.current({status:!0}):this.req.limit?this.req.count<this.req.limit&&arguments.callee.call(this,s,a,r,i,c,n):arguments.callee.call(this,s,a,r,i,c,n)}catch(e){}}).call(this,i,c,a.selects,a.scnt,a.event,r),this.req.pool.push(i)}this.prc.status||(this.req.limit?this.req.count<this.req.limit&&arguments.callee.apply(this):arguments.callee.apply(this))}}();var p,g,b=function(e){var t={};return $.each(e,function(e,s){t[e]=s}),t};g={load:function(e,s){if(this.evt.loadReadyCheck()===t){this.evt.load(!0),this.req.request.call(this,e,s),this.evt.load(!1);var a=this;setInterval(function(){a._self.postMessage("refresh",s)},scms.config.condition.refresh)}},refresh:function(e,a){var r=this.evt.refreshReadyCheck();if(r===t)this.evt.refresh(!0),this.src.sprp.record.initialize.call(this.src),this.prc.initialize(),this.req.request.call(this,e,a),this.evt.refresh(!1);else if(r===s){var i=arguments.callee,c=this;setTimeout(function(){i.call(c,e,a)},100)}},act:function(e,a){var r=this.evt.actReadyCheck();if(r===t)this.evt.act(!0),this.req.request.call(this,e,a),this.evt.act(!1);else if(r===s){var i=arguments.callee,c=this;setTimeout(function(){i.call(c,e,a)},100)}}},(p=e).base=function(){},p.base.initialize={unitData:function(e){var t,s=this;try{e.find("data").each(function(){(t=$(this).attr("src"))&&(s.src.sprp.record.add.call(s.src,t),s.prc.add(t))}),s.prc.size()>0&&(s.prc.status=!1),s._self.map={},e.each(function(){var e=$(this),t=e.attr("cd");t&&(s._self.map[t]="",$("data",e).each(function(e){var a;if(a=$(this).attr("src"))return s._self.map[t]=a,!1}))}),s._self.defaultGenre=e.first().attr("cd")}catch(e){}},unitSelect:function(e){var t,s;try{var a,i=e.find("selectOnly"),c=this;i.size()>0?(t=r(i.eq(0)))&&"all"!=t[0]&&"all"!=t[1]&&(s=i.parent("data").attr("src"))&&(c.src.sprp.record.add.call(c.src,s),a=[[t[0],t[1]]],c.prc.add(s,a,1)):e.find("data").each(function(){var e=$(this);if(a=[],s=e.attr("src")){c.src.sprp.record.add.call(c.src,s),e.find("select").each(function(){var e=$(this);(t=r(e))&&a.push([t[0],t[1]])});var i=a.length;i>0&&c.prc.add(s,a,i)}}),c.prc.size()>0&&(c.prc.status=!1)}catch(e){}}},p.base.trigger=function(e,t,s,a){g[t].call(e,s,a)},p.base.prototype={postMessage:function(e,t){t||(t={}),t.cmd=e,this.exec(e,this.dataFilter(t),t)},dataFilter:function(e){return e}},e.box=function(t){var s="unitSelect",a={src:new l,prc:new u,req:new m,evt:new h,meta:b({unit:s,type:"box"}),_self:this};this.sprp=e.base,this.sprp.initialize[s].call(a,t),this.exec=function(e,t,s){this.sprp.trigger(a,e,t,s)}},e.box.prototype=new e.base,e.board=function(t){var s="unitData",a={src:new n,prc:new o,req:new f,evt:new h,meta:b({unit:s,type:"board"}),_self:this};this.sprp=e.base,this.activeSrc=null,this.sprp.initialize[s].call(a,t),this.exec=function(e,t,s){this.sprp.trigger(a,e,t,s)}},e.board.prototype=new e.base,e.board.prototype.dataFilter=function(e){var t={};return $.extend(t,e),t.src||(t.cd&&t.cd in this.map?t.src=this.map[t.cd]:this.activeSrc?t.src=this.activeSrc:scms.config.condition.category.genre in this.map?t.src=this.map[scms.config.condition.category.genre]:t.src=this.map[this.defaultGenre]),this.activeSrc=t.src,t}}(scms.control.flash),function(e){e.base=function(){},e.base.prototype={jsnParse:function(e,t){var s=this,a={dataLists:[]};try{$.each(e,function(e,r){var i,c;$(r.events).length&&$.each(r.events,function(e,n){if("unitData"===t)try{$.each(n.date,function(e,t){(i={}).games=[],$.each(n.games,function(t,a){n.date[e]===a.date&&(i.name=n.name,i.genre=r.genre,i.subGenre=r.genre_sub,c=s.getTeamsData(a),i.date=c.date,i.games.push(c))}),i.games.length&&a.dataLists.push(i)})}catch(e){}else"unitSelect"===t&&$.each(n.games,function(e,t){(i={}).games=[];try{i.name=n.name,i.genre=r.genre,i.subGenre=r.genre_sub,c=s.getTeamsData(t),i.date=c.date}catch(e){i.name="",i.genre="",i.subGenre="",c={},i.date=""}i.games.push(c),a.dataLists.push(i)})})})}catch(e){return!1}return a},getTeamsData:function(e){var t={};return $.each(e,function(e,s){"teams"===e?$.each(s,function(e,s){$.each(s,function(s,a){t["team"+(e+1)+s]=a})}):t[e]=s}),t}},e.board=function(e){},e.board.prototype={jsnParse:function(t){return(new e.base).jsnParse(t,"unitData")}},e.box=function(e){},e.box.prototype={jsnParse:function(t){return(new e.base).jsnParse(t,"unitSelect")}}}(scms.model.flash),function(e){function t(e){var t=$("#"+e);if(!$("#overlayLoading",t).length){var s=document.createElement("div");$(s).attr("id","overlayLoading"),t.append(s)}}function s(e,t){if(!t){var s=$("#"+e);$("#overlayLoading",s).length&&$("#overlayLoading",s).remove()}}function a(e,t,s){return $(".flag",e).each(function(){if($(this).text()){var e=document.createElement("img");s&&$.each($(s)[0],function(t,s){$(e).attr(t,s)}),$(e).attr("src",(a=$(this).text(),r=t,scms.config.dom.flag[r].path+scms.config.dom.flag[r].prefix+a+"."+scms.config.dom.flag[r].ext)),$("a",this).length?$("a",this).html(e):$(this).html(e)}var a,r}),e}e.base=function(){},e.base.prototype={xmlParse:function(e){var t={lists:[]};if(!e.length)return!1;try{if(!$.each(e,function(e,s){t.lists[e]={},t.lists[e].name=$(s).attr("name"),t.lists[e].cd=$(s).attr("cd"),t.lists[e].data=[],$("data",s).each(function(s,a){t.lists[e].data[s]={},t.lists[e].data[s].type=$(a).attr("type")||"",t.lists[e].data[s].name=$(a).attr("name")||"",t.lists[e].data[s].cd=$(a).attr("cd")||"",t.lists[e].data[s].src=$(a).attr("src")||"",t.lists[e].data[s].link=$(a).attr("link")||"#",t.lists[e].data[s].linkLabel=$(a).attr("linkLabel")||"",t.lists[e].data[s].selectType=$(a).find("selectOnly").length?"selectOnly":"select"})}))return!1}catch(e){return!1}return t}},e.board=function(){this.initialize.apply(this,arguments)},e.board.prototype={initialize:function(t){var s=new e.base;(this.modelBoard=s.xmlParse(t))&&(this.showRowNum=10,this.BoardPrefix="GameBoard_",this.selector={},this.selector.wrap="#SidebarScoreBoardSection",this.selector.title=this.selector.wrap+" .SideberTitle01 h2",this.selector.board="#GameBoard",this.selector.genre="#LocalNavigation",this.selector.genreAnc=this.selector.genre+" a",this.selector.data=this.selector.board+" .score",this.selector.subGenre=" .SubNavigation",this.selector.subGenreAnc=this.selector.subGenre+" li a",this.selector.allShow=" .all",this.selector.more=this.selector.board+" .more",this.selector.moreAnc=this.selector.more+" a",this.flagMakeHtml=!1)},template:{title:'<div class="SideberTitle01"><h2>{{if name}}「${name}」の{{/if}}試合速報・結果</h2></div>',boardBody:'<div id="GameBoard" class="ScoreBoard"></div>',genre:'<ul id="LocalNavigation" class="LocalNavigation">{{each lists}}<li><a href="#GameBoard_${cd}">${name}</a></li>{{/each}}</ul>',dataBody:'{{each lists}}<div id="GameBoard_${cd}" class="score"></div>{{/each}}',subGenre:'<ul class="SubNavigation">{{each data}}{{if src}}<li><a href="#${src}">{{if name}}${name}{{else}}${src}{{/if}}</a></li>{{/if}}{{/each}}</ul>',gameData:'{{if !dataLists[0]}}<table class="detail01"></table>{{else $item.getActiveGenre() !== "sumo"}}<table class="detail01">{{each dataLists}}<tr><th colspan="6">${name}（${$item.setCaption(date)}日）</th></tr>{{each games}}<tr class="{{if !(($index + 1) % 2)}}bg02{{else}}bg01{{/if}}">{{if $item.getActiveGenre() === "baseball"}}<td class="flag">{{if team2flag}}{{if team2url}}<a href="${team2url}">${team2flag}</a>{{else}}${team2flag}{{/if}}{{/if}}</td><td class="team">{{if team2url}}<a href="${team2url}">${team2name}</a>{{else}}${team2name}{{/if}}</td><td>{{if url}}<a href="${url}">{{if team2score === "" || team2score === "-"}}&nbsp;{{else}}${team2score}{{/if}} - {{if team1score === "" || team1score === "-"}}&nbsp;{{else}}${team1score}{{/if}}</a>{{else}}{{if team2score === "" || team2score === "-"}}&nbsp;{{else}}${team2score}{{/if}} - {{if team1score === "" || team1score === "-"}}&nbsp;{{else}}${team1score}{{/if}}{{/if}}</td><td class="team">{{if team1url}}<a href="${team1url}">${team1name}</a>{{else}}${team1name}{{/if}}</td><td class="flag">{{if team1flag}}{{if team1url}}<a href="${team1url}">${team1flag}</a>{{else}}${team1flag}{{/if}}{{/if}}</td>{{else}}<td class="team">{{if team1url}}<a href="${team1url}">${team1name}</a>{{else}}${team1name}{{/if}}</td><td class="flag">{{if team1flag}}{{if team1url}}<a href="${team1url}">${team1flag}</a>{{else}}${team1flag}{{/if}}{{/if}}</td><td>{{if url}}<a href="${url}">{{if team1score === "" || team1score === "-"}}&nbsp;{{else}}${team1score}{{/if}} - {{if team2score === "" || team2score === "-"}}&nbsp;{{else}}${team2score}{{/if}}</a>{{else}}{{if team1score === "" || team1score === "-"}}&nbsp;{{else}}${team1score}{{/if}} - {{if team2score === "" || team2score === "-"}}&nbsp;{{else}}${team2score}{{/if}}{{/if}}</td><td class="flag">{{if team2flag}}{{if team2url}}<a href="${team2url}">${team2flag}</a>{{else}}${team2flag}{{/if}}{{/if}}</td><td class="team">{{if team2url}}<a href="${team2url}">${team2name}</a>{{else}}${team2name}{{/if}}</td>{{/if}}<td class="status">${status_disp}</td></tr>{{/each}}{{/each}}</table>{{else $item.getActiveGenre() === "sumo"}}<table class="detail02">{{each dataLists}}<tr><th colspan="5">${name}（${$item.setCaption(date)}日）</th></tr>{{each games}}<tr class="{{if !(($index + 1) % 2)}}bg02{{else}}bg01{{/if}}"><td class="status">${team1score}</td><td class="name">{{if team1url}}<a href="${team1url}">${team1name}</a>{{else}}${team1name}{{/if}}</td><td>${status_disp}</td><td class="name">{{if team2url}}<a href="${team2url}">${team2name}</a>{{else}}${team2name}{{/if}}</td><td class="status">${team2score}</td></tr>{{/each}}{{/each}}</table>{{/if}}',all:'<div class="all"></div>',listLink:'{{if link !== "#"}}<p class="more">{{else}}<p class="more" style="display: none;">{{/if}}<a href="${link}">{{if linkLabel}}${linkLabel}{{else}}一覧へ{{/if}}</a></p>'},makeHtml:function(e,t){var s=this;if(s.flagMakeHtml=!0,t.cmd){var r,i=t.cmd,c=t.type;if(e.dataLists.length)"load"===i?($.each(s.modelBoard.lists,function(e,t){t.cd!==scms.config.condition.category.genre||(r=scms.config.condition.category.genre)}),r||(r=e.dataLists[0].genre||"")):"refresh"===i?r=s.getActiveData().cd:"act"===i&&(r=t.cd||e.dataLists[0].genre||"");else if("load"===i)r=scms.config.condition.category.genre||"";else if("refresh"===i?r=s.getActiveData().cd:"act"===i&&(r=t.cd||""),"refresh"===i||"act"===i&&"main"===c&&$(s.selector.subGenre,$("#"+s.BoardPrefix+r)).length||"act"===i&&"sub"===c)return void s.clearGameData(s.BoardPrefix+r);if(""!==r){t.src;var n,l,o,u,h,d,f,m,p,g,b,v=s.BoardPrefix+r,y=$("#"+v),x=0,_=0;try{h=$.tmpl(s.template.gameData,e,{setCaption:function(e){return e.split("-")[2].replace(/^0+([0-9]+)/,"$1")},getActiveGenre:function(){return r}}),b=0,$("tr",h).each(function(){("TR"===this.tagName&&!$("th",this).length||"LI"===this.tagName)&&++b}),(_=b)>s.showRowNum&&(m=h,p=s.showRowNum,g=0,$("tr",m).each(function(){$("th",this).length||++g,g>p&&$(this).hide()}),h=m),h=a(h,"small");var w=function(e,t,a){var r={};return $.each(e.lists,function(e,t){if(t.cd===a)return r.tabCount=e,r.tplTitle=$.tmpl(s.template.title,this),r.tplSubGenre=$.tmpl(s.template.subGenre,this),$("a:first",r.tplSubGenre).addClass("selected"),void(r.tplListLink=$.tmpl(s.template.listLink,this.data[0]))}),r};if("load"===i){if(n=$.tmpl(s.template.genre,this.modelBoard),l=$.tmpl(s.template.dataBody,this.modelBoard),f=w(this.modelBoard,s.template,r),jQuery.isEmptyObject(f))return void(s.flagMakeHtml=!1);x=f.tabCount,o=f.tplTitle,u=f.tplSubGenre,d=f.tplListLink;for(var k=0,j=l.length;k<j;++k)$(l[k])[0].id===v&&($("li",u).length>1&&$(l[k]).append(u),h&&$(l[k]).append(h),_>s.showRowNum&&$(l[k]).append(s.template.all));var C,L=document.createElement("div");C=$(s.template.boardBody).append(n),$(C).append(l),$(C).append(d),$(L).append(o),$(L).append(C),$(s.selector.wrap).append($(L).children()),s.regChangeTab(x),s.regClickSubGenre(v),s.regClickViewAll(v)}else if("refresh"===i)s.changeGames(v,h),_>s.showRowNum&&!$(s.selector.allShow,y).length&&$(y).append(s.template.all),s.regClickViewAll(v);else if("act"===i){var S=!$("table",y).length;"main"===c&&S&&(u=(f=w(this.modelBoard,s.template,r)).tplSubGenre,$("a:first",u).addClass("selected"),d=f.tplListLink,l=$(document.createElement("div")),$("li",u).length>1&&$(l[0]).append(u),h&&$(l[0]).append(h),_>s.showRowNum&&$(l[0]).append(s.template.all)),S?($(y).append($(l).children()),$(s.selector.more).empty().append(d.children()),s.regClickSubGenre(v),s.regClickViewAll(v)):(s.changeGames(v,h),!$(this.selector.allShow,y).length&&_>s.showRowNum?$(y).append(s.template.all):$(this.selector.allShow,y).length&&_<=s.showRowNum&&$(s.selector.allShow,y).remove(),s.regClickViewAll(v))}}catch(e){return}s.flagMakeHtml=!1}else s.flagMakeHtml=!1}else s.flagMakeHtml=!1},regChangeTab:function(e){var t=this;$(t.selector.board).tabs({selected:e,select:function(e,s){var a=!1,r=$(t.selector.title)[0].innerHTML,i=s.tab.innerHTML;r.match(/「.*」/)&&""!==i?r=r.replace(/「.*」/,"「"+i+"」"):r.match(/「.*」/)&&""===i?r=r.replace(/「.*」/,""):r.match(/「.*」/)||""===i||(r="「"+i+"」"+r),$(t.selector.title).text(r);var c=$(s.tab).attr("href"),n=new RegExp(".*#"+t.BoardPrefix),l=c.replace(n,""),o="",u=$(t.selector.subGenreAnc,$(c));u.length&&$.each(u,function(e,t){$(t).hasClass("selected")&&(o=$(t).attr("href").replace(/.*#/,""),$(t).removeClass("selected")),e||$(t).addClass("selected")}),$scms.board.postMessage("act",{cd:l,type:"main",outputID:scms.config.dom.area.board}),(u=$(t.selector.subGenreAnc,$(c))).length?($.each(u,function(e,t){$(t).hasClass("selected")&&(o=$(t).attr("href").replace(/.*#/,""))}),$.each($(t.modelBoard.lists),function(e,s){s.cd===l&&$.each($(s.data),function(e,s){s.src===o&&(t.changeListLink(s.link,s.linkLabel),a=!0)})})):$.each($(t.modelBoard.lists),function(e,s){s.cd===l&&(t.changeListLink(this.data[0].link,this.data[0].linkLabel),a=!0)}),a||"block"===$(t.selector.more).css("display")&&$(t.selector.more).css("display","none")}})},regClickSubGenre:function(e){var t,s,a,r=this,i=!1;$("#"+e+r.selector.subGenreAnc).click(function(e){e.preventDefault(),e.stopPropagation(),(t=$(e.target)).hasClass("selected")||(t.parents().map(function(){$(this).hasClass("SubNavigation")&&$("li a",this).removeClass("selected"),$(this).hasClass("score")&&(s=$(this).attr("id").replace(r.BoardPrefix,""))}),t.addClass("selected"),a=t.attr("href").replace(/.*#/,""),$.each($(r.modelBoard.lists),function(e,t){this.cd===s&&$.each($(this.data),function(e,t){t.src===a&&(r.changeListLink(t.link,t.linkLabel),i=!0)})}),i||"block"===$(r.selector.more).css("display")&&$(r.selector.more).css("display","none"),"j1"!==a&&"j2"!==a||(a="sc_"+a),$scms.board.postMessage("act",{cd:s,src:a,type:"sub",outputID:scms.config.dom.area.board}))})},regClickViewAll:function(e){$("#"+e+this.selector.allShow).click(function(t){t.preventDefault(),t.stopPropagation(),$(t.target).parents().map(function(){if($(this).attr("id")===e)return $("tr",this).show(),void $(this).children().not(".SubNavigation, .detail01").remove()})})},getActiveData:function(){var e,t,s=this;return $(s.selector.data).each(function(){if(!$(this).hasClass("ui-tabs-hide"))return e=$(this)[0].id,void $(s.selector.subGenreAnc,$(this)).each(function(){$(this).hasClass("selected")&&(t=$(this).attr("href").replace(/.*#/,""))})}),!!e&&{id:e,cd:e.replace(s.BoardPrefix,""),src:t||""}},changeListLink:function(e,t){var s=this;"none"===$(s.selector.more).css("display")&&"#"!==e?$(s.selector.more).css("display","block"):"block"===$(s.selector.more).css("display")&&"#"===e&&$(s.selector.more).css("display","none"),$(s.selector.moreAnc).attr("href",e),$(s.selector.moreAnc).text(""===t?"一覧へ":t)},clearGameData:function(e){$("table",$("#"+e)).empty(),$(this.selector.allShow,$("#"+e)).length&&$(this.selector.allShow,$("#"+e)).remove()},changeGames:function(e,t){$("table",$("#"+e)).empty().append(t.children())},funcBeforeRequest:function(){t(scms.config.dom.area.board)},funcAfterRequest:function(){s(scms.config.dom.area.board,this.flagMakeHtml)}},e.box=function(){this.initialize.apply(this,arguments)},e.box.prototype={initialize:function(t){var s=new e.base;(this.modelBox=s.xmlParse(t))&&(this.scrollCategory={width:970,scrollNum:5},this.scrollNews={width:660,scrollNum:3},this.selector={},this.selector.wrap="#ScoreBoardSection",this.selector.list="#ScoreBoardSection01",this.selector.listUnit=this.selector.list+" li",this.selector.listWithData=this.selector.list+" li.withData",this.selector.listBlank=this.selector.list+" li.blank",this.selector.emphasis="#ScoreBoardSection02",this.selector.emTable=this.selector.emphasis+" .score table",this.selector.emWithData=this.selector.emphasis+" .score table tr td.withData",this.selector.carousel="#mycarousel",this.flagMakeHtml=!1)},templateList:{dataBody:'<div id="ScoreBoardSection01"><ul id="mycarousel" class="ScoreBoard jcarousel-skin-tango"></ul></div>',gameData:'<ul>{{each dataLists}}{{each games}}{{if url}}<li class="score withData">{{else}}<li class="score">{{/if}}{{if status_code === "1"}}<table class="duringGame">{{else}}<table>{{/if}}<tr><th colspan="2" class="title">{{if status_disp}}${status_disp}{{else}}&nbsp;{{/if}}</th></tr><tr><td>{{if team1score}}${team1score}{{else}}-{{/if}}</td><td class="team">${team1name}</td></tr><tr><td>{{if team2score}}${team2score}{{else}}-{{/if}}</td><td class="team">${team2name}</td></tr></table></li>{{/each}}{{/each}}</ul>',blankData:'<li class="score blank"><table><tr><th colspan="2" class="title">&nbsp;</th></tr><tr><td></td><td class="team"></td></tr><tr><td></td><td class="team"></td></tr></table></li>',urlTmp:'{{each dataLists}}{{each games}}{{if url}}<a href="${url}"></a>{{/if}}{{/each}}{{/each}}'},templateEm:{dataBody:'<div id="ScoreBoardSection02"><div class="ScoreBoard"><div class="score">{{each dataLists}}{{if !$index}}{{each games}}{{if !$index}}{{if status_code === "1"}}<table class="duringGame">{{else}}<table>{{/if}}<tr><td class="flag">{{if team1flag}}${team1flag}{{/if}}</td><td class="team">${team1name}</td>{{if url}}<td class="score withData">{{else}}<td class="score">{{/if}}<p class="title">${name}</p><p>${team1score} （{{if status_disp}}${status_disp}{{else}}VS{{/if}}） ${team2score}</p></td><td class="team">${team2name}</td><td class="flag">{{if team2flag}}${team2flag}{{/if}}</td></table></tr></table>{{/if}}{{/each}}{{/if}}{{/each}}</div></div></div>',urlTmp:'{{each dataLists}}{{each games}}{{if !$index && url}}<a href="${url}"></a>{{/if}}{{/each}}{{/each}}'},makeHtml:function(e,t){var s=this;if(s.flagMakeHtml=!0,e&&e.dataLists.length&&t.cmd){var r,i,c,n,l=t.cmd,o=0,u=0,h=0,d=0,f=0;try{if("selectOnly"===(r=this.modelBox.lists[0].data[0].selectType))c=$.tmpl(s.templateEm.dataBody,e),n=$.tmpl(s.templateEm.urlTmp,e),c=a(c,"large"),"load"===l?$(s.selector.wrap).append(c):"refresh"===l&&$(s.selector.emTable).empty().append($("table",c).children()),$(s.selector.emWithData).each(function(e,t){$(this).click(function(){location.href=$(n[e]).attr("href")})});else if("select"===r){switch($(s.selector.wrap).width()){case s.scrollCategory.width:i=s.scrollCategory.scrollNum;break;case s.scrollNews.width:i=s.scrollNews.scrollNum;break;default:i=1}if(c=$.tmpl(s.templateList.gameData,e),n=$.tmpl(s.templateList.urlTmp,e),h=$("li",c).length,"load"===l){d=i-(h-1)%i;for(var m=0;m<d;++m)$(c).append(s.templateList.blankData);f=h+d,$(s.selector.wrap).append(s.templateList.dataBody),s.carousel=jQuery(s.selector.carousel).jcarousel({scroll:i,size:f,itemFallbackDimension:10,initCallback:function(e,t){"init"===t&&$.each($("li",c),function(t,s){e.add(t+1,s)})},itemLoadCallback:function(e,t){"next"===t&&$(s.selector.listUnit).length===e.last&&$scms.box.postMessage("act",{limit:i,outputID:scms.config.dom.area.box})}}).data("jcarousel"),$(s.selector.listWithData).each(function(e,t){$(this).click(function(){location.href=$(n[e]).attr("href")})})}else if("refresh"===l){d=i-(h-1)%i;for(m=0;m<d;++m)$(c).append(s.templateList.blankData);f=h+d,$.each($(s.selector.listUnit),function(e,t){s.carousel.remove(e+1)}),s.carousel.size(0),s.carousel.reset(),$.each($("li",$(c)),function(e,t){s.carousel.add(e+1,t)}),s.carousel.size(f),s.carousel.reload(),$(s.selector.listWithData).each(function(e,t){$(this).click(function(){location.href=$(n[e]).attr("href")})})}else if("act"===l){if(!h)return;$(s.selector.listUnit).length,o=$(s.selector.listUnit).not(".blank").length,u=$(s.selector.listWithData).length,d=i-(o+h-1)%i;for(m=0;m<d;++m)$(c).append(s.templateList.blankData);f=o+h+d,$.each($(s.selector.listBlank),function(e,t){s.carousel.remove(o+(e+1))}),$.each($("li",$(c)),function(e,t){s.carousel.add(o+(e+1),t)}),s.carousel.size(f),$(s.selector.listWithData).each(function(e,t){e>u-1&&$(this).click(function(){location.href=$(n[e-u]).attr("href")})})}}}catch(e){return}s.flagMakeHtml=!1}else s.flagMakeHtml=!1},funcBeforeRequest:function(){t(scms.config.dom.area.box)},funcAfterRequest:function(){s(scms.config.dom.area.box,this.flagMakeHtml)}}}(scms.view.flash),$(document).ready(function(){var e=$("script#scmsFlashModule");if(!(e.size()<=0)){var t=scms.util.request.parseQString(e.attr("src").match(/\?(.*)(?:$|#)/)[1]);if(t&&("string"==$.type(t.c)&&(t.c=[t.c]),"array"==$.type(t.c)&&(t.c=$.map(t.c,function(e,t){if("string"==$.type(e))return e}),!(t.c.length<=0)&&"string"==$.type(t.g)))){var s,a,r={};if($.each(t.c,function(e,a){"board"==a?r[a]="board":"box"==a&&(s=t.sg?t.g+"_"+t.sg:t.g,r[a]=s)}),scms.config.condition.category.genre=t.g,scms.config.condition.category.subgenre=t.sg?t.sg:"",scms.config.file.limit=scms.config.dom.games=970==(a=$("#"+scms.config.dom.area.box).width())?6:660==a?4:0,!$.isEmptyObject(r)){var i=function(e,t,s,a){var r=function(e,t){var s=!1;if("success"==t&&$.isXMLDoc(e)&&"jsconf"===e.documentElement.nodeName){var a=$(e).find("jsconf");if(a.find("disabled").size()<=0){var r=a.find("datagroup");r.size()>0&&r.find("data").size()>0&&(s=r)}}return s}(t,s);r&&($scms[e]=new scms.control.flash[e](r),$scms[e].model=new scms.model.flash[e](r),$scms[e].view=new scms.view.flash[e](r),$scms[e].postMessage("load",{outputID:scms.config.dom.area[e]}))};$.each(r,function(e,t){var s=scms.config.location.rootDir.xml+scms.config.file.xml[t];$.get(s,function(t,s,a){i(e,t,s)},"xml")})}}}});