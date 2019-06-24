//var font = '\'webFont\', \'Arial Narrow\', sans-serif';
var font =  '\'ヒラギノ角ゴ Pro W3\', \'Hiragino Kaku Gothic Pro\', Osaka, \'メイリオ\', Meiryo, \'ＭＳ Ｐゴシック\', \'MS PGothic\', sans-serif';
var againSize = 10;
var againText = "再挑戦";

var TPText1_1 = "敵艦艇に魚雷を";
var TPText1_2 = "命中させよ";

var FTPText1_1 = "任務:";
var FTPText1_2 = "魚雷の照準を合わせよう";
//var FTPText1_3 = "";

var FTPText2_1 = "撃破失敗!";
var FTPText2_2 = "実戦で腕を磨こう";
//var FTPText2_3 = "ОЙЫНДА ЖЕТІЛДІР";

var FTPText3_1 = "撃破成功!";
var FTPText3_2 = "次は実戦で試してみよう";
//var FTPText3_3 = "UNTUK DITEMBAKKAN";

function drawTPText(ctx)
{
		ctx.font = ' 11pt '+font;			
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";		
		ctx.fillStyle = "#FFFFFF";
		ctx.shadowColor = "Black";
		ctx.shadowBlur = 2; 
		ctx.shadowOffsetX = 1;
		ctx.shadowOffsetY = 1.2;
		ctx.fillText(TPText1_1, 0, 12);
		ctx.fillText(TPText1_2, 0, 30);
}

function drawFTPText(ctx)
{
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";		
		ctx.fillStyle = "#FFFFFF";
		ctx.shadowColor = "Black";
		ctx.shadowBlur = 2; 
		ctx.shadowOffsetX = 0.5;
		ctx.shadowOffsetY = 1;
		if(topTextState==0)
		{	
			/*
			ctx.font = ' 14pt '+font;	
			ctx.fillText(FTPText1_1, 0, 14);
			ctx.font = ' 12pt '+font;	
			ctx.fillText(FTPText1_2, 0, 32);
			ctx.fillText(FTPText1_3, 0, 48);	
			*/
			
			ctx.font = ' 15pt '+font;	
			ctx.fillText(FTPText1_1, 0, 20);	
			ctx.font = ' 11pt '+font;				
			ctx.fillText(FTPText1_2, 0, 44);	
			
			
		}
		if(topTextState==1)
		{
			/*
			ctx.font = ' 13pt '+font;	
			ctx.fillText(FTPText2_1, 0, 14);
			ctx.font = ' 11pt '+font;	
			ctx.fillText(FTPText2_2, 0, 32);
			ctx.font = ' 11pt '+font;	
			ctx.fillText(FTPText2_3, 0, 48);
			*/
			
			ctx.font = ' 16pt '+font;	
			ctx.fillText(FTPText2_1, 0, 22-4);
			ctx.font = ' 13pt '+font;	
			ctx.fillText(FTPText2_2, 0, 42+2);
			
		}
		if(topTextState==2)
		{
			/*
			ctx.font = ' 13pt '+font;	
			ctx.fillText(FTPText3_1, 0, 14);
			ctx.font = ' 11pt '+font;	
			ctx.fillText(FTPText3_2, 0, 32);
			ctx.font = ' 11pt '+font;	
			ctx.fillText(FTPText3_3, 0, 48);
			*/
			
			ctx.font = ' 16pt '+font;	
			ctx.fillText(FTPText3_1, 0, 22-4);
			ctx.font = ' 13pt '+font;	
			ctx.fillText(FTPText3_2, 0, 42+2);
			
		}
}