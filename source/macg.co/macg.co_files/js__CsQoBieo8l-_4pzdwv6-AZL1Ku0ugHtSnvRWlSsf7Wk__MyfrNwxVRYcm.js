/* Source and licensing information for the line(s) below can be found at https://www.macg.co/sites/all/themes/gsphere_theme/js/lightbox.js. */
function lightboxInit(){var lightbox=new Lightbox();lightbox.load({boxId:false,dimensions:true,captions:true,prevImg:false,nextImg:false,hideCloseBtn:false,closeOnClick:true,loadingAnimation:200,animElCount:4,preload:true,carousel:true,animation:400,nextOnClick:false,responsive:true,maxImgSize:0.95})};(function(){var figureForLightBox=document.querySelectorAll('#node-content figure');for(var i=0;i<figureForLightBox.length;i++){var hrefBigPicture="";if(figureForLightBox[i].querySelectorAll('img').length>0){var img=figureForLightBox[i].querySelectorAll('img');if(figureForLightBox[i].querySelectorAll('figcaption').length>0){var linkInCaption=figureForLightBox[i].querySelectorAll('figcaption')[0].querySelectorAll('a');for(var j=0;j<linkInCaption.length;j++)if(linkInCaption[j].innerText=="Cliquer pour agrandir"){hrefBigPicture=linkInCaption[j].href;var el=linkInCaption[j];el.parentNode.removeChild(el)};if(figureForLightBox[i].querySelectorAll('figcaption')[0].innerHTML)img[0].setAttribute("data-jslghtbx-caption",figureForLightBox[i].querySelectorAll('figcaption')[0].innerHTML)};if(!img[0].hasAttribute("data-jslghtbx")&&hrefBigPicture){img[0].setAttribute("data-jslghtbx",hrefBigPicture)}else if(!img[0].hasAttribute("data-jslghtbx"))img[0].setAttribute("data-jslghtbx","");if(!img[0].hasAttribute("data-jslghtbx-group"))img[0].setAttribute("data-jslghtbx-group",Drupal.settings.nodeInformations.nodeid)}};lightboxInit()})();;
/* Source and licensing information for the above line(s) can be found at https://www.macg.co/sites/all/themes/gsphere_theme/js/lightbox.js. */
;/*})'"*/