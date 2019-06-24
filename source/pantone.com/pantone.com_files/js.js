Type.registerNamespace('Pantone');
Pantone.webServices=function() {
Pantone.webServices.initializeBase(this);
this._timeout = 0;
this._userContext = null;
this._succeeded = null;
this._failed = null;
}
Pantone.webServices.prototype={
_get_path:function() {
 var p = this.get_path();
 if (p) return p;
 else return Pantone.webServices._staticInstance.get_path();},
HelloWorld:function(test,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'HelloWorld',false,{test:test},succeededCallback,failedCallback,userContext); },
renderUC:function(controlName,p_id,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'renderUC',false,{controlName:controlName,p_id:p_id},succeededCallback,failedCallback,userContext); },
renderUCCart:function(controlName,p_id,p_code,p_price,p_qty,p_hex,p_colorID,p_sProductImageURL,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'renderUCCart',false,{controlName:controlName,p_id:p_id,p_code:p_code,p_price:p_price,p_qty:p_qty,p_hex:p_hex,p_colorID:p_colorID,p_sProductImageURL:p_sProductImageURL},succeededCallback,failedCallback,userContext); },
uploadFile:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'uploadFile',false,{},succeededCallback,failedCallback,userContext); },
insertEngravingInfo:function(txtLine1,txtLine2,swivelColor,BaseColor,isEngraved,logoType,upFileName,sModelNumber,Quantity,iEID,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'insertEngravingInfo',false,{txtLine1:txtLine1,txtLine2:txtLine2,swivelColor:swivelColor,BaseColor:BaseColor,isEngraved:isEngraved,logoType:logoType,upFileName:upFileName,sModelNumber:sModelNumber,Quantity:Quantity,iEID:iEID},succeededCallback,failedCallback,userContext); },
addToCart:function(iProductID,sModelNumber,iPrice,Quantity,iColorID,iAttributeID,iAffiliateID,iSizeID,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'addToCart',false,{iProductID:iProductID,sModelNumber:sModelNumber,iPrice:iPrice,Quantity:Quantity,iColorID:iColorID,iAttributeID:iAttributeID,iAffiliateID:iAffiliateID,iSizeID:iSizeID},succeededCallback,failedCallback,userContext); },
registerDigitalPrintLineItem:function(iAttributeID,sTransactionPost,sProductImageURL,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'registerDigitalPrintLineItem',false,{iAttributeID:iAttributeID,sTransactionPost:sTransactionPost,sProductImageURL:sProductImageURL},succeededCallback,failedCallback,userContext); },
callPantoneSimulatorEngine:function(sTransactionPost,bAddToCart,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'callPantoneSimulatorEngine',false,{sTransactionPost:sTransactionPost,bAddToCart:bAddToCart},succeededCallback,failedCallback,userContext); },
LoadEngravingInfo:function(iEngraveID,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'LoadEngravingInfo',false,{iEngraveID:iEngraveID},succeededCallback,failedCallback,userContext); },
getPromoDivForPage:function(iPageID,timezoneOffset,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'getPromoDivForPage',false,{iPageID:iPageID,timezoneOffset:timezoneOffset},succeededCallback,failedCallback,userContext); },
CoyItems:function(year,type,NextItemID,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'CoyItems',false,{year:year,type:type,NextItemID:NextItemID},succeededCallback,failedCallback,userContext); },
GetCategoryItems:function(mainCategoryID,subCategoryID,NextItemID,pagesize,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetCategoryItems',true,{mainCategoryID:mainCategoryID,subCategoryID:subCategoryID,NextItemID:NextItemID,pagesize:pagesize},succeededCallback,failedCallback,userContext); },
GetProducts:function(jSonIds,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetProducts',true,{jSonIds:jSonIds},succeededCallback,failedCallback,userContext); },
InsertFormSubmit:function(jsonString,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'InsertFormSubmit',true,{jsonString:jsonString},succeededCallback,failedCallback,userContext); },
LogFeedback:function(jsonString,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'LogFeedback',true,{jsonString:jsonString},succeededCallback,failedCallback,userContext); },
getPantoneLive_Spec:function(iSpecID,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'getPantoneLive_Spec',false,{iSpecID:iSpecID},succeededCallback,failedCallback,userContext); },
getPantoneLive_SpecList:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'getPantoneLive_SpecList',false,{},succeededCallback,failedCallback,userContext); },
errors:function(context,details,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'errors',false,{context:context,details:details},succeededCallback,failedCallback,userContext); },
getBasketTax:function(sCity,sState,sZip,sCountryCode,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'getBasketTax',false,{sCity:sCity,sState:sState,sZip:sZip,sCountryCode:sCountryCode},succeededCallback,failedCallback,userContext); },
getChipDriveStatus:function(sSku,iCurrencyID,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'getChipDriveStatus',false,{sSku:sSku,iCurrencyID:iCurrencyID},succeededCallback,failedCallback,userContext); },
getSKUStatus:function(sSku,iCurrencyID,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'getSKUStatus',false,{sSku:sSku,iCurrencyID:iCurrencyID},succeededCallback,failedCallback,userContext); },
getPantoneChips:function(jSonIds,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'getPantoneChips',false,{jSonIds:jSonIds},succeededCallback,failedCallback,userContext); },
getReplacementPagesForColorSystem:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'getReplacementPagesForColorSystem',false,{},succeededCallback,failedCallback,userContext); },
getProductMatrix:function(sProductIDs,sRequestID,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'getProductMatrix',true,{sProductIDs:sProductIDs,sRequestID:sRequestID},succeededCallback,failedCallback,userContext); },
checkEmailAdressForCustomer:function(sEmail,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'checkEmailAdressForCustomer',true,{sEmail:sEmail},succeededCallback,failedCallback,userContext); }}
Pantone.webServices.registerClass('Pantone.webServices',Sys.Net.WebServiceProxy);
Pantone.webServices._staticInstance = new Pantone.webServices();
Pantone.webServices.set_path = function(value) { Pantone.webServices._staticInstance.set_path(value); }
Pantone.webServices.get_path = function() { return Pantone.webServices._staticInstance.get_path(); }
Pantone.webServices.set_timeout = function(value) { Pantone.webServices._staticInstance.set_timeout(value); }
Pantone.webServices.get_timeout = function() { return Pantone.webServices._staticInstance.get_timeout(); }
Pantone.webServices.set_defaultUserContext = function(value) { Pantone.webServices._staticInstance.set_defaultUserContext(value); }
Pantone.webServices.get_defaultUserContext = function() { return Pantone.webServices._staticInstance.get_defaultUserContext(); }
Pantone.webServices.set_defaultSucceededCallback = function(value) { Pantone.webServices._staticInstance.set_defaultSucceededCallback(value); }
Pantone.webServices.get_defaultSucceededCallback = function() { return Pantone.webServices._staticInstance.get_defaultSucceededCallback(); }
Pantone.webServices.set_defaultFailedCallback = function(value) { Pantone.webServices._staticInstance.set_defaultFailedCallback(value); }
Pantone.webServices.get_defaultFailedCallback = function() { return Pantone.webServices._staticInstance.get_defaultFailedCallback(); }
Pantone.webServices.set_enableJsonp = function(value) { Pantone.webServices._staticInstance.set_enableJsonp(value); }
Pantone.webServices.get_enableJsonp = function() { return Pantone.webServices._staticInstance.get_enableJsonp(); }
Pantone.webServices.set_jsonpCallbackParameter = function(value) { Pantone.webServices._staticInstance.set_jsonpCallbackParameter(value); }
Pantone.webServices.get_jsonpCallbackParameter = function() { return Pantone.webServices._staticInstance.get_jsonpCallbackParameter(); }
Pantone.webServices.set_path("/webservices/webServices.asmx");
Pantone.webServices.HelloWorld= function(test,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.HelloWorld(test,onSuccess,onFailed,userContext); }
Pantone.webServices.renderUC= function(controlName,p_id,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.renderUC(controlName,p_id,onSuccess,onFailed,userContext); }
Pantone.webServices.renderUCCart= function(controlName,p_id,p_code,p_price,p_qty,p_hex,p_colorID,p_sProductImageURL,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.renderUCCart(controlName,p_id,p_code,p_price,p_qty,p_hex,p_colorID,p_sProductImageURL,onSuccess,onFailed,userContext); }
Pantone.webServices.uploadFile= function(onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.uploadFile(onSuccess,onFailed,userContext); }
Pantone.webServices.insertEngravingInfo= function(txtLine1,txtLine2,swivelColor,BaseColor,isEngraved,logoType,upFileName,sModelNumber,Quantity,iEID,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.insertEngravingInfo(txtLine1,txtLine2,swivelColor,BaseColor,isEngraved,logoType,upFileName,sModelNumber,Quantity,iEID,onSuccess,onFailed,userContext); }
Pantone.webServices.addToCart= function(iProductID,sModelNumber,iPrice,Quantity,iColorID,iAttributeID,iAffiliateID,iSizeID,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.addToCart(iProductID,sModelNumber,iPrice,Quantity,iColorID,iAttributeID,iAffiliateID,iSizeID,onSuccess,onFailed,userContext); }
Pantone.webServices.registerDigitalPrintLineItem= function(iAttributeID,sTransactionPost,sProductImageURL,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.registerDigitalPrintLineItem(iAttributeID,sTransactionPost,sProductImageURL,onSuccess,onFailed,userContext); }
Pantone.webServices.callPantoneSimulatorEngine= function(sTransactionPost,bAddToCart,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.callPantoneSimulatorEngine(sTransactionPost,bAddToCart,onSuccess,onFailed,userContext); }
Pantone.webServices.LoadEngravingInfo= function(iEngraveID,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.LoadEngravingInfo(iEngraveID,onSuccess,onFailed,userContext); }
Pantone.webServices.getPromoDivForPage= function(iPageID,timezoneOffset,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.getPromoDivForPage(iPageID,timezoneOffset,onSuccess,onFailed,userContext); }
Pantone.webServices.CoyItems= function(year,type,NextItemID,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.CoyItems(year,type,NextItemID,onSuccess,onFailed,userContext); }
Pantone.webServices.GetCategoryItems= function(mainCategoryID,subCategoryID,NextItemID,pagesize,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.GetCategoryItems(mainCategoryID,subCategoryID,NextItemID,pagesize,onSuccess,onFailed,userContext); }
Pantone.webServices.GetProducts= function(jSonIds,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.GetProducts(jSonIds,onSuccess,onFailed,userContext); }
Pantone.webServices.InsertFormSubmit= function(jsonString,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.InsertFormSubmit(jsonString,onSuccess,onFailed,userContext); }
Pantone.webServices.LogFeedback= function(jsonString,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.LogFeedback(jsonString,onSuccess,onFailed,userContext); }
Pantone.webServices.getPantoneLive_Spec= function(iSpecID,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.getPantoneLive_Spec(iSpecID,onSuccess,onFailed,userContext); }
Pantone.webServices.getPantoneLive_SpecList= function(onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.getPantoneLive_SpecList(onSuccess,onFailed,userContext); }
Pantone.webServices.errors= function(context,details,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.errors(context,details,onSuccess,onFailed,userContext); }
Pantone.webServices.getBasketTax= function(sCity,sState,sZip,sCountryCode,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.getBasketTax(sCity,sState,sZip,sCountryCode,onSuccess,onFailed,userContext); }
Pantone.webServices.getChipDriveStatus= function(sSku,iCurrencyID,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.getChipDriveStatus(sSku,iCurrencyID,onSuccess,onFailed,userContext); }
Pantone.webServices.getSKUStatus= function(sSku,iCurrencyID,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.getSKUStatus(sSku,iCurrencyID,onSuccess,onFailed,userContext); }
Pantone.webServices.getPantoneChips= function(jSonIds,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.getPantoneChips(jSonIds,onSuccess,onFailed,userContext); }
Pantone.webServices.getReplacementPagesForColorSystem= function(onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.getReplacementPagesForColorSystem(onSuccess,onFailed,userContext); }
Pantone.webServices.getProductMatrix= function(sProductIDs,sRequestID,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.getProductMatrix(sProductIDs,sRequestID,onSuccess,onFailed,userContext); }
Pantone.webServices.checkEmailAdressForCustomer= function(sEmail,onSuccess,onFailed,userContext) {Pantone.webServices._staticInstance.checkEmailAdressForCustomer(sEmail,onSuccess,onFailed,userContext); }
Type.registerNamespace('PantoneTypes.Pantone.COY.Objects');
if (typeof(PantoneTypes.Pantone.COY.Objects.ItemTypeID) === 'undefined') {
PantoneTypes.Pantone.COY.Objects.ItemTypeID = function() { throw Error.invalidOperation(); }
PantoneTypes.Pantone.COY.Objects.ItemTypeID.prototype = {gallery: 1,mood: 2}
PantoneTypes.Pantone.COY.Objects.ItemTypeID.registerEnum('PantoneTypes.Pantone.COY.Objects.ItemTypeID', true);
}
