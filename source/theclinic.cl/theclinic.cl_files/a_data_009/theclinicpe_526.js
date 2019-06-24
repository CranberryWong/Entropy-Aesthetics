// slider dt 
(function()
{
  var lkqdSettings = {
    pid: 430,
    sid: 780088,
    playerContainerId: '',
    playerId: '',
    playerWidth: 400,
    playerHeight: 300,
    execution: 'outstream',
    placement: 'slider',
    playInitiation: 'auto',
    volume: 0,
    trackImp: '',
    trackClick: '',
    custom1: '',
    custom2: '',
    custom3: '',
    pubMacros: '',
    dfp: true,
    close: false,
    gdpr: '',
    gdprcs: '',
    lkqdId: new Date().getTime().toString() + Math.round(Math.random()*1000000000).toString(),
    supplyContentVideo: {
      url: '', clickurl: '', play: 'post'
    }
  };

  var lkqdVPAID;
  var creativeData = '';
  var environmentVars = { slot: document.getElementById(lkqdSettings.playerContainerId), videoSlot: document.getElementById(lkqdSettings.playerId), videoSlotCanAutoPlay: true, lkqdSettings: lkqdSettings };

  function onVPAIDLoad()
  {
    lkqdVPAID.subscribe(function() { lkqdVPAID.startAd(); }, 'AdLoaded');
  }

  var vpaidFrame = document.createElement('iframe');
  vpaidFrame.id = lkqdSettings.lkqdId;
  vpaidFrame.name = lkqdSettings.lkqdId;
  vpaidFrame.style.display = 'none';
  var vpaidFrameLoaded = function() {
    vpaidFrame.contentWindow.addEventListener('lkqdFormatsLoad', function() {
      lkqdVPAID = vpaidFrame.contentWindow.getVPAIDAd();
      onVPAIDLoad();
      lkqdVPAID.handshakeVersion('2.0');
      lkqdVPAID.initAd(lkqdSettings.playerWidth, lkqdSettings.playerHeight, 'normal', 600, creativeData, environmentVars);
    });
    vpaidLoader = vpaidFrame.contentWindow.document.createElement('script');
    vpaidLoader.setAttribute('async','async');
    vpaidLoader.src = 'https://ad.lkqd.net/vpaid/formats.js';
    vpaidFrame.contentWindow.document.body.appendChild(vpaidLoader);
  };
  vpaidFrame.onload = vpaidFrameLoaded;
  vpaidFrame.onerror = vpaidFrameLoaded;
  document.documentElement.appendChild(vpaidFrame);
})();

// slider mw
(function()
{
  var lkqdSettings = {
    pid: 430,
    sid: 780093,
    playerContainerId: '',
    playerId: '',
    playerWidth: 400,
    playerHeight: 225,
    execution: 'outstream',
    placement: 'slider',
    playInitiation: 'auto',
    volume: 0,
    trackImp: '',
    trackClick: '',
    custom1: '',
    custom2: '',
    custom3: '',
    pubMacros: '',
    dfp: true,
    close: false,
    gdpr: '',
    gdprcs: '',
    lkqdId: new Date().getTime().toString() + Math.round(Math.random()*1000000000).toString(),
    supplyContentVideo: {
      url: '', clickurl: '', play: 'post'
    }
  };

  var lkqdVPAID;
  var creativeData = '';
  var environmentVars = { slot: document.getElementById(lkqdSettings.playerContainerId), videoSlot: document.getElementById(lkqdSettings.playerId), videoSlotCanAutoPlay: true, lkqdSettings: lkqdSettings };

  function onVPAIDLoad()
  {
    lkqdVPAID.subscribe(function() { lkqdVPAID.startAd(); }, 'AdLoaded');
  }

  var vpaidFrame = document.createElement('iframe');
  vpaidFrame.id = lkqdSettings.lkqdId;
  vpaidFrame.name = lkqdSettings.lkqdId;
  vpaidFrame.style.display = 'none';
  var vpaidFrameLoaded = function() {
    vpaidFrame.contentWindow.addEventListener('lkqdFormatsLoad', function() {
      lkqdVPAID = vpaidFrame.contentWindow.getVPAIDAd();
      onVPAIDLoad();
      lkqdVPAID.handshakeVersion('2.0');
      lkqdVPAID.initAd(lkqdSettings.playerWidth, lkqdSettings.playerHeight, 'normal', 600, creativeData, environmentVars);
    });
    vpaidLoader = vpaidFrame.contentWindow.document.createElement('script');
    vpaidLoader.setAttribute('async','async');
    vpaidLoader.src = 'https://ad.lkqd.net/vpaid/formats.js';
    vpaidFrame.contentWindow.document.body.appendChild(vpaidLoader);
  };
  vpaidFrame.onload = vpaidFrameLoaded;
  vpaidFrame.onerror = vpaidFrameLoaded;
  document.documentElement.appendChild(vpaidFrame);
})();