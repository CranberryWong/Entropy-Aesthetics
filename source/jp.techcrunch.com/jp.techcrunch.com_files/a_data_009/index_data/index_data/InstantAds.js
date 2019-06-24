/**
 * Stores/Parses InstantAds from manifest.
 * @return {Module}
 */
myFT.define("scripts/app/InstantAds", function(){

  /**
   * Stores instantAds values from manifest.
   * @constructor
   */
  function InstantAds() {

  }
  // Time to display current frame.
  InstantAds.ANIMATION_DELAY = myFT.instantAds.animationDelay;
  // Time required for transition.
  InstantAds.TRANSITION_DELAY = myFT.instantAds.transitionDelay;
  // Timeout for back to back transactions.
  InstantAds.TRANSITION_PREPERATION_DELAY = 20;
  // Canvaswidth.
  InstantAds.CANVASWIDTH = myFT.instantAds.canvasWidth;
  // canvasHeight.
  InstantAds.CANVASHEIGHT = myFT.instantAds.canvasHeight;
  InstantAds.DELL_LOGO_CSS = myFT.instantAds.dellLogoCss;
  InstantAds.DELL_LOGO_IMAGE_CSS = myFT.instantAds.dellLogoImageCss;
  InstantAds.MDF_LOGO_CSS = myFT.instantAds.mdfLogoCss;
  InstantAds.MDF_LOGO_IMAGE_CSS = myFT.instantAds.mdfLogoImageCss;
  InstantAds.ICON_CSS = myFT.instantAds.iconCss;
  InstantAds.ICON_IMAGE_CSS = myFT.instantAds.iconImageCss;
  InstantAds.HEADER_CSS = myFT.instantAds.headerCss;
  InstantAds.INTRO_HEADER1_CSS = myFT.instantAds.introHeader1Css;
  InstantAds.CTA_CSS = myFT.instantAds.ctaCss;
  InstantAds.RIGHT_ARROW = myFT.instantAds.rightArrow;
  InstantAds.LEFT_ARROW = myFT.instantAds.leftArrow;
  InstantAds.RIGHT_ARROW_CSS = myFT.instantAds.rightArrowCss;
  InstantAds.LEFT_ARROW_CSS = myFT.instantAds.leftArrowCss;

  return InstantAds;
});
