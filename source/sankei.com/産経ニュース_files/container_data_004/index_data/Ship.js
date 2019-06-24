var shipSmokeArray = new Array();
var fireArray = new Array();
var smokeTimer = 0;
var waveX = 0;
var dWX = 0.8


var nCanvas = document.createElement("CANVAS");		
nCanvas.width = 600;
nCanvas.height = 8;		
var wCtx = nCanvas.getContext('2d');	
var wavePic;

function drawShip(ctx)
{
	ctx.save();
	ctx.translate(img_ship.x,img_ship.y);
	ctx.scale(img_ship.scale,img_ship.scale);
	///////////SMOKE
	var i =0;
	for(i =0;i<shipSmokeArray.length;i++)
	{
		shipSmokeArray[i].y -=0.5;
		shipSmokeArray[i].x +=((shipSmokeArray[i].scale+shipSmokeArray[i].sScale/2)-0.2);
		shipSmokeArray[i].dScale +=(shipSmokeArray[i].sScale-shipSmokeArray[i].dScale)/8;
		shipSmokeArray[i].scale +=0.005;
		shipSmokeArray[i].alpha +=(0-shipSmokeArray[i].alpha)/60;
		
		ctx.save();
			ctx.translate(shipSmokeArray[i].x,shipSmokeArray[i].y);
			ctx.scale(shipSmokeArray[i].scale+shipSmokeArray[i].dScale,shipSmokeArray[i].scale+shipSmokeArray[i].dScale);			
			ctx.rotate(shipSmokeArray[i].rotate);		
			ctx.globalAlpha = shipSmokeArray[i].alpha;
			ctx.drawImage(img_smoke.pic,-30,-23);
		ctx.restore();
		if(shipSmokeArray[i].alpha<0.03)
		{
			shipSmokeArray.splice(i,1);
			i--;
		}
	}
	////////////////SHIP
	ctx.drawImage(img_ship.pic,0,-img_ship.pic.height);
	//ctx.drawImage(img_wave.pic,0,0);
	waveX+=dWX;
	waveX=waveX%62;
	wCtx.save();
		wCtx.translate(waveX-62,0);
		var	tpgr = wCtx.createLinearGradient(-waveX,0,600-waveX,8);
		tpgr.addColorStop(0.8, "rgba(0, 0, 0, 0.9)");		
		tpgr.addColorStop(1, "rgba(0, 0, 0, 0)");			
		wCtx.fillStyle=tpgr;
		wCtx.fillRect(-waveX,0,600,8);
		wCtx.globalCompositeOperation = "source-in";		
		var iPattern = wCtx.createPattern(img_wave.pic, 'repeat-x');	
		wCtx.fillStyle = iPattern;
		wCtx.fillRect(8-waveX+62,0,600,8);		
		wavePic = nCanvas;
	wCtx.restore();
	ctx.save();	
	ctx.globalAlpha = img_ship.wAlpha;
	ctx.drawImage(wavePic,0,-4.5);
	ctx.restore();
	
	
	if(img_ship.exp==true)
	{
		ctx.drawImage(img_ship.destroyPic,0,-img_ship.pic.height);
		addFire(150+Math.random()*110,-20+Math.random()*8,0.7);
		
		if(smokeTimer==0)
		{
			addSmoke(140+Math.random()*130,-25,0.8);	
			addSmoke(140+Math.random()*130,-25,0.8);				
		}
		if(smokeTimer==5)
		{
			addSmoke(140+Math.random()*130,-30,1.2);
			addSmoke(150+Math.random()*130,-30,1);
		}
		
	}
	else
	{		
		if(smokeTimer==0)
		{
			addSmoke(155,-45,0.15);
		}
		if(smokeTimer==5)
		{
			addSmoke(210,-45,0.15);
		}
	}
	///////////FIRE
	for(i =0;i<fireArray.length;i++)
	{
		fireArray[i].y -=fireArray[i].sScale/2;
		fireArray[i].x +=fireArray[i].sScale/2.4;
		fireArray[i].dScale +=(fireArray[i].sScale-fireArray[i].dScale)/8;
		fireArray[i].scale -=0.016;
		fireArray[i].alpha +=(0-fireArray[i].alpha)/30;
		
		ctx.save();
			ctx.translate(fireArray[i].x,fireArray[i].y);
			ctx.scale(fireArray[i].scale+fireArray[i].dScale,fireArray[i].scale+fireArray[i].dScale);			
			ctx.rotate(fireArray[i].rotate);		
			ctx.globalAlpha = fireArray[i].alpha;
			ctx.drawImage(img_fire.pic,-7,-10);
		ctx.restore();
		if(fireArray[i].alpha<0.03)
		{
			fireArray.splice(i,1);
			i--;
		}
	}	
	
	
	ctx.restore();
	
	smokeTimer++;
	smokeTimer=smokeTimer%10;
	
	ctx.save();
	ctx.translate(img_ship.x+130,img_ship.y-60);
	ctx.globalAlpha = img_ship.iAlpha;
	ctx.beginPath();
	ctx.moveTo(-4.1,-3.95);
	ctx.lineTo(-0.45,-3.95);
	ctx.lineTo(3.65,-11.95);
	ctx.lineTo(-4.1,-11.95);
	ctx.lineTo(-7.65,-7.85);
	ctx.lineTo(-4.1,-3.95);
	ctx.moveTo(4.35,-11.95);
	ctx.lineTo(0.15,-3.95);
	ctx.lineTo(8.9,-3.95);
	ctx.lineTo(8.9,-11.95);
	ctx.lineTo(4.35,-11.95);
	ctx.closePath();
	ctx.fillStyle = "#F5290C";
	ctx.strokeStyle = "#000000";	
	ctx.fill();	
	ctx.stroke();
	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctx.fillRect(-23,0,48,4);	
	ctx.fillStyle = "#F5290C";
	ctx.fillRect(-23,0,img_ship.hp*16,4);
	ctx.beginPath();
	ctx.rect(-23,0,48,4)
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
	
	
	
}

function drawDestroyShip()
{
	var nCanvas = document.createElement("CANVAS");		
	var w = img_ship.pic.width;		
	var h = img_ship.pic.height;		
	nCanvas.width = w;
	nCanvas.height = h;	
	var ctx = nCanvas.getContext('2d');		
	ctx.drawImage(img_ship.pic,0,0);
	ctx.globalCompositeOperation = "source-in";
	ctx.scale(3,1);
	var grd=ctx.createRadialGradient(70,50,5,70,50,110);
	grd.addColorStop(0,"rgba(0, 0, 0, 1)");
	grd.addColorStop(1,"rgba(0, 0, 0, 0)");	
	ctx.fillStyle=grd;	
	ctx.fillRect(0,0,w,h);	
	img_ship.destroyPic = nCanvas;	
}

function addSmoke(x,y,scale)
{
	var obj = {};
	//obj.sx = x;
	//obj.sy = y;
	obj.x = x;
	obj.y = y;
	obj.sScale = scale+Math.random()*0.2;
	obj.dScale = 0;
	obj.scale = 0;
	obj.alpha = 0.9;
	obj.rotate = Math.random()*5;
	shipSmokeArray.push(obj);
}

function addFire(x,y,scale)
{
	var obj = {};	
	obj.x = x;
	obj.y = y;
	obj.sScale = scale+Math.random()*0.8;
	obj.dScale = 0;
	obj.scale = 0;
	obj.alpha = 0.9;
	obj.rotate = Math.random()*5;
	fireArray.push(obj);
}