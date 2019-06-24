//index (jQuery) ver.20170413

//デバッグモード
var debugArr = [];
var debugArrLoc =location.search.substring(1).split('&');
for(var i=0;debugArrLoc[i];i++) {
	var thisArr = debugArrLoc[i].split('=');
	debugArr[thisArr[0]]=thisArr[1];
}
//デバッグ(ログイン状態)
var debugForceLogin = false;
if(debugArr["forcelogin"]) debugForceLogin = true;
$(document).ready( function() {
	if(debugForceLogin){
		$("#status .register").closest("li").remove();
		$("#status .login").closest("li").remove();
		$("#statusName span").text("ハッシャオーライ");
		$("#statusName").after('<li><a href="/hon/Mypage.mvc" class="mypage">マイページ</a></li>\n');
		$("#status").append('<li class="hide-sp"><a href="/hon/Mypage.mvc#" class="history">過去の予約履歴</a></li>\n');
		$("#status").append('<li><a href="/hon/Account.mvc/Logout" class="logout">ログアウト</a></li>\n');
	}
});



//グローバルデータ
jBusGlobalData = {
    //地域番号⇒地域名 変換 --------------------------------------------
    place: function (thisNum) {
        var arrPlace = ["", "", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "山梨県", "長野県", "新潟県", "富山県", "石川県", "福井県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"];
        var arrAreaPlace = ["", "道央(札幌)", "道南(函館)", "道北(名寄/旭川/枝幸/鬼志別)", "道東(釧路/帯広)", "ｵﾎｰﾂｸ(紋別/北見/網走/遠軽/知床)"]

        if (thisNum > arrPlace.length) {
            if (thisNum > 100) {
                return arrAreaPlace[thisNum - 100];
            }
            var i = 13;
        } else {
            var i = parseFloat(thisNum);
        }
        return arrPlace[i];
    }
};
//カンファームダイアログOKボタン用
jBusGlobaFuncConfirm = function(){};
//アラートダイアログ閉じる用
jBusGlobaFuncAlert = function(){};


