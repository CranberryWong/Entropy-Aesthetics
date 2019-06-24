var dataStuff = {};
var loopLimit = 2;
var currentLoop = 1;

var tl;
var tlglow;
var tlComplete = false;
var loadDynamicData = true;

var timing = {
    f1sec:3,
    f2sec:3,
    f3sec:3,
    lsec:3
}

function pageLoadedHandler() {
	if(loadDynamicData){
        populateData();
    }else{
        initBanner();
    }
	setListeners();
}

function populateData(){

	dataStuff = parseBannerCode(dynamicData.BANNER_CODE);

	document.getElementById('line1').lastElementChild.innerHTML = dataStuff.msg1;
	document.getElementById('line1').lastElementChild.style.fontSize = dataStuff.msg1FS+"px";
	document.getElementById('line2').lastElementChild.innerHTML = dataStuff.msg2;
	document.getElementById('line2').lastElementChild.style.fontSize = dataStuff.msg2FS+"px";
	document.getElementById('line3').lastElementChild.innerHTML = dataStuff.msg3;
	document.getElementById('line3').lastElementChild.style.fontSize = dataStuff.msg3FS+"px";

	document.getElementById('cta_btn').lastElementChild.innerHTML = dataStuff.ctaBtn;
	document.getElementById('cta_btn').lastElementChild.style.fontSize = dataStuff.ctaBtnFS+"px";
	document.getElementById('legal').lastElementChild.innerHTML = dataStuff.legal;
	document.getElementById('legal').lastElementChild.style.fontSize = dataStuff.legalFS+"px";

	document.getElementById('disclaimer').lastElementChild.innerHTML = dataStuff.disclaimer;
	document.getElementById('disclaimer').lastElementChild.style.fontSize = dataStuff.disclaimerFS+"px";

	function bgExitHandler(e) {
		Enabler.exitOverride('Background Exit', dynamicData.CLICKTHROUGH.Url);
	}
	document.getElementById('bg-exit').addEventListener('click', bgExitHandler, false);


	function ctaExitHandler(e) {
		Enabler.exitOverride('CTA Exit', dynamicData.CTA_CLICKTHROUGH.Url);
	}
	document.getElementById('cta_btn').addEventListener('click', ctaExitHandler, false);

	loopLimit = dataStuff.loop;
    timing.f1sec = dataStuff.f1sec;
    timing.f2sec = dataStuff.f2sec;
    timing.f3sec = dataStuff.f3sec;
    timing.lsec = dataStuff.lsec;

	initBanner();
}
function initBanner(){
    updatePosition();

    tl = new TimelineLite({onUpdate:updateSlider, onComplete:handleLoop});
    tlglow = new TimelineLite();

    function handleLoop(){
        if(loopLimit == 0){
            tl.restart();
        }else{
            currentLoop ++;
            if ( currentLoop <= loopLimit ){
                glowAnimation();
                createAnimation();
            }else{
                tlComplete = true;
            }
        }
    }
    glowAnimation();

    createAnimation();

    function createAnimation(){
        tl.clear();
        var frame2ElementText = document.getElementById('line2').lastElementChild.innerHTML;
        var frame3ElementText = document.getElementById('line3').lastElementChild.innerHTML;
        var legalElementText = document.getElementById('legal').lastElementChild.innerHTML;
        var hasMessage2 = (frame2ElementText != "");
        var hasMessage3 = (frame3ElementText != "");
        var hasLegal = (legalElementText != "");
        var finalLoop = (currentLoop >= loopLimit);
        if(loopLimit == 0) finalLoop = false;

        if(!hasMessage2) {
            animateSingleFrame(hasLegal, finalLoop);
            return;
        }

        showFrame1();
        hideFrame1();

        showFrame2(hasMessage3);

        if(!finalLoop && !hasLegal && !hasMessage3){
            hideFrame2();
        }
        if(hasMessage3){
            hideFrame2();
            showFrame3();
            if(!finalLoop && !hasLegal) hideFrame3();
        }
        if(hasLegal){
            if(hasMessage3) hideFrame3();
            else hideFrame2();
            showLegal();
            hideLegal();
        }
        if(finalLoop && hasMessage3 && hasLegal){
            showFrame3();
        }
        if(finalLoop && !hasMessage3 && hasLegal){
            showFrame2(hasMessage3);
        }
    }
    function animateSingleFrame(hasLegal, finalLoop){
        if(!hasLegal){
            showFrame1(true);
            if(!finalLoop) hideFrame1();
        }else{
            showFrame1();
            hideFrame1();
            showLegal();
            hideLegal();
            if(finalLoop) showFrame1(true);
        }
    }
    function glowAnimation(){
        tlglow.clear();

        ctaWidth = document.getElementById("cta_btn").offsetWidth;
        var ctaHeight = document.getElementById("cta_btn").offsetHeight;
        var ctaTop = document.getElementById("cta_btn").offsetTop - 12.5;
        var ctaLeft = document.getElementById("cta_btn").offsetLeft - 12.5;
        tl.set(glow, {left: ctaLeft, top:ctaTop, opacity:0});
        var currentCount = 0;

        tlglow.to(glow, 2, { left:ctaLeft + ctaWidth, ease: Power0.easeNone, opacity:1});
        tlglow.to(glow, 0.5, { top:ctaTop + ctaHeight, ease: Power0.easeNone, opacity:0.5});
        tlglow.to(glow, 2, { left:ctaLeft, ease: Power0.easeNone, opacity:1});
        tlglow.to(glow, 0.5, { top:ctaTop, ease: Power0.easeNone, opacity:0});

        tlglow.to(glow, 2, { left:ctaLeft + ctaWidth, ease: Power0.easeNone, opacity:1});
        tlglow.to(glow, 0.5, { top:ctaTop + ctaHeight, ease: Power0.easeNone, opacity:0.5});
        tlglow.to(glow, 2, { left:ctaLeft, ease: Power0.easeNone, opacity:1});
        tlglow.to(glow, 0.5, { top:ctaTop, ease: Power0.easeNone, opacity:0});
        tlglow.pause();
    }
    function showFrame1(){
        tl.set(line1, {opacity: 0});
        tl.set(line2, {opacity: 0});
        tl.set(line3, {opacity: 0});
        tl.set(cta_btn, {opacity: 1});

        tl.set(shine, {backgroundPosition: "0px 0px"});
        tl.to(shine, 1, {backgroundPosition: "0px -1820px", ease:SteppedEase.config(26)});

        var tweens = [];
        tweens.push(TweenMax.to(line1, 0.5, { opacity:1}));
        tweens.push(TweenMax.to(disclaimer, 0.2, { opacity: 1 } ));
        tweens.push(TweenMax.to(cta_btn, 0.5, { opacity: 1, onComplete:function(){
            tlglow.play();
        } }));
        tl.add(tweens, "-=1", "start");

        var timer = {time:0};
        tl.to(timer, timing.f1sec, {time:100});
    }
    function hideFrame1(){
        var tweens = [];
        tweens.push(TweenMax.to(line1, 0.5, { opacity:0}));
        tl.add(tweens, "+=0", "start");
    }
    function showFrame2(hasMessage3){
        tl.set(line1, {opacity: 0});
        tl.set(line2, {opacity: 0});
        tl.set(line3, {opacity: 0});
        tl.set(cta_btn, {opacity: 1});

        tl.set(shine, {backgroundPosition: "0px 0px"});
        tl.to(shine, 1, {backgroundPosition: "0px -1820px", ease:SteppedEase.config(26)});

        var tweens = [];
        tweens.push(TweenMax.to(line2, 0.5, { opacity:1}));
        tweens.push(TweenMax.to(disclaimer, 0.2, { opacity: 1 } ));
        tl.add(tweens, "-=1", "start");

        var timer = {time:0};
        tl.to(timer, timing.f2sec, {time:100});
    }
    function hideFrame2(){
        var tweens = [];
        tweens.push(TweenMax.to(line2, 0.5, { opacity:0}));
        tl.add(tweens, "+=0", "start");
    }
    function showFrame3(){
        tl.set(line1, {opacity: 0});
        tl.set(line2, {opacity: 0});
        tl.set(line3, {opacity: 0});
        tl.set(cta_btn, {opacity: 1});

        tl.set(shine, {backgroundPosition: "0px 0px"});
        tl.to(shine, 1, {backgroundPosition: "0px -1820px", ease:SteppedEase.config(26)});

        var tweens = [];
        tweens.push(TweenMax.to(line3, 0.5, { opacity:1}));
        tweens.push(TweenMax.to(disclaimer, 0.2, { opacity: 1 } ));
        tl.add(tweens, "-=1", "start");

        var timer = {time:0};
        tl.to(timer, timing.f3sec, {time:100});
    }
    function hideFrame3(){
        var tweens = [];
        tweens.push(TweenMax.to(line3, 0.5, { opacity:0}));
        tl.add(tweens, "+=0", "start");
    }
    function showLegal(){
        tl.set(line1, {opacity: 0});
        tl.set(line2, {opacity: 0});
        tl.set(line3, {opacity: 0});

        var tweens = [];
        tweens.push(TweenMax.to(laptop, 0.1, { opacity: 0.4 } ));
        tweens.push(TweenMax.to(legal, 0.1, { opacity: 1 } ));
        tweens.push(TweenMax.to(disclaimer, 0.1, { opacity: 0 } ));
        tweens.push(TweenMax.to(cta_btn, 0.5, { opacity: 0 } ));
        tl.add(tweens, "+=0", "start");

        var timer = {time:0};
        tl.to(timer, timing.lsec, {time:100});
    }
    function hideLegal(){
        var tweens = [];
        tweens.push(TweenMax.to(laptop, 0.1, { opacity: 1 } ));
        tweens.push(TweenMax.to(legal, 0.5, { opacity: 0 } ));
        tl.add(tweens, "+=0", "start");
    }
}

