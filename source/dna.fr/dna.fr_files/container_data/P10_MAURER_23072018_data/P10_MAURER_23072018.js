(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [
		{name:"P10_MAURER_23072018_atlas_NP_", frames: [[0,0,234,90],[0,92,101,122]]}
];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



(lib.fond = function() {
	this.spriteSheet = ss["P10_MAURER_23072018_atlas_NP_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.logomaurer = function() {
	this.initialize(img.logomaurer);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,259,50);


(lib.LOGO_AB_BIO = function() {
	this.spriteSheet = ss["P10_MAURER_23072018_atlas_NP_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbole14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgxBOIAAibIBhAAIAAAnIg9AAIAAAUIA3AAIAAAkIg3AAIAAAUIA+AAIAAAog");
	this.shape.setTransform(169.5,38.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AAjBOIAAhjIgBAAIgUBjIgbAAIgUhjIAAAAIAABjIgjAAIAAibIA0AAIAQBbIAAAAIARhbIA0AAIAACbg");
	this.shape_1.setTransform(154.3,38.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AATBOIgCgLIgBgNQAAgIgCgGQgBgIgDgDQgDgFgHAAIgSAAIAAA2IgkAAIAAibIBDAAQALAAAIAEQAJAGAFAKQAFAKABAPIgCAPQgCAJgEAFQgEAFgGAEQAIADAEALQAEAKACAPIAAALIABANQAAAFACAEgAgSgJIASAAIAHgBQAEgBACgDQADgEAAgGQgBgIgEgEQgDgEgJAAIgRAAg");
	this.shape_2.setTransform(139.4,38.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AgwBOIAAibIBgAAIAAAnIg8AAIAAAUIA2AAIAAAkIg2AAIAAAUIA+AAIAAAog");
	this.shape_3.setTransform(125.7,38.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AgtBOIAAibIBbAAIAAAnIg3AAIAAAUIAvAAIAAAkIgvAAIAAA8g");
	this.shape_4.setTransform(113.4,38.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AAXBOIgFgWIgkAAIgFAWIglAAIAsibIAiAAIArCbgAALAXIgKgwIgBAAIgKAwIAVAAg");
	this.shape_5.setTransform(93.4,38.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AgrBOIAAibIAkAAIAABzIAzAAIAAAog");
	this.shape_6.setTransform(81,38.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AgwBOIAAibIBgAAIAAAnIg8AAIAAAUIA2AAIAAAkIg2AAIAAAUIA+AAIAAAog");
	this.shape_7.setTransform(61.5,38.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("Ag3BOIAAibIA6AAQAPgBAKAHQAKAHAGAKQAHAMACAOQADAOAAAOQAAAYgGARQgHASgNAKQgOAKgTgBgAgTAmIAOAAQAHAAAGgEQAFgEACgGQADgGABgGIABgMIgBgKQgBgGgDgGQgCgHgGgEQgGgEgJgBIgLAAg");
	this.shape_8.setTransform(47.8,38.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AgLBRQgGgBgHgDQgHgDgHgHQgGgGgEgKQgEgKAAgQIAkAAIABAGIABAFQACAHAEACQAGACAEAAIAGgBQAEgBACgDQADgDAAgGQAAgEgCgDQgDgCgFgCIgPgHIgNgGQgIgCgGgGQgGgDgDgIQgDgHgBgMQAAgOAEgKQAFgKAGgGQAHgGAIgEQAJgDAJAAQAMAAALAGQALAFAHAKQAGAMABATIgiAAQAAgEgBgDQgBgEgDgCIgEgDIgFAAIgGAAIgFADQgCACAAAFQAAAFAFAEQAFADAHADIAQAFQAIACAIAGQAHAFAFAIQAFAJAAAOQAAAPgFALQgEAKgJAGQgHAHgKACQgKADgJAAIgKgBg");
	this.shape_9.setTransform(157.9,14.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF0000").s().p("AgwBPIAAidIBgAAIAAApIg8AAIAAATIA2AAIAAAkIg2AAIAAAUIA+AAIAAApg");
	this.shape_10.setTransform(145.2,14.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF0000").s().p("AgrBPIAAidIAkAAIAAB0IAzAAIAAApg");
	this.shape_11.setTransform(132.7,14.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF0000").s().p("AgrBPIAAidIAkAAIAAB0IAzAAIAAApg");
	this.shape_12.setTransform(120.9,14.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF0000").s().p("AgRBPIAAidIAjAAIAACdg");
	this.shape_13.setTransform(111.3,14.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF0000").s().p("AgRBPIAAh0IghAAIAAgpIBlAAIAAApIghAAIAAB0g");
	this.shape_14.setTransform(101.5,14.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF0000").s().p("AATBPIgCgMIgBgNQAAgHgCgHQgBgHgCgFQgEgEgHAAIgTAAIAAA3IgkAAIAAidIBEAAQALABAIAEQAJAFAGALQAEAJAAAPIgBAQQgCAIgEAHQgEAFgGADQAHADAFALQAEAKABAPIABAKIABAOQABAGACAEgAgTgJIATAAIAGgBQAFgBACgDQADgDgBgIQAAgHgDgEQgEgEgKAAIgRAAg");
	this.shape_15.setTransform(89.1,14.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF0000").s().p("AgRBPIAAg7IgqhiIAoAAIATA7IAUg7IAoAAIgqBiIAAA7g");
	this.shape_16.setTransform(75.6,14.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF0000").s().p("AAiBPIAAhkIAAAAIgUBkIgaAAIgVhkIAAAAIAABkIgiAAIAAidIAzAAIAQBcIAAAAIARhcIA0AAIAACdg");
	this.shape_17.setTransform(60.9,14.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#FFCB65").ss(1,1,1).p("AxGjgMAiNAAAIAAHBMgiNAAAg");
	this.shape_18.setTransform(109.5,25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFCB65").s().p("AxGDhIAAnBMAiNAAAIAAHBg");
	this.shape_19.setTransform(109.5,25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbole14, new cjs.Rectangle(-13,-1,244,54.1), null);


(lib.Symbole13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgQBDQgHgDgGgGQgGgGgCgLQgDgLAAgdQAAgWACgLQABgLADgHQAEgJAKgFQAJgEAMAAQASAAAKAJQAKAJAAAQIAAABIgdAAQAAgHgDgDQgCgDgEAAQgFAAgCAFQgCAFAAAMIAAAGIAAADIAJgEQAFgCAFAAQAPAAAHALQAIAKAAAVQAAAYgKAMQgKAMgUAAQgJAAgIgCgAgHAGQgCAFAAANQAAAMACAFQADAFAFAAQAFAAACgFQACgEAAgOQAAgNgCgEQgDgFgFAAQgFAAgCAFg");
	this.shape.setTransform(169.6,77.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgcA7QgLgLAAgTQAAgMAEgJQAEgIAJgFQgIgFgDgGQgEgHAAgKQAAgQAKgKQAKgJARAAQASAAAKAJQAKAKAAAQQAAAKgEAHQgDAGgIAFQAIAFAFAIQAEAJAAAMQAAATgLALQgKAKgTAAQgSAAgKgKgAgHALQgDAFAAAKQAAAKADAFQADAFAEAAQAGAAACgFQADgEAAgLQAAgKgDgFQgCgFgGAAQgFAAgCAFgAgHgrQgCAEAAAHQAAAIADAEQADAFADAAQAFAAADgFQADgEAAgIQAAgHgDgEQgDgEgFAAQgEAAgDAEg");
	this.shape_1.setTransform(160,77.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgnBEIAAgCQAAgIABgHIAGgPQAGgQAQgQIAEgDIABgBQAQgRAAgOQAAgGgDgDQgDgEgEAAQgFAAgDAGQgEAFAAAMIAAACIgcAAIAAgDQABgWAKgMQALgLATAAQASAAALAKQAKAKgBASQAAAKgEAKQgEAJgKAJIgGAGQgQAQgEALIAsAAIAAAag");
	this.shape_2.setTransform(145.4,76.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AACBDIAAgaIgsAAIAAgaIAqhRIAfAAIAABUIAMAAIAAAXIgMAAIAAAagAgSASIAXAAIAAg1g");
	this.shape_3.setTransform(135.8,77.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgcA7QgLgLAAgTQAAgMAEgJQAEgIAJgFQgIgFgDgGQgEgHAAgKQAAgQAKgKQAKgJARAAQASAAAKAJQAKAKAAAQQAAAKgEAHQgDAGgIAFQAIAFAFAIQAEAJAAAMQAAATgLALQgKAKgTAAQgSAAgKgKgAgHALQgDAFAAAKQAAAKADAFQADAFAEAAQAGAAACgFQADgEAAgLQAAgKgDgFQgCgFgGAAQgFAAgCAFgAgHgrQgCAEAAAHQAAAIADAEQADAFADAAQAFAAADgFQADgEAAgIQAAgHgDgEQgDgEgFAAQgEAAgDAEg");
	this.shape_4.setTransform(121.3,77.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgeA6QgKgLAAgVIAAgCIAAgCIAcAAQABANADAFQACAGAFAAQAFAAACgFQADgFAAgKQAAgKgFgFQgEgEgLAAIgDAAIgBAAIAAgUIACAAQALAAAFgEQAEgFAAgKQAAgGgCgEQgDgEgDAAQgFAAgCAFQgCAEgBALIgcAAIAAgCQAAgTALgLQALgKARAAQAQAAALAJQALAKAAAPQgBAKgEAHQgFAIgJAFQALAEAGAIQAFAIAAAMQAAAUgLAKQgLALgTAAQgTAAgLgLg");
	this.shape_5.setTransform(111.7,77.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgcA7QgLgLAAgTQAAgMAEgJQAEgIAJgFQgIgFgDgGQgEgHAAgKQAAgQAKgKQAKgJARAAQASAAAKAJQAKAKAAAQQAAAKgEAHQgDAGgIAFQAIAFAFAIQAEAJAAAMQAAATgLALQgKAKgTAAQgSAAgKgKgAgHALQgDAFAAAKQAAAKADAFQADAFAEAAQAGAAACgFQADgEAAgLQAAgKgDgFQgCgFgGAAQgFAAgCAFgAgHgrQgCAEAAAHQAAAIADAEQADAFADAAQAFAAADgFQADgEAAgIQAAgHgDgEQgDgEgFAAQgEAAgDAEg");
	this.shape_6.setTransform(97.2,77.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgcA7QgLgLAAgTQAAgMAEgJQAEgIAJgFQgIgFgDgGQgEgHAAgKQAAgQAKgKQAKgJARAAQASAAAKAJQAKAKAAAQQAAAKgEAHQgDAGgIAFQAIAFAFAIQAEAJAAAMQAAATgLALQgKAKgTAAQgSAAgKgKgAgHALQgDAFAAAKQAAAKADAFQADAFAEAAQAGAAACgFQADgEAAgLQAAgKgDgFQgCgFgGAAQgFAAgCAFgAgHgrQgCAEAAAHQAAAIADAEQADAFADAAQAFAAADgFQADgEAAgIQAAgHgDgEQgDgEgFAAQgEAAgDAEg");
	this.shape_7.setTransform(87.5,77.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgdA6QgLgLAAgVIAAgCIAAgCIAdAAQAAANACAFQADAGAGAAQADAAAEgFQACgFAAgKQAAgKgEgFQgFgEgLAAIgDAAIgCAAIAAgUIADAAQAMAAADgEQAFgFAAgKQAAgGgCgEQgDgEgCAAQgGAAgCAFQgDAEAAALIgbAAIAAgCQAAgTAKgLQAKgKASAAQAQAAALAJQAKAKAAAPQABAKgFAHQgFAIgKAFQAMAEAFAIQAGAIAAAMQAAAUgLAKQgLALgTAAQgTAAgKgLg");
	this.shape_8.setTransform(73.1,77.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgUBBQgJgEgFgJQgDgFgCgLQgBgMAAgYQAAgYABgLQACgLAEgGQAFgIAJgEQAIgEALAAQAMAAAIAEQAJAEAFAIQAEAGACAKQABALAAAUIgBAgQAAALgCAHQgDALgKAHQgLAGgOAAQgLAAgJgEgAgHgmQgDAGAAAXIAAAJIAAAKQAAAXADAGQACAGAFAAQAGAAACgGQADgGAAgXIAAgKIAAgLQAAgWgDgGQgCgGgGAAQgFAAgCAHg");
	this.shape_9.setTransform(63.4,77.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgkBEIAAiHIBJAAIAAAbIgpAAIAAAYIAlAAIAAAbIglAAIAAA5g");
	this.shape_10.setTransform(222.2,57.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAJBEIgCgJIAAgKIAAgIIAAgGQAAgMgDgFQgEgEgHAAIgGAAIAAA2IggAAIAAiHIAkAAQAQAAAIACQAIACAFAEQAGAEADAHQADAHAAAKQAAAMgEAHQgFAIgIAEQAOAHABAYIAAABIAAAHQABAXAHAGgAgNgKIACAAIABAAQAKAAADgEQAEgEAAgJQAAgJgEgEQgDgDgKAAIgBAAIgCAAg");
	this.shape_11.setTransform(212.5,57.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgWBDQgJgFgGgJQgEgGgCgMQgBgKAAgZQAAgXABgMQACgLAEgHQAGgIAJgEQAKgFAMAAQANAAAJAFQAKAEAFAIQAFAHABALQACAMAAAXQAAAYgCALQgBALgFAHQgFAJgKAFQgJAEgNAAQgMAAgKgEgAgJgnQgDAGAAAWIAAAXQAAAWADAGQACAFAHAAQAHAAADgFQADgGAAgWIAAgXQAAgXgDgFQgDgFgHgBQgHABgCAFg");
	this.shape_12.setTransform(201.5,57.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgPBEIAAhsIgaAAIAAgbIBTAAIAAAbIgbAAIAABsg");
	this.shape_13.setTransform(191.7,57.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgiBEIAAiHIAgAAIAABrIAlAAIAAAcg");
	this.shape_14.setTransform(185,57.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AARBEIgEgaIgYAAIgEAaIggAAIAeiHIAkAAIAdCHgAgIARIARAAIgJg6g");
	this.shape_15.setTransform(175.4,57.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgCA/QgGgDgDgFQgCgDgBgGIgBgQIAAgMIAAghIgLAAIAAgVIALAAIAAgdIAcAAIAAAdIAOAAIAAAVIgOAAIAAAoQAAANACADQACADAFAAIAEAAIABAAIAAAUIgKABIgGABQgJAAgEgDg");
	this.shape_16.setTransform(162.6,57.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgQAzQgIgDgDgEQgGgFgCgJQgBgJAAgUQAAgUABgJQACgIAGgGQAEgFAIgDQAHgCAJAAQAKAAAIACQAHADAEAGQAFAFABAGQACAHgBAQIAAALIgtAAIAAABIAAAJQAAALACAEQACAEAFAAQAFAAADgDQACgDAAgHIgBgEIAAgBIAbAAIAAADQAAARgKAKQgIAJgTAAQgIAAgIgDgAgFgeQgCAEAAAIIAAADIAAACIASAAIAAAAIAAgGQABgHgDgEQgDgDgFAAQgDAAgDADg");
	this.shape_17.setTransform(155.2,59.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAfBEIAChoIgVBoIgXAAIgWhoIADBoIgeAAIAAiHIAtAAIAMA6IABAKIACAVIADgUIACgLIAMg6IAsAAIAACHg");
	this.shape_18.setTransform(138.7,57.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgPBEIAAiHIAfAAIAACHg");
	this.shape_19.setTransform(128.9,57.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgkBEIAAiHIBJAAIAAAbIgpAAIAAAZIAmAAIAAAaIgmAAIAAAdIApAAIAAAcg");
	this.shape_20.setTransform(121.6,57.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AANBEIAAg4IgZAAIAAA4IgfAAIAAiHIAfAAIAAA0IAZAAIAAg0IAfAAIAACHg");
	this.shape_21.setTransform(111.4,57.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgdA9QgLgLAAgVIAAgDIAAgEIAeAAIAAADQAAAMACAFQADAEAFAAQAFAAADgEQADgDgBgGQABgKgNgJIgEgCIgCgCQgSgLgFgHQgDgEgCgHQgCgGAAgHQAAgSAKgKQALgKARAAQATAAAKAKQALAKAAATIgBACIAAACIgcAAIAAgBQAAgKgCgEQgEgEgEgBQgEAAgDADQgDAEABAFQAAAIAOAKIAEADIADADQASAKAEAGQADAFABAGQACAFAAAHQAAAVgLALQgKALgUAAQgUAAgJgKg");
	this.shape_22.setTransform(101.2,57.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgPBEIAAiHIAfAAIAACHg");
	this.shape_23.setTransform(93.8,57.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgiBEIAAiHIAgAAIAABrIAlAAIAAAcg");
	this.shape_24.setTransform(87.3,57.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAJBEIgCgJIAAgKIAAgIIAAgGQAAgMgDgFQgEgEgHAAIgGAAIAAA2IggAAIAAiHIAkAAQAQAAAIACQAIACAFAEQAGAEADAHQADAHAAAKQAAAMgEAHQgFAIgIAEQAOAHABAYIAAABIAAAHQABAXAHAGgAgNgKIACAAIABAAQAKAAADgEQAEgEAAgJQAAgJgEgEQgDgDgKAAIgBAAIgCAAg");
	this.shape_25.setTransform(77.9,57.4);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgWBDQgJgFgGgJQgEgGgCgMQgBgKAAgZQAAgXABgMQACgLAEgHQAGgIAJgEQAKgFAMAAQANAAAJAFQAKAEAFAIQAFAHABALQACAMAAAXQAAAYgCALQgBALgFAHQgFAJgKAFQgJAEgNAAQgMAAgKgEgAgJgnQgDAGAAAWIAAAXQAAAWADAGQACAFAHAAQAHAAADgFQADgGAAgWIAAgXQAAgXgDgFQgDgFgHgBQgHABgCAFg");
	this.shape_26.setTransform(66.8,57.4);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgqBEIAAiHIAjAAQASAAAKAEQAJADAFAIQAEAGACAKQACAKAAAaQAAAbgCAKQgCAKgEAGQgFAIgJADQgKAEgSAAgAgKArIACAAIADAAQAFAAACgBIAGgFQABgCABgHIABgcIAAgFIgBgXQgBgGgBgCQgCgDgEgBQgCgCgGAAIgCABIgCAAg");
	this.shape_27.setTransform(56.3,57.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgQAzQgHgDgEgEQgGgFgBgJQgCgJAAgUQAAgUACgJQABgIAGgGQAFgFAHgDQAIgCAIAAQAKAAAIACQAHADAEAGQAEAFACAGQABAHABAQIAAALIgtAAIAAABIgBAJQAAALACAEQADAEAEAAQAFAAADgDQACgDAAgHIAAgEIAAgBIAaAAIAAADQAAARgJAKQgJAJgTAAQgIAAgIgDgAgFgeQgCAEAAAIIAAADIAAACIASAAIAAAAIAAgGQAAgHgCgEQgDgDgEAAQgEAAgDADg");
	this.shape_28.setTransform(41.6,59.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgXA0IAAhlIAZAAIAAAOQAEgHAGgEQAGgEAGgBIAAAgIgEAAIgEgBQgHAAgDAFQgCAFAAANIAAAxg");
	this.shape_29.setTransform(34.3,59);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgCA/QgGgDgDgFQgCgDgBgGIgBgQIAAgMIAAghIgLAAIAAgVIALAAIAAgdIAcAAIAAAdIAOAAIAAAVIgOAAIAAAoQAAANACADQACADAFAAIAEAAIABAAIAAAUIgKABIgGABQgJAAgEgDg");
	this.shape_30.setTransform(27.9,57.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAJA0IAAg+QAAgMgCgDQgBgDgEAAQgEAAgDAEQgDAFAAAIIAAA/IgcAAIAAhlIAbAAIAAAMQAEgHAFgEQAGgDAIAAQAMAAAFAIQAGAIAAARIAABGg");
	this.shape_31.setTransform(20.4,59);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgkBEIAAiHIBJAAIAAAbIgpAAIAAAZIAmAAIAAAaIgmAAIAAAdIApAAIAAAcg");
	this.shape_32.setTransform(11.1,57.4);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#000000").ss(1,1,1).p("AR0DmMgjnAAAIAAnLMAjnAAAg");
	this.shape_33.setTransform(117.5,67);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFCC66").s().p("AxzDmIAAnLMAjnAAAIAAHLg");
	this.shape_34.setTransform(117.5,67);

	this.instance = new lib.logomaurer();
	this.instance.parent = this;
	this.instance.setTransform(1.9,0,0.903,0.899);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbole13, new cjs.Rectangle(0,0,235.9,91), null);


(lib.Symbole9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgVBIQgLgDgGgIQgHgJgBgPIAAgEIAkgDIAAADQABAJADADQAEAEAEgBQAGAAADgFQADgDgBgGQgBgJgGgDQgGgEgIgDQgJgCgJgEQgJgEgHgHQgGgIgCgPQgCgVALgNQALgMAXgCQAXgCAMAJQAMAKACAXIgjADIAAgEQgBgGgDgFQgDgEgEABQgGAAgCAEQgDAEAAAFQABAJAHAEQAGADAJADIASAGQAKAEAHAIQAGAIACAPQACAXgMALQgMANgZACIgHAAQgKAAgIgCg");
	this.shape.setTransform(214.4,67.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgwhDIBTgGIACAeIguADIADAZIArgEIACAcIgrAEIADAcIAwgEIACAeIhVAHg");
	this.shape_1.setTransform(204.2,68.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgVBIQgLgDgGgIQgHgJgBgPIAAgEIAkgDIAAADQABAJADADQAEAEAEgBQAGAAADgFQADgDgBgGQgBgJgGgDQgGgEgIgDQgJgCgJgEQgJgEgHgHQgGgIgCgPQgCgVALgNQALgMAXgCQAXgCAMAJQAMAKACAXIgjADIAAgEQgBgGgDgFQgDgEgEABQgGAAgCAEQgDAEAAAFQABAJAHAEQAGADAJADIASAGQAKAEAHAIQAGAIACAPQACAXgMALQgMANgZACIgHAAQgKAAgIgCg");
	this.shape_2.setTransform(193.8,69.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgYhEIAkgEIANCNIgkAEg");
	this.shape_3.setTransform(185.7,69.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ag4hDIA5gFQAOgBAJADQAJAFAFAIQAEAIABALQABAOgEAKQgGAJgMADIAAABQANgBAGAIQAGAHABAPIABAMIABAHIABAIIABAEIACACIADACIAAACIgnAEQgCgEgCgFIgBgKIgBgIIgBgKIgDgMQAAgEgEgCIgGgBIgKABIAGA5IgmADgAgKgsIgHAAIAEAiIAHgBQAGgBAEgFQAEgFgBgHQgBgJgEgDQgCgEgGAAIgEABg");
	this.shape_4.setTransform(177.7,70.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgwhCIBTgHIACAdIguAFIADAYIArgEIACAcIgrAEIADAcIAwgFIACAfIhVAHg");
	this.shape_5.setTransform(166.9,71.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgYBFQgMgGgFgQQgGgQgCgbQgCgaADgRQADgQALgIQALgIATgCQAPgCALAFQALAFAFAJQAFAKACAOIAAAJIgkADIAAgIQgBgMgDgEQgDgFgEABQgGAAgCAFQgDAEAAALQAAALADASQABATACAKQACALACAEQADAEAFgBQAFABACgEQACgDAAgIIgBgVIAkgDIABAKQABAUgFALQgGALgKAGQgKAFgNABIgHAAQgOAAgKgFg");
	this.shape_6.setTransform(156.5,72.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgZA5QgGgCgFgGQgEgGgCgMIgHhQIAkgEIAHBHQABAGABADQADADAEAAQAEgBACgDQACgDgBgHIgGhGIAkgDIAJBrIgiADIgCgNQgCAIgHAFQgGAEgIABIgDAAQgGAAgGgBg");
	this.shape_7.setTransform(140.8,75.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgTA3QgKgEgFgIQgGgHgCgKIgDgWQgBgKABgKQAAgKAFgJQADgIAJgFQAJgGAPgCQAPgBAJAEQAKADAFAIQAFAHADAKIADAWIAAAUQgBAKgEAJQgEAIgIAGQgJAFgPACIgHAAQgKAAgHgCgAgIgeQgCAEAAAHIABAUIACAVQACAHACACQADADADgBQAEABACgEQABgDABgHQAAgHgBgNIgDgUQgBgIgDgDQgCgCgDAAQgEABgCACg");
	this.shape_8.setTransform(130.7,76.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgVBIQgLgDgGgIQgHgJgBgPIAAgEIAkgDIAAADQABAJADADQAEAEAEgBQAGAAADgFQADgDgBgGQgBgJgGgDQgGgEgIgDQgJgCgJgEQgJgEgHgHQgGgIgCgPQgCgVALgNQALgMAXgCQAXgCAMAJQAMAKACAXIgjADIAAgEQgBgGgDgFQgDgEgEABQgGAAgCAEQgDAEAAAFQABAJAHAEQAGADAJADIASAGQAKAEAHAIQAGAIACAPQACAXgMALQgMANgZACIgHAAQgKAAgIgCg");
	this.shape_9.setTransform(115.1,76.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgwhDIBTgHIACAfIguADIADAZIArgEIACAcIgrAEIADAcIAwgEIACAeIhVAIg");
	this.shape_10.setTransform(104.9,77.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("Ag0hEIA1gEQAPgCAKAFQAKAFAFAKQAFAKACAMIAEAbIABAZQAAAOgEAKQgCAKgJAHQgJAGgQACIg1AEgAgFgtIgIABIAIBYIAGgBQAGAAADgCQADgCABgFQABgFAAgJIgBgWIgDgXQgBgJgCgFQgDgEgDgBIgEgBIgDAAg");
	this.shape_11.setTransform(93.8,78.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("Ag3hCIApgDIAeBUIABAAIgIhWIAjgDIAMCNIgoADIgfhVIgBAAIAIBXIgjADg");
	this.shape_12.setTransform(82.4,79);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgXBFQgMgGgGgRQgHgPgCgbQgCgZADgRQADgRALgIQALgIATgCQARgCAMAHQAMAGAGAQQAGAQADAaQACAagDAQQgEARgKAJQgLAIgTACIgHAAQgNAAgJgFgAgDgwQgGAAgCAFQgDAEAAALQAAALADASQABATACAKQACALACAEQADAEAFgBQAGAAACgEQADgFgBgLIgBgcIgEgeQgCgLgDgEQgCgDgEAAIgBAAg");
	this.shape_13.setTransform(70.9,80);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("Ag4hDIA5gFQAOgBAJADQAJAFAEAIQAGAIABALQABAOgGAKQgFAJgMADIAAABQANgBAGAIQAGAHABAPIABAMIABAHIABAIIACAEIABACIADACIAAACIgnAEQgDgEAAgFIgCgKIgCgIIAAgKIgCgMQgCgEgDgCIgGgBIgJABIAEA5IglADgAgJgsIgIAAIADAiIAHgBQAIgBADgFQADgFAAgHQgBgJgFgDQgBgEgGAAIgDABg");
	this.shape_14.setTransform(59.9,81.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgoB1QgVgLgKgbQgLgbgDgtQgFgsAGgcQAGgdASgOQASgPAggCQAfgDAUALQAUALALAbQAKAbAEAtQAEAsgFAdQgHAcgRAOQgSAPggADIgLAAQgYAAgQgJgAgHhSQgJAAgEAIQgEAIAAASQAAASAEAfQACAhADASQADASAFAHQAFAHAJgBQAJgBAEgIQAFgHAAgTIgEgxIgFgzQgDgSgGgHQgEgFgHAAIgDAAg");
	this.shape_15.setTransform(225.2,31.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("Agph1IA+gGIAVDxIg+AGg");
	this.shape_16.setTransform(211.4,32.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("Ahbh0IBegIQAigCASAOQARAPACAcQACANgEALQgCAMgIAJQgIAIgNAEIAAABQAQAAALAIQALAGAFALQAGANABAMQACAVgGARQgGARgPAKQgPALgbACIheAIgAABAOIgRABIAFA7IARgBQAJgBAGgIQAFgIAAgPQgCgOgHgHQgGgGgIAAIgCAAgAgYhMIAEAyIAPgCQAJgBAFgHQAEgIgBgKQgBgKgFgHQgGgGgJAAg");
	this.shape_17.setTransform(197.4,34.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AglB7QgSgFgLgOQgLgOgCgZIgBgJIA9gFIAAAGQACAPAGAGQAGAGAIgBQAKgBAFgHQAFgHgBgKQgCgOgKgHQgKgHgPgEIgegKQgQgHgLgNQgLgNgDgZQgDglASgVQASgVAogEQAogEAUARQAUARAEAmIg7AFIgBgGQgBgLgFgGQgFgIgIABQgKABgFAHQgDAHAAAIQACAOALAHQALAGAOAFQAQAEARAHQAPAGAMANQALAPADAZQAEAngVAUQgUAUgqAEIgPABQgQAAgNgEg");
	this.shape_18.setTransform(169.9,36.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhThyICOgMIAFAzIhPAHIADAqIBKgHIAFAxIhKAGIAEAwIBSgHIAFA0IiSAMg");
	this.shape_19.setTransform(152.5,37.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("Agcg9IgwAEIgEg2ICdgOIAEA2IgvAFIAQC7Ig+AFg");
	this.shape_20.setTransform(135,39.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("Ag7h4IBOgGIBPDsIhCAFIgKgpIgyAEIgDArIhCAGgAgQhJIgIBnIAigEIgZhkg");
	this.shape_21.setTransform(121.5,40.9);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("Ah9huIBagIIAlCNIAAgBIANiQIBagIIAVDxIg7AFIgQizIAAAAIgSC2IgsAEIgyiwIAAAAIAQCzIg7AFg");
	this.shape_22.setTransform(98.2,42.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgoB1QgVgLgKgbQgLgbgDgtQgFgsAGgcQAGgdASgOQASgPAggCQAfgDAUALQAUALALAbQAKAbAEAtQAEAsgFAdQgHAcgRAOQgSAPggADIgLAAQgYAAgQgJgAgHhSQgJAAgEAIQgEAIAAASQAAASAEAfQACAhADASQADASAFAHQAFAHAJgBQAJgBAEgIQAFgHAAgTIgEgxIgFgzQgDgSgGgHQgEgFgHAAIgDAAg");
	this.shape_23.setTransform(76,44.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("Agcg9IgwAEIgEg2ICdgOIAEA2IgvAFIAQC7Ig+AFg");
	this.shape_24.setTransform(57.9,45.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#FFCC66").ss(1,1,1).p("ARlFZMgjJAAAIAAqxMAjJAAAg");
	this.shape_25.setTransform(153.7,51.5,1.001,1.165,0,-4.3,-5.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFCC66").s().p("AxkFZIAAqxMAjJAAAIAAKxg");
	this.shape_26.setTransform(153.7,51.5,1.001,1.165,0,-4.3,-5.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbole9, new cjs.Rectangle(37.7,-1,241.6,105), null);


(lib.Symbole8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgSBhQgPgEgOgKQgNgLgKgSQgJgTgDgcQgCgbAGgTQAGgVALgMQAMgNAOgGQAOgGANgBQANgCAPAEQAOAEANAKQAOALAKATQAJASACAcQADAbgGAUQgGAUgMAMQgLAMgOAHQgOAGgOACIgFAAQgKAAgLgDgAgEg4QgKACgGAGQgGAGgCAJQgCAJABAKIAAARIACARIAFASQAEAJAHAFQAGAGAKgBQAKgBAGgHQAFgGACgJQADgJgBgKIgBgQQAAgIgCgKQgBgJgEgJQgDgJgHgFQgGgFgIAAIgCAAg");
	this.shape.setTransform(185.1,69.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgnBiQgRgGgKgJQgKgKgEgKQgEgKAAgIIA3gEQABADADADIAFAGQAFADAFABQAGABAGgBQAMgBAIgIQAIgIgBgLQgBgNgIgGQgJgHgLABQgKABgHADQgHAEgDAHIg0AEIAKhwICEgMIAEAwIhZAIIgDAaIABAAQAIgHALgEQAKgDALgBQARgCAPAGQAPAGAKAOQAKANACAWQACAUgJAQQgJARgSAKQgTALgcADIgKAAQgUAAgNgEg");
	this.shape_1.setTransform(168.4,70.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AgNA6QgIgGgGgIQgGgIgDgKIgPABIAGgRIAFAAIgBgCIAAgCIgBgDIABgBIgMABIAFgQIAIAAQACgMAEgJQAFgIAGgIQAIgHAJgEQAIgEALgBQAJgBAKACQAIACALAEIgLAdQgMgHgKABQgIABgFAFQgFAFgCAIIAogDIgFAQIgkAEIAAAAIAAACIAAADIABACIAggDIgFAQIgZACQAJAQARgBQAGgBAGgDIANgIIADAiQgGAEgIABIgPADIgHAAQgSAAgNgJg");
	this.shape_2.setTransform(154.9,65.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AgeBcQAAgLADgRQACgSAGgVQAHgVAMgVQAHgOAFgHQAEgHADgCIABgCIhcAIIgEgvICVgNIAEAtQgWAYgLAbQgKAZgDAbQgCAaACAYIg8AFIgBgKg");
	this.shape_3.setTransform(141,72.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AhEASICLgMIAEArIiLAMgAhKgwICLgMIAFAqIiMANg");
	this.shape_4.setTransform(119,77.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AgWBkQgQgDgMgKQgNgJgFgTIA3gFIACADIACACIAHAHQAEACAFAAQAJgBAEgGQAEgGABgIIABgOIgBgNIgBAAQgGAKgJAGQgJAGgMABQgVACgPgJQgOgIgJgPQgHgOgCgUQgCgTAGgQQAGgRANgKQANgKAVgDQAMgBALAEQAJAFAHAKIAAAAIgBgSIA3gEIALB9QABALgBAMQgCAMgGALQgHALgPAIQgOAIgZADIgMAAQgLAAgLgBgAgEg5QgIABgEAEQgGAEgBAHQgCAHAAAIQABAIADAIQACAIAGAEQAGAFAJgBQAKgBAEgFQAFgGABgIIgBgRQAAgMgHgHQgGgHgKAAIgCAAg");
	this.shape_5.setTransform(96.3,81.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AhYhgIA3gFIAJBgIAegtIA/gFIgvA6IBDBVIhCAGIghgyIgJALIAEAqIg4AFg");
	this.shape_6.setTransform(82.1,78.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AgZBjQgQgCgNgGQgNgGgIgLQgIgLgCgSQgBgQAFgKQAHgJAIgFQAIgEAIgBIAAgBQgQgCgIgKQgIgKgCgQQgBgQAGgLQAHgLALgHQALgGAOgEQANgEAMgBQAagCASAGQASAGAJALQAKALABAPQACAPgHAMQgIAMgOAEIAAABQALAAAJAFQAJADAGAJQAGAJACAMQABARgHANQgHAMgMAJQgMAIgPAEQgPAFgPABIgMABIgSgBgAgBAMQgIABgHACQgHAEgEAFQgEAGABAKQABAIAFAEQAFAFAHABQAHACAHgBQAHAAAHgEQAHgCAEgFQAFgFgBgJQgBgJgEgFQgFgFgHgCIgKgBIgFAAgAgIg+QgHABgHACQgFACgEAGQgEAFABAJQABAHAEAEQAFAEAGACQAHABAHAAQAGgBAGgDQAHgCAEgFQAEgEgBgIQgBgJgEgFQgFgEgHgCIgGAAIgHAAg");
	this.shape_7.setTransform(58.1,80.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AgYAzQgOgGgIgLQgJgLgBgSQgCgOAGgNQAGgNAMgIQALgJAQgBQAegDAPAQQAQAOADAeIhLAGQACAJAFAFQAGAFAIAAQAFAAAEgDQAEgCADgEIAlgDQgDALgIAJQgHAHgKAFQgLAEgMABIgGABQgNAAgKgEgAgBgcQgJABgEAEQgFAFAAAJIAkgDQAAgHgGgFQgEgEgGAAIgCAAg");
	this.shape_8.setTransform(159.1,48.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AgogvIAmgCIABAQIABAAQACgKAHgFQAGgGALgBIAHAAIAFAAIADAjIgGgBIgKABQgLAAgGAIQgFAIABAQIADAoIgmAEg");
	this.shape_9.setTransform(150.9,49.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF0000").s().p("AgoguIAmgEIACARIAAgBQADgIAGgGQAHgGAKgBIAHAAIAFABIADAjIgGgCIgKABQgMAAgFAIQgFAIABAPIAEAqIgnADg");
	this.shape_10.setTransform(144.1,50);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF0000").s().p("AgYAzQgOgGgIgLQgJgLgBgSQgCgOAGgNQAGgNAMgIQALgJAQgBQAegDAPAQQAQAOADAeIhLAGQACAJAFAFQAGAFAIAAQAFAAAEgDQAEgCADgEIAlgDQgDALgIAJQgHAHgKAFQgLAEgMABIgGABQgNAAgKgEgAgBgcQgJABgEAEQgFAFAAAJIAkgDQAAgHgGgFQgEgEgGAAIgCAAg");
	this.shape_11.setTransform(135.1,50.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF0000").s().p("AACBEQgHgBgHgGQgFgHgCgNIgEgxIgSACIgCgZIASgBIgDggIAmgDIADAfIAWgCIACAZIgWACIADAjQABAHADADQADADAHgBIAJgBIADAeIgNABIgNACIgGAAIgKAAg");
	this.shape_12.setTransform(126.7,50);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF0000").s().p("AgYAzQgOgGgIgLQgJgLgBgSQgCgOAGgNQAGgNAMgIQALgJAQgBQAegDAPAQQAQAOADAeIhLAGQACAJAFAFQAGAFAIAAQAFAAAEgDQAEgCADgEIAlgDQgDALgIAJQgHAHgKAFQgLAEgMABIgGABQgNAAgKgEgAgBgcQgJABgEAEQgFAFAAAJIAkgDQAAgHgGgFQgEgEgGAAIgCAAg");
	this.shape_13.setTransform(113.8,52.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF0000").s().p("Ag5guIAmgEIABANQAFgIAIgEQAHgFAMgBQAJgBAJADQAIADAFAIQAGAHABAMIAHBGIgoADIgEg1IgCgLQgCgEgDgCQgDgDgFABIgGACQgEACgCAFQgCAEAAAIIAFA2IgnADg");
	this.shape_14.setTransform(103,53.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF0000").s().p("AgWgeIAngDIAJBmIgnAEgAgZhEIAmgEIADAcIgnADg");
	this.shape_15.setTransform(95.2,52.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF0000").s().p("AgYAzQgOgGgIgLQgJgLgBgSQgCgOAGgNQAGgNAMgIQALgJAQgBQAegDAPAQQAQAOADAeIhLAGQACAJAFAFQAGAFAIAAQAFAAAEgDQAEgCADgEIAlgDQgDALgIAJQgHAHgKAFQgLAEgMABIgGABQgNAAgKgEgAgBgcQgJABgEAEQgFAFAAAJIAkgDQAAgHgGgFQgEgEgGAAIgCAAg");
	this.shape_16.setTransform(88,55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF0000").s().p("AgZhEIAmgEIANCNIgnAEg");
	this.shape_17.setTransform(80.3,53.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF0000").s().p("Ag6g/IAngEIABAMIAFgHQADgEAGgCQAEgDAKgBQALgBAIAFQAJADAGAIQAGAHAEAKQADAJABAKQABAJgBAKQgBAJgFAIQgEAJgIAFQgIAGgNABQgJABgIgDQgHgDgFgHIAAAAIAEAtIgoAEgAgKglQgEAEgBAGQgBAGABAGQAAAGACAGQACAFAFADQADAEAGgBQAHAAAEgEQADgEABgFIABgNQgBgGgCgGQgCgFgEgEQgEgDgGAAQgHABgDAEg");
	this.shape_18.setTransform(72.9,58);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF0000").s().p("AgNBpQgLgBgMgDQgNgDgLgHQgMgHgHgMQgIgNgCgTIA9gFIABAHIADAGQAEAJAJACQAIACAIgBQAFAAAGgCQAGgCAEgFQADgEAAgHQAAgFgFgEQgDgCgKgDIgagGIgYgFQgNgDgKgFQgKgFgHgIQgHgJgCgPQgBgSAGgNQAFgMALgJQALgKANgFQAOgFAQgBQAVgCATAEQATAFANANQAMAOAEAXIg6AGQAAgGgDgEQgCgEgEgBQgEgDgEgBQgFgBgFABIgJACIgIAEQgEAEAAAFQACAHAJAEQAJADAMACIAcAEQAOADAOAFQANAGAJAKQAJAKACASQABATgGAOQgHAOgNAJQgMAJgRAFQgQAFgQACIgHAAIgKAAg");
	this.shape_19.setTransform(174.6,19.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF0000").s().p("AhchbICkgPIAFAzIhnAJIACAZIBdgIIAFAuIhdAIIACAZIBpgJIAFAzIinAPg");
	this.shape_20.setTransform(155.3,21);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FF0000").s().p("AgcgrIg3AGIgEg0ICrgPIAEA0Ig3AEIANCTIg8AGg");
	this.shape_21.setTransform(135.4,22.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FF0000").s().p("AguhjIA7gFIBaC/IhAAGIgLgcIg+AGIgGAdIg+AFgAgYAbIAlgDIgXg7IAAAAg");
	this.shape_22.setTransform(119.4,24.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FF0000").s().p("Ah8hZIBYgHIAmBxIAAAAIASh2IBXgHIASDFIg6AGIgLh/IgBAAIgXCCIgtADIguh7IAAAAIALB/Ig6AEg");
	this.shape_23.setTransform(95.3,26.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FF0000").s().p("AgsBfQgYgLgOgWQgPgXgDgeQgCgeAKgYQALgZAVgPQAVgPAfgDQAdgDAYALQAYAMAOAWQAPAXADAeQADAegLAYQgLAZgVAPQgVAPgfAEIgJAAQgYAAgUgKgAgEg1QgIAAgIAFQgJAFgFANQgGAMACAVQACAWAIAMQAHALAJAEQAKAEAHgBQAIgBAJgFQAJgGAFgMQAFgMgBgVQgCgWgIgMQgHgLgKgEQgHgDgGAAIgEABg");
	this.shape_24.setTransform(71,28.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FF0000").s().p("AgcgrIg3AGIgEg0ICrgOIAEAyIg3AFIANCTIg8AGg");
	this.shape_25.setTransform(50,30);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#D1E1FF").ss(1,1,1).p("AyWlSMAjcgDTIBRN4MgjcADTg");
	this.shape_26.setTransform(113.3,50.7);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFCC66").s().p("AyWlSMAjcgDTIBRN4MgjbADTg");
	this.shape_27.setTransform(113.3,50.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbole8, new cjs.Rectangle(-5.2,-5.3,237,112), null);


(lib.Symbole6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("Agvg9IAhgDQAPgBAIABQAHABAFADQAHAEACAHQAEAGABAJQAAALgCAIQgEAHgIAGQAOAEADAWIAAABIABAHQADAVAGAFIgiADQgCgEgBgEIgBgJIAAgHIAAgGQgCgMgDgEQgDgEgIABIgFAAIAEAzIgdADgAgOgKIADAAIABAAQAKgBABgEQAFgEgCgJQAAgIgEgDQgDgDgKAAIgBABIgCAAg");
	this.shape.setTransform(142.6,40.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgOBBQgIgDgFgIQgEgFgCgKIgEgfIgGhDIAegDIAHBPQACASACAFQACADAFAAQAGgBACgEQACgFgCgSIgHhPIAegCIAHBQIABAVQgBAHgCAFQgEAJgIAFQgIAFgOABIgHAAQgHAAgHgCg");
	this.shape_1.setTransform(132.1,41);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("Agng8IBEgGIACAZIgmAEIACAXIAjgDIACAZIgjADIACAbIAngDIACAaIhEAGg");
	this.shape_2.setTransform(122.9,41.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AgOgkIgXADIgDgZIBOgHIACAZIgZACIAJBlIgdADg");
	this.shape_3.setTransform(113.8,42.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AgPBBQgJgEgGgIQgEgFgDgLQgCgKgCgXQgCgWAAgLQABgLADgGQAFgJAIgEQAJgGAMgBQAUgBALALQAMAKACAXIAAABIgdADQgCgNgDgFQgDgFgGAAQgHABgCAHQgCAGACAcIABABQACAeADAGQADAGAHAAQAGgBADgEQACgGgBgNIgBgGIAegCIAAACIABAEQACAYgJAMQgKAMgVACIgGAAQgIAAgHgCg");
	this.shape_4.setTransform(105,43.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AgNBBQgJgDgFgIQgEgFgDgKIgDgfIgGhDIAegDIAHBPQABASADAFQACADAGAAQAFgBADgEQABgFgBgSIgHhPIAdgCIAHBQIABAVQgBAHgCAFQgEAJgIAFQgIAFgOABIgHAAQgHAAgGgCg");
	this.shape_5.setTransform(94.8,44.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("Agrg9IAhgDQARgBAJADQAJABAFAIQAFAFADAJQACAKACAZQACAYAAAJQgBAKgEAHQgEAHgJAEQgIAEgSACIggACgAgEAoIACAAIACgBIAHgCQADgBACgDQACgCgBgIIgBgYIgBgGIgCgVQgBgGgCgCQgCgDgDgBQgDgBgFAAIgCABIgCAAg");
	this.shape_6.setTransform(84.9,45.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AgPBBQgJgEgGgIQgEgFgDgLQgDgKgBgXQgDgWABgLQABgLADgGQAFgJAIgFQAIgFANgBQALgBAKADQAJAEAGAIQAFAGACAKQACALACAXQADAVgBALQgBALgDAGQgFAJgJAFQgHAFgNABIgGAAQgIAAgHgCgAgDgqQgHABgCAGQgCAFACAVIABAWQACAUAEAGQACAEAHAAQAHgBACgFQACgGgCgUIgCgWQgCgWgDgFQgDgEgFAAIgBAAg");
	this.shape_7.setTransform(75,46);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("Agwg9IAigDQAQgBAHABQAHABAGADQAFAEAEAHQACAGABAJQABALgDAIQgDAHgHAGQAOAEADAWIAAABIAAAHQADAVAGAFIgiADQgCgEAAgEIgCgJIAAgHIAAgGQgBgMgEgEQgEgEgGABIgHAAIAFAzIgeADgAgNgKIABAAIACAAQAKgBACgEQADgEgBgJQAAgIgEgDQgDgDgKAAIgBABIgCAAg");
	this.shape_8.setTransform(65.4,47);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("Agpg9IAdgDQAPgBAIABQAIABAFADQAIADAEAIQAFAIABAMQABATgJAKQgKALgTACIgKABIAFAxIgeACgAgHgJIACAAIACAAQAIgBAEgEQADgFgBgJQAAgIgFgDQgEgDgJABIgCAAg");
	this.shape_9.setTransform(55,47.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF0000").s().p("AgNgkIgYADIgCgZIBOgHIACAZIgaACIAJBlIgcADg");
	this.shape_10.setTransform(118.6,24.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF0000").s().p("AgPBBQgJgEgGgIQgEgFgDgLQgCgKgCgXQgCgWAAgLQABgLADgGQAFgJAIgEQAJgGAMgBQAUgBALALQAMAKACAXIAAABIgdADQgCgNgDgFQgDgFgGAAQgHABgCAHQgCAGACAcIABABQACAeADAGQADAGAHAAQAGgBADgEQACgGgBgNIgBgGIAegCIAAACIABAEQACAYgJAMQgKAMgVACIgGAAQgIAAgHgCg");
	this.shape_11.setTransform(109.8,25.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF0000").s().p("Agng8IBEgGIACAZIgmAEIACAXIAjgDIACAZIgjADIACAbIAngDIACAaIhEAGg");
	this.shape_12.setTransform(100.6,26.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF0000").s().p("Agvg9IAhgDQAQgBAGABQAIABAGADQAFAEAEAHQADAGAAAJQABALgCAIQgEAHgHAGQAOAEACAWIAAABIABAHQACAVAIAFIgjADQgCgEgBgEIgBgJIAAgHIgBgGQgBgMgDgEQgDgEgIABIgFAAIAEAzIgeADgAgNgKIACAAIABAAQAJgBACgEQAFgEgBgJQgBgIgEgDQgDgDgJAAIgCABIgCAAg");
	this.shape_13.setTransform(91.5,27.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF0000").s().p("AgTg9IAcgDIALB/IgcACg");
	this.shape_14.setTransform(83.6,27.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF0000").s().p("Agrg9IAhgDQARgBAJACQAJACAFAHQAFAHADAIQACAJACAaQACAYAAAKQgBAJgEAGQgEAIgJAFQgIADgSABIggAEgAgEAoIACAAIACAAIAHgCQADgCACgDQACgDgBgHIgBgZIgBgGIgCgVQgBgFgCgCQgCgCgDgBQgDgCgFABIgCABIgCAAg");
	this.shape_15.setTransform(76.1,28.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#FF6633").ss(1,1,1).p("AJiDcIzDAAIAAm3ITDAAg");
	this.shape_16.setTransform(98.9,34.7,1,1,-5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFCC33").s().p("AphDcIAAm3ITDAAIAAG3g");
	this.shape_17.setTransform(98.9,34.7,1,1,-5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbole6, new cjs.Rectangle(12.6,6.5,171,57.2), null);


(lib.Symbole5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Calque 1
	this.instance = new lib.logomaurer();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.884,0.88);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbole5, new cjs.Rectangle(0,0,229,44), null);


(lib.Interpoler6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Calque 1
	this.instance = new lib.LOGO_AB_BIO();
	this.instance.parent = this;
	this.instance.setTransform(-14.9,-12.7,0.247,0.247,-10);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.9,-17,29.9,34.1);


(lib.IMAGE = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Calque 1
	this.instance = new lib.fond();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.IMAGE, new cjs.Rectangle(0,0,234,90), null);


(lib.btnlien = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Calque 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0066CC").s().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	this.shape.setTransform(-9,17);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:false},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


// stage content:
(lib.P10_MAURER_23072018 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.btnlien.addEventListener("click", fl_ClickToGoToWebPage);
		
		function fl_ClickToGoToWebPage() {
			window.clickTAG();
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(495));

	// btnlien
	this.btnlien = new lib.btnlien();
	this.btnlien.parent = this;
	this.btnlien.setTransform(124,42.5,0.78,0.15);
	new cjs.ButtonHelper(this.btnlien, 0, 1, 2, false, new lib.btnlien(), 3);

	this.timeline.addTween(cjs.Tween.get(this.btnlien).wait(495));

	// Cadre
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AyvmtMAlfAAAIAANbMglfAAAg");
	this.shape.setTransform(117,45,0.971,1.035);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(495));

	// Logo Maurer
	this.instance = new lib.Symbole5();
	this.instance.parent = this;
	this.instance.setTransform(-223,24.5,1,1,0,0,0,114.5,22);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(24).to({_off:false},0).wait(1).to({x:-180.3,alpha:0.043},0).wait(1).to({x:-141.3,alpha:0.087},0).wait(1).to({x:-105.8,alpha:0.13},0).wait(1).to({x:-73.7,alpha:0.174},0).wait(1).to({x:-44.9,alpha:0.217},0).wait(1).to({x:-19.1,alpha:0.261},0).wait(1).to({x:3.9,alpha:0.304},0).wait(1).to({x:24.2,alpha:0.348},0).wait(1).to({x:41.9,alpha:0.391},0).wait(1).to({x:57.3,alpha:0.435},0).wait(1).to({x:70.5,alpha:0.478},0).wait(1).to({x:81.6,alpha:0.522},0).wait(1).to({x:90.9,alpha:0.565},0).wait(1).to({x:98.5,alpha:0.609},0).wait(1).to({x:104.7,alpha:0.652},0).wait(1).to({x:109.4,alpha:0.696},0).wait(1).to({x:113,alpha:0.739},0).wait(1).to({x:115.5,alpha:0.783},0).wait(1).to({x:117.2,alpha:0.826},0).wait(1).to({x:118.2,alpha:0.87},0).wait(1).to({x:118.8,alpha:0.913},0).wait(1).to({x:119,alpha:0.957},0).wait(1).to({alpha:1},0).wait(1).to({_off:true},54).wait(393));

	// ASPERGE...
	this.instance_1 = new lib.Symbole14();
	this.instance_1.parent = this;
	this.instance_1.setTransform(117.1,59.8,0.05,0.05,0,0,0,108.1,22);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(214).to({_off:false},0).wait(1).to({regX:109.5,regY:25,scaleX:0.09,scaleY:0.09,y:60},0).wait(1).to({scaleX:0.13,scaleY:0.13},0).wait(1).to({scaleX:0.17,scaleY:0.17,y:60.1},0).wait(1).to({scaleX:0.22,scaleY:0.22,y:60.2},0).wait(1).to({scaleX:0.26,scaleY:0.26,y:60.3},0).wait(1).to({scaleX:0.3,scaleY:0.3,y:60.4},0).wait(1).to({scaleX:0.34,scaleY:0.34,y:60.5},0).wait(1).to({scaleX:0.38,scaleY:0.38},0).wait(1).to({scaleX:0.42,scaleY:0.42,y:60.6},0).wait(1).to({scaleX:0.46,scaleY:0.46,x:117,y:60.7},0).wait(1).to({scaleX:0.5,scaleY:0.5,y:60.8},0).wait(1).to({scaleX:0.55,scaleY:0.55,y:60.9},0).wait(1).to({scaleX:0.59,scaleY:0.59},0).wait(1).to({scaleX:0.63,scaleY:0.63,y:61},0).wait(1).to({scaleX:0.67,scaleY:0.67,y:61.1},0).wait(1).to({scaleX:0.71,scaleY:0.71,y:61.2},0).wait(1).to({scaleX:0.75,scaleY:0.75,y:61.3},0).wait(1).to({scaleX:0.79,scaleY:0.79,y:61.4},0).wait(1).to({scaleX:0.84,scaleY:0.84},0).wait(1).to({scaleX:0.88,scaleY:0.88,y:61.5},0).wait(1).to({scaleX:0.92,scaleY:0.92,y:61.6},0).wait(1).to({scaleX:0.96,scaleY:0.96,y:61.7},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({regX:109,regY:23,x:117.1,y:59.8},0).to({_off:true},48).wait(209));

	// Directe prod
	this.instance_2 = new lib.Symbole6();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-142.9,64.8,1,1,0,0,0,98,35.6);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(47).to({_off:false},0).wait(1).to({regX:98.9,regY:34.7,x:-110.5,y:63.9,alpha:0.043},0).wait(1).to({x:-81.8,alpha:0.087},0).wait(1).to({x:-55.6,alpha:0.13},0).wait(1).to({x:-32,alpha:0.174},0).wait(1).to({x:-10.7,alpha:0.217},0).wait(1).to({x:8.3,alpha:0.261},0).wait(1).to({x:25.2,alpha:0.304},0).wait(1).to({x:40.1,alpha:0.348},0).wait(1).to({x:53.2,alpha:0.391},0).wait(1).to({x:64.5,alpha:0.435},0).wait(1).to({x:74.3,alpha:0.478},0).wait(1).to({x:82.5,alpha:0.522},0).wait(1).to({x:89.3,alpha:0.565},0).wait(1).to({x:94.9,alpha:0.609},0).wait(1).to({x:99.4,alpha:0.652},0).wait(1).to({x:102.9,alpha:0.696},0).wait(1).to({x:105.5,alpha:0.739},0).wait(1).to({x:107.4,alpha:0.783},0).wait(1).to({x:108.7,alpha:0.826},0).wait(1).to({x:109.4,alpha:0.87},0).wait(1).to({x:109.8,alpha:0.913},0).wait(1).to({x:110,alpha:0.957},0).wait(1).to({alpha:1},0).wait(1).to({regX:98,regY:35.6,x:109.1,y:64.8},0).wait(32).to({regX:98.9,regY:34.7,x:148.3,y:63.9},0).wait(1).to({x:183.3},0).wait(1).to({x:215.1},0).wait(1).to({x:243.9},0).wait(1).to({x:269.8},0).wait(1).to({x:293},0).wait(1).to({x:313.6},0).wait(1).to({x:331.8},0).wait(1).to({x:347.8},0).wait(1).to({x:361.6},0).wait(1).to({x:373.4},0).wait(1).to({x:383.4},0).wait(1).to({x:391.8},0).wait(1).to({x:398.6},0).wait(1).to({x:404.1},0).wait(1).to({x:408.3},0).wait(1).to({x:411.5},0).wait(1).to({x:413.8},0).wait(1).to({x:415.4},0).wait(1).to({x:416.3},0).wait(1).to({x:416.8},0).wait(1).to({x:417},0).wait(1).to({_off:true},1).wait(369));

	// offre 1
	this.instance_3 = new lib.Symbole8();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-160,45.4,1,1,0,0,0,113.1,49.9);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(102).to({_off:false},0).wait(1).to({regX:113.3,regY:50.7,x:-126.6,y:46.2,alpha:0.042},0).wait(1).to({x:-96.1,alpha:0.083},0).wait(1).to({x:-68.3,alpha:0.125},0).wait(1).to({x:-43.1,alpha:0.167},0).wait(1).to({x:-20.2,alpha:0.208},0).wait(1).to({x:0.4,alpha:0.25},0).wait(1).to({x:18.8,alpha:0.292},0).wait(1).to({x:35.2,alpha:0.333},0).wait(1).to({x:49.6,alpha:0.375},0).wait(1).to({x:62.3,alpha:0.417},0).wait(1).to({x:73.2,alpha:0.458},0).wait(1).to({x:82.6,alpha:0.5},0).wait(1).to({x:90.6,alpha:0.542},0).wait(1).to({x:97.2,alpha:0.583},0).wait(1).to({x:102.6,alpha:0.625},0).wait(1).to({x:107,alpha:0.667},0).wait(1).to({x:110.4,alpha:0.708},0).wait(1).to({x:112.9,alpha:0.75},0).wait(1).to({x:114.7,alpha:0.792},0).wait(1).to({x:115.9,alpha:0.833},0).wait(1).to({x:116.7,alpha:0.875},0).wait(1).to({x:117,alpha:0.917},0).wait(1).to({x:117.2,alpha:0.958},0).wait(1).to({alpha:1},0).wait(1).to({regX:113.1,regY:49.9,x:117,y:45.4},0).to({_off:true},18).wait(6).to({_off:false},0).to({_off:true},7).wait(5).to({_off:false},0).wait(32).to({regX:113.3,regY:50.7,x:155.5,y:46.2},0).wait(1).to({x:190.5},0).wait(1).to({x:222.3},0).wait(1).to({x:251.1},0).wait(1).to({x:277},0).wait(1).to({x:300.2},0).wait(1).to({x:320.8},0).wait(1).to({x:339},0).wait(1).to({x:355},0).wait(1).to({x:368.8},0).wait(1).to({x:380.6},0).wait(1).to({x:390.6},0).wait(1).to({x:399},0).wait(1).to({x:405.8},0).wait(1).to({x:411.3},0).wait(1).to({x:415.5},0).wait(1).to({x:418.7},0).wait(1).to({x:421},0).wait(1).to({x:422.6},0).wait(1).to({x:423.5},0).wait(1).to({x:424},0).wait(1).to({x:424.2},0).wait(1).to({_off:true},1).wait(277));

	// LOGO BIO
	this.instance_4 = new lib.Interpoler6("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(211.5,53.1);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(308).to({_off:false},0).to({_off:true},52).wait(135));

	// offre 2
	this.instance_5 = new lib.Symbole9();
	this.instance_5.parent = this;
	this.instance_5.setTransform(-192.4,45.5,1,1,0,0,0,158.3,51.5);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(286).to({_off:false},0).wait(1).to({regX:153.7,x:-154.1,alpha:0.048},0).wait(1).to({x:-115.3,alpha:0.095},0).wait(1).to({x:-80.4,alpha:0.143},0).wait(1).to({x:-49.1,alpha:0.19},0).wait(1).to({x:-21.3,alpha:0.238},0).wait(1).to({x:3.2,alpha:0.286},0).wait(1).to({x:24.7,alpha:0.333},0).wait(1).to({x:43.3,alpha:0.381},0).wait(1).to({x:59.2,alpha:0.429},0).wait(1).to({x:72.7,alpha:0.476},0).wait(1).to({x:84,alpha:0.524},0).wait(1).to({x:93.2,alpha:0.571},0).wait(1).to({x:100.6,alpha:0.619},0).wait(1).to({x:106.3,alpha:0.667},0).wait(1).to({x:110.6,alpha:0.714},0).wait(1).to({x:113.7,alpha:0.762},0).wait(1).to({x:115.8,alpha:0.81},0).wait(1).to({x:117.1,alpha:0.857},0).wait(1).to({x:117.7,alpha:0.905},0).wait(1).to({x:118,alpha:0.952},0).wait(1).to({alpha:1},0).wait(1).to({regX:158.3,x:122.6},0).wait(53).to({regX:153.7,x:156.3},0).wait(1).to({x:191.3},0).wait(1).to({x:223.1},0).wait(1).to({x:251.9},0).wait(1).to({x:277.8},0).wait(1).to({x:301},0).wait(1).to({x:321.6},0).wait(1).to({x:339.8},0).wait(1).to({x:355.7},0).wait(1).to({x:369.5},0).wait(1).to({x:381.3},0).wait(1).to({x:391.4},0).wait(1).to({x:399.7},0).wait(1).to({x:406.5},0).wait(1).to({x:412},0).wait(1).to({x:416.3},0).wait(1).to({x:419.5},0).wait(1).to({x:421.8},0).wait(1).to({x:423.3},0).wait(1).to({x:424.3},0).wait(1).to({x:424.7},0).wait(1).to({x:425},0).wait(1).to({_off:true},1).wait(111));

	// logo et adresse
	this.instance_6 = new lib.Symbole13();
	this.instance_6.parent = this;
	this.instance_6.setTransform(-313.1,45.2,1,1,0,0,0,117.9,43.8);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(370).to({_off:false},0).wait(1).to({regX:118.9,regY:45.3,x:-247.7,y:46.7,alpha:0.053},0).wait(1).to({x:-190.1,alpha:0.105},0).wait(1).to({x:-138.9,alpha:0.158},0).wait(1).to({x:-93.7,alpha:0.211},0).wait(1).to({x:-54.1,alpha:0.263},0).wait(1).to({x:-19.8,alpha:0.316},0).wait(1).to({x:9.6,alpha:0.368},0).wait(1).to({x:34.5,alpha:0.421},0).wait(1).to({x:55.2,alpha:0.474},0).wait(1).to({x:72.2,alpha:0.526},0).wait(1).to({x:85.8,alpha:0.579},0).wait(1).to({x:96.4,alpha:0.632},0).wait(1).to({x:104.4,alpha:0.684},0).wait(1).to({x:110.1,alpha:0.737},0).wait(1).to({x:113.9,alpha:0.789},0).wait(1).to({x:116.3,alpha:0.842},0).wait(1).to({x:117.4,alpha:0.895},0).wait(1).to({x:117.9,alpha:0.947},0).wait(1).to({alpha:1},0).wait(1).to({regX:117.9,regY:43.8,x:116.9,y:45.2},0).wait(81).to({regX:118.9,regY:45.3,x:158,y:46.7},0).wait(1).to({x:194.8},0).wait(1).to({x:228.4},0).wait(1).to({x:259},0).wait(1).to({x:286.6},0).wait(1).to({x:311.5},0).wait(1).to({x:333.8},0).wait(1).to({x:353.6},0).wait(1).to({x:371},0).wait(1).to({x:386.3},0).wait(1).to({x:399.6},0).wait(1).to({x:410.9},0).wait(1).to({x:420.6},0).wait(1).to({x:424.9},0).wait(11));

	// Fond legumes
	this.instance_7 = new lib.IMAGE();
	this.instance_7.parent = this;
	this.instance_7.setTransform(-232.5,68.8,1,1,0,0,0,120,70.9);
	this.instance_7.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1).to({regX:117,regY:45,x:-191.4,y:43.2,alpha:0.043},0).wait(1).to({x:-151.3,y:43.4,alpha:0.087},0).wait(1).to({x:-114.7,y:43.6,alpha:0.13},0).wait(1).to({x:-81.7,y:43.8,alpha:0.174},0).wait(1).to({x:-51.9,y:44,alpha:0.217},0).wait(1).to({x:-25.3,y:44.2,alpha:0.261},0).wait(1).to({x:-1.6,y:44.3,alpha:0.304},0).wait(1).to({x:19.3,y:44.5,alpha:0.348},0).wait(1).to({x:37.5,y:44.6,alpha:0.391},0).wait(1).to({x:53.4,y:44.7,alpha:0.435},0).wait(1).to({x:67,alpha:0.478},0).wait(1).to({x:78.5,y:44.8,alpha:0.522},0).wait(1).to({x:88.1,y:44.9,alpha:0.565},0).wait(1).to({x:95.9,alpha:0.609},0).wait(1).to({x:102.2,y:45,alpha:0.652},0).wait(1).to({x:107.1,alpha:0.696},0).wait(1).to({x:110.8,alpha:0.739},0).wait(1).to({x:113.4,alpha:0.783},0).wait(1).to({x:115.2,alpha:0.826},0).wait(1).to({x:116.3,alpha:0.87},0).wait(1).to({x:116.8,alpha:0.913},0).wait(1).to({x:117,alpha:0.957},0).wait(1).to({alpha:1},0).wait(1).to({regX:120,regY:70.9,x:120,y:70.9},0).wait(471));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-235.5,42.9,587,92.7);
// library properties:
lib.properties = {
	width: 234,
	height: 90,
	fps: 24,
	color: "#000000",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/logomaurer.png", id:"logomaurer"},
		{src:"images/P10_MAURER_23072018_atlas_NP_.jpg", id:"P10_MAURER_23072018_atlas_NP_"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;