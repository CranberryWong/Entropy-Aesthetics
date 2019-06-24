/////////////////////////////////////////////////////////////////////////////
//
// Glass.js, create a looking glass effect for images in a HTML page.
// Copyright (C) 2011  Jan-Mark S. Wams (jms@cs.vu.nl)
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
/////////////////////////////////////////////////////////////////////////////

// Plugin Name: Glass
// Plugin URI: http://www.codeblab.com/glass
// Description: Yet an other magnifying glass implementation.
// Author: Jan-Mark Wams (jms@cs.vu.nl)
// Version: 1.3
// Author URI: http://www.codeblab.com/
// License: GPL3

// This JavaScript source is loosely couple with WordPress. The
// WordPress .php code that manages adds a number of variables to the
// header like so:
//
// <script type='text/javascript'>
//   document.myrtheGlassDx='1000';
//   document.myrtheGlassDy='666';
//     :
// </script>
//
// In this JavaScript script these variables are used like this:
//   minEnlarge = (document.myrtheGlassMinEnlarge || 2.0);
//
// If this script is used without defining these header variables
// some defaults are used. 
// I did not test this, but this JavaScript script should run 
// unaltered if included standalone in a HTML file.
// Call glassInit() near the end of your HTML file to initialize
// and activate the images on your page.
//

// DON'T FORGET: Setting the DOCTYPE on your HTML page
// forces M$-IE to not include the border in the width. 

// DEBUG
//function dump(arr, level) 
//{
//  var dumped_text = '';
//  if(!level) level = 0;
//  
//  if (level > 3) return 'TOO DEEP\n';
//
//  // The padding given at the beginning of the line.
//  var level_padding = '';
//  for(var j=0; j < level+1; j++) level_padding += '  ';
//  
//  if(typeof(arr) == 'object') {
//    for(var item in arr) {
//      var value = arr[item];
//      if (value && value != '')
//      {
//        if(typeof(value) == 'object') {
//          dumped_text += level_padding + "'" + item + "' ...\n";
//          dumped_text += dump(value,level+1);
//        } else {
//          dumped_text += level_padding + "'" + item 
//            +  "' => \"" + value + "\"\n";
//        }
//      }
//    }
//  } else { //Stings/Chars/Numbers etc.
//    dumped_text = '===>'+arr+'<===('+typeof(arr)+')';
//  }
//  return dumped_text;
//}


// GlassShowLicence: Display the GPL (on double click).
//
function glassShowLicence() 
{
  document.body.glass.style.display = 'none';  // Switch off glass.
  document.body.glass.inLimbo = 2;             // Suppress single click.
  alert (
    'Glass.js, create a looking glass effect for images in a HTML page. ' +
      'Copyright (C) 2011  Jan-Mark S. Wams (jms@cs.vu.nl)' +
      '\n' +
      'This program is free software: you can redistribute it and/or modify '+
      'it under the terms of the GNU General Public License as published by '+
      'the Free Software Foundation, either version 3 of the License, or ' +
      '(at your option) any later version.' +
      '\n' +
      'This program is distributed in the hope that it will be useful, ' +
      'but WITHOUT ANY WARRANTY; without even the implied warranty of ' +
      'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the ' +
      'GNU General Public License for more details.' +
      '\n' +
      'You should have received a copy of the GNU General Public License ' +
      'along with this program.  If not, see <http://www.gnu.org/licenses/>.' +
      '\n' +
      '\n' +
      'For the WordPress plugin go to: http://www.codeblab.com/glass/'
  );
  document.body.glass.inLimbo = 0; // Not in limbo anymore.
  return false;
}


// GlassReallyClickThrough: To prevent a double click from also 
// pushing a single click through, check the didDoubleClick variable
// of glass. The single click event handler sets a timer to call this
// and if the double click event has been handled in between, this function
// (effectively) does nothing.
//
function glassReallyClickThrough()
{
  with (document.body.glass) {
    if (1 == inLimbo) {           // Only when one (1) click has been seen.
      style.display = 'none';     // Switch off glass.

      // Do the click, or if it defaults, follow the link, if there.
      if (my.lowres.click() && my.lowres.parentNode.href)
        window.location = my.lowres.parentNode.href;

      inLimbo = 0;                // Back to normal.
    }}}


// GlassClickThrough: forward the click to the underlying picture.
// Since a double click also triggers this, just start a timer to
// really click trough. Note that the double click handler sets 
// didDoubldClick to 1, to suppress the single click if a double 
// click has been executed during the waiting period.
//
function glassClickThrough()
{
  document.body.glass.inLimbo = 1;
  setTimeout('glassReallyClickThrough()', 500);
  return false;
}


// GlassAddEventCursorXY: Add cursorX and Y to properties of object.
//
// It's a bit complex, so thank you *again* Microsoft for
// making me google (not binging) how to satisfy a large
// enough number of version of IE. I prefer the *standard*
// .pageX/Y.
//
function glassAddEventCursorXY(event, my) 
{
  if (event && event.pageX) {
    my.cursorX = event.pageX; 
    my.cursorY = event.pageY; 
  }
  else { // IE6 - IE8 code.   
    with(document) {
      my.cursorX = (event || window.event).clientX 
        + (documentElement.scrollLeft || body.scrollLeft);
      my.cursorY = (event || window.event).clientY
        + (documentElement.scrollTop || body.scrollTop);
    }
  }
}  


