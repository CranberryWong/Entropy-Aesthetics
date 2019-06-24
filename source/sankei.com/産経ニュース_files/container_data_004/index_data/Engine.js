////////////////////////////////////////////////////////////////////////////////////// VARS
var canvasInteractive, 	
	canvasBg, ctxBg,	
	canvasInterface, ctxInterface,	
	canvasLogo, ctxLogo,
	canvasPackshot, ctxPackshot,	
	canvasPattern, ctxPattern,
	canvasTarget, ctxTarget,
	canvasExp, ctxExp,
	canvasTorpedoes, ctxTorpedoes,
	canvasAgain, ctxAgain,
	canvasButton, ctxButton,	
	w, h;
	
var imagesToLoad = 
	{
		water: "gfx/water.jpg",
		sky: "gfx/sky.jpg",
		mounts: "gfx/mounts.jpg",
		torpIcon: "gfx/torpIcon.jpg",	
		splash: "gfx/splash.png",	
		ship: "gfx/ship.png",
		smoke: "gfx/smoke.png",
		fire: "gfx/fire.png",	
		exp: "gfx/exp.png",	
		wave: "gfx/wave.png",	
		packshot: "gfx/packshot.jpg",		
		logo: "gfx/Logo.png",
		motto: "gfx/Motto.png",				
		pattern: "gfx/Pattern.png",			
		button: "gfx/Button.jpg"	
	
 	};
	
var img_logo = {},
	gfx_Pattern = {},	
	gfx_button = {},
	gfx_packshot = {},
	img_water = {},	
	img_target = {},
	img_mounts = {},
	img_ship = {},
	gfx_darker = {},	
	img_splash = {},	
	img_smoke = {},
	img_exp = {},
	img_fire = {},
	img_torpIcon = {},	
	textPlate = {},
	tTextPlate = {},
	againPlate = {},
	mousePos = {},
	img_wave = {},
	img_sky = {};

var waterMapArray = new Array();
var torpedArray = new Array();


var shoot = false;

var topTextState = 0;

//
var overFl = false;
var isButtonOver = false;

var addExpArray = new Array();
var addExpCount=0;

var autoPlayTimer = 0;
var autoPlay = false;
var buttonHitTest = false;



////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS
function start()
{
	canvasInteractive = document.querySelector("#Interactive");
	canvasBg       = document.querySelector("#Bg");	
	ctxBg = canvasBg.getContext('2d');	
	canvasDarker      = document.querySelector("#Darker");	
	canvasInterface       = document.querySelector("#Interface");	
	ctxInterface = canvasInterface.getContext('2d');	
	canvasLogo      = document.querySelector("#Logo");	
	ctxLogo  = canvasLogo.getContext('2d');
	canvasPackshot      = document.querySelector("#Packshot");	
	ctxPackshot  = canvasPackshot.getContext('2d');	
	canvasPattern = document.querySelector("#Pattern");
	ctxPattern = canvasPattern.getContext('2d');
	canvasButton = document.querySelector("#Button");
	ctxButton = canvasButton.getContext('2d');
	canvasTarget = document.querySelector("#Target");
	ctxTarget = canvasTarget.getContext('2d');	
	canvasTorpedoes = document.querySelector("#Torpedoes");
	ctxTorpedoes = canvasTorpedoes.getContext('2d');
	canvasAgain = document.querySelector("#Again");
	ctxAgain = canvasAgain.getContext('2d');
	canvasExp = document.querySelector("#Exp");
	ctxExp = canvasExp.getContext('2d');		

	//
	w = canvasInteractive.width; 
	h = canvasInteractive.height;

	//
	

	
  
	//
	loadImages(imagesToLoad, function(imagesLoaded)
	{
				
		img_logo.pic = imagesLoaded.logo;	
		img_logo.motto = imagesLoaded.motto;				
		gfx_button.pic = imagesLoaded.button;		
		img_sky.pic = imagesLoaded.sky;	
		img_water.pic = imagesLoaded.water;				
		img_mounts.pic = imagesLoaded.mounts;		
		gfx_Pattern.pic = imagesLoaded.pattern;	
		img_splash.pic = imagesLoaded.splash;	
		img_ship.pic = imagesLoaded.ship;	
		gfx_darker.canvas = canvasDarker;		
		img_smoke.pic =  imagesLoaded.smoke;	
		img_fire.pic =  imagesLoaded.fire;	
		img_exp.pic = imagesLoaded.exp;
		img_torpIcon.pic =  imagesLoaded.torpIcon;
		gfx_packshot.pic = imagesLoaded.packshot;
		img_wave.pic = imagesLoaded.wave;

		//
		init();
	});
}