function updatePosition(){
    var line1 = document.getElementById('line1');
	var line2 = document.getElementById('line2');
	var line3 = document.getElementById('line3');

	var cta_btn = document.getElementById('cta_btn');
	var disclaimer = document.getElementById('disclaimer');
    var legal = document.getElementById('legal');

	var mainWidth = document.getElementById("main").offsetWidth;
	var mainHeight = document.getElementById("main").offsetHeight;
	var logoHeight = document.getElementById("logo").offsetHeight;
    var legalHeight = legal.offsetHeight;
    var line1Width = line1.offsetWidth;
    var line1Height = line1.offsetHeight;
	var line2Width = line2.offsetWidth;
    var line2Height = line2.offsetHeight;
    var line3Width = line3.offsetWidth;
	var line3Height = line3.offsetHeight;
	var ctaBtnHeight = cta_btn.offsetHeight;
	var ctaBtnWidth = cta_btn.offsetWidth;
	var disclaimerHeight = disclaimer.offsetHeight;

	if(cta_btn.lastElementChild.innerHTML == "") {
		cta_btn.style.display = "none";
	}else{
		cta_btn.style.display = "inline";
	}

    line1.style.top = (mainHeight - disclaimerHeight - 5)/2 - line1Height/2 + "px";
    line2.style.top = (mainHeight - disclaimerHeight - 5)/2 - line2Height/2 + "px";
    line3.style.top = (mainHeight - disclaimerHeight - 5)/2 - line3Height/2 + "px";

    legal.style.top = mainHeight/2 - legalHeight/2 + "px";
}

