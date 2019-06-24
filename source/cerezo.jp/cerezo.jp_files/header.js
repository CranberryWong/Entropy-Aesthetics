var jheader = jheader || {};
(function() {
  var jheader = document.createElement('iframe');
  jheader.width = '100%';
  jheader.height = 80;
  jheader.scrolling = 'no';
  jheader.setAttribute('frameBorder','0');
  jheader.setAttribute('noresize','');
  var useSSL = 'https:' == document.location.protocol;
  jheader.src = (useSSL ? 'https:' : 'http:') +
  '//www.jleague.jp/jheader/'+jparts+'.html';

  var node = document.getElementsByTagName('body')[0];
  node.parentNode.insertBefore(jheader, node);
})();
