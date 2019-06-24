	var point1 = {};
	var point2 = {};
	var point3 = {};
	var point4 = {};
	var point5 = {};
	var point6 = {};
	var veer = 0.14;
	var y3D = 60;
function drawTarget(ctx)
{
	ctx.save();
	

	var fGradient = ctx.createLinearGradient(0,h-170,0,h-250);
	fGradient.addColorStop(0, "rgba(100, 255, 175, 0.6)");			
	fGradient.addColorStop(1, "rgba(100, 255, 175, 0)");		

	ctx.fillStyle = fGradient;
	ctx.strokeStyle = fGradient;
	
	/*ctx.beginPath();	
	ctx.moveTo(351.9-274+img_target.sx,107.25+img_target.sy+dy);
	ctx.lineTo(548-274+img_target.sx,0+img_target.sy+dy);
	ctx.lineTo(0-274+img_target.sx,0+img_target.sy+dy);
	ctx.lineTo(195.9-274+img_target.sx,106.95+img_target.sy+dy);
	ctx.quadraticCurveTo(269.178515625-274+img_target.sx,88.4974y3D9375+img_target.sy+dy,351.9-274+img_target.sx,107.25+img_target.sy+dy);
	ctx.closePath();*/
	//console.log(calcul3d({x:img_target.sx-w/2-10,y:y3D,z:-120}));
	ctx.beginPath();
	ctx.moveTo(calcul3d({x:img_target.sx-w/2-40,y:y3D,z:-125}).x,calcul3d({x:img_target.sx-w/2-40,y:y3D,z:-125}).y);
	ctx.lineTo(calcul3d({x:img_target.sx-w/2-40+Math.cos(-2.51-veer)*500,y:y3D,z:-125-Math.sin(-2.51-veer)*500}).x,calcul3d({x:img_target.sx-w/2-40+Math.cos(-2.51-veer)*500,y:y3D,z:-125-Math.sin(-2.51-veer)*500}).y);
	ctx.lineTo(calcul3d({x:img_target.sx-w/2+40+Math.cos(-0.63+veer)*500,y:y3D,z:-125-Math.sin(-0.63+veer)*500}).x,calcul3d({x:img_target.sx-w/2+40+Math.cos(-0.63+veer)*500,y:y3D,z:-125-Math.sin(-0.63+veer)*500}).y);
	ctx.lineTo(calcul3d({x:img_target.sx-w/2+40,y:y3D,z:-125}).x,calcul3d({x:img_target.sx-w/2+40,y:y3D,z:-125}).y);
	ctx.quadraticCurveTo(calcul3d({x:img_target.sx-w/2,y:y3D,z:-100}).x,calcul3d({x:img_target.x-w/2-40,y:y3D,z:-100}).y,calcul3d({x:img_target.sx-w/2-40,y:y3D,z:-125}).x,calcul3d({x:img_target.x-w/2-40,y:y3D,z:-125}).y)
	//ctx.lineTo(calcul3d({x:img_target.sx-w/2-40,y:y3D,z:-125}).x,calcul3d({x:img_target.x-w/2-40,y:y3D,z:-125}).y);
	ctx.closePath();
	ctx.fill();
	ctx.beginPath();	
	/*ctx.moveTo(351.9-274+img_target.sx,107.25+img_target.sy+dy);
	ctx.lineTo(548-274+img_target.sx,0+img_target.sy+dy);
	ctx.moveTo(0-274+img_target.sx,0+img_target.sy+dy);
	ctx.lineTo(195.9-274+img_target.sx,106.95+img_target.sy+dy);*/
	ctx.moveTo(calcul3d({x:img_target.sx-w/2-40,y:y3D,z:-125}).x,calcul3d({x:img_target.sx-w/2-40,y:y3D,z:-125}).y);
	ctx.lineTo(calcul3d({x:img_target.sx-w/2-40+Math.cos(-2.51-veer)*500,y:y3D,z:-125-Math.sin(-2.51-veer)*500}).x,calcul3d({x:img_target.sx-w/2-40+Math.cos(-2.51-veer)*500,y:y3D,z:-125-Math.sin(-2.51-veer)*500}).y);
	ctx.moveTo(calcul3d({x:img_target.sx-w/2+40,y:y3D,z:-125}).x,calcul3d({x:img_target.sx-w/2+40,y:y3D,z:-125}).y);
	ctx.lineTo(calcul3d({x:img_target.sx-w/2+40+Math.cos(-0.63+veer)*500,y:y3D,z:-125-Math.sin(-0.63+veer)*500}).x,calcul3d({x:img_target.sx-w/2+40+Math.cos(-0.63+veer)*500,y:y3D,z:-125-Math.sin(-0.63+veer)*500}).y);
	ctx.closePath();
	ctx.stroke();
	ctx.stroke();	
	
	var ang = -Math.atan2((img_target.sx-mousePos.x)/2.1,img_target.sy-mousePos.y)-90*Math.PI/180;
	
	img_target.ang = img_target.ang+(ang-img_target.ang)/12;
	
	if(img_target.ang<-2.51)
	{
		img_target.ang=-2.51;
	}
	if(img_target.ang>-0.63)
	{
		img_target.ang = -0.63;
	}
	
	img_target.x = img_target.sx+Math.cos(img_target.ang)*40;
	img_target.y = img_target.sy+Math.sin(img_target.ang)*15+20;
	var sin = Math.cos(img_target.ang*2)*7;
	
	//sin = 0;
	var mult = Math.sin(img_target.ang)*0.8+2;

	
	
	//console.log(Math.cos(img_target.ang))
	point1.x = img_target.x-w/2;
	point1.y = y3D;
	point1.z = -122-sin;	
	point2.x = img_target.x+Math.cos(img_target.ang)*250-w/2;
	point2.y = y3D;
	point2.z = -122-Math.sin(img_target.ang)*250-sin;
	point3.x = img_target.x-w/2+4;
	point3.y = y3D;
	point3.z = -122-Math.cos(img_target.ang)*3-sin;	
	point4.x = img_target.x+Math.cos(img_target.ang+veer)*240-w/2+4;
	point4.y = y3D;
	point4.z = -122-Math.sin(img_target.ang+veer)*240-sin;
	point5.x = img_target.x-w/2-4;
	point5.y = y3D;
	point5.z = -122+Math.cos(img_target.ang)*3-sin;	
	point6.x = img_target.x+Math.cos(img_target.ang-veer)*240-w/2-4;
	point6.y = y3D;
	point6.z = -122-Math.sin(img_target.ang-veer)*240-sin;
	
	var sGradient;
	
	
	//ctx.fillStyle = sGradient;
	//ctx.strokeStyle = "#000000"
	//ctx.fillRect(0,0,w,h)
	sGradient = ctx.createLinearGradient(calcul3d(point1).x,calcul3d(point1).y,calcul3d(point2).x,calcul3d(point2).y);
	sGradient.addColorStop(0.5, "rgba(100, 255, 175, 1)");			
	sGradient.addColorStop(1, "rgba(100, 255, 175, 0)");
	ctx.strokeStyle = sGradient;
	ctx.beginPath();
		ctx.moveTo(calcul3d(point1).x,calcul3d(point1).y);	
		ctx.lineTo(calcul3d(point2).x,calcul3d(point2).y);	
	ctx.closePath();
	ctx.stroke();
	sGradient = ctx.createLinearGradient(calcul3d(point3).x,calcul3d(point3).y,calcul3d(point4).x,calcul3d(point4).y);
	sGradient.addColorStop(0.5, "rgba(100, 255, 175, 1)");			
	sGradient.addColorStop(1, "rgba(100, 255, 175, 0)");
	ctx.strokeStyle = sGradient;
	ctx.beginPath();
		ctx.moveTo(calcul3d(point3).x,calcul3d(point3).y);	
		ctx.lineTo(calcul3d(point4).x,calcul3d(point4).y);
	ctx.closePath();
	ctx.stroke();
	sGradient = ctx.createLinearGradient(calcul3d(point5).x,calcul3d(point5).y,calcul3d(point6).x,calcul3d(point6).y);
	sGradient.addColorStop(0.5, "rgba(100, 255, 175, 1)");			
	sGradient.addColorStop(1, "rgba(100, 255, 175, 0)");
	ctx.strokeStyle = sGradient;
	ctx.beginPath();
		ctx.moveTo(calcul3d(point5).x,calcul3d(point5).y);	
		ctx.lineTo(calcul3d(point6).x,calcul3d(point6).y);	
	ctx.closePath();
	ctx.stroke();
	
	/*
	ctx.beginPath();
	ctx.moveTo(img_target.x,img_target.y);	
	ctx.lineTo(img_target.x+Math.cos(img_target.ang)*80*mult,img_target.y+Math.sin(img_target.ang)*80*mult);
	ctx.moveTo(img_target.x+4,img_target.y+Math.cos(img_target.ang+0.3)*3);	
	ctx.lineTo(img_target.x+4+Math.cos(img_target.ang+(veer-mult/6))*76*mult,img_target.y+Math.sin(img_target.ang+(veer-mult/6))*76*mult);
	ctx.moveTo(img_target.x-4,img_target.y-Math.cos(img_target.ang-0.3)*3);	
	ctx.lineTo(img_target.x-4+Math.cos(img_target.ang-(veer-mult/6))*76*mult,img_target.y+Math.sin(img_target.ang-(veer-mult/6))*76*mult);	
	ctx.closePath();
	ctx.stroke();*/
	
	fGradient =  ctx.createLinearGradient(0,h-70,0,h-160);
	fGradient.addColorStop(0, "rgba(100, 255, 175, 0.6)");			
	fGradient.addColorStop(1, "rgba(100, 255, 175, 0)");		
	ctx.fillStyle = fGradient;
	
	ctx.beginPath();
	/*ctx.moveTo(img_target.x,img_target.y);
	ctx.lineTo(img_target.x+4,img_target.y+Math.cos(img_target.ang+0.3)*3);
	ctx.lineTo(img_target.x+4+Math.cos(img_target.ang+(veer-mult/6))*76*mult,img_target.y+Math.sin(img_target.ang+(veer-mult/6))*76*mult);
	ctx.lineTo(img_target.x+Math.cos(img_target.ang)*80*mult,img_target.y+Math.sin(img_target.ang)*80*mult);
	ctx.lineTo(img_target.x-4+Math.cos(img_target.ang-(veer-mult/6))*76*mult,img_target.y+Math.sin(img_target.ang-(veer-mult/6))*76*mult);	
	ctx.lineTo(img_target.x-4,img_target.y-Math.cos(img_target.ang-0.3)*3);	
	ctx.lineTo(img_target.x,img_target.y);*/
		ctx.moveTo(calcul3d(point1).x,calcul3d(point1).y);	
		ctx.lineTo(calcul3d(point3).x,calcul3d(point3).y);	
		ctx.lineTo(calcul3d(point4).x,calcul3d(point4).y);
		ctx.lineTo(calcul3d(point2).x,calcul3d(point2).y);	
		ctx.lineTo(calcul3d(point6).x,calcul3d(point6).y);	
		ctx.lineTo(calcul3d(point5).x,calcul3d(point5).y);	
		ctx.lineTo(calcul3d(point1).x,calcul3d(point1).y);		
	ctx.closePath();
	ctx.fill();
	ctx.restore();
	/*
	ctx.moveTo(351.9,107.25);
	ctx.lineTo(548,0);
	ctx.lineTo(0,0);
	ctx.lineTo(196.1,107.25);
	ctx.quadraticCurveTo(239.2,96.4,273.15,96.4);
	ctx.quadraticCurveTo(307.1,96.4,351.9,107.25);
	*/
	
	//render(ctx)
}

function calcul3d(point)
{
	var scale = fov/(fov+point.z);
	var x2d = point.x * scale + w/2;
	var y2d = point.y * scale + h/2+5;
	return {x:x2d,y:y2d,scale:scale}
}


var fov = 250; //pixels are 250px away from us