// GlassAddAbsoluteXY: Add absoluteX and Y to properties of object.
//
// The absolute document position should be standard. It is not
// Hence this function.
//
// On the Web there are many methodes involving offsetParent, they
// don't work on a majority of browsers for complex layout, like
// many WordPress themes. This seems to work better.
//
function glassAddAbsoluteXY(obj)
{
  bbox = obj.getBoundingClientRect();
  obj.absoluteX = Math.round(bbox.left);
  obj.absoluteY = Math.round(bbox.top);
  with(document) {
    obj.absoluteX += (documentElement.scrollLeft || body.scrollLeft);
    obj.absoluteY += (documentElement.scrollTop  || body.scrollTop );
  }
}


// GlassReplaceThinMediumThick: take a shot at replacing these
// implicit sizes. Note borders can be thin, medium and thick, width
// and height can not handle these like they can px, cm, pt etc.  W3C
// says they are browser dependent, so we do a wild guess.  We could
// do a table look up in general 2,4,6 and 1,3,5 are popular values.
// A quick test showed that a few popular browsers use this:
//
//  1,3,5 Firefox   (OS X, Win, Lin)
//        Chrome    (OS X, Lin)
//        SeaMonkey (Lin)
//
//  1,3,6 Opera     (OS X, Win, Lin)
//
//  2,4,6 Chrome    (Win)
//        IE        (Win)
//
// Since this is with what I have installed now, let's just fiddle a
// bit. This could be done with setting a border and reading it's
// width in pixel, but I kind of feel using a 'medium' border is kind
// of asking for it. :-)
//
function glassReplaceThinMediumThick(s)
{
  var r = null;
  if (navigator.userAgent.search(/opera/i) > 0) 
    r = s.replace('thin','1px').replace('medium','3px').replace('thick','6px');
  else if (navigator.userAgent.search(/firefox/i) > 0) 
    r = s.replace('thin','1px').replace('medium','3px').replace('thick','5px');
  else if (navigator.userAgent.search(/windows/i) > 0) 
    r = s.replace('thin','2px').replace('medium','4px').replace('thick','6px');
  else
    r = s.replace('thin','1px').replace('medium','3px').replace('thick','5px');
  return r;
}


// GlassAddBorderTRBL: Add borderTop/Right/Bottom/Left as object properties.
//
// Border widths can be given in 'px', 'pt', 'em', 'cm', and  
// so on. To convert these to pixels, the top,right,bottom, and left
// style strings are put in a dummy image's width and height, this 
// force the browser to resize the image and to set the height and 
// width in pixels. For example setting dummy.style.width to '1cm'
// will cause dummy.width to be set to '40' if 1cm happens to be 40 
// pixels for that browser at that time for that page.
//
// This really aught to be a systems service.
//
function glassAddBorderTRBL(obj)
{
  borderLeft = borderRight  = '0'; 
  borderTop  = borderBottom = '0';

  // Get the Left, Top, Right, and Bottom widths from the style.
  //
  if (obj.currentStyle) { // CSS style for IE & Opera
    borderStyle  = obj.currentStyle['borderStyle'];
    if ('none' != borderStyle && 'hidden' != borderStyle) { 
      borderLeft   = obj.currentStyle['borderLeftWidth'];
      borderTop    = obj.currentStyle['borderTopWidth'];
      borderRight  = obj.currentStyle['borderRightWidth'];
      borderBottom = obj.currentStyle['borderBottomWidth'];
    }
  }
  else if (window.getComputedStyle) { // CSS style for Firefox 
    style        = document.defaultView.getComputedStyle(obj, null);
    borderStyle  = style.borderStyle;
    if ('none' != borderStyle && 'hidden' != borderStyle) { 
      borderLeft   = style.borderLeftWidth;
      borderTop    = style.borderTopWidth;
      borderRight  = style.borderRightWidth;
      borderBottom = style.borderBottomWidth;
    }
  }

  // Translate thin, medium and thick (don't use them).
  //
  borderLeft   = glassReplaceThinMediumThick(borderLeft);
  borderTop    = glassReplaceThinMediumThick(borderTop);
  borderRight  = glassReplaceThinMediumThick(borderRight);
  borderBottom = glassReplaceThinMediumThick(borderBottom);

  // Use dummyImg to convert the strings to pixel counts.
  //
  with(document.body.glass.my.dummyImg) {
    style.width      = borderLeft;
    style.height     = borderTop;
    obj.borderLeft   = width;
    obj.borderTop    = height;
    style.width      = borderRight; 
    style.height     = borderBottom;
    obj.borderRight  = width;
    obj.borderBottom = height;
  }
}


// GlassAddPaddingTRBL: Add paddingTop/Right/Bottom/Left as object properties.
// See comment function addBorderTRBL() above.
//
function glassAddPaddingTRBL(obj)
{
  paddingLeft = paddingRight  = '0';
  paddingTop  = paddingBottom = '0';

  // Get the Left, Tip, Right, and Bottom widths from the style.
  //
  if (obj.currentStyle) { // IE
    paddingLeft   = obj.currentStyle['paddingLeft'];
    paddingTop    = obj.currentStyle['paddingTop'];
    paddingRight  = obj.currentStyle['paddingRight'];
    paddingBottom = obj.currentStyle['paddingBottom'];
  }
  else if (window.getComputedStyle) { // !IE
    style         = document.defaultView.getComputedStyle(obj, null);
    paddingLeft   = style.paddingLeft;
    paddingTop    = style.paddingTop;
    paddingRight  = style.paddingRight;
    paddingBottom = style.paddingBottom;
  }

  // Use dummyImg to convert the strings to pixel counts.
  //
  with(document.body.glass.my.dummyImg) {
    style.width       = paddingLeft;
    style.height      = paddingTop;
    obj.paddingLeft   = width;
    obj.paddingTop    = height;
    style.width       = paddingRight; 
    style.height      = paddingBottom;
    obj.paddingRight  = width;
    obj.paddingBottom = height;
  }
}


