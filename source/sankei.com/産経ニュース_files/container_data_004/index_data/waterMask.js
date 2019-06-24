

function drawWaterSlice(sliceHeight, sliceY,ph)
{
		var nCanvas = document.createElement("CANVAS");		
		var w = img_water.pic.width;
		var h = img_water.pic.height;
		w*=2;
		nCanvas.width = w;
		nCanvas.height = h;		
		var ctx = nCanvas.getContext('2d');
		ctx.save();			
	/*	if(groundMapArray.length%2==1)
		{
			ctx.scale(-1,1);
			ctx.translate(-w,0);
		}*/
		if(waterMapArray.length>0)
		{
			var tpgr = ctx.createLinearGradient(0, 0, 0, sliceHeight);
			tpgr.addColorStop(0, "rgba(0, 0, 0, 0)");	
			tpgr.addColorStop(0.4, "rgba(0, 0, 0, 1)");		
			
			ctx.fillStyle = tpgr;
			ctx.fillRect(0, 3, w, h);
			ctx.globalCompositeOperation = "source-in";
			ctx.translate(0,-sliceY);
		}
		var pattern = ctx.createPattern(img_water.pic, 'repeat-x');
		ctx.fillStyle = pattern;
		ctx.fillRect(0,0,w,h);	
		//ctx.drawImage(groundMap,0,-sliceY);
		
		
		//wOffset = wOffset+sliceHeight;
		
		var sliceObj  = {};			
		sliceObj.pic = nCanvas;
		sliceObj.x = 0;
		sliceObj.y = sliceY*1.1;
		sliceObj.h = sliceHeight;
		sliceObj.k = ph;	
		//sliceObj.off = wOffset;
		waterMapArray.push(sliceObj);		
}
function drawTopSlice()
{
		var nCanvas = document.createElement("CANVAS");		
		var w = gfx_ground.pic.width;
		var h = gfx_ground.pic.height;
		w*=2;
		nCanvas.width = w;
		nCanvas.height = h;		
		var ctx = nCanvas.getContext('2d');
		ctx.save();			
		var groundPattern = ctx.createPattern(groundMap, 'repeat-x');
		ctx.fillStyle = groundPattern;
		ctx.fillRect(0,0,w,h);	
		var image = new Image();
		image = nCanvas;		
		groundMapArray["topSlice"] = image;
}