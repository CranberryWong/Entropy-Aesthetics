var splashArray = new Array();

function addSplash(torp)
{
	var spO = {};
	spO.sx = torp.x2D1;
	spO.sy = torp.y2D1;
	spO.x = spO.sx;
	spO.y = spO.sy;	
	spO.dist = 0;
	spO.ang = torp.ang;
	spO.scale = torp.scale*0.7;	
	spO.rotate = Math.random()*10;
	splashArray.push(spO);	
	
}
var dx = -20;
function addSplash3D(sx,sy,sz,ang,dist,dx,torped)
{
	var spO = {};
	spO.sx = sx;
	spO.sy = sy;
	spO.sz = sz;	
	spO.dist = dist;
	spO.dDist = 0;
	//spO.sScale = scale;
	spO.scale = 0.5;
	spO.ang = ang;
	spO.dx = 0;
	spO.ddx = torped.dx;
	spO.alpha = 0.6+Math.random()*0.3;
	spO.rotate = Math.random()*10;
	spO.torped = torped;
	splashArray.push(spO);	
	
}

function drawSplash(ctx)
{

	
	
	
	
	for(var i =0;i<splashArray.length;i++)
	{
		splashArray[i].dDist+=0.6;
		splashArray[i].scale-=0.004;
		splashArray[i].alpha-=0.015;
		splashArray[i].z = splashArray[i].sz-Math.sin(splashArray[i].ang)*(splashArray[i].dist+splashArray[i].dDist);
		splashArray[i].x = splashArray[i].sx-Math.cos(splashArray[i].ang)*(splashArray[i].dist+splashArray[i].dDist);
		var splash3D = calcul3d({x:splashArray[i].x,y:y3D,z:splashArray[i].z});
		
		splashArray[i].scale3D = splash3D.scale*splashArray[i].scale;
		splashArray[i].ddx+=splashArray[i].dx;
		//splashArray[i].dscale += calcul3d({x:splashArray[i].x,y:splashArray[i].y,z:splashArray[i].z}).scale;
			//torpedArray[t].scale = calcul3d({x:torpedArray[t].x,y:torpedArray[t].y,z:torpedArray[t].z}).scale;
		//splashArray[i].dx+=splashArray[i].ddx;
		
		ctx.save();
		
		ctx.translate(splash3D.x+splashArray[i].torped.dx,splash3D.y);
		
		ctx.scale(splashArray[i].scale3D,splashArray[i].scale3D);
		ctx.rotate(splashArray[i].rotate);
		
		ctx.globalAlpha = splashArray[i].alpha;
		ctx.drawImage(img_splash.pic,-10,-10);
		ctx.restore();			
		
		
		if(splashArray[i].alpha<0.1)
		{
			splashArray.splice(i,1);
			i--;
		}
	}
	

	
}