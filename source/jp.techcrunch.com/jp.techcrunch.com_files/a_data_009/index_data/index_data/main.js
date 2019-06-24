/**
 * Main file requires FeedSetup and calls myFTInstantAdsHelper.
 * @param  {Module} FeedSetup Setup feeds and handles success/error cases.
 * @return
 */
myFT.require(["scripts/app/FeedSetup"], function(FeedSetup){
  // Create FeedSetup Object.
  var FeedSetupObj = new FeedSetup();
  // Call FeedSetup::myFTInstantAdsHelper method.
  FeedSetupObj.myFTInstantAdsHelper();
});