// GlassSetBackground: set the background of all the layers to bgimg.
//
function glassSetBackground(bgimg)
{
  with(document.body.glass) {
    for (var i = 0; i < childNodes.length; i++) {
      layer = childNodes[i];
      if (layer.tagName && 'div' == layer.tagName.toLowerCase()) {
        layer.style.backgroundImage = bgimg;
        // Copy the width and height too, it might be scaled up 
        // this especially happens on the iOS/Safari platform.
        // The iOS/Safari implementation scales big pictures
        // back to 2Mp to 3Mp.
        // Some IE's don't support backgroundSize, who cares?
        // Most versions of Safari on Windows slowdown by it, hence
        // the if (width != layer.style.backgroundImage.width).
        if ('backgroundSize' in style) { 
          with (my.lowres.hires.preload) {
            if (width != layer.style.backgroundImage.width) 
              layer.style.backgroundSize = width + 'px ' + height + 'px' ;
          }}}}}}


// GlassRefresh: Redraw the glass.
//
// Redraw it at the (new) current position and shift the background
// image of all the layers in the glass to match the center of the
// layers with the center of the lowres image.
//
function glassRefresh()
{
  var rescale;
  with(document.body.glass) {
    if (style.display != 'none') {
      // Hide the glass if we ran out of the bounding box.
      if (my.cursorX < my.bboxLeft || my.cursorX > my.bboxRight
          ||  my.cursorY < my.bboxTop  || my.cursorY > my.bboxBottom) {
        // Switch it off.
        style.display = 'none';
      }
      else {
        // Move the glass by setting it's style left and top props.
        style.left = Math.round(my.cursorX - my.radius) + 'px';
        style.top  = Math.round(my.cursorY - my.radius) + 'px';

        // Display either a 'Loading...' layer or the hires image.
        if (my.lowres.hires.preload.complete) {

          // First time, set scale and background images.
          if (my.scaleX == 0) {
            my.scaleX = my.lowres.hires.preload.width  / my.lowres.trueWidth;
            my.scaleY = my.lowres.hires.preload.height / my.lowres.trueHeight;
            // If the scale is too small, crank it up if backgroundSize
            // can be used. This is particularly helpful with iOS/Safari
            // due to its magic resizing of big images.
            if ('backgroundSize' in style) {
              minEnlarge = (document.myrtheGlassMinEnlarge || 2.0);
              maxEnlarge = (document.myrtheGlassMaxEnlarge || 100.0);
              rescale = 0;
              if (my.scaleX < minEnlarge) {
                rescale = minEnlarge;
              }
              else if (my.scaleX > maxEnlarge) {
                rescale = maxEnlarge;
              }
              if (rescale) {
                my.scaleX = my.scaleY = rescale;
                my.lowres.hires.preload.style.width = 
                  (my.scaleX * my.lowres.trueWidth) + 'px';
                my.lowres.hires.preload.style.height = 
                  (my.scaleY * my.lowres.trueHeight) + 'px';
              }
            }
            
            // Switch off the  messageLoading layer.
            my.messageLoading.style.display = 'none';
            // Set the background images.
            glassSetBackground('url(' + my.lowres.hires.URL + ')');
          }

          // Calc the offset of the center in the hires image.
          centerX = (my.cursorX - my.lowres.imageX) * my.scaleX;
          centerY = (my.cursorY - my.lowres.imageY) * my.scaleY;

          // Shift the background image on all the glass's layers.
          for (var i = 0; i < childNodes.length; i++) {
            layer = childNodes[i];
            if (layer.tagName && 'div' == layer.tagName.toLowerCase()) {
              layer.style.backgroundPosition = 
                -Math.round(centerX - layer.my.sizeX/2) + 'px ' 
                + -Math.round(centerY - layer.my.sizeY/2) + 'px';
            }}}
        else {
          // Display messageLoading layer, hires not loaded yet.
          my.messageLoading.style.display = 'block';
        }}}}}  
//   /\_/\ 
// I \   / Lisp
//    \_/


// GlassSetLayerStyle: Set the style elements of a layer <img>.
//
function glassSetLayerStyle1(glass, layer) 
{
  with(layer) {
    style.position  = 'absolute';
    style.border    = 'none';
    style.zIndex    = '1';
    style.cursor    = 'inherit';
    style.display   = 'inline';
    style.zIndex    = '750';   
    style.maxWidth  = 'none';
    style.maxHeight = 'none';
    style.left      = '0px';
    style.top       = '0px';
    
    //style.border   = '1px solid blue'; // DEBUG

    style.backgroundRepeat = 'no-repeat';
    style.backgroundColor  = '#'+(document.myrtheGlassBackgroundRGB || '666');
  }
}