//
function init()
{
	drawPatternElements();
	setStartPos();
	drawSkyPic();
	drawMountsElemets();
	drawDestroyShip();
	drawPatternElements();
	
	//
	gfx_darker.alpha = 1;
	drawDarker(gfx_darker);
	TweenLite.to(gfx_darker, 1.4, {alpha: 0, ease:Power1.easeOut, onUpdate:drawDarker, onUpdateParams:[gfx_darker]});
	
	
	
	
	

	var ph=1.1;
	drawWaterSlice(30,0,1);
	for(var i=0; i<8;i++)
	{
		ph*=1.3;
		drawWaterSlice(16*ph,22*ph-30,ph);		
	}
	//drawTopSlice();
	
	

	
	
	requestID = window.requestAnimationFrame(update);

	
	
	//

	
	
}

function mOver()
{

	overFl = true;
	TweenLite.to(img_sky, 0.4, {scale: 1,  y:20, ease:Power2.easeOut});
	TweenLite.to(img_water, 0.4, {y: img_water.sy+40, ease:Power2.easeOut});
	TweenLite.to(img_ship, 0.4, {y: img_ship.sy+10+40,  scale:0.6, ease:Power2.easeOut});
	TweenLite.to(img_ship, 0.2, {iAlpha:1, ease:Power2.easeOut});
	if(shoot==false)
	{
		TweenLite.to(img_torpIcon, 0.4, {alpha:1, y:img_torpIcon.sy, ease:Power2.easeOut});
		TweenLite.to(textPlate, 0.2, {y:h, ease:Sine.easeOut});
		TweenLite.killTweensOf(tTextPlate);	
		TweenLite.killTweensOf(img_logo);	
		TweenLite.to(tTextPlate, 0.2, {y:0, ease:Sine.easeOut,delay:0.2});
		TweenLite.to(img_logo, 0.4, {y: img_logo.sy-50, alpha:0, ease:Power2.easeOut, onUpdate:drawLogo, onUpdateParams:[ctxLogo,img_logo]});
		TweenLite.to(Pattern.tPattern, 0.4, {alpha: 0, ease:Power2.easeOut});
	}
	
}

function mOut()
{
	overFl = false;
	if(shoot==false)
	{
		TweenLite.to(img_sky, 0.4, {scale: 1.2, y:0, ease:Power2.easeOut});
		TweenLite.to(img_water, 0.4, {y: img_water.sy, ease:Power2.easeOut});
		TweenLite.to(img_ship, 0.4, {y: img_ship.sy, scale:1/1.2, ease:Power2.easeOut});
		TweenLite.to(img_ship, 0.2, {iAlpha:0, ease:Power2.easeOut});
		TweenLite.to(img_torpIcon, 0.4, {alpha:0, y:img_torpIcon.sy+40, ease:Power2.easeOut});
		TweenLite.to(textPlate, 0.2, {y:h-44, ease:Sine.easeOut});
		TweenLite.killTweensOf(tTextPlate);	
		TweenLite.killTweensOf(img_logo);	
		TweenLite.to(tTextPlate, 0.2, {y:-60, ease:Sine.easeOut});
		TweenLite.to(img_logo, 0.4, {delay:0.2, y: img_logo.sy, alpha:1, ease:Power2.easeOut, onUpdate:drawLogo, onUpdateParams:[ctxLogo,img_logo]});
		TweenLite.to(Pattern.tPattern, 0.4, {alpha: 1, ease:Power2.easeOut});
	}
}