function parseBannerCode(bannerCode){
	var dataObj={};
	var dataList = bannerCode.split("||");
	var param;
	for(var i=0; i < dataList.length; i++){
		param = String(dataList[i]).split("=");
		dataObj[param[0]] = unescape((String(param[1])));
	}
	return dataObj;
}

function setListeners(){
	// restart animation on rollover
	var bg_exit = document.getElementById('bg-exit');
	var cta_btn = document.getElementById('cta_btn');

	bg_exit.onmouseover = function(e){
        console.log(tlComplete);
        if(tlComplete){tl.restart();tlComplete = false;}
		bannerRollover();
	};
	bg_exit.onmouseout = function(e){
		bannerRollout();
	};
	cta_btn.onmouseover = ctaRollover;
	cta_btn.onmouseout = ctaRollout;
}
function bannerRollover(){
	Enabler.counter("mainClickthrough OVER");
	Enabler.startTimer("mainClickthroughTimer");
}
function bannerRollout(){
	Enabler.counter("mainClickthrough OUT");
	Enabler.stopTimer("mainClickthroughTimer");
}
function ctaRollover(){
	Enabler.counter("cta OVER");
	Enabler.startTimer("mainClickthroughTimer");
}
function ctaRollout(){
	Enabler.counter("cta OUT");
	Enabler.stopTimer("mainClickthroughTimer");
}
function rollOverReplayTracking(){
	Enabler.counter("mainClickthrough OVER REPLAY");
}
/*
***************************************************************************************************************************************************************************************************************************************
progress slider
****************************************************************************************************************************************************************************************************************************************
*/
var fb = document.getElementById('feedback');
var progressSlider = document.getElementById('progressSlider');
var progressBtn = document.getElementById('progressBtn');
var playPauseBtn =  document.getElementById('playControl');
playPauseBtn.addEventListener('click', playPause, false);
progressSlider.addEventListener('mousedown', sliderStart, false);
progressSlider.addEventListener('touchstart', sliderStart, false);
window.addEventListener('mouseup', sliderEnd, false);
window.addEventListener('touchend', sliderEnd, false);
var isPlaying = true;