// GlassSetLayerStyle: Set the style elements of a layer <img>.
//
function glassSetLayerStyle2(glass, layer) 
{
  with(layer) {
    style.width      =  my.sizeX + 'px';
    style.height     =  my.sizeY + 'px';
    style.marginLeft = glass.my.radius - my.sizeX/2 + 'px';
    style.marginTop  = glass.my.radius - my.sizeY/2 + 'px';
  }
}


// GlassCreateDummyImage: Create an non-visible image to abuse.
//
// These dummy images are placed at -1000,-1000 and are non-visible.
// They can be used to pre-load (hires) images or to have the browser
// convert img.style.width strings to img.width pixel numbers.
//
function glassCreateDummyImage(URL)
{
  var dummyImg = document.createElement('img');
  with(dummyImg) {
    src              = URL;
    style.visibility = 'hidden';
    style.position   = 'absolute';
    style.border     = 'none';
    style.left       = '0px';
    style.top        = '0px';
    style.marginLeft = '-10000px'; // Don't use very wide images.
    style.marginTop  = '-10000px'; 
    style.maxWidth   = 'none';
    style.maxHeight  = 'none';
  }
  document.body.appendChild(dummyImg);
  return dummyImg;
}


// GlassMove: Update the cursor of the glass.
//
/* 不明エラーとりあえずコメントアウト maeda
function glassMove(event)
{
  with(document.body.glass) {
    if (style.display != 'none') {
      glassAddEventCursorXY(event, my);
      glassRefresh();
    }}}
*/

// GlassTouchSetSize: Resize glass based on the pinch in the range of 0-9.
// 
function glassTouchSetSize(event)
{
  var i;
  if (event.touches.length >= 2) { 
    var dx = (event.touches[1].pageX - event.touches[0].pageX) / 2;
    var dy = (event.touches[1].pageY - event.touches[0].pageY) / 2;
    var r  = Math.sqrt(dx*dx + dy*dy);
    r = r -40; // Have fingers (of 40 pixels wide) on outside of glass.
    
    // Find best matching r in Radi
    for (i = 0; i < gGlassRadiArray.length; i++) {
      if (r < gGlassRadiArray[i]) break;
    }
    glassResize(i);
  }
}


// GlassTouchMove: iOS/Safari version of glassMove.
// Make the center of the first two fingers the center.
//
function glassTouchMove(event) 
{
  if (event.touches.length >= 2) { 
    with(document.body.glass) {
      if (style.display != 'none') {
        event.preventDefault();
        glassTouchSetSize(event);
        myevent = new Object();
        myevent.pageX = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        myevent.pageY = (event.touches[0].pageY + event.touches[1].pageY) / 2;
        glassAddEventCursorXY(myevent, my);
        glassRefresh();
      }}}}


// GlassStart: Setup the glass for hovering over the lowres image.
//
// This event handler is called when the cursor enters an <img> area.
// It copies image specific values to the glass.my variables.
//
function glassStart(that, event)
{ 
  with(document.body.glass) {
    if (0 == inLimbo) {
      my.lowres  = that; // Use this lowres image.
      
      // Set some attributes the system should have.
      // Assume the lowres image is not moving.
      glassAddEventCursorXY(event, my);
      glassAddBorderTRBL(my.lowres);
      glassAddPaddingTRBL(my.lowres);
      glassAddAbsoluteXY(my.lowres);
      
      // Calculate the imageX and Y offset in the box.
      with(my.lowres) {
        my.lowres.imageX = absoluteX + borderLeft + paddingLeft;
        my.lowres.imageY = absoluteY + borderTop  + paddingTop;
      }
      
      // Set the bounding box the glass has to stay in.
      // Note that the bounding box can be wider than the lowres image
      // due to padding and borders.
      with(my.lowres) {
        my.bboxLeft   = absoluteX;
        my.bboxTop    = absoluteY;
        if (navigator.userAgent.search(/msie/i) > 0) {
          // IE goes against the standard.
          my.bboxRight  = imageX + clientWidth + paddingLeft + paddingRight;
          my.bboxBottom = imageY + clientHeight + paddingTop + paddingBottom;
          my.lowres.trueWidth  =  clientWidth;
          my.lowres.trueHeight =  clientHeight;
        } else {
          // Standard way is to inlcude the padding in clientWidth/Height.
          my.bboxRight  = imageX + clientWidth;
          my.bboxBottom = imageY + clientHeight;
          my.lowres.trueWidth  =  clientWidth - paddingLeft - paddingRight;
          my.lowres.trueHeight =  clientHeight - paddingTop - paddingBottom;
        }
      }
      // Flag refresh to calculate the scale, wipe the background.
      my.scaleX = 0;
      //      glassSetBackground('none');
      
      // Update the cursor of the glass, make it visible and refresh.
      style.display = 'inline';
      glassRefresh();
    }
  }
}

// Global vars.
gGlassRimPath = ''; // Function glassInit() can change it.
gGlassRadiArray = [33,56,74,95,116,139,160,180,201,224];
gGlassRimSizeArray = [ 2, 3, 4, 5,  6,  7,  8,  9, 10, 11];
gGlassLayerSizesArray =
  [ 
    [ 
      [22,62],[30,58],[34,56],[40,52],[44,48],
      [48,44],[52,40],[56,34],[58,28],[62,22]
    ],[
      [36,106],[50,100],[60,94],[68,88],[76,82],
      [84,74],[90,66],[96,56],[102,46],[106,30]
    ],[
      [48,140],[66,132],[80,124],[90,116],[100,108],
      [110,98],[118,88],[126,76],[134,62],[140,42]
    ],[
      [60,180],[84,170],[102,160],[116,150],[130,138],
      [142,126],[152,112],[162,98],[172,80],[182,54]
    ],[
      [72,220],[102,208],[124,196],[142,182],[156,170],
      [170,156],[184,140],[196,122],[208,100],[220,72]
    ],[
      [86,264],[120,250],[146,236],[168,220],[188,204],
      [206,186],[222,166],[236,144],[250,120],[264,86]
    ],[
      [98,304],[138,288],[168,272],[194,254],[216,236],
      [236,214],[256,192],[274,164],[290,132],[306,92]
    ],[
      [112,342],[156,324],[188,306],[218,286],[244,264],
      [268,240],[288,214],[308,186],[326,150],[344,104]
    ],[
      [124,382],[174,362],[210,342],[242,320],[272,296],
      [296,270],[320,242],[342,210],[362,172],[382,122]
    ],[
      [138,426],[192,404],[234,382],[270,356],[302,330],
      [330,302],[356,270],[382,234],[404,190],[426,136]
    ]
  ];


// GlassMouseStart: kickoff function to start on an image (this).
//
function glassMouseStart(event)
{
  glassStart(this, event);
}


// GlassTouchStart: iOS/Safari version of glassStart.
//
function glassTouchStart(event)
{
  touches = event.touches;
  node    = null;

  if (touches.length == 2) {
    // Find the lowres image.
    if (touches[0].target)
      node = touches[0].target;
    else if (touches[1].target)  // Never seen it happen on iOS.
      node = touches[1].target;

    if (node) {
      event.preventDefault();
      glassTouchSetSize(event);
      myevent = new Object();
      myevent.pageX = (touches[0].pageX + touches[1].pageX) / 2;
      myevent.pageY = (touches[0].pageY + touches[1].pageY) / 2;
      glassStart(node, myevent);
    }
  }
}


// GlassTouchEnd: If the number of fingers falls below 2, kill the glass.
//
function glassTouchEnd(event)
{
  if (event.touches.length < 2)
    document.body.glass.style.display = 'none';
}


// CreateGlass: Create a glass <div> with ten layer <div>s an border
// <img> and a text <p> inside.
//
function glassSetup()
{
  var i;
  // Create the glass as a div object.
  glass = document.body.glass = document.createElement('div');
  document.body.glass.my = new Object();
  document.body.glass.my.parent = parent;

  // Since a double click also causes at least one (single) click
  // on most browsers, this script waits for 500ms after the first 
  // (single) click to see if the second click makes it a double 
  // click. During the wait, lots of things don't work well, but 
  // what won't work well is highly browser dependent, therefore
  // this the whole script is in a state of limbo during this time
  // (there are two limbo states, 1 and 2). When inLimbo == 0, all is
  // well, otherwise, some things might not work, so there are several
  // if (!inLimbo)  
  //
  document.body.glass.inLimbo = 0;

  // Add local variables to the glass <div> object.
  with(glass) {
    my.radius     = 4; // Pick any
    my.rimSize    = 2;
    my.scaleX     = 0; // Will be set after preload by glassRefresh().
    my.scaleY     = 0;
    my.layerSizes = 
      [
        [48,140],[66,132],[80,124],[90,116],[100,108],
        [110,98],[118,88],[126,76],[134,62],[140,42]
      ];

    // Set the style elements.
    style.position   = 'absolute';
    style.border     = 'none';
    style.cursor     = 'crosshair';
    style.display    = 'none';
    style.maxWidth   = 'none';
    style.maxHeight  = 'none';
    style.left       = '0px';
    style.top        = '0px';
  }


  // First, add a div for each layer in the glass.
  for (i = 0 ; i < glass.my.layerSizes.length; i++) {
    glass.innerHTML += '<div></div>';
  }

  // Get a contrasting color to the background for the text.
  var sr = '0123456789abcdef#ABCDEF';
  var ds = 'abcdef0123456789#456789';
  var tx = (document.myrtheGlassBackgroundRGB || '666');
  tx = tx.replace(/./g, function(c) { return ds.charAt(sr.indexOf(c)); });

  // Atop the layers a Loading message.
  glass.innerHTML += '<p style="margin:0;z-index:999;'
    +  'position:absolute;max-width:none;max-height:none;'
    +  'left:0;top:0;'
    +  'padding:0;text-align:center;width:100%;'
    +  'color:#'+tx+';'
    +  '">loading image...<br /><br /><br />'
    +  '(double click for info)</p>';
  // Adding:
  // >            +  'font:15px/15px sans-serif;'
  // Safari:
  // > Warning: Cannot specify value for internal property. 
  // > Error in parsing value for property '-x-system-font'.
  // > Declaration dropped.
  // The font is set dynamically below. I don't have time
  // to find out why. I'll voodoo it, thusly.

  // Atop the pseudo circle image either an image or a set of four
  // anti aliased circles to mask the jaggies.  The images are 2
  // pixels wider than the rim to allow for good looking anti-aliasing
  // (except for IE where different versions mess up, in different
  // ways, the anti aliasing of PNG images). If you are a coders at
  // Microsoft doing colors; Please let somebody get it right! I mean,
  // there have been fixes for this for IE6, IE7, and IE8. (Have not
  // checked IE9.) Currently Google, Opera, Safari, and Firefox get it
  // right on Windows, but not IE8. PLEASE get your act together, you
  // are wasting millions of hours, you frustrate tens of thousands of 
  // developers.
  //
  if (gGlassRimPath != '') {
    // Use image to hide jaggies.
    //
    glass.innerHTML
      += '<img style="margin:-2px 0 0 -2px;padding:0;'
      +  'z-index:1000;'
      +  'position:absolute;max-width:none;max-height:none;'
      +  'left:0;top:0"'
      +  ' id="spy"'
      +  ' src="' 
      +  gGlassRimPath
      +  'spy4.png" />';
  }
  else {
    // Use a stack of four border to hide jaggies.
    for (i = 0; i < 4; i++) {
      glass.innerHTML
        += '<img style="margin:-2px 0 0 -2px;padding:0;z-index:1000;'
        +  'position:absolute;max-width:none;max-height:none;'
        +  'left:0;top:0" id="rim' + i + '" src="' 
        +  (document.myrtheGlassImgURL || '')
        +  'rim/rim4_000.png" />'; 
    }
  }  
  // Setup the layers.
  for (i = 0; i < glass.childNodes.length; i++) {
    if (glass.childNodes[i].tagName) {
      layer = glass.childNodes[i];
      if ('div' == layer.tagName.toLowerCase()) {
        layer.my = new Object();
        layer.my.sizeX = 0;
        layer.my.sizeY = 0;
        glassSetLayerStyle1(glass, layer);
      }
      else if ('p' == layer.tagName.toLowerCase()) {
        glass.my.messageLoading = layer;
        layer.style.font = '15px/15px sans-serif';  // Dodge Warning.
      }
    }
  }

  // Create some dummy image to be used by addPaddingTRBL() and
  // friends to transform the style.padding.top/.right/.bottom/.left
  // string parameters to pixel values.
  path = (document.myrtheGlassImgURL || '');
  glass.my.dummyImg = glassCreateDummyImage(path + 'rim/rim4_000.png');

  // Add the glass to the document, at the level of body.
  document.body.parentNode.appendChild(glass);

  // Add some functionality to the glass here.
  glass.ondblclick = glassShowLicence; 
  glass.onclick = glassClickThrough;

  // Scroll wheel for Zooming the glass.
  if (window.attachEvent)  
  {
    glass.attachEvent('onmousewheel', glassZoom); // IE
  }
  else // Assume W3C
  {
    glass.addEventListener('DOMMouseScroll', glassZoom, false); // FireFox
    glass.addEventListener('mousewheel', glassZoom, false);  // Chrome
  }

  // Key press for zooming the glass.
  document.onkeydown = glassZoomArrow;
  document.onkeypress = glassIgnoreDefaultForUpDown;
}


// GlassZoomArrow: Make the glass bigger if Arrow Up is pressed,
// smaller if Arrow Down is pressed. Note a check is needed on if glass
// is displayed because this event handler is called for every
// key press on the document.
//
function glassZoomArrow(event)
{
  var up = 0;
  glass = document.body.glass;

  // Only when the glass is displayed.
  if (glass.style.display != 'none') {
    e   = (event || window.event);
    key = (e.keyCode || e.which);
    if (38 == key) up = 1;    // Note that 38 is the KeyCode for Up Arrow.
    if (40 == key) up = -1;   // Guess what 40 is...
    if (up) glassResize(glass.my.size + up);
    if (up && e.preventDefault) e.preventDefault();
  }
  return !up;
}


// GlassIgnoreDefaultForUpDown: This event handler just ignores the up
// and down arrow if the glass is displayed. This is needed to prevent
// scrolling in Opera. In general it won't hurt.
//
function glassIgnoreDefaultForUpDown(event)
{
  var up = 0;

  // Only when the glass is displayed.
  if (document.body.glass.style.display != 'none') {
    e   = (event || window.event);
    key = (e.keyCode || e.which);
    if (38 == key) up = 1;    // Note that 38 is the KeyCode for Up Arrow.
    if (40 == key) up = -1;   // Guess what 40 is...
    if (up && e.preventDefault) e.preventDefault();
  }
  return !up;
}


// GlassZoomWheel: Make the glass bigger or smaller based on the
// zoom wheel.  It is not HTML5, not very well standardized, but this
// kind of seem to work. So why not?
//
function glassZoom(event)
{
  e = (event || window.event);
  d = e.detail ? (e.detail * -1) : (e.wheelDelta / 120);

  // Scale back to one step per event.  
  if (d < 0) d = -1;
  if (d > 0) d =  1;
  
  // Change the size of the glass.
  glassResize(document.body.glass.my.size + d);
  
  // Suppress the default behaviour (scrolling the page).
  if (e.preventDefault) e.preventDefault();
  return false;
}


// GlassResize: Resize the glass. 
// The magnifying glass consists of many layers so a resize is
// a little work.
//
function glassResize(size)
{
  var glass = document.body.glass;
  var i;

  // Make sure it's a number and in [0-9].
  size = parseInt(size);
  if (size < 0) size = 0;
  if (size > 9) size = 9;
  
  // Add local variables to the glass <div> object.
  with(glass) {
    my.size       = size;
    my.radius     = gGlassRadiArray[size];
    my.rimSize    = gGlassRimSizeArray[size]; 
    my.layerSizes = gGlassLayerSizesArray[size];

    // Set the style elements.
    style.width    = my.radius * 2 + 'px';
    style.height   = my.radius * 2 + 'px';
  }

  // Setup the rectangular layers of larger image.
  j = 0;
  for (i = 0; i < glass.childNodes.length; i++) {
    layer = glass.childNodes[i];
    if (layer.tagName && 'div' == layer.tagName.toLowerCase()) {
      layer.my.sizeX = glass.my.layerSizes[j][0];
      layer.my.sizeY = glass.my.layerSizes[j++][1];
      layer.style.width      = layer.my.sizeX + 'px'; // DUMMY
      layer.style.height     = layer.my.sizeY + 'px'; // DUMMY
      layer.style.marginLeft = glass.my.radius - layer.my.sizeX/2 + 'px';
      layer.style.marginTop  = glass.my.radius - layer.my.sizeY/2 + 'px';
    }
  }

  if (gGlassRimPath != '') {
    with(document.getElementById('spy')) {
      style.width  = (glass.my.radius * 2 + 4) + 'px';
      style.height = (glass.my.radius * 2 + 4) + 'px';
      src = src.replace(/spy[0-9]+/, 'spy' + glass.my.rimSize);
    }
  }
  else {
    // Change all four rim layers too. 
    // Changing the size first to prevents ugly blinking.
    for (i = 0; i < 4; i++) {
      with(document.getElementById('rim'+i)) {
        style.width  = (glass.my.radius * 2 + 4) + 'px';
        style.height = (glass.my.radius * 2 + 4) + 'px';
      }
    }
    // Now change the sources, which changes the size too, but too late.
    for (i = 0; i < 4; i++) {
      with(document.getElementById('rim'+i)) {
        src = src.replace(/rim[0-9]*_/, 'rim' + glass.my.rimSize + '_');
      }
    }
  }
  
  glass.my.messageLoading.style.padding = (glass.my.radius - 30) + 'px 0';

  glassRefresh();  // Just in case it is visible right now.
}


// GlassDoClick: Not all browsers have a click() function. This
// simulates that on most browsers that lack it.
//
function glassDoClick() 
{
  var evt = this.ownerDocument.createEvent('MouseEvents');
  evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView,
                     1, 0, 0, 0, 0, false, false, false, false, 0, null);
  return this.dispatchEvent(evt);
}


// GlassInsertGlass: Add the glass to the HTML
//
function glassInsertGlass()
{
  // Set the path to the rim images.
  gGlassRimPath = (document.myrtheGlassRimPath || '');

  // Create the glass a resize is needed to complete the setup.
  glassSetup();
  glassResize(document.myrtheGlassDefaultSize || 5);

  // If a user selectable color is used, set it.
  if (gGlassRimPath == '') {
    glassSetRGB(document.myrtheGlassRimRGB || 'FF3300');
  }
}


// GlassActivateImage: make the image react to a touchstart or mouseover
// and start loading the hires image.
//
function glassActivateImage(img)
{
  img.hires.preload = glassCreateDummyImage(img.hires.URL);  // Preload.
  img.hires.preload.onload = glassRefresh;  // Hide 'Loading.' layer. 

  if ('ontouchstart' in img)
    img.ontouchstart = glassTouchStart;     // iOS/Safari hook.
  else
    img.onmouseover = glassMouseStart;      // Turn on the glass.

  if (!document.body.glass) glassInsertGlass();
}


// glassInit: Setup the images to be active.
//
// Since we happen to loop over all images, the border-width is set to
// zero if the border-style is empty on all images. The border-style
// has an unspecified default value. And apparently an empty
// border-style also has a implementation dependent behaviour.  By
// deciding to not display borders if they have an empty style, the
// way things look is more consistent across browsers. 
// Actually a border value should always have been set. :-)
//
// Note that in FireFox 3.6.10 things go really funky if one makes the
// mistake of using 'border:none' in the style of an <img>.  All other
// browsers I tested this on do it right. So to fix this the
// border-width is set to zero pixels if the border-style is none.
// The border-width really should not matter if the border-style is
// none, so this probably won't break anything.
//
function glassInit()
{
  // Loop through all the images on the page.
  var images = document.images;
  var reSuf = /(\.jpg|\.png)$/i;
  var img;
  var a_img = document.getElementsByTagName('img');
  var l = a_img.length;

  for (i = 0; i < l; i += 1) {
    img = a_img[i];
    if (img.style.borderStyle == '') {
      img.style.borderWidth = '0px'; // Force more similar behaviour. 
    }
    if (img.style.borderStyle.toLowerCase() == 'none') {
      img.style.borderWidth = '0px'; // Firefox 'border:none' fix. 
    }
    if (img.parentNode.tagName && img.parentNode.tagName.toLowerCase() =='a') {
      if (reSuf.test(img.parentNode.href)) {
        // Get the hires image URL from the link.
        img.hires     = new Object();
        img.hires.URL = img.parentNode.href;
        glassActivateImage(img);
      }
      else if (document.myrtheGlassDx && document.myrtheGlassDy) { 
        // WordPress plugin only thumbnails often point to a page not
        // an image. By looking at end of the URL of the thumbnail image
        // these can be recognized (in WordPress). It is not airtight,
        // but if a larger version exists it is used for the glass.
        // This way the enlargement factor is smaller than if the 
        // full size image were taken. Not that myrtheGlassMaxEnlarge
        // also limits this factor, however it needs CSS3 extensions
        // that some versions IE do not have and also it slows down
        // some browsers (including most IE versions).
        // '<a href' has no .png or .jpg. 
        // Check if basename lowres ends -000x000
        var dx = document.myrtheGlassDx;
        var dy = document.myrtheGlassDy;
        var re = /^(.*)(-\d+x\d+)(\.jpg|\.png)$/i;
        var am = re.exec(img.src);
        if (am) { // Match, use '\1\3' as a hires URL
          img.hires = new Object();
          if (dx == 0 || dy == 0) { // Let's interpret zero as max...
            img.hires.URL = am[1] + am[3];
          } else {
            img.hires.URL = am[1] + '-'+dx+'x'+dy + am[3];
          }
          glassActivateImage(img);

          // Since an image can be either dx,dy or dy,dx sized,
          // and since it is hard to determine which is correct,
          // the code below simply tries to load the second aspect
          // ratio, if it succeeds it retrofits the alternative
          // preload URL in to the preload object.
          //
          img.hires.alt = glassCreateDummyImage(am[1] + '-'+dy+'x'+dx + am[3]);
          img.hires.alt.parent = img.hires;
          img.hires.alt.onload = 
            function() { 
              with(this.parent) URL = preload.src = alt.src; 
              glassRefresh();
            }
        }
      }
    }
    if (!img.click) img.click = glassDoClick;
  }

  if ('ontouchstart' in document.body) {
    document.body.parentNode.ontouchmove = glassTouchMove; // iOS/Safari hook.
    document.body.parentNode.ontouchend  = glassTouchEnd;  
  }
  else {
	// 不明エラーとりあえずコメントアウト maeda
    //document.body.parentNode.onmousemove = glassMove;
  }


  if (gGlassRimPath != '') { // Preload all the rim images.
    for (var s in gGlassRimSizeArray)
      glassCreateDummyImage(gGlassRimPath + 'spy' + gGlassRimSizeArray[s] 
                            + '.png');
  }
  else { // Preload all the rims.
    path = (document.myrtheGlassImgURL || '');
    OF = ['0','F'];
    S = gGlassRimSizeArray;
    var s,r,g,b;
    for (s in gGlassRimSizeArray) for (r in OF) for (g in OF) for (b in OF)
      glassCreateDummyImage(path+'rim/rim'+S[s]+'_'+OF[r]+OF[g]+OF[b]+'.png');
  }
}



// GlassSetRGB: change the three rim's and set their opacity such that 
// a rim of the requested RGB color appears.
//
function glassSetRGB(glassRimRGB)
{
  // Get the minimum *positive* value from a set of three.
  // eg. minpos(3,0,1) returns 1, and minpos(0,0,0) returns 0.
  //
  function minpos(A,B,C)
  {
    var minpos = A+B+C;
    if (A && A < minpos) minpos = A;
    if (B && B < minpos) minpos = B;
    if (C && C < minpos) minpos = C;
    return minpos;
  }

  var src;
  var path = (document.myrtheGlassImgURL || '');
  var glass = document.body.glass;
  var re = /^([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
  var aRGB = re.exec(glassRimRGB);
  
  var R = aRGB[1] != '' ? parseInt('0x'+aRGB[1]) : 0;
  var G = aRGB[2] != '' ? parseInt('0x'+aRGB[2]) : 0;
  var B = aRGB[3] != '' ? parseInt('0x'+aRGB[3]) : 0;
  
  var L1 = (R ? 'F':'0') + (G ? 'F':'0') + (B ? 'F':'0');
  var a = minpos(R,G,B); R -= R ? a:0; G -= G ? a:0; B -= B ? a:0;
  var L2 = (R ? 'F':'0') + (G ? 'F':'0') + (B ? 'F':'0');
  var b = minpos(R,G,B); R -= R ? b:0; G -= G ? b:0; B -= B ? b:0;
  var L3 = (R ? 'F':'0') + (G ? 'F':'0') + (B ? 'F':'0');
  var c = minpos(R,G,B);
  
  // Scale and take cascading into effect.
  c /= 255;
  b = (b / 255) / (1-c);
  a = (a / 255) / ((1-c)*(1-b));
  
  // Sanitize.
  if (a > 1) a = 1; if (b > 1) b = 1; if (c > 1) c = 1;
  if (a < 0) a = 0; if (b < 0) b = 0; if (c < 0) c = 0;
  
  // Set the three layers of the rim.
  with(document.getElementById('rim0')) {
    style.opacity = 1.00;
    style.filter  = 'alpha(opacity=100)';
  }
  with(document.getElementById('rim1')) {
    src = path + 'rim/rim'+glass.my.rimSize+'_'+L1+'.png';
    style.opacity = a;
    style.filter  = 'alpha(opacity=' + Math.round(a*100) + ')';
  }
  with(document.getElementById('rim2')) {
    src = path + 'rim/rim'+glass.my.rimSize+'_'+L2+'.png';
    style.opacity = b;
    style.filter  = 'alpha(opacity=' + Math.round(b*100) + ')';
  }
  with(document.getElementById('rim3')) {
    src = path + 'rim/rim'+glass.my.rimSize+'_'+L3+'.png';
    style.opacity = c;
    style.filter  = 'alpha(opacity=' + Math.round(c*100) + ')';
  }
}
