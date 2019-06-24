var drawLogo = function(ctx, obj) {
ctx.clearRect(0, 0, w, h);

ctx.save();
ctx.translate(obj.x,obj.y);
ctx.scale(obj.scale,obj.scale);
ctx.shadowColor = "Black";
ctx.shadowBlur = 15; 
ctx.globalAlpha = obj.alpha;

ctx.drawImage(obj.pic,-64,-64);
ctx.drawImage(obj.motto,-parseInt(obj.motto.width/2),60);
ctx.restore();

};