var Pattern = {};
function drawPattern(ctx)
{
	ctx.clearRect(0, 0, w, h);	
	ctx.globalAlpha = Pattern.tPattern.alpha;
	ctx.drawImage(Pattern.tPattern.pic,0,0);	
	ctx.globalAlpha = Pattern.bPattern.alpha;
	ctx.drawImage(Pattern.bPattern.pic,0,0);	
	ctx.globalAlpha = Pattern.lPattern.alpha;
	ctx.drawImage(Pattern.lPattern.pic,0,0);
}

function drawPatternElements()
{	
	var nCanvas = document.createElement("CANVAS");		
	nCanvas.width = w;
	nCanvas.height = h;		
	var ctx = nCanvas.getContext('2d');	
	
	ctx.save();
	ctx.scale(1.2,0.4);
		var tpgr = ctxPattern.createRadialGradient(w/2,0,15,w/2,0,280);
		tpgr.addColorStop(0, "rgba(0, 0, 0, 0.7)");	
		tpgr.addColorStop(0.7, "rgba(0, 0, 0, 0.4)");		
		tpgr.addColorStop(1, "rgba(0, 0, 0, 0)");	
		ctx.fillStyle=tpgr;
		ctx.fillRect(0,0,w,h);	
	ctx.restore();
	
	var iPattern = ctx.createPattern(gfx_Pattern.pic, 'repeat');
	ctx.fillStyle = iPattern;
	ctx.fillRect(0,0,w,h);
	ctx.globalCompositeOperation = "source-in";
	ctx.save();
	ctx.scale(1,0.4);
		ctx.fillStyle = tpgr;
		ctx.fillRect(0,0,w,h);	
	ctx.restore();
	ctx.globalCompositeOperation = "source-over";		
	
	Pattern.tPattern = {};
	Pattern.tPattern.alpha = 1;
	Pattern.tPattern.pic = nCanvas;	
	//////////////////////////////////////////////////////////
	nCanvas = document.createElement("CANVAS");		
	nCanvas.width = w;
	nCanvas.height = h;	
	ctx = nCanvas.getContext('2d');			
	tpgr = ctx.createLinearGradient(0, h-180, 0, h);
	tpgr.addColorStop(0, "rgba(0, 0, 0, 0)");
	tpgr.addColorStop(0.4, "rgba(0, 0, 0, 0.5)");	
	tpgr.addColorStop(1, "rgba(0, 0, 0, 0.9)");		
		
	
	ctx.fillStyle=tpgr;
	ctx.fillRect(0,0,w,h);	
	
	iPattern = ctx.createPattern(gfx_Pattern.pic, 'repeat');
	ctx.fillStyle = iPattern;
	ctx.fillRect(0,0,w,h);
	ctx.globalCompositeOperation = "source-in";
	ctx.fillStyle = tpgr;
	ctx.fillRect(0,0,w,h);	
	ctx.globalCompositeOperation = "source-over";		
	
	Pattern.bPattern = {};
	Pattern.bPattern.alpha = 0;
	Pattern.bPattern.pic = nCanvas;
	//////////////////////////////////////////////////////////
	nCanvas = document.createElement("CANVAS");		
	nCanvas.width = w;
	nCanvas.height = h;	
	ctx = nCanvas.getContext('2d');	
	
	tpgr = ctx.createRadialGradient(0,0,5,0,0,200);
	tpgr.addColorStop(0, "rgba(0, 0, 0, 0.9)");
	tpgr.addColorStop(0.6, "rgba(0, 0, 0, 0.5)");	
	tpgr.addColorStop(1, "rgba(0, 0, 0, 0)");		
		
	
	ctx.fillStyle=tpgr;
	ctx.fillRect(0,0,w,h);	
	
	iPattern = ctx.createPattern(gfx_Pattern.pic, 'repeat');
	ctx.fillStyle = iPattern;
	ctx.fillRect(0,0,w,h);
	ctx.globalCompositeOperation = "source-in";
	ctx.fillStyle = tpgr;
	ctx.fillRect(0,0,w,h);	
	ctx.globalCompositeOperation = "source-over";		
	
	Pattern.lPattern = {};
	Pattern.lPattern.alpha = 0;
	Pattern.lPattern.pic = nCanvas;
	
	
	
	
}