//width
var progressSliderWidth = progressSlider.clientWidth;
var progressBtnWidth = progressBtn.offsetWidth;
//position
var progressSliderX = progressSlider.getBoundingClientRect().left;
function playPause()
	{
		if (isPlaying)
		{
			isPlaying = false;
			tl.pause();
			playPauseBtn.innerHTML = 'PLAY';
		}
		else
		{
			isPlaying = true;
			tl.play();
			playPauseBtn.innerHTML = 'PAUSE';
		}
	}
function updateSlider()
{
    tlProgress = tl.progress() *  ( progressSliderWidth - progressBtnWidth );
    progressBtn.style.marginLeft =  tlProgress.toString() + "px";
    //time
    fb.innerHTML = Math.round( tl.totalTime() * 100 )/100;
    try{
        var event = new Event('tl-update');
        window.dispatchEvent(event);
    }catch(e){
        //Event not supported
    }
}

function sliderStart(e)
{
    tl.pause();
    progressSlider.addEventListener('mousemove', sliderMove, false);
    progressSlider.addEventListener('touchmove', sliderMove, false);
}
function sliderEnd(e)
{
    if (isPlaying) tl.play();
    progressSlider.removeEventListener('mousemove', sliderMove, false);
    progressSlider.removeEventListener('touchmove', sliderMove, false);
}

function sliderMove(e)
{
    clientX = e.clientX || e.touches[0].clientX;
    clientX -= progressSliderX;
    //fb.innerHTML = clientX;
    mousePos = clientX - (progressBtnWidth/2);
    if ( mousePos >= 0 && mousePos <= (progressSliderWidth - progressBtnWidth) )
    {
        progressBtn.style.marginLeft =  mousePos.toString() + "px";
        perc = mousePos / (progressSliderWidth - progressBtnWidth);
        tl.progress(perc).pause();
    }
}
/* **************************************************************************   /   *********************************************************************************** */
