var expSplashArray = new Array();
var expArray = new Array();
function addExpSplash(x,y)
{	
	var obj = {};
	obj.x = x;
	obj.y = y;
	obj.scale = 0.2;
	obj.mScale = 1.6;
	expSplashArray.push(obj);	
}

function addExp(x,y,scale)
{
	var i=0;
	var eObj = {};
	eObj.smokeArray = new Array();
	eObj.fireArray = new Array();
	eObj.sparkArray = new Array();
	eObj.x = x;
	eObj.y = y;
	eObj.scale = scale;
	for(i=0;i<3;i++)
	{
		var obj = {};
		obj.x = 0;
		obj.y = 0;
		obj.scale = 0;
		obj.sScale = 0.6+Math.random()*0.6;
		obj.dScale = 0;
		obj.ang = Math.random()*5;
		obj.sDist =10+Math.random()*10;
		obj.dist = 0;
		obj.alpha = 0.7+Math.random()*0.6;
		eObj.smokeArray.push(obj)
	}
	for(i=0;i<4;i++)
	{
		var obj = {};
		obj.x = 0;
		obj.y = 0;
		obj.scale = 0;
		obj.sScale = 0.4+Math.random()*0.6;
		obj.dScale = 0;
		obj.ang = Math.random()*5;
		//obj.dAng = Math.random()*0.1-0.05;
		obj.sDist =6+Math.random()*10;
		obj.dist = 0;
		obj.speed = 5+Math.random()*8;
		obj.alpha = 1+Math.random();
		eObj.fireArray.push(obj)
	}
	for(i=0;i<30;i++)
	{
		var obj = {};
		obj.ang = -120+Math.random()*60;
		obj.x = 0;
		obj.y = 20;
		obj.fx = 0;
		obj.fy = 20;
		obj.color = parseInt(Math.random()*30)+180;
		obj.scale = 0.4+Math.random()*0.8;
		obj.alpha = 1+Math.random();
		obj.dist = Math.random()*80+20;
		obj.length = 0;
		eObj.sparkArray.push(obj);
	}		
	expArray.push(eObj);
}

function drawExpSplash(ctx)
{
	for(var i=0; i<expSplashArray.length;i++)
	{
		expSplashArray[i].scale+=(2-expSplashArray[i].scale)/10;
		expSplashArray[i].mScale+=(0-expSplashArray[i].mScale)/30;
		expSplashArray[i].x+=img_ship.dx;
		
		ctx.save();
		ctx.translate(expSplashArray[i].x,expSplashArray[i].y);
		ctx.scale(expSplashArray[i].scale*expSplashArray[i].mScale,expSplashArray[i].scale*expSplashArray[i].mScale);
		ctx.drawImage(img_splash.pic,-10,-10);
		ctx.restore();
		
		ctx.save();
		ctx.translate(expSplashArray[i].x,expSplashArray[i].y+3);
		ctx.scale(expSplashArray[i].scale*expSplashArray[i].mScale*0.8,expSplashArray[i].scale*expSplashArray[i].mScale*0.8);
		ctx.drawImage(img_splash.pic,-10,-10);
		ctx.restore();	
		
		ctx.clearRect(0,expSplashArray[i].y,w,h-expSplashArray[i].y);
		if(expSplashArray[i].mScale<0.1)
		{
			expSplashArray.splice(i,1);
			i--;
		}
	}	
}

function drawExp(ctx)
{
	for(var i=0;i<expArray.length;i++)
	{
		expArray[i].x+=img_ship.dx+0.1;
		expArray[i].y-=0.2;
		ctx.save();
		ctx.translate(expArray[i].x,expArray[i].y);
		ctx.scale(expArray[i].scale,expArray[i].scale);
		var sArray = expArray[i].smokeArray;
		var fArray = expArray[i].fireArray;
		var sparkArray = expArray[i].sparkArray;
	//	console.log(sArray.length)
		for(var s=0;s<sArray.length;s++)
		{
			sArray[s].scale+=(sArray[s].sScale-sArray[s].scale)/15;
			sArray[s].dScale +=0.01;
			sArray[s].dist+=(sArray[s].sDist-sArray[s].dist)/10;
			sArray[s].x = Math.cos(sArray[s].ang)*sArray[s].dist;
			sArray[s].y = Math.sin(sArray[s].ang)*sArray[s].dist;
			//sArray[s].alpha +=(0-sArray[s].alpha)/50;
			sArray[s].alpha -=0.01;
			ctx.save();			
			ctx.translate(sArray[s].x,sArray[s].y);
			ctx.scale(sArray[s].scale+sArray[s].dScale,sArray[s].scale+sArray[s].dScale);
			ctx.globalAlpha = sArray[s].alpha;
			ctx.rotate(sArray[s].ang);
			ctx.drawImage(img_smoke.pic,-30,-23);
			ctx.restore();
			if(sArray[s].alpha<0.01)
			{
				sArray.splice(s,1);
				s--;
			}
		}
		for(var f=0;f<fArray.length;f++)
		{
			fArray[f].scale+=(fArray[f].sScale-fArray[f].scale)/8;
			fArray[f].dScale +=0.01;
			fArray[f].dist+=(fArray[f].sDist-fArray[f].dist)/10;
			fArray[f].x = Math.cos(fArray[f].ang)*fArray[f].dist;
			fArray[f].y = Math.sin(fArray[f].ang)*fArray[f].dist;
			fArray[f].alpha +=(0-fArray[f].alpha)/fArray[f].speed;
			//fArray[f].ang+=fArray[f].dAng;
			ctx.save();			
			ctx.translate(fArray[f].x,fArray[f].y);
			ctx.scale(fArray[f].scale+fArray[f].dScale,fArray[f].scale+fArray[f].dScale);
			ctx.globalAlpha = fArray[f].alpha;
			ctx.rotate(fArray[f].ang);
			ctx.drawImage(img_exp.pic,-30,-23);
			ctx.restore();
			if(fArray[f].alpha<0.02)
			{
				fArray.splice(f,1);
				f--;
			}
		}
		for(var sp=0;sp<sparkArray.length;sp++)
		{
			ctx.save();
				sparkArray[sp].length = sparkArray[sp].length+(sparkArray[sp].dist-sparkArray[sp].length)/15;
				sparkArray[sp].x = Math.cos(sparkArray[sp].ang*Math.PI/180)*sparkArray[sp].length;
				sparkArray[sp].y = Math.sin(sparkArray[sp].ang*Math.PI/180)*sparkArray[sp].length;
				sparkArray[sp].fy += 0.9*sparkArray[sp].scale;
				sparkArray[sp].fx -= 0.1;
				sparkArray[sp].alpha -=0.04;
				ctx.fillStyle = "rgba(255, " + sparkArray[sp].color +", 60, " + sparkArray[sp].alpha +")"
				ctx.fillRect(sparkArray[sp].x+sparkArray[sp].fx,sparkArray[sp].y+sparkArray[sp].fy,sparkArray[sp].scale,sparkArray[sp].scale);
				if(sparkArray[sp].alpha<0)
				{
					sparkArray.splice(sp,1);
					sp--;
				}
			ctx.restore();
		}
		ctx.restore();
		if(sArray.length==0&&fArray.length==0&&sparkArray.length==0)
		{
			expArray.splice(i,1);
			i--;
		}
	}
	
}