function drawSkyPic()
{
	var nCanvas = document.createElement("CANVAS");		
	var w = img_sky.pic.width*3;		
	var h = img_sky.pic.height;		
	nCanvas.width = w;
	nCanvas.height = h;	
	var ctx = nCanvas.getContext('2d');	
	var pattern = ctx.createPattern(img_sky.pic, "repeat");
	ctx.fillStyle = pattern;
	ctx.fillRect(0,0,w,h);
	img_sky.pattern = nCanvas;
}



function setStartPos()
{
	

	img_sky.x = 0;
	img_sky.y = 0;
	img_sky.scale = 1.2;
	img_water.y = 290-5;
	img_water.sy = 290-5;
	
	img_target.sx = w/2;
	img_target.x = w/2;
	img_target.sy = h-170;
	img_target.y = h-170;
	img_target.ang = -1;
	
	img_mounts.x1 = 400;
	img_mounts.x2 = 0;
	
	img_ship.x = -50;
	img_ship.sy = 294-5;
	img_ship.y = 294-5;
	img_ship.scale = 1/1.2;
	img_ship.hp = 2;
	img_ship.iAlpha = 0;
	img_ship.dx = -0.1;
	img_ship.exp = false;
	img_ship.wAlpha = 1;
	
	img_torpIcon.alpha=0;
	img_torpIcon.x=w/2-23;
	img_torpIcon.sy=h-100;
	img_torpIcon.y=img_torpIcon.sy+50;
	
	textPlate.x = w/2;
	textPlate.y = h-44;	
	
	tTextPlate.x = w/2;
	tTextPlate.y = -60;
	
	againPlate.x = w/2;
	againPlate.sy = h;
	againPlate.y = againPlate.sy;
	againPlate.isOver = false;
	againPlate.paramG = 200;
	againPlate.paramB = 200;
	againPlate.alpha = 0.5;
	
	Pattern.tPattern.alpha = 1;
	Pattern.bPattern.alpha = 0;
	Pattern.lPattern.alpha = 0;
	
	img_logo.x = w/2;
	img_logo.sy = 80;
	img_logo.y = 80;
	img_logo.alpha = 1;
	drawLogo(ctxLogo,img_logo);
	drawPattern(ctxPattern);
	
	
	
	canvasInteractive.addEventListener('mouseover', mOver, false);
	canvasInteractive.addEventListener('mouseout', mOut, false);
	canvasInteractive.addEventListener('mousemove', mMove, false);
	canvasInteractive.addEventListener('click', mClick, false);
	
	TweenLite.killTweensOf(gfx_button);
	ctxButton.clearRect(0,0,w,h);	

}

function drawTorpIcon(ctx)
{
	ctx.save();
	ctx.globalAlpha = img_torpIcon.alpha;
	ctx.drawImage(img_torpIcon.pic,img_torpIcon.x,img_torpIcon.y);
	ctx.restore();
}

function scalePacksoht()
{
	gfx_packshot.scale = 0.97;
	TweenLite.killTweensOf(gfx_packshot);	
	TweenLite.to(gfx_packshot, 2, {scale: 1,  ease:Elastic.easeOut, onUpdate:drawPackshot});	
}

