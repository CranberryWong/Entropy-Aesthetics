(function(){
 var tags = document.body.getElementsByTagName('script');
 var sc;
 var i;
 for (i=0; i < tags.length; i++) {
   if (tags[i].src.match(/bpTrackVars\.js/)){
     sc = tags[i];
     break;
   }
 }
 try{
  var j, k, keySplit;
  var tmpVar;
  eval("var json = " + sc.innerHTML);
  for(var key in json){
    k = key.split(".");
    tmpVar = bpTrackVars;
    for (j=0; j < k.length; j++) {
       keySplit = k[j];
       if (typeof tmpVar[keySplit] === "object") {
          tmpVar = tmpVar[keySplit];
       } else {
          tmpVar[keySplit] = json[key];
       }
    }
  }
 } catch(e){
 } 
})();
