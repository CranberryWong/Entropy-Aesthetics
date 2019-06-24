/*! (c) 2014 SANKEI DIGITAL INC.
 *  URL: http://www.sankei-digital.co.jp/
 *  name: 株式会社産経デジタル　産経ニュース・フォト[PC][スマホ] - popin外部ライブラリ設定
 *  Date: 2018.03.06
 *  version: 1.0.2
 *  note: 
 *  license: 著作権者の許可なく、改変・複製・商用利用・再配布等の行為を禁じる。
 *
*/
if(window.__AB_TEST_USER_GROUP_NAME__){var _pop=_pop||[];_pop.push(["_set_read_customField",window.__AB_TEST_USER_GROUP_NAME__])}!function(){document.write('<script type="text/javascript" charset="UTF-8" src="https://api.popin.cc/searchbox/sankei_news.js"><\/script>'),$("#popin_query").on("blur",function(a){""===$(a.target).val()&&$(a.target).css("background-image","")}),$("#popin_query").on("focus",function(a){$(a.target).css("background-image","none")})}();