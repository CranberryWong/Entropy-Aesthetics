
function drawTextPlate(ctx)
{
	ctx.save();
	ctx.translate(textPlate.x,textPlate.y)
		var grd = ctx.createLinearGradient(-w/2,0,w/2,0);
		grd.addColorStop(1, "rgba(255, 0, 40, 0.3)");
		grd.addColorStop(0.8, "rgba(255, 40, 40, 0.8)");
		grd.addColorStop(0.3, "rgba(255, 40, 40, 0.8)");		
		grd.addColorStop(0, "rgba(255, 0, 50, 0.3)");			
		ctx.fillStyle = grd;		
		ctx.fillRect(-w/2,0,w,60);
		drawTPText(ctx);
		
	ctx.restore();
		if(shoot==false)
		{
		ctx.strokeStyle = "#980000";
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		ctx.moveTo(0,h-2);
		ctx.lineTo(w,h-2);
		ctx.closePath();
		ctx.stroke();
		ctx.strokeStyle = "#FFFFFF";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(0,h-2);		
		ctx.lineTo(autoPlayTimer/800*w,h-2);
		ctx.closePath();
		ctx.stroke();		
		}
}


function drawTopTextPlate(ctx)
{

	ctx.save();
	ctx.translate(tTextPlate.x,tTextPlate.y)
		var grd = ctx.createLinearGradient(-w/2,0,w/2,0);
		grd.addColorStop(1, "rgba(255, 0, 40, 0.3)");
		grd.addColorStop(0.8, "rgba(255, 40, 40, 0.8)");
		grd.addColorStop(0.3, "rgba(255, 40, 40, 0.8)");		
		grd.addColorStop(0, "rgba(255, 0, 50, 0.3)");			
		ctx.fillStyle = grd;		
		ctx.fillRect(-w/2,0,w,60);
		
		drawFTPText(ctx);
		
		//drawTextPlateText(ctx);	
		
	ctx.restore();

}

function drawAgainPate(ctx)
{
	//ctx.clearRect(0,againPlate.y-5,w,34);
	ctx.clearRect(0,0,w,h);
	ctx.save();
	ctx.translate(againPlate.x,againPlate.y);
	ctx.globalAlpha = againPlate.alpha;
		var grd = ctx.createLinearGradient(-w/2,0,w/2,0);
		grd.addColorStop(0, "rgba(200, " + Math.floor(againPlate.paramG) + ", " + Math.floor(againPlate.paramB) + ", 0)");
		grd.addColorStop(0.33, "rgba(200, " + Math.floor(againPlate.paramG) + ", " + Math.floor(againPlate.paramB) + ", 0.5)");
		grd.addColorStop(0.66, "rgba(200, " + Math.floor(againPlate.paramG) + ", " + Math.floor(againPlate.paramB) + ", 0.5)");		
		grd.addColorStop(1, "rgba(200, " + Math.floor(againPlate.paramG) + ", " + Math.floor(againPlate.paramB) + ", 0)");		
		/*grd.addColorStop(0, "rgba(200, 200, 200, 0)");
		grd.addColorStop(0.33, "rgba(200, 200, 200, 0.3)");
		grd.addColorStop(0.66, "rgba(200, 200, 200, 0.3)");		
		grd.addColorStop(1, "rgba(200, 200, 200, 0)");*/
		ctx.fillStyle = grd;		
		ctx.fillRect(-w/2,0,w,34);
		
		ctx.font = ' '+againSize+'pt '+font;			
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";		
		//ctx.fillStyle = "rgba(200, 200, 200, 0.8)";
		ctx.fillStyle = "#ffffff";
		/*ctx.shadowColor = "Black";
		ctx.shadowBlur = 2; 
		ctx.shadowOffsetX = 1;
		ctx.shadowOffsetY = 1.2;*/
		ctx.fillText(againText, 0, 10);
		
		//drawTextPlateText(ctx);	
		
	ctx.restore();
}