function setHitArea()
{
	//frame = 5;
	buttonHitTest = true;
	//canvasInteractive.addEventListener('click', mClick, false);
	canvasInteractive.addEventListener('mousemove', mMove, false);
	canvasInteractive.addEventListener('mouseout', buttonOut, false);
	canvasInteractive.addEventListener('mouseout', againOut, false);
	canvasInteractive.style.cursor = 'pointer';
}
function mClick(e)
{
	/*if(gfx_rButton.mouseOver == true&&frame==2)
	{
		frame = 3;
		
		//	drawSpeed(ctxInterface,(-Math.abs(Math.sin(gfx_speedometer.ang))*300-60)* Math.PI / 180);
		var finSpeed = 2+(1-Math.abs(Math.sin(gfx_speedometer.ang)))*2;
		TweenLite.to(window, 8, {tankSpeed:finSpeed, ease:Power2.easeOut});
		animFunc = lSpeedAnim;
		if(finSpeed>2.8)
		{
			animFunc = mSpeedAnim;
		}
		if(finSpeed>3.4)
		{
			animFunc = hSpeedAnim;
		}
		TweenLite.to(textPlate, 0.2, {y:h, ease:Sine.easeOut});
		TweenLite.to(gfx_rButton, 0.3, {delay:0.6, alpha: 0, x:gfx_rButton.x-50, ease:Sine.easeOut});
		TweenLite.to(gfx_speedometer, 0.3, {delay:0.5, alpha: 0, x:gfx_speedometer.x-50, ease:Sine.easeOut});		
	}
	if(frame==5)
	{	
		ExitApi.exit();
	}*/
	if(shoot==false)
	{
		shoot=true;
		var tO = {};	
		tO.x = point1.x;
		tO.y = point1.y;	
		tO.z = point1.z;
		tO.sx = tO.x;	
		tO.sz = tO.z;	
		tO.dist = 0;
		tO.ang = -img_target.ang;
		tO.sAng = tO.ang;
		tO.scale = 1;
		tO.dx = 0;
		tO.enable = true;
		torpedArray.push(tO);
		
		tO = {};
		tO.x = point3.x;
		tO.y = point3.y;
		tO.z = point3.z;
		tO.sx = tO.x;	
		tO.sz = tO.z;
		tO.dist = 0;
		tO.ang = -(img_target.ang+veer);
		tO.sAng = tO.ang;
		tO.scale = 1;
		tO.dx = 0;
		tO.enable = true;
		torpedArray.push(tO);
		
		tO = {};
		tO.x = point5.x;
		tO.y = point5.y;
		tO.z = point5.z;
		tO.sx = tO.x;	
		tO.sz = tO.z;
		tO.dist = 0;
		tO.ang = -(img_target.ang-veer);
		tO.sAng = tO.ang;
		tO.scale = 1;
		tO.dx = 0;
		tO.enable = true;
		torpedArray.push(tO);
		img_torpIcon.alpha = 0.5;
		TweenLite.to(img_torpIcon, 0.4, {delay:0.4,alpha:0, y:img_torpIcon.sy+40, ease:Power2.easeOut});
		TweenLite.to(tTextPlate, 0.2, {y:-60, ease:Sine.easeOut});
	}
	if(buttonHitTest==true)
	{
		if(mousePos.y>againPlate.y)
		{
			TweenLite.killDelayedCallsTo(restartBanner);
			restartBanner();
		}
		else
		{
			ExitApi.exit();
		}
	}
	//torpedArray
	
}

function toPackshot()
{
	gfx_packshot.x = w/2;
	gfx_packshot.y = h/2;
	gfx_packshot.scale = 2;
	gfx_packshot.alpha = 0;	
	
	gfx_button.alpha = 1.2;
	gfx_button.scaleX = 1;
	gfx_button.scaleY = 1;
	gfx_button.x = w/2;
	gfx_button.y = h-50;
	
	img_logo.x = w/2;	
	img_logo.y = h-210;
	img_logo.alpha = 0;
	
	
	TweenLite.to(img_logo, 0.4, {delay:1.1, y: h-180, alpha:1, ease:Power2.easeOut, onUpdate:drawLogo, onUpdateParams:[ctxLogo,img_logo]});
	
	TweenLite.to(gfx_packshot, 1.3, {scale: 1, alpha:1, ease:Power2.easeOut, onUpdate:drawPackshot});
	TweenLite.from(gfx_button, 0.8, {delay:1.7, scaleX:1.8, scaleY:1.8, alpha:0, ease: Bounce.easeOut, onUpdate:drawButton, onComplete:setHitArea, onUpdateParams:[ctxButton,gfx_button]});
	TweenLite.to(Pattern.bPattern, 1.1, {alpha: 1, delay:1, ease:Power2.easeOut});
	//TweenLite.to(Pattern.lPattern, 1.1, {alpha: 1, delay:1, ease:Power2.easeOut});
	TweenLite.delayedCall(1.99,scalePacksoht);
	TweenLite.to(againPlate, 0.4, {delay:2.2, y: h-19,  ease:Power2.easeOut});
	
	TweenLite.delayedCall(10,restartBanner);
		
	
}

