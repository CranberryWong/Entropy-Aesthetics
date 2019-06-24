// Private variables.
var lastIDvalue = null;

/**
 * FTTracking
 */
function FTTracking() {

}

/**
 * addQueryVarToClickTags
 */
FTTracking.prototype.addQueryVarToClickTags = function( queryVar, data ) {
  var justId = data;
  for (var i in myFT.placementProperties.clicks) {
    var clickTag = myFT.placementProperties.clicks[i];
    var encodeCount = 0;

    if (clickTag.indexOf("servedby.flashtalking") > -1) {
      while (clickTag.indexOf("https://servedby") === -1 && clickTag.indexOf("http://servedby") === -1) {
        clickTag = decodeURIComponent(clickTag);
        encodeCount++;
      }
    }

    if(lastIDvalue) {
      clickTag = clickTag.replace(new RegExp(lastIDvalue, 'g'), justId);
    }
    else{
      clickTag = clickTag.replace("\[\%FT_CUSTOM\%\]", justId);
    }

    if (clickTag.indexOf(queryVar + '=') > -1) {
      myFT.placementProperties.clicks[i] = clickTag.replace(new RegExp('(' + queryVar + '=(.*?))(&|$)', 'i'), queryVar + '=' + data + '$3');
      for (var count = 0; count < encodeCount; count++) {
        myFT.placementProperties.clicks[i] = encodeURIComponent(myFT.placementProperties.clicks[i]);
      }
    } else {
      if (clickTag.indexOf('ft_impID=') > -1) myFT.placementProperties.clicks[i] = clickTag.split('ft_impID=').join(queryVar + '=' + data + '&ft_impID=');
      if (clickTag.indexOf('https://creativepreview') > -1) {
        myFT.placementProperties.clicks[i] = clickTag.split('count=').join(queryVar + '=' + data + '&count=');
      }

      for (var count = 0; count < encodeCount; count++) {
        myFT.placementProperties.clicks[i] = encodeURIComponent(myFT.placementProperties.clicks[i]);
      }
    }
  }
  lastIDvalue = justId;
}

/**
 * trackProducts
 */
FTTracking.prototype.trackProducts = function( feeds, param1, param2 ) {
  // Check if products empty.
  if(feeds.length < 1) return;

  let ajaxSet = {
    complete: function(request) {
      if (request.status === 200) {
        if (JSON.parse(request.responseText).error) {
          Tracker.impressionTrackEvent('Reporting Service Error');
        } else {
          Tracker.impressionTrackEvent(JSON.parse(request.responseText).id);
        }
      } else {
        Tracker.impressionTrackEvent('Reporting Service Error');
      }
    }
  };

  var productArray = [];
  for(var i=0;i<feeds.length;i++){
    if (feeds[i].friendly_name) {
      productArray.push(feeds[i][param1]+"|"+feeds[i][param2]);
    }
  }

  myFT.ajax('https://fdz.flashtalking.com/services/dell/FBI-1941/write.php?value=' + encodeURIComponent(productArray), ajaxSet);
}