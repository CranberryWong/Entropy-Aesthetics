EBG=window.EBG||{};if(EBG.declareNamespace){EBG.declareNamespace("Research");}EBG.Research=function (reportCallback){this._reportCallback=reportCallback;this._collectMouseInfo();};EBG.Research.prototype={MOUSE_MOVE_THRESHOLD:500,MOUSE_MOVE_INTERVAL:500,_mouseRunsLeft:10,_mouseCount:0,_collectMouseInfo:function (){EBG.Research.mouseMoveFunction =this._handleMouseMove.bind(null,this);EBG.Research.addEventListener(window,"mousemove",EBG.Research.mouseMoveFunction);this.EBMouseMoveHandler=function (){this._reportCallback({mouseMoveCount:this.getMouseMoveCount()});this._mouseRunsLeft--;if(this._mouseRunsLeft>0){EBG.runTimed(this,this.EBMouseMoveHandler,[],this.MOUSE_MOVE_INTERVAL);}else{EBG.Research.removeEventListener(window,"mousemove",EBG.Research.mouseMoveFunction);}};EBG.runTimed(this,this.EBMouseMoveHandler,[],this.MOUSE_MOVE_INTERVAL);},_handleMouseMove:function ($this,event){$this._mouseCount++;if($this._mouseCount>=$this.MOUSE_MOVE_THRESHOLD){EBG.Research.removeEventListener(window,"mousemove",EBG.Research.mouseMoveFunction);}},getMouseMoveCount:function (){return this._mouseCount;}};EBG.Research.addEventListener=EBG.adaptor&&EBG.adaptor._addEventListener?EBG.adaptor._addEventListener:function (target,eventName,callback){if(window.addEventListener){target.addEventListener(eventName,callback,false);}else if(window.attachEvent){target.attachEvent("on"+eventName,callback);}};EBG.Research.removeEventListener=EBG.adaptor&&EBG.adaptor._removeEventListener?EBG.adaptor._removeEventListener:function (target,eventName,callback){if(window.removeEventListener){target.removeEventListener(eventName,callback,false);}else if(window.detachEvent){target.detachEvent("on"+eventName,callback);}};if(EBG.declareClass){EBG.declareClass(EBG.Research,null);}