function drawPackshot()
{
	var ctx = ctxPackshot;
	ctx.save();
	ctx.clearRect(0,0,w,h);
	ctx.translate(gfx_packshot.x,gfx_packshot.y);
	ctx.scale(gfx_packshot.scale,gfx_packshot.scale);
	ctx.globalAlpha = gfx_packshot.alpha;
	ctx.drawImage(gfx_packshot.pic,-parseInt(gfx_packshot.pic.width/2),-parseInt(gfx_packshot.pic.height/2));
	ctx.restore();
}

//
function restartBanner()
{
canvasInteractive.removeEventListener('mouseout', buttonOut, false);
canvasInteractive.removeEventListener('mouseout', againOut, false);
canvasInteractive.removeEventListener('mousemove', mMove, false);	
canvasInteractive.removeEventListener('click', mClick, false);
img_ship.exp=false;
TweenLite.to(againPlate, 0.4, {y: h,  ease:Power2.easeOut});

	TweenLite.to(gfx_darker, 1.4, {alpha: 1, ease:Power1.easeIn, onUpdate:drawDarker, onUpdateParams:[gfx_darker], onComplete: function()
		{
			
			buttonHitTest = false;
			shoot = false;
			topTextState = 0;
			overFl = false;
			isButtonOver = false;

			addExpArray.splice(0,addExpArray.length);
			torpedArray.splice(0,torpedArray.length);
			addExpCount=0;
			autoPlayTimer = 0;
			autoPlay = false;
			buttonHitTest = false;
			
			buttonOut(0);
			ctxPackshot.clearRect(0,0,w,h);							
			ctxButton.clearRect(0,0,w,h);
			ctxPattern.clearRect(0,0,w,h);	
			
			
			
			setStartPos();				
			//
			gfx_darker.alpha = 1;			
			TweenLite.to(gfx_darker, 1.4, {alpha: 0, ease:Power1.easeOut, onUpdate:drawDarker, onUpdateParams:[gfx_darker]});	
			canvasInteractive.style.cursor = 'default';
			
		}});
}

var splashTimer = 5;

