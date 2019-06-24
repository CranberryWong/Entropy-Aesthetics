myFT.define("scripts/models/IntroFrame", ["scripts/app/InstantAds", "scripts/helper/FTHelper"], function(InstantAds, FTHelper) {

  // Private variables.
  var introFrame = null;
  var slider = null;

  /**
   * Initializes slider and totalFrames private variable values.
   * @param       {Object} sliderIn      Slider object.
   * @constructor
   */
  function IntroFrame(sliderIn) {
    slider = sliderIn;
    introFrame = myFT.$("#intro");
  }

  /**
   * Build Intro frame from feed data.
   * @param  {Object}         feed    Feed object.
   * @return {Element Object}
   */
  function buildFrame(feed) {
    let sliderLength = slider.getLength();
    let frame = null;
    // Clone IntroFrame.
    frame = introFrame.clone();
    // Return if frame is undefined.
    if (frame[0] === undefined) return false;
    // Change id of the frame to slide{current slider length}.
    frame[0].id = "slide" + sliderLength;
    let feedSuppliedURL = null;
    // Logic for feed mapping.
    frame[0].querySelector(".intro_bg img").src = feed["asset_bg_" + InstantAds.CANVASWIDTH + "x" + InstantAds.CANVASHEIGHT];
    frame[0].querySelector(".dell_logo_img").src = feed.dell_logo_asset;
    frame[0].querySelector(".mdf_logo_img").src = feed.intel_logo_asset;
    //frame[0].querySelector(".intro_icon_img").src = feed["icon_url_" + InstantAds.CANVASWIDTH + "x" + InstantAds.CANVASHEIGHT];
    frame[0].querySelector(".intro_text").innerHTML = feed.header_asset;
    frame[0].querySelector(".intro_cta").innerHTML = feed.cta_asset_text;
    feedSuppliedURL = feed.destination_url;
    // Logic for instantAds mapping.
    frame[0].querySelector(".dell_logo").style.cssText += ';' + InstantAds.DELL_LOGO_CSS;
    frame[0].querySelector(".dell_logo_img").style.cssText += ';' + InstantAds.DELL_LOGO_IMAGE_CSS;
    frame[0].querySelector(".mdf_logo").style.cssText += ';' + InstantAds.MDF_LOGO_CSS;
    frame[0].querySelector(".mdf_logo_img").style.cssText += ';' + InstantAds.MDF_LOGO_IMAGE_CSS;
    //frame[0].querySelector(".intro_icon").style.cssText += ';' + InstantAds.ICON_CSS;
    //frame[0].querySelector(".intro_icon_img").style.cssText += ';' + InstantAds.ICON_IMAGE_CSS;
    frame[0].querySelector(".intro_text").style.cssText += ';' + InstantAds.INTRO_HEADER1_CSS;
    frame[0].querySelector(".intro_cta").style.cssText += ';' + InstantAds.CTA_CSS;
    // Append frame to slideshow container.
    myFT.$('#slideshow-container').append(frame[0]);
    // Resize header text.
    FTHelper.customResizeText(frame[0].querySelector(".intro_text"));
    // Add click event handler on slide.
    myFT.$("#slide" + sliderLength).on('click', function() {
      // Call click state event.
      var dataStringToTrackOnClick = encodeURIComponent(feed.friendly_name) + ',' + 'friendly_name';
      //Tracker.clickTrackEvent(dataStringToTrackOnClick);
      var tracker = new FTTracking();
      tracker.addQueryVarToClickTags("ft_custom", dataStringToTrackOnClick);
      myFT.clickTag(sliderLength + 1, feedSuppliedURL);
    });

    return frame;
  }

  /**
   * Add Intro frames to slider.
   * @param  {Object} feed Feed object.
   * @return
   */
  IntroFrame.prototype.addToSlider = function(feed) {
    let frame = null;
    frame = buildFrame(feed);
    if(frame) {
      slider.add(frame);
    }
  }

  /**
   * Remove template frame from DOM.
   * @return
   */
  IntroFrame.prototype.removeFrame = function() {
    introFrame.remove();
  }

  return IntroFrame;
});