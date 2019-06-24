/* Source and licensing information for the line(s) below can be found at https://www.macg.co/sites/all/modules/comment_notify/comment_notify.js. */
(function($){Drupal.behaviors.commentNotify={attach:function(context){$('#edit-notify',context).bind('change',function(){$('#edit-notify-type',context)[this.checked?'show':'hide']().find('input[type=checkbox]:checked').attr('checked','checked')}).trigger('change')}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.macg.co/sites/all/modules/comment_notify/comment_notify.js. */
;/*})'"*/