//
function update()
{

	var ctx = ctxBg;
	//ctx.clearRect(0,0,w,h);
	img_sky.x+=0.1;
	img_sky.x = img_sky.x%img_sky.pic.width;
	ctx.save();
	ctx.translate(w/2,0);
	ctx.scale(img_sky.scale,img_sky.scale);
	ctx.drawImage(img_sky.pattern,img_sky.x-img_sky.pic.width-w/2,img_sky.y-20);
	img_mounts.x1+=0.2;
	img_mounts.x2+=0.2;
	img_mounts.x1=img_mounts.x1%(w+290);
	img_mounts.x2=img_mounts.x2%(w+290);
	ctx.drawImage(img_mounts.mount1,img_mounts.x1-290-w/2,img_water.y-37)
	ctx.drawImage(img_mounts.mount2,(img_mounts.x2-162-w/2),img_water.y-37)
	
	for(var i=0;i<waterMapArray.length;i++)
	{
		waterMapArray[i].x += waterMapArray[i].k*0.4;
		waterMapArray[i].x = waterMapArray[i].x%364;
		ctx.drawImage(waterMapArray[i].pic,waterMapArray[i].x-img_water.pic.width-w/2,waterMapArray[i].y+img_water.y);		
	}
	img_ship.x+=img_ship.dx;
	drawShip(ctx);
	ctx.restore();

	
	ctxTarget.clearRect(0,0,w,h);
	if(overFl==true&&shoot==false)
	{
		drawTarget(ctxTarget);
	}
	ctxTorpedoes.clearRect(0,0,w,h);
	splashTimer++;
	splashTimer=splashTimer%3;
	
	var tropEnable = false;
		for(var t=0;t<torpedArray.length;t++)
		{	
			
			torpedArray[t].dist -=1.2; 			
			
			torpedArray[t].z = torpedArray[t].sz-Math.sin(torpedArray[t].ang)*torpedArray[t].dist;
			torpedArray[t].x = torpedArray[t].sx-Math.cos(torpedArray[t].ang)*torpedArray[t].dist;	
			var torp3D = calcul3d({x:torpedArray[t].x,y:torpedArray[t].y,z:torpedArray[t].z});
			torpedArray[t].scale = torp3D.scale;
			torpedArray[t].dx += (torpedArray[t].scale+1)/3;			
			
			
			if(splashTimer==0&&torpedArray[t].enable==true)
			{
				addSplash3D(torpedArray[t].sx,torpedArray[t].y,torpedArray[t].sz,torpedArray[t].ang,torpedArray[t].dist,torpedArray[t].dx,torpedArray[t]);
			}
			
			if(torp3D.x+torpedArray[t].dx<(img_ship.x+w/2+4)+448*img_ship.scale)
			{
				tropEnable = true;
			}
			
			if(torp3D.y<img_ship.y&&torp3D.x+torpedArray[t].dx>(img_ship.x+w/2+4)&&torp3D.x+torpedArray[t].dx<(img_ship.x+w/2+4)+448*img_ship.scale&&torpedArray[t].enable==true)
			{
				torpedArray[t].enable = false;				
				addExpSplash(torp3D.x+torpedArray[t].dx,torp3D.y);	
				addExp(torp3D.x+torpedArray[t].dx,torp3D.y-10,0.7);
				addExp(torp3D.x+torpedArray[t].dx+5,torp3D.y-15,0.7);
				if(img_ship.exp==false)
				{				
					img_ship.hp--;					
				}
				if(img_ship.hp==0&&img_ship.exp==false&&autoPlay==false)
				{
					img_ship.exp = true;
					TweenLite.to(img_ship, 0.6, {dx:0.4, wAlpha:0, ease:Sine.easeIn});
					//TweenLite.to(window, 0.6, {dWX:0, ease:Sine.easeIn});
				
					
					
					//addExp(img_ship.x+w/2+160,img_ship.y-30,0.9);
					//addExp(img_ship.x+w/2+120,img_ship.y-30,1.2);
					//addExp(img_ship.x+w/2+180,img_ship.y-20,0.7);
					//addExp(img_ship.x+w/2+90,img_ship.y-30,0.7);
					var obj = {};
					obj.x = img_ship.x+w/2+160;
					obj.y = img_ship.y-30;
					obj.scale = 0.9;
					addExpArray.push(obj);
					obj = {};
					obj.x = img_ship.x+w/2+130;
					obj.y = img_ship.y-30;
					obj.scale = 1.1;
					addExpArray.push(obj);
					obj = {};
					obj.x = img_ship.x+w/2+180;
					obj.y = img_ship.y-20;
					obj.scale = 0.7;
					addExpArray.push(obj);
					obj = {};
					obj.x = img_ship.x+w/2+90;
					obj.y = img_ship.y-30;
					obj.scale = 0.7;
					addExpArray.push(obj);
					topTextState = 2;
					TweenLite.to(tTextPlate, 0.2, {delay:1,y:0, ease:Sine.easeOut});
					TweenLite.delayedCall(4.2,toPackshot);					
				}
			}
			if(torp3D.y<img_ship.y-10)
			{
				torpedArray[t].enable = false;				
			}
			
			if(torp3D.y<img_ship.y-15)
			{
				torpedArray.splice(t,1)
				t--;
			}			
	}
	if(tropEnable==false&&shoot==true&&topTextState==0&&img_ship.exp==false&&autoPlay==false)
	{
		topTextState = 1;
		TweenLite.to(tTextPlate, 0.2, {delay:1,y:0, ease:Sine.easeOut});
		TweenLite.delayedCall(4.2,toPackshot);		
	}
	if(addExpArray.length>0&&addExpCount<addExpArray.length&&splashTimer==0)
	{
		addExp(addExpArray[addExpCount].x,addExpArray[addExpCount].y,addExpArray[addExpCount].scale);
		addExpCount++;
	}
	
	ctxExp.clearRect(0,0,w,h);
	drawExpSplash(ctxExp);
	drawExp(ctxExp);	
	drawSplash(ctxTorpedoes);
	
	ctxInterface.clearRect(0,0,w,h);
	drawTorpIcon(ctxInterface);
	drawTextPlate(ctxInterface);
	
	drawTopTextPlate(ctxInterface);	
	drawPattern(ctxPattern);
	
	drawAgainPate(ctxAgain);
	
	autoPlayTimer++;	
	if(autoPlayTimer==100+700&&shoot==false)
	{
		mousePos.x = 50;
		mousePos.y = 150;
		canvasInteractive.removeEventListener('mouseover', mOver, false);
		canvasInteractive.removeEventListener('mouseout', mOut, false);
		canvasInteractive.removeEventListener('mousemove', mMove, false);
		mOver();
		autoPlay = true;		
	}
	if(autoPlayTimer==150+700&&autoPlay==true)
	{
		mClick();
	}
	if(autoPlayTimer==310+700&&autoPlay==true)
	{
		toPackshot();		
	}
	
	//
	requestID = window.requestAnimationFrame(update);
}



function buttonOver(e)
{	
	TweenLite.to(gfx_button, 0.9, {scaleX:1.2, scaleY:1.2, ease: Elastic.easeOut, onUpdate:drawButton, onUpdateParams:[ctxButton,gfx_button]});			
}
function buttonOut(e)
{
	TweenLite.to(gfx_button, 0.7, {scaleX:1, scaleY:1, ease: Elastic.easeOut, onUpdate:drawButton, onUpdateParams:[ctxButton,gfx_button]});
}


// mouse move
function mMove(evt)
{
	mousePos = getMousePos(evt);
	
	if(overFl == false)
	{
		mOver();
	}
		var leftBorder = gfx_button.x-gfx_button.pic.width*gfx_button.scaleX/2;//(w - gfx_button.pic.width) / 2;
		var topBorder = gfx_button.y-gfx_button.pic.height*gfx_button.scaleY/2;
		//console.log(gfx_button.x)
		//console.log("x: "+mousePos.x+" > "+leftBorder+" < "+(leftBorder + gfx_button.pic.width*gfx_button.pic.scale))	
		if(buttonHitTest==true)
		{
			if(mousePos.x > leftBorder && mousePos.x < (leftBorder + gfx_button.pic.width*gfx_button.scaleX) && mousePos.y > topBorder && mousePos.y < topBorder+gfx_button.pic.height*gfx_button.scaleY)
			{		
		
				if(isButtonOver==false)
				{
					isButtonOver = true;
					//canvasInteractive.style.cursor = 'pointer';
					buttonOver();
				}			
			}
			else
			{
				if(isButtonOver==true)
				{
					isButtonOver = false;
					//canvasInteractive.style.cursor = 'default';
					buttonOut();
				}
			}
			if(mousePos.y>againPlate.y&&againPlate.isOver==false)
			{				
				againOver();				
			}
			if(mousePos.y<againPlate.y&&againPlate.isOver==true)
			{				
				againOut();				
			}
		}
	
		
}

function againOver()
{
	againPlate.isOver=true;		
	TweenLite.killTweensOf(againPlate);				
	TweenLite.to(againPlate, 0.4, {y:h - 22, paramG: 60, paramB: 50, alpha:1, ease:Elastic.easeOut});
	//TweenLite.to(againPlate, 0.24, {paramG: 10, paramB: 10, alpha:1, ease:Power1.easeOut});
}

function againOut()
{
	againPlate.isOver=false;
	TweenLite.killTweensOf(againPlate);
	TweenLite.to(againPlate, 0.2, {y:h - 19, paramG: 200, paramB: 200, alpha:0.5, ease: Power2.easeOut});
}



/////////////////////////////////////////////// SERVICE
function getMousePos(evt)
{
   var rect = canvasInteractive.getBoundingClientRect();
   return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
   };
}

//
function loadImages(imagesToBeLoaded, drawCallback)
{
	var imagesLoaded = {};
	var loadedImages = 0;
	var numberOfImagesToLoad = 0;
	//
	for(var name in imagesToBeLoaded)
	{
		numberOfImagesToLoad++;
	}
	
	for(var name in imagesToBeLoaded)
	{
		imagesLoaded[name] = new Image();
		imagesLoaded[name].onload = function()
		{
			if(++loadedImages >= numberOfImagesToLoad)
			{
				drawCallback(imagesLoaded);
			}
		};
		//
		imagesLoaded[name].src = imagesToBeLoaded[name];
	}
}

// convert num from degrees to radians
function radian(a)
{
	return a * Math.PI / 180;
}

////////////////////////////////////////////////////////////////////////////////////// ACTIONS
window.onLoad = start();