$(document).ready( function() {
// Initialization ----------------------------------------------------
//カレンダー:何カ月先まで表示可能か
	var initDataPeriod = 6;


// Int ---------------------------------------------------------------
//祝日設定（祝日＋振替休日）
tableOfHoliday = new Array;
tableOfHoliday[2017] =["0101","0102","0109","0211","0320","0429","0503","0504","0505","0717","0811","0918","0923","1009","1103","1123","1223"];
tableOfHoliday[2018] =["0101","0108","0211","0212","0321","0429","0430","0503","0504","0505","0716","0811","0917","0923","0924","1008","1103","1123","1223","1224"];
tableOfHoliday[2019] =["0101","0114","0211","0321","0429","0503","0504","0505","0506","0715","0811","0812","0916","0923","1014","1103","1104","1123","1223"];
tableOfHoliday[2020] =["0101","0113","0211","0320","0429","0503","0504","0505","0506","0720","0811","0921","0922","1012","1103","1123","1223"];
tableOfHoliday[2021] =["0101","0111","0211","0320","0429","0503","0504","0505","0719","0811","0920","0923","1011","1103","1123","1223"];
tableOfHoliday[2022] =["0101","0110","0211","0321","0429","0503","0504","0505","0718","0811","0919","0923","1010","1103","1123","1223"];
tableOfHoliday[2023] =["0101","0102","0109","0211","0321","0429","0503","0504","0505","0717","0811","0918","0923","1009","1103","1123","1223"];
tableOfHoliday[2024] =["0101","0108","0211","0212","0320","0429","0503","0504","0505","0506","0715","0811","0812","0916","0922","0923","1014","1103","1104","1123","1223"];
tableOfHoliday[2025] =["0101","0113","0211","0320","0429","0503","0504","0505","0506","0721","0811","0915","0923","1013","1103","1123","1124","1223"];
tableOfHoliday[2026] =["0101","0112","0211","0320","0429","0503","0504","0505","0506","0720","0811","0921","0922","0923","1012","1103","1123","1223"];
tableOfHoliday[2027] =["0101","0111","0211","0321","0322","0429","0503","0504","0505","0719","0811","0920","0923","1011","1103","1123","1223"];
tableOfHoliday[2028] =["0101","0110","0211","0320","0429","0503","0504","0505","0717","0811","0918","0922","1009","1103","1123","1223"];
tableOfHoliday[2029] =["0101","0108","0211","0212","0320","0429","0430","0503","0504","0505","0716","0811","0917","0923","0924","1008","1103","1123","1223","1224"];
tableOfHoliday[2030] =["0101","0114","0211","0320","0429","0503","0504","0505","0506","0715","0811","0812","0916","0923","1014","1103","1104","1123","1223"];



// Event : onLoad **********************************************************************************

// Event : onLoad :ページの先頭へ制御
	if( $(window).scrollTop() == 0 ){
		$(".scrolltop").hide();
	}
	var commonSetTimeoutScrollFunc = null;
	$(window).on('scroll', function(){
		if( commonSetTimeoutScrollFunc ) return false ;
		commonSetTimeoutScrollFunc = setTimeout( function() {
			$(".scrolltop").fadeIn(500);
			if( $(window).scrollTop() == 0 ){
				$(".scrolltop").fadeOut(500);
			}
			commonSetTimeoutScrollFunc = null; //イベント頻度を減らす
		}, 300);
	});

// Event : onLoad :ご利用案内
	var thisPathname =location.pathname;
	thisPathname = thisPathname.replace(/html$/g,"mvc");
	if( $(".l-navi").length >0 ){
		$(".l-navi li a").each(function(){
			if( $(this).attr("href") == thisPathname ){
				$(this).addClass("current");
			}
		});
		$(".in-l-navi").hide();
		$(".in-l-navi a.current").closest(".in-l-navi").show();
		if($(".l-navi > li > a.current").next(".in-l-navi").length > 0){
			$(".in-l-navi").show();
		}

	}



// Event : Hover ***********************************************************************************

// Event : Hover : グローバルナビご利用案内 --------------------------
	$(".to-howto").hover(function(e){
		if( jBusGlobalCommon.chkDispPC() ){
			$(this).find(".g-dropdown").clearQueue().css("height","").slideDown(500);
		}
	},function(e){
		if( jBusGlobalCommon.chkDispPC() ){
			$(this).find(".g-dropdown").clearQueue().css("height","").slideUp(300);
		}
	});

// Event : onClick *********************************************************************************

// Event : onClick : グローバルナビご利用案内 ------------------------
	$(".to-howto > a").click(function(e){
		if( jBusGlobalCommon.chkDispPC() ){
			if($(".g-dropdown").is(":hidden")){
				$(this).next(".g-dropdown").clearQueue().css("height","").slideDown(500);
			}else{
				$(this).next(".g-dropdown").clearQueue().css("height","").slideUp(300);
			}
		}
		e.preventDefault();
	});

// Event : onClick : ハンバーガーmenuパーツ開閉 ------------------------
	$("#spMenu a").click(function(e){
		var isOverlaySpMenu = $("#isOverlaySpMenu").length;
		if(!isOverlaySpMenu){
			$("<div/>",{"id":"isOverlaySpMenu"}).appendTo(".container");
			$("#isOverlaySpMenu").click(function(){
				$(".g-navi").clearQueue().attr("style","").slideUp(300);
				$("#isOverlaySpMenu").hide();
			});
		}
		if( $(".g-navi").is(":hidden") ){
			$(".g-navi").clearQueue().attr("style","").slideDown(500);
			$("#isOverlaySpMenu").show();
		}else{
			$(".g-navi").clearQueue().attr("style","").slideUp(300);
			$("#isOverlaySpMenu").hide();
		}
		e.preventDefault();
	});

// Event : onClick : 印刷ボタン ----------------------------------------
	$("#jsPrint").click(function(e){
		window.print();
		e.preventDefault();
	});

// Event : resize **********************************************************************************

	// PC/SMPの表示が行われた際のリセット
	var commonSetTimeoutResizeFunc = null;
	$(window).on('resize', function(){
		if( commonSetTimeoutResizeFunc ) return false ;
		commonSetTimeoutResizeFunc = setTimeout( function() {
			//SMP→PC表示に切り替わった場合
			if( jBusGlobalCommon.chkDispPC() ){
				$(".g-navi").show();
				$(".g-dropdown").attr("style","").hide();
				$("#isOverlaySpMenu").hide();
				//日付テーブル
				$(".dialog-date").each(function(){
					$(this).find(".dialog-date-calendar-box").show();
					$(this).find(".dialog-date-calendar-box:gt(1)").hide();
					$(this).find("a.dialog-date-prev").addClass("inactive");
					if(initDataPeriod == 1){
						$(this).find("a.dialog-date-next").addClass("inactive");
					}else{
						$(this).find("a.dialog-date-next").removeClass("inactive");
					}
				});
			}else{
			//PC→SMP表示に切り替わった場合
				$(".g-navi").hide();
				$(".g-dropdown").attr("style","").show();
				$("#isOverlaySpMenu").hide();
				//日付テーブル
				$(".dialog-date").each(function(){
					$(this).find(".dialog-date-calendar-box").show();
					$(this).find(".dialog-date-calendar-box:gt(0)").hide();
					$(this).find("a.dialog-date-prev").addClass("inactive");
					if(initDataPeriod == 1){
						$(this).find("a.dialog-date-next").addClass("inactive");
					}else{
						$(this).find("a.dialog-date-next").removeClass("inactive");
					}
				});
			}
			commonSetTimeoutResizeFunc = null; //イベント頻度を減らす
		}, 300);
	});


// Global ******************************************************************************************

//他のスクリプトから呼び出す関数
	jBusGlobalCommon = {
		//ログインのチェック -----------------------------------------------
		chkLogin:function(){
			//ログイン状態の確認方法※要確認
			//会員登録ボタンが非表示状態ならログイン（仮仕様）
			if( $("#logged").val() == "True" ){
				return true;
			}else{
				return false;
			}
		},
		//PC表示のチェック -----------------------------------------------
		chkDispPC:function(){
			if( $("#spMenu").is(":hidden") ){
				return true;
			}else{
				return false;
			}
		},
		//スマホ表示のチェック -------------------------------------------
		chkDispSP:function(){
			if( $("#spMenu").is(":visible") ){
				return true;
			}else{
				return false;
			}
		},
		//画面効果：スムーススクロール -----------------------------------
		dispSmooth:function(thisTargetObj,thisSpeed){
			if(thisTargetObj.length > 0){
				if(thisSpeed == null){
					var speed = 400;
				}else{
					var speed = thisSpeed;
				}
				var position = thisTargetObj.offset().top;
				$('body,html').stop(true, false).animate({scrollTop:position}, speed, 'swing');
			}
			return false;
		},
		//画面効果：ブリンク ---------------------------------------------
		dispBlink:function(thisTargetObj){//multiple arguments
			for(var i=0;i<arguments.length;i++){
				arguments[i].addClass("ani-blink");
			}
			return false;
		},
		//画面効果：ブリンク停止 -----------------------------------------
		stopBlink:function(thisTargetObj){//multiple arguments
			$(".ani-blink").removeClass("ani-blink");
			return false;
		},
		//ダイアログのプリロード -----------------------------------------
		setTemplateDialog:function(thisModes){ //multiple arguments
			//set Overlay
			var isOverlay = $("#dialogOverlay").length;
			if(!isOverlay){
				$("<div/>",{"id":"dialogOverlay"}).appendTo(".container");
			}
			//set Template
			for(var thisModesI=0; thisModesI<arguments.length; thisModesI++){
				switch ( arguments[thisModesI] ){
					case "place":
						var isPlace = $("#dialogOverlay .dialog-place").length;
						if(!isPlace){
							createDialogPlace();
						}
						break;
					case "date":
						var isDate = $("#dialogOverlay .dialog-date").length;
						if(!isDate){
							createDialogDate();
							if(jBusGlobalCommon.chkDispPC()){
								$(".dialog-date .dialog-date-calendar-box").show();
								$(".dialog-date .dialog-date-calendar-box:gt(1)").hide();
							}else{
								$(".dialog-date .dialog-date-calendar-box").show();
								$(".dialog-date .dialog-date-calendar-box:gt(0)").hide();
							}
						}
						break;
					case "alert":
						var isAlert = $("#dialogOverlay .dialog-alert").length;
						if(!isAlert){
							createDialogAlert();
						}
						break;
					case "confirm":
						var isConfirm = $("#dialogOverlay .dialog-confirm").length;
						if(!isConfirm){
							createDialogConfirm();
						}
						break;
					default:
						break;
				}
			}
			//onclick overlay
			$("#dialogOverlay").click(function(e){
				jBusGlobalCommon.hideDialog(true);
				e.preventDefault();
			});
		},
		// ダイアログ呼出：地名選択 --------------------------------------
		setDialogPlace:function(eventObject,appendToObject){
			// プリロードをコピーし、ダイアログ呼出箇所に設置
			// eventObject:ダイアログ呼出ボタン（オブジェクト）
			// appendToObject:ダイアログ挿入位置（オブジェクト）
			$("#dialogOverlay .dialog-place").clone(true).appendTo(appendToObject);
			//ダイアログ内タイトル
			var thisTitle = eventObject.data("title");
			appendToObject.find(".dialog-title").text( thisTitle );
		},
		// ダイアログ呼出：地名選択（固定表示） --------------------------
		setDialogPlaceFixed:function(targetObject,thisTitle){
			// プリロードをコピーし、固定のダイアログ呼出箇所に設置
			// targetObject:data属性値を埋め込む先
			// thisTitle:ダイアログのタイトル（出発日を指定してください等）

			//ダイアログのセット
			//毎回作成する
			$("#dialogPlaceFixed").remove();
			$("#dialogOverlay .dialog-place").clone(true).attr("id","dialogPlaceFixed").appendTo(".container");
			$("#dialogPlaceFixed").find(".dialog-place-list a").click(function(e){
				//targetObjectにdate属性を埋込
				targetObject.attr("data-pcd", $(this).attr("data-pcd") );//string型のためdataメソッド禁止
				targetObject.find("a:first").text( $(this).text() );
				jBusGlobalCommon.hideDialog();
				jBusGlobalCommon.dispBlink($("#searchReqRetry"));//再検索ブリンク
				e.preventDefault();
			});
			//ダイアログ内タイトル
			$("#dialogPlaceFixed").find(".dialog-title").text( thisTitle );

			//表示位置
			var thisTop  = targetObject.offset().top + targetObject.height();
			if( jBusGlobalCommon.chkDispPC() ){
				var thisLeft = targetObject.offset().left;
			}else{
				var thisLeft = "0";
			}
			$("#dialogPlaceFixed").css({"top":thisTop+"px","left":thisLeft+"px"});

			jBusGlobalCommon.showDialog( $("#dialogPlaceFixed"),"fade" );

		},
		// ダイアログ呼出：日付選択 --------------------------------------
		setDialogDate:function(eventObject,appendToObject){
			// プリロードをコピーし、ダイアログ呼出箇所に設置
			// eventObject:ダイアログ呼出ボタン（オブジェクト）
			// appendToObject:ダイアログ挿入位置（オブジェクト）
			$("#dialogOverlay .dialog-date").clone(true).appendTo(appendToObject);
			//ダイアログ内タイトル
			var thisTitle = eventObject.data("title");
			appendToObject.find(".dialog-title").text( thisTitle );
		},
		// ダイアログ呼出：日付選択（固定表示） 転送付--------------------
		setDialogDateFixedLoc:function(thisLoc,thisTitle,eventObject){
			// プリロードをコピーし、固定のダイアログ呼出箇所に設置
			// 日付クリック後は指定されたURLにパラメータを付与して転送する
			// thisLoc:転送するURL(パラメータ追加可能)
			// thisTitle:ダイアログのタイトル（出発日を指定してください等）
			// eventObject:ダイアログ呼出ボタン（オブジェクト）

			//ダイアログのセット
			var isDialogDateFixedLoc = $("#dialogDateFixedLoc").length;//重複確認
			if(!isDialogDateFixedLoc){
				$("#dialogOverlay .dialog-date").clone(true).attr("id","dialogDateFixedLoc").appendTo(".container");
				//転送先URLのセット（文字変換対策に非表示のa要素に格納）
				$("<a/>",{"href":thisLoc,"id":"dialogDateFixedURL"}).appendTo("#dialogDateFixedLoc");
				//ダイアログ内の日付にイベントをセット
				$("#dialogDateFixedLoc .dialog-date-container table a").click(function(e){
					var thisDTYM = $(this).attr("data-yyyymmdd").substr(0,4) + $(this).attr("data-yyyymmdd").substr(4,2);
					var thisDTDD = $(this).attr("data-yyyymmdd").substr(6,2);
					//画面遷移
					var thisPath = "dtym=" + thisDTYM + "&dtdd=" + thisDTDD;
					var thisURL = $("#dialogDateFixedURL").attr("href");
					if( thisURL.indexOf("?") < 0 ){
						thisURL += "?";
					}else{
						thisURL += "&";
					}
					location.href = thisURL + thisPath;
					e.preventDefault();
				});
			}else{
				$("#dialogDateFixedURL").attr("href",thisLoc);//転送先
			}
			//ダイアログ内タイトル
			$("#dialogDateFixedLoc").find(".dialog-title").text( thisTitle );
			//表示位置
			var thisHeightWindow = $(window).height();
			//ダイアログの高さ取得
			$("#dialogDateFixedLoc").css("opacity","0").show();//jQueryは非表示の高さが取れないため
			var thisHeightDialog = $("#dialogDateFixedLoc").height();
			$("#dialogDateFixedLoc").hide().css("opacity","1");
			if(thisHeightWindow > thisHeightDialog){
				var thisTop = (thisHeightWindow - thisHeightDialog)/2;
				$("#dialogDateFixedLoc").css("top",thisTop+"px");
			}else{
				//極端に狭い高さの場合は、イベント呼出元のオフセット位置に固定
				var thisTop = eventObject.offset().top;
				$("#dialogDateFixedLoc").css({"top":thisTop+"px","position":"absolute"});
			}
			jBusGlobalCommon.showDialog( $("#dialogDateFixedLoc"),"fade" );

		},
		// ダイアログ呼出：日付選択（固定表示） data属性格納--------------------
		setDialogDateFixed:function(thisTitle,eventObject,resultObj){
			// プリロードをコピーし、固定のダイアログ呼出箇所に設置
			// 日付クリック後は指定されたURLにパラメータを付与して転送する
			// thisTitle:ダイアログのタイトル（出発日を指定してください等）
			// eventObject:ダイアログ呼出ボタン（オブジェクト）
			// resultObject:日付やdata属性埋め込み先

			//リセット
			$("#dialogDateFixed").remove();

			$("#dialogOverlay .dialog-date").clone(true).attr("id","dialogDateFixed").appendTo(".container");
			//ダイアログ内タイトル
			$("#dialogDateFixed").find(".dialog-title").text( thisTitle );

			//縦位置調整
			var thisWindowHeight = $(window).height();
			if( $("#dialogDateFixed").height() > thisWindowHeight ){ //モーダルの方が大きい場合
				var thisTOP = $(window).scrollTop()+30;
				$("#dialogDateFixed").css("top",thisTOP + "px");
			}else{//モーダルの方が小さい場合は中央配置
				var thisTOP = $(window).scrollTop() + (($(window).height() - $("#dialogDateFixed").height())/2);
				$("#dialogDateFixed").css("top",thisTOP + "px");
			}
			//横位置調整
			var thisWindowWidth = $(window).width();
			var thisLeft = (thisWindowWidth - $("#dialogDateFixed").width())/2;
			$("#dialogDateFixed").css("left", thisLeft + "px");

			jBusGlobalCommon.showDialog( $("#dialogDateFixed"),"fade" );

		},
		// ダイアログ呼出：アラート --------------------------------------
		setDialogAlert:function(thisType,thisTitle,thisMsg,eventObject,longtitle){
			// プリロードしたダイアログに引数埋込し表示
			//thisType:表示するサインの種類（success、warning、danger、info）
			//thisTitle:タイトルテキスト(デフォルト値はdata-default属性に格納済)
			//thisMsg:本文
			//eventObject:呼び出したオブジェクト
			//longtitle:trueでタイトルテキストを小さくする(1 or 0)

			//サイン（アイコンとタイトル）の判定
			var thisClass ="";
			switch ( thisType ){
				case "success":
					thisClass = ".dialog-alert-sign-success";
					break;
				case "warning":
					thisClass = ".dialog-alert-sign-warning";
					break;
				case "danger":
					thisClass = ".dialog-alert-sign-danger";
					break;
				case "info":
					thisClass = ".dialog-alert-sign-info";
					break;
				default:
					break;
			}
			if(thisClass){
				//サイン（アイコンとタイトル）のオブジェクト
				var thisSignObj = $("#dialogAlert .dialog-alert-sign").find(thisClass);
				//タイトル編集
				if(thisTitle){
					thisSignObj.find(".dialog-title").text(thisTitle);
				}else{
					var thisTxt = thisSignObj.find(".dialog-title").attr("data-default");
					thisSignObj.find(".dialog-title").text(thisTxt);
				}
				//サイン表示(排他)
				thisSignObj.show().siblings().hide();
			}else{
				$("#dialogAlert .dialog-alert-sign").hide();//タイプ指定が無い場合はサインエリアを削除
			}
			//メッセージ更新
			$("#dialogAlert .dialog-alert-msg p").html(thisMsg);
			//表示位置
			var thisHeightWindow = $(window).height();
			//ダイアログの高さ取得
			$("#dialogAlert").css("opacity","0").show();//jQueryは非表示の高さが取れないため
			var thisHeightDialog = $("#dialogAlert").height();
			$("#dialogAlert").hide().css("opacity","1");
			if(thisHeightWindow > thisHeightDialog){
				var thisTop = (thisHeightWindow - thisHeightDialog)/2;
				$("#dialogAlert").css("top",thisTop+"px");
			}else{
				//極端に狭い高さの場合は、イベント呼出元のオフセット位置に固定
				var thisTop = eventObject.offset().top;
				$("#dialogAlert").css({"top":thisTop+"px","position":"absolute"});
			}
			//長いタイトルの場合
			if(longtitle){
				$("#dialogAlert").addClass("longtitle");
			}else{
				$("#dialogAlert").removeClass("longtitle");
			}
			//ダイアログ表示
			jBusGlobalCommon.showDialog( $("#dialogAlert"),"fade" );
		},
		// ダイアログ呼出：カンファーム ----------------------------------
		setDialogConfirm:function(thisType,thisTitle,thisMsg,eventObject,longtitle){
			// プリロードしたダイアログに引数埋込し表示
			//thisType:表示するサインの種類（success、warning、danger、info）
			//thisTitle:タイトルテキスト(デフォルト値はdata-default属性に格納済)
			//thisMsg:本文
			//eventObject:呼び出したオブジェクト
			//longtitle:trueでタイトルテキストを小さくする(1 or 0)
			//runFun:OKボタン後の動作

			//サイン（アイコンとタイトル）の判定
			var thisClass ="";
			switch ( thisType ){
				case "success":
					thisClass = ".dialog-alert-sign-success";
					break;
				case "warning":
					thisClass = ".dialog-alert-sign-warning";
					break;
				case "danger":
					thisClass = ".dialog-alert-sign-danger";
					break;
				case "info":
					thisClass = ".dialog-alert-sign-info";
					break;
				default:
					break;
			}
			if(thisClass){
				//サイン（アイコンとタイトル）のオブジェクト
				var thisSignObj = $("#dialogConfirm .dialog-alert-sign").find(thisClass);
				//タイトル編集
				if(thisTitle){
					thisSignObj.find(".dialog-title").text(thisTitle);
				}else{
					var thisTxt = thisSignObj.find(".dialog-title").attr("data-default");
					thisSignObj.find(".dialog-title").text(thisTxt);
				}
				//サイン表示(排他)
				thisSignObj.show().siblings().hide();
			}else{
				$("#dialogConfirm .dialog-alert-sign").hide();//タイプ指定が無い場合はサインエリアを削除
			}
			//メッセージ更新
			$("#dialogConfirm .dialog-alert-msg p").html(thisMsg);
			//表示位置
			var thisHeightWindow = $(window).height();
			//ダイアログの高さ取得
			$("#dialogConfirm").css("opacity","0").show();//jQueryは非表示の高さが取れないため
			var thisHeightDialog = $("#dialogConfirm").height();
			$("#dialogConfirm").hide().css("opacity","1");
			if(thisHeightWindow > thisHeightDialog){
				var thisTop = (thisHeightWindow - thisHeightDialog)/2;
				$("#dialogConfirm").css("top",thisTop+"px");
			}else{
				//極端に狭い高さの場合は、イベント呼出元のオフセット位置に固定
				var thisTop = eventObject.offset().top;
				$("#dialogConfirm").css({"top":thisTop+"px","position":"absolute"});
			}
			//長いタイトルの場合
			if(longtitle){
				$("#dialogConfirm").addClass("longtitle");
			}else{
				$("#dialogConfirm").removeClass("longtitle");
			}

			//ダイアログ表示
			jBusGlobalCommon.showDialog( $("#dialogConfirm"),"fade" );
		},
		// ダイアログ呼出：マップ ----------------------------------------
		setDialogMap:function(thisLat1,thisLng1,thisLat2,thisLng2,thisZoom){
			//thisLat1:乗車地緯度
			//thisLng1:乗車地経度
			//thisLat2:降車地緯度
			//thisLng2:降車地経度
			//thisZoom:マップズーム
			if(thisZoom == null || thisZoom == "") thisZoom = 15;//ズーム未指定の場合

			//ダイアログの本体設置（毎回作成）
			$("#dialogMap").remove();
			$("<div/>",{"class":"dialog","id":"dialogMap"}).appendTo(".container");
			$("<div/>",{"class":"dialog-alert-inner"}).appendTo("#dialogMap");

			//発着地と到着地が違う場合
			if(thisLat1 && thisLat2){
				var thisBobyObj = $("<p/>",{"class":"dialog-alert-gmap-msg","text":"地図を選択してください。"})
				thisBobyObj.append($('<p><a id="dialogMapFrom">乗車地</a></p><p><a id="dialogMapTo">降車地</a></p>'));
				$("#dialogMap .dialog-alert-inner").append(thisBobyObj);
				$("#dialogMapFrom").click(function(e){
					jBusGlobalCommon.setDialogMap(thisLat1,thisLng1,"","",thisZoom);
					e.preventDefault();
				});
				$("#dialogMapTo").click(function(e){
					jBusGlobalCommon.setDialogMap("","",thisLat2,thisLng2,thisZoom);
					e.preventDefault();
				});
				//サイズ
				$("#dialogMap").addClass("dialog-gmap-select");
			}else{
			//片方のみの場合は、地図を表示
				var thisLat = "";
				var thisLng = "";

				if(thisLat1){
					thisLat = thisLat1;
					thisLng = thisLng1;
				}else{
					thisLat = thisLat2;
					thisLng = thisLng2;
				}

				$("#dialogMap .dialog-alert-inner").append($("<div/>",{"id":"dialog-googlemap"}));
				var thisSRC = "http://maps.google.co.jp/maps?q=" //緯度経度だけの場合は「q=」を「||=」にする（ピンが立たない）
					+ thisLat + "," + thisLng
					+ "&output=embed&t=m&z=" + thisZoom;
				var thisMapHTML = $("<iframe/>",{
					"src":thisSRC,
					"width":"100%",
					"height":"100%",
					"frameborder":"0"
				});
				$("#dialog-googlemap").append(thisMapHTML);
				//サイズ
				$("#dialogMap").css({
					"width":"90vw",
					"height":"90vh",
					"margin":"5vh 5vw",
					"padding":"3vh 3vw"
				});
			}
			//閉じるボタン
			$("#dialogMap .dialog-alert-inner").append('<div class="dialog-alert-ctrl"><p><a>閉じる</a></p></div>');
			$("#dialogMap .dialog-alert-ctrl a").click(function(e){
				jBusGlobalCommon.hideDialog();
				e.preventDefault();
			});
			jBusGlobalCommon.showDialog( $("#dialogMap"),"fade" );

		},
		// 計算：前日 ----------------------------------------------------
		prevDate:function(thisYYYY,thisMM,thisDD){
			//YYYY,MM,DDの引数に対して、オブジェクトを返す。
			var targetDateTime = new Date(thisYYYY,parseFloat(thisMM)-1,parseFloat(thisDD)).getTime();
			var prevDateTime = targetDateTime - (60*60*24*1000);
			prevDateTimeObj = new Date(prevDateTime);
			var prevYYYY = prevDateTimeObj.getFullYear();
			var prevMM   = prevDateTimeObj.getMonth()+1;
			var prevDD   = prevDateTimeObj.getDate();
			prevMM = ("0" + prevMM).slice(-2);
			prevDD = ("0" + prevDD).slice(-2);
			return {
				yyyy:prevYYYY,
				mm:prevMM,
				dd:prevDD,
				time:prevDateTime
			}
		},
		// 計算：翌日 ----------------------------------------------------
		nextDate:function(thisYYYY,thisMM,thisDD){
			var targetDateTime = new Date(thisYYYY,parseFloat(thisMM)-1,parseFloat(thisDD)).getTime();
			var nextDateTime = targetDateTime + (60*60*24*1000);
			nextDateTime = new Date(nextDateTime);
			var nextYYYY = nextDateTime.getFullYear();
			var nextMM   = nextDateTime.getMonth()+1;//リアル月
			var nextDD   = nextDateTime.getDate();
			nextMM = ("0" + nextMM).slice(-2);
			nextDD = ("0" + nextDD).slice(-2);
			//何カ月先まで表示するかの条件を満たしているか？
			var thisTodayDate = new Date();
			var thisTodayYYYY = thisTodayDate.getFullYear();
			var thisTodayMM = thisTodayDate.getMonth();
			//表示限界
			var thisLimitDate = new Date( thisTodayYYYY, thisTodayMM + initDataPeriod);
			var thisLimitYYYY = thisLimitDate.getFullYear();
			var thisLimitMM   = thisLimitDate.getMonth()+1;//リアル
			thisLimitMM = ("0" + thisLimitMM).slice(-2);

			var nextYYYYMM = "" + nextYYYY + nextMM;
			var thisLimitYYYYMM = "" + thisLimitYYYY + thisLimitMM;
			if( Number(nextYYYYMM) < Number(thisLimitYYYYMM) ){
				var nextLimit = true;
			}else{
				var nextLimit = false;
			}
			return {
				yyyy:nextYYYY,
				mm:nextMM,
				dd:nextDD,
				limit:nextLimit
			}
		},
		// 表示：ダイアログ ----------------------------------------------
		showDialog:function(eventObject,thisEffect){
			jBusGlobalCommon.stopBlink();//ブリンク停止
			//ダイアログの表示動作。指定されたダイアログとオーバレイを表示。
			//eventObject:対象となるダイアログのオブジェクト（対象にclass=dialogが必須）
			//thisEffect:fadeでフェードイン、初期は縦横縮小効果
			if( eventObject.hasClass("dialog") ){
				//表示パターン：フェード効果
				if( thisEffect == "fade" ){
					$("#dialogOverlay").addClass("js-fade");
					$("#dialogOverlay").fadeIn(300);
					eventObject.fadeIn(300);
				//表示パターン：縦横縮小効果（未指定時標準）
				}else{
					$("#dialogOverlay").show();
					eventObject.show(300);
				}
			}
		},
		// 非表示：ダイアログ --------------------------------------------
		hideDialog:function(noBlink){
			if(noBlink) jBusGlobalCommon.stopBlink();//ブリンク停止
			//.dialogクラスと#dialogOverlayを非表示にする
			//表示した際に指定したエフェクトと同等に非表示エフェクト
			if( $("#dialogOverlay").hasClass("js-fade") ){
				$("#dialogOverlay").fadeOut(300);
				$(".dialog").fadeOut(300);
				$("#dialogOverlay").removeClass("js-fade");
			}else{
				$("#dialogOverlay").hide();
				$(".dialog").hide();
			}
		},
		//エラー箇所追加 -------------------------------------------------
		setError:function(thisTargetObj){//multiple arguments
			for(var i=0;i<arguments.length;i++){
				arguments[i].addClass("is-error");
			}
			return false;
		},
		//エラー箇所削除 -------------------------------------------------
		removeError:function(thisTargetObj){//multiple arguments
			for(var i=0;i<arguments.length;i++){
				arguments[i].removeClass("is-error");
			}
			return false;
		},
		//エラー箇所全追加 -----------------------------------------------
		removeAllError:function(thisTargetObj){
			$(".is-error").removeClass("is-error");
			return false;
		}
	};
// Functions ***************************************************************************************

// func:地名選択ダイアログのプリロード -------------------------------
	function createDialogPlace(){
		var csrfToken = $.cookie('CSRF-TOKEN');
		$("<div/>",{"class":"dialog-place dialog"}).appendTo("#dialogOverlay");
		$.ajax({
			type: "GET",
			url: "/hon/DialogData/Place",
			dataType: "html",
			headers: {
				"X-CSRF-TOKEN": csrfToken
			},
			success: function(thisHTML){
				$("#dialogOverlay .dialog-place").append(thisHTML);
			}
		});
	}
// func:カレンダーダイアログのプリロード -------------------------------
	function createDialogDate(){
		var DataPeriod = initDataPeriod;//何か月分セットするか

		//ベースとなるHTML
		$("<div/>",{"class":"dialog-date dialog"}).appendTo("#dialogOverlay");
		$("<p/>",{"class":"dialog-title"}).appendTo("#dialogOverlay .dialog-date");
		$("<a/>",{"class":"dialog-date-prev","text":"前月"}).appendTo("#dialogOverlay .dialog-date");
		$("<a/>",{"class":"dialog-date-next","text":"翌月"}).appendTo("#dialogOverlay .dialog-date");
		$("<div/>",{"class":"dialog-date-container"}).appendTo("#dialogOverlay .dialog-date");

		//カレンダー生成
		//Today
		var todayDate = new Date();
		var todayYear = todayDate.getFullYear();
		var todayMonth = todayDate.getMonth();
		var todayDay = todayDate.getDate();

		var todayMonthCal = todayMonth + 1;
		todayMonthCal = ("0" + todayMonthCal).slice(-2);
		var todayDayCal = todayDay;
		todayDayCal = ("0" + todayDayCal).slice(-2);
		var todayYYYYMMDD = todayYear + todayMonthCal + todayDayCal;
		//カレンダー本体生成
		for(var k=0; k<DataPeriod; k++){
			var thisObjectCalendarBox = $("<div/>",{"class":"dialog-date-calendar-box"});

			var currentMonth = todayMonth + k;
			var currentYear = todayYear;
			if(currentMonth>11){
				currentMonth = currentMonth - 12;
				currentYear = currentYear + 1;
			}
			thisObjectCalendarBox.append("<p class='dialog-date-calendar-title'><span>" + currentYear + "年</span>" + (currentMonth+1) + "<span>月</span></p>" );
			thisObjectCalendarBox.append( createCalendar(currentYear,currentMonth) );

			thisObjectCalendarBox.appendTo("#dialogOverlay .dialog-date .dialog-date-container");

		}
		//前月翌月ボタンの初期状態
		$("#dialogOverlay .dialog-date a.dialog-date-prev").addClass("inactive");
		if(DataPeriod == 1){
			$("#dialogOverlay .dialog-date a.dialog-date-next").addClass("inactive");
		}

		//前月ボタンのイベント埋込
		$("#dialogOverlay .dialog-date a.dialog-date-prev").click(function(e){
			//表示している最初と最後のカレンダーを格納
			var thisCalendarVisibleFirst = $(this).closest(".dialog-date").find(".dialog-date-calendar-box:visible:first");
			var thisCalendarVisibleLast  = $(this).closest(".dialog-date").find(".dialog-date-calendar-box:visible:last");

			//前のカレンダーがあれば表示
			if( thisCalendarVisibleFirst.prev().length ){
				thisCalendarVisibleFirst.prev().show();
				thisCalendarVisibleLast.hide();
				//前月ボタンの非活性化
				if(!thisCalendarVisibleFirst.prev().prev().length){
					$(this).addClass("inactive");
				}
				//翌月ボタンの活性化
				$(this).closest(".dialog-date").find("a.dialog-date-next").removeClass("inactive");
			}
			e.preventDefault();
		});
		//翌月ボタンのイベント埋込
		$("#dialogOverlay .dialog-date a.dialog-date-next").click(function(e){
			//表示している最初と最後のカレンダーを格納
			var thisCalendarVisibleFirst = $(this).closest(".dialog-date").find(".dialog-date-calendar-box:visible:first");
			var thisCalendarVisibleLast  = $(this).closest(".dialog-date").find(".dialog-date-calendar-box:visible:last");

			//次のカレンダーがあれば表示
			if( thisCalendarVisibleLast.next().length ){
				thisCalendarVisibleLast.next().show();
				thisCalendarVisibleFirst.hide();
				//翌月ボタンの非活性化
				if(!thisCalendarVisibleLast.next().next().length){
					$(this).addClass("inactive");
				}
				//前月ボタンの活性化
				$(this).closest(".dialog-date").find("a.dialog-date-prev").removeClass("inactive");
			}
			e.preventDefault();
		});


		//指定月のカレンダーDOM作成
		function createCalendar(targetYYYY, targetM){
			//Target Month
			var thisDate = new Date(targetYYYY,targetM);
			var thisYear = thisDate.getFullYear();
			var thisMonth = thisDate.getMonth();
			var thisDay = thisDate.getDate();

			var TableOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
			if( (thisYear%4)==0 ){ TableOfMonth[1] = 29; }
			var thisEndOfMonth = TableOfMonth[thisMonth];

			// YYYYMM
			var thisYYYYMM = "";
			var thisMonthCal  = thisMonth + 1;
			thisMonthCal = ("0" + thisMonthCal).slice(-2);
			thisYYYYMM = thisYear + "" + thisMonthCal;

			//set days
			var thisDays = [];
			for(var i=1;i<thisEndOfMonth+1;i++){
				var thisDayCal = i;
				thisDayCal = ("0" + thisDayCal).slice(-2);

				var thisYYYYMMDD = thisYYYYMM + thisDayCal;

				thisDays.push(thisYYYYMMDD);
			}

			//set null
			var thisNullStr = "&#160;";
			//set null before 1
			thisDate.setDate(1);
			var thisStartOfWeek = thisDate.getDay();
			for(var i=0;i<thisStartOfWeek;i++){
				thisDays.unshift(thisNullStr);
			}

			//set null after end of month
			for(var i=thisDays.length;i<(7*6);i++){
				thisDays.push(thisNullStr);
			}

			//create
			var thisObjectCalendar = $("<table/>");
			var TableOfWeek = ["日","月","火","水","木","金","土"];
			thisObjectCalendar.append("<thead><tr></tr></thead>");
			for(var i=0;i<TableOfWeek.length;i++){
				thisObjectCalendar.find("thead tr").append("<th>" + TableOfWeek[i] + "</th>");
			}
			thisObjectCalendar.append("<tbody/>");
			for(var i=0;i<thisDays.length;i++){
				var thisYYYYMMDD = thisDays[i];
				if(thisYYYYMMDD != thisNullStr){
					var thisYYYY = thisYYYYMMDD.substr(0,4);
					var thisMM   = thisYYYYMMDD.substr(4,2);
					var thisDD   = thisYYYYMMDD.substr(6,2);
				}else{
					var thisYYYY = "";
					var thisMM   = "";
					var thisDD   = "";
				}
				if( (i%7) ==0 ){
					thisObjectCalendar.find("tbody").append("<tr>");
				}
				//td要素作成
				if( thisDays[i] == thisNullStr){
					//日付が無い（月初前、月末後）
					thisObjectCalendar.find("tbody tr:last").append("<td class='date-null'>" + thisDays[i] + "</td>");
				}else{
					//土日祝日class付与
					var thisTdClass = "";
					if( (i%7) ==0 ){
						thisTdClass = "date-sunday";
					}else if( (i%7) ==6 ){
						thisTdClass = "date-saturday";
					}
					//祝日判定
					for(var j=0;j<tableOfHoliday[thisYYYY].length;j++){
						if( tableOfHoliday[thisYYYY][j] == (thisMM+thisDD) ){
							if(thisTdClass) thisTdClass += " ";
							thisTdClass += "date-holiday";
							break;
						}
					}
					var thisObjectTD = $("<td/>",{ "class":thisTdClass });
					thisObjectCalendar.find("tbody tr:last").append(thisObjectTD);

					//a要素作成：日付埋め込み、過去の日付ならa要素不要
					thisDD = parseFloat(thisDD);
					if( thisYYYYMMDD < todayYYYYMMDD){
						thisObjectCalendar.find("tbody tr:last td:last").text(thisDD);
					}else{
						var thisObjectA = $("<a/>",{
							"href":"",
							"text":thisDD,
							"data-yyyymmdd":thisYYYYMMDD,
							"data-dddd":TableOfWeek[(i%7)]
						});
						thisObjectCalendar.find("tbody tr:last td:last").append(thisObjectA);
					}
				}
			}
			return thisObjectCalendar;
		}//End of createCalendar
	}//End of createDialogDate

// func:アラートダイアログのプリロード -------------------------------
	function createDialogAlert(){
		var isDialogAlert = $("#dialogAlert").length;//重複確認
		if(!isDialogAlert){
			$("<div/>",{"id":"dialogAlert","class":"dialog"}).appendTo(".container");
			$.ajax({
				type: "GET",
				url: "/hon/DialogData/Alert",
				dataType: "html",
				success: function(thisHTML){
					//ダイアログの埋込
					$("#dialogAlert").append(thisHTML);
					//閉じるボタン
					$("#dialogAlert .dialog-alert-ctrl a").click(function(e){
						jBusGlobalCommon.hideDialog();
						//エラー表示がある場合はフォーカス
						if( $("#dialogAlert").attr("data-noforcus") != "true" ){
							if( $(".is-error").length>0 ){
								$(".is-error:first").focus();
							//その他で指定があればフォーカス
							}else if( $(".alert-forcus").length>0 ){
								$(".alert-forcus:first").focus();
								$(".alert-forcus").removeClass("alert-forcus");
							}
						}else{
							$("#dialogAlert").attr("data-noforcus","");
						}
						var thisRun = new jBusGlobaFuncAlert;
						thisRun = "";
						e.preventDefault();
					});
				}
			});
		}
	}
// func:カンファームダイアログのプリロード -------------------------------
	function createDialogConfirm(){
		var isDialogConfirm = $("#dialogConfirm").length;//重複確認
		if(!isDialogConfirm){
			$("<div/>",{"id":"dialogConfirm","class":"dialog"}).appendTo(".container");
			$.ajax({
				type: "GET",
				url: "/hon/DialogData/Confirm",
				dataType: "html",
				success: function(thisHTML){
					//ダイアログの埋込
					$("#dialogConfirm").append(thisHTML);
					//閉じるボタン
					$("#dialogConfirm .dialog-alert-ctrl a:first").click(function(e){
						jBusGlobalCommon.hideDialog();
						var thisRun = new jBusGlobaFuncAlert;
						thisRun = "";
						e.preventDefault();
					});
					//OKボタン
					$("#dialogConfirm .dialog-alert-ctrl a:last").click(function(e){
						jBusGlobalCommon.hideDialog();
						var thisRun = new jBusGlobaFuncConfirm;
						thisRun = "";
						e.preventDefault();
					});
				}
			});
		}
	}


// Event : QA accordion **********************************************************************************
	$('#question .subsection-question .subheading-bg').on('click',function(){
		$(this).children('a.mark-arrow').toggleClass('is-open');
		$(this).next('.body-division').slideToggle();
	});


//********************************************************************
});
