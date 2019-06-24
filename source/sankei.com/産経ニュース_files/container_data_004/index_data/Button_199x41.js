var drawButton = function(ctx, obj) {
ctx.clearRect(0, 0, w, h);
ctx.save();
ctx.translate(obj.x,obj.y);
ctx.scale(obj.scaleX,obj.scaleY);
ctx.globalAlpha = obj.alpha;

	ctx.beginPath();
		ctx.moveTo(99,-17);
		ctx.quadraticCurveTo(99,-20,96,-20);
		ctx.lineTo(-97,-20);
		ctx.quadraticCurveTo(-100,-20,-100,-17);
		ctx.lineTo(-100,18);
		ctx.quadraticCurveTo(-100,21,-97,21);
		ctx.lineTo(96,21);
		ctx.quadraticCurveTo(99,21,99,18);
		ctx.lineTo(99,-17);
	ctx.closePath();
	ctx.clip();	
	ctx.translate(-100, -20);
	var pattern = ctx.createPattern(obj.pic, 'repeat');
	ctx.fillStyle = pattern;
ctx.shadowColor = "#000000";
ctx.shadowBlur = 10; 
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
	ctx.fill();
ctx.shadowColor = "transparent";
	ctx.translate(+100, +20);

	ctx.shadowColor = "#8E1A0D";
	ctx.shadowBlur = 0; 
	ctx.shadowOffsetX = 1 * obj.scaleX;
	ctx.shadowOffsetY = 1 * obj.scaleY;
	ctx.font = "13pt "+font;
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
			//
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("基本プレイ無料", 0, 0);


ctx.restore();

};