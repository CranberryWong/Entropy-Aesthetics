
<!--
// Version 7.2.2.1
// TagCreator generated. [BEGIN] Do not modify.
// [Enterprise-script]

if (typeof VLTrace_CustomID_postid == "undefined") {
	var VLTrace_CustomID_postid = '';
}

if (typeof VLTrace_CustomID_mailuid == "undefined") {
	var VLTrace_CustomID_mailuid = '';
}

if (typeof VLTrace_vlid == "undefined") {
	var VLTrace_vlid = '';
}

//var VLTrace_current_js_path = getJsPath();

function VLTrace_Default_DMD()
{
	this.getparam='c=kz17858&tp=0&fpdomain=nikkeibp.co.jp';

	var trace_protocol = location.protocol + '//';

	this.click_server = trace_protocol + 'www31.tracer.jp';

	this.path  = 'VL/Trace';

	this.javascript_server = 'http://userserve.com/js';

	this.DB_repeater_flag = 2;

	this.DB_banner_id_param = 'banner_id';

	this.DB_cookie_expire = 365;

	this.DB_ad_cookie_expire = 30;

	this.DB_session_interval = 1800;

	this.DB_page_url_case_sensitive = 0;

	this.inherit_old_cookie = '';

	this.delete_old_cookie = '';

	this.DB_post_id_param = 'post_id';

	this.DB_mail_uid_param = 'mail_uid';

	this.request_vlid_flag = 0;

	this.request_customjs_flag = 0;
}


function VLTrace_ClassObj_GlobalValues_DMD(objSpcParam,objDftParam)
{

	var  t1970;

	var  t1970yyyymmdd;

	var  days2000;

	var  client_id;

	var  ep_client_id;

	var  pno;

	var  virtual_url;

	var  tp;

	var  fpdomain;

	var  rpf;

	var  cs;

	var  fl;

	var  lk;

	var  jsname;

	var  rptexpire;

	var  adexpire;

	var  ssinterval;

	var  objAllParam = new Object();

	var  objModParam;

	var  objModPlugin;

	var  plugin_str;

	var  inquiry_call_param;


	var prop;
	for (prop in objDftParam) {
		if (typeof(objSpcParam[prop]) != 'undefined') {
			objAllParam[prop] = objSpcParam[prop];
		} else {
			objAllParam[prop] = objDftParam[prop];
		}
	}


	objAllParam.click_server = objAllParam.click_server.replace(/\/+$/g,"") + '';

	objAllParam.path = objAllParam.path.replace(/\/+/g,"/") + '';
	objAllParam.path = objAllParam.path.replace(/^\//,"") + '';
	objAllParam.path = objAllParam.path.replace(/\/$/,"") + '';

	var PARAM_MAX_COUNT = 64;
	if (VLTrace_CustomID_postid.length > PARAM_MAX_COUNT) {
		VLTrace_CustomID_postid = '';
	}

	if (VLTrace_CustomID_mailuid.length > PARAM_MAX_COUNT) {
		VLTrace_CustomID_mailuid = '';
	}

	if (typeof VLTrace_custom_getparam == 'undefined') {
		objModParam = new mod_click_getparam(objAllParam.getparam);
	} else {
		objModParam = new mod_click_getparam(objAllParam.getparam + '&' + VLTrace_custom_getparam);
	}


	objModPlugin = new mod_click_plugin_param(objModParam.get("plugin"));


	plugin_str = '';

	if ( (objModPlugin.check("AT") == 1) || (objModPlugin.check("AT1") == 1)) {
		plugin_str = plugin_str + 'AT2-';
	}

	if ((objModPlugin.check("EM") == 1) || (objModPlugin.check("EM1") == 1)) {
		plugin_str = plugin_str + 'EM2-';
	}

	if ((objModPlugin.check("EC") == 1) || (objModPlugin.check("EC1") == 1)) {
		plugin_str = plugin_str + 'EC2-';
	}


	inquiry_call_param = '';


	if ((objModPlugin.check("AT") == 1) || (objModPlugin.check("AT1") == 1)) {
		inquiry_call_param += ('c=' + objModParam.get("c"));
		inquiry_call_param += ('&cp=' + objModParam.get("cp"));
		inquiry_call_param += ('&plugin=AT1-NORPT');
	}


	var mydate = new Date();

	t1970  = Math.floor(mydate.getTime() / 1000);
	t1970yyyymmdd = mydate.getFullYear() * 10000 + (mydate.getMonth() + 1) * 100 + mydate.getDate();

	mydate.setFullYear(2000);
	mydate.setMonth(0);
	mydate.setDate(1);

	var t2000 = Math.floor(mydate.getTime() / 1000);
	days2000 = Math.floor((t1970 - t2000) / (24*60*60) );


	client_id = objModParam.get("c");

	if (objAllParam.path.search(/\/\w+\//) >= 0) {
		client_id  = objAllParam.path.match(/\/\w+\//);

		client_id  = client_id  + '';

		client_id  = client_id .replace(/\//g,"") + '';
	}

	client_id = check_client_id(client_id);


	ep_client_id = objModParam.get("e");


	pno = objModParam.get("p");


	virtual_url = objModParam.get("l");
	if (virtual_url != '') {
		virtual_url = location.protocol + '//'+location.host + makeVirtualUrl(virtual_url);
	}

	var n = atoi(objModParam.get("ce"));

	if (n == 0) {
		n = objAllParam.DB_cookie_expire;
	}

	var mydate = new Date();
	mydate.setTime((t1970 + 60 * 60 * 24 * (n-1)) * 1000);
	mydate.setHours(23);
	mydate.setMinutes(59);
	mydate.setSeconds(59);
	rptexpire = Math.floor(mydate.getTime() / 1000);


	var  n = objAllParam.DB_ad_cookie_expire;

	var mydate = new Date();
	mydate.setTime((t1970 + 60 * 60 * 24 * (n-1)) * 1000);
	mydate.setHours(23);
	mydate.setMinutes(59);
	mydate.setSeconds(59);
	adexpire = Math.floor(mydate.getTime() / 1000);


	ssinterval = objAllParam.DB_session_interval;


	cs = objAllParam.DB_page_url_case_sensitive;


	tp = atoi(objModParam.get("tp"));


	fpdomain = objModParam.get("fpdomain");


	rpf = objAllParam.DB_repeater_flag;


	fl = atoi(objModParam.get("fl"));


	lk = atoi(objModParam.get("lk"));


	this.trace_cid = client_id + '';

	this.trace_eid = ep_client_id + '';

	this.trace_pid = pno + '';

	this.trace_r = '';

	this.trace_l = virtual_url + '';

	this.trace_a = '';

	this.trace_t = '';

	this.trace_k = '';

	this.trace_f = '';

	this.trace_j = '';

	this.trace_w = '';

	this.trace_h = '';

	this.trace_d = '';

	this.trace_o = '';

	this.trace_g = '';

	if (objModParam.check("f") == 1) {
		this.trace_b = false;
	} else {
		this.trace_b = true;
	}

	this.trace_noscript = '';

	this.trace_notitle = objModParam.get("notitle");

	this.trace_noactivex = objModParam.get("noactivex");

	this.trace_cookval = '';

	this.trace_cookconbid = '';

	this.trace_cookconref = '';

	this.trace_cookcontime = '';

	this.trace_cookcontpv = '';

	this.trace_cookconrpt = '';

	this.trace_cookconfre = '';

	this.trace_cookconrec = '';

	this.trace_cookconsta = '';

	this.trace_cookconmon = '';

	this.trace_isnewses = '';

	if (tp > 0) {
		this.trace_tp = tp + '';
		this.trace_fpdomain = '';

	} else {
		this.trace_tp = '';

		if (this.fpdomain != ''){
			this.trace_fpdomain = fpdomain + '';
		}else{
			this.trace_fpdomain = '';
		}
	}

	this.trace_ce = objModParam.get("ce");

	this.trace_ad = objModParam.get("adf");

	if ((cs == 0) && (this.trace_ad != '')) {
		this.trace_ad = this.trace_ad.toLowerCase();
	}

	if (fl > 0) {
		this.trace_fl = fl + '';
	} else {
		this.trace_fl = '';
	}

	this.trace_str = objModParam.get("str");

	this.trace_stid = objModParam.get("stid");

	if (lk > 0) {
		this.trace_lk = lk + '';
	} else {
		this.trace_lk = '';
	}

	this.trace_lf = '';

	this.trace_lng = '';

	this.trace_v = true;

	this.trace_t1970 = t1970 + '';

	this.trace_t1970yymmdd = t1970yyyymmdd + '';

	this.trace_days2000 = days2000 + '';

	this.trace_cookval2 = '';

	this.trace_serverurl = objAllParam.click_server + '/' + objAllParam.path;

	this.trace_newid = '1:'+ t1970 + '_' + make_randstr8();

	var mydate = new Date();
	mydate.setTime(rptexpire * 1000);
	this.trace_cookexpire_str = mydate.toGMTString();

	var i;
	var str;

	this.trace_uid = new Array(10);
	for (i = 0 ; i <= 9 ; i++) {
		this.trace_uid[i] = '';
		str = objModParam.get('u' + (i+1));
		if (chk_uid(str) == 1) {
			this.trace_uid[i] = str;
		}
	}

	this.trace_euid = new Array(10);
	for (i = 0 ; i <= 9 ; i++) {
		this.trace_euid[i] = '';
		str = objModParam.get('eu' + (i+1));
		if (chk_uid(str) == 1) {
			this.trace_euid[i] = str;
		}
	}

	this.trace_inherit_old_cookie = objAllParam.inherit_old_cookie;

	this.trace_delete_old_cookie = objAllParam.delete_old_cookie;


	this.trace_DBrepeaterflag = objAllParam.DB_repeater_flag + '';

	this.trace_DBbanneridparam = objAllParam.DB_banner_id_param + '';

	this.trace_DBpostidparam = objAllParam.DB_post_id_param + '';

	this.trace_DBmailuidparam = objAllParam.DB_mail_uid_param + '';

	this.trace_reqvlid = objAllParam.request_vlid_flag + '';

	this.trace_reqcustom = objAllParam.request_customjs_flag + '';

	if ((cs == 0) && (this.trace_DBbanneridparam != '')) {
		this.trace_DBbanneridparam = this.trace_DBbanneridparam.toLowerCase();
	}

	this.trace_DBcookieexpire = rptexpire + '';

	this.trace_DBadcookieexpire = adexpire + '';

	this.trace_DBsessionInterval = ssinterval + '';

	this.trace_DBpageUrlCaseSensitive = cs + '';

	this.trace_plugin = plugin_str + '';

	this.inquiry_call_param = inquiry_call_param + '';

	this.javascript_server = objAllParam.javascript_server + '';

	function mod_click_getparam(str)
	{
		var str2;
		var str3;

		this.params = new Array();

		str2 = str.replace(/ /g,"");
		str3 = str.replace(/&&/g,"&");
		this.params = str3.split("&");

		this.get = function(pname)
		{
			var i;
			var pname2;
			var val;

			pname2 = pname + "=";
			val = "";

			for (i = 0 ; i < this.params.length ; i++) {
				if (this.params[i].indexOf(pname2,0) == 0) {
					val = this.params[i].substr(pname2.length,this.params[i].length);
				}
			}

			return (val);
		}

		this.check = function(pname)
		{
			var i;
			var pname2;

			pname2 = pname + "=";

			for (i = 0 ; i < this.params.length ; i++) {
				if (this.params[i].indexOf(pname2,0) == 0) {
					return(1);
				}
			}

			return (0);
		}

	}

	function mod_click_plugin_param(plugin_str)
	{
		var str2;
		this.params = new Array();

		str2 = plugin_str.replace(/ /g,"");
		str2 = str2.toLowerCase();

		this.params = str2.split("-");

		this.check = function(pname)
		{
			var i;
			var j;
			var pname2;

			pname2 = pname.toLowerCase();

			for (i = 0 ; i < this.params.length ; i++) {
				if (pname2 == this.params[i]) {
					return(1);
				}
			}

			return (0);
		}

	}



	function check_client_id(client_id)
	{
		var hash_str;
		var hssh_val;
		var cid;

		client_id = client_id + '';

		cid = atoi(client_id);

		if (cid == 0) {

			if (client_id.length >= 3) {

				if (isNaN(client_id.charAt(0))) {

					hash_str = client_id.substring(0,2);
					cid = atoi(client_id.substring(2,client_id.length));
					hash_val = hash_decode(hash_str);
					if (hash_val != cid % 768) {
						cid = 0;
					}
				}
			}
		}

 		if (cid < 0) {
			cid = 0;
		}

		return (cid);
	}


	function hash_decode(str)
	{

		var Code_table1 = "mknfubdysethvrqwpgizcxaj";
		var Code_table2 = "grcxvmih7qj8wa2nukp6dy5ezb9tf3s4";

		var  hash = new Array(2);
		var x;
		var i;
		var j;
		var k;
		var l;
		var c;
		var ct;

		if (str.length != 2) {
			return (-1);
		}

		str = str.toLowerCase();

		for (i = 0 ; i < 2 ; i++) {

			c = str.charAt(1-i);

			if (i == 1) {
				k = 24;
				ct = Code_table1;
			} else {
				k = 32;
				ct = Code_table2;
			}

			hash[i] = -1;
			for (j = 0 ; j < k ; j++) {
				if (c == ct.charAt(j)) {
					hash[i] = j;
					break;
				}
			}
			if (hash[i] == -1) {
				return (-1);
			}
		}


		x = 0;

		j = 0;
		for (i = 0; i < 7 ; i++) {0

			l = hash[j] % 2;
			hash[j] = Math.floor(hash[j] / 2);

			x = Math.floor(x/2) + l*512;
			j = (j+1) % 2;
		}

		l = hash[0] % 2;
		hash[0] = Math.floor(hash[0] / 2);
		x = Math.floor(x/2) + l*512;

		l = hash[1] % 2;
		 hash[1] = Math.floor(hash[1] / 2);
		x = Math.floor(x/2) + l*512;

		l = hash[1] % 2;
		hash[1] = Math.floor(hash[1] / 2);
		x = Math.floor(x/2) + l*512;

		return (x);

	}

	function chk_uid(str)
	{
		if (str == '') {
			return (0);
		}

		var  len = str.length;
		if (len > 32) {
			return (0);
		}

		var  ii;
		var  c;
		var  chk_flg;
		for (ii = 0; ii < len; ii++) {

			c = str.charCodeAt(ii);
			chk_flg = 0;

			if (c >= 0x30 && c <= 0x39) {
				chk_flg = 1;

			} if (c >= 0x41 && c <= 0x5a) {
				chk_flg = 1;
			}

			if (c >= 0x61 && c <= 0x7a) {
				chk_flg = 1;
			}

			if (c == 0x5f) {
				chk_flg = 1;
			}

			if (c == 0x2d) {
				chk_flg = 1;
			}

			if (chk_flg == 0) {
				return (0);
			}
		}
		return (1);
	}

	function make_randstr8()
	{
		var rand_base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var i;
		var j;
		var str = '';
		for (i = 0 ; i < 8; i++) {
			j = Math.floor(Math.random() * 52);
			str = str + rand_base.charAt(j);
		}
		return(str);
	}

	function atoi(str)
	{
		if (typeof str == 'undefined') {
			return(0);
		}

		if (str == '') {
			return(0);
		}

		if (isNaN(str)) {
			return (0);
		}

		return (eval(str));

	}
}


function VLTrace_ClassObj_GlobalValues()
{
	var prop;
	for (prop in Obj_VLTrace_ClassObj_GlobalValuesDMD) {
		this[prop] = Obj_VLTrace_ClassObj_GlobalValuesDMD[prop];
	}
}

function VLTrace_Dump_DMD()
{

	var prop;
	for (prop in Obj_VLTrace_ClassObj_GlobalValues) {
		document.write(prop + " = '" + Obj_VLTrace_ClassObj_GlobalValues[prop] + "'<br>");
	}

	var i;
	for (i = 0 ; i < 10 ; i++) {
		document.write("trace_uid[" + i + "] = '" + Obj_VLTrace_ClassObj_GlobalValues.trace_uid[i] + "'<br>");
	}
	for (i = 0 ; i < 10 ; i++) {
		document.write("trace_euid[" + i + "] = '" + Obj_VLTrace_ClassObj_GlobalValues.trace_euid[i] + "'<br>");
	}

	document.write("VLTrace_Global_Var_Plugin = '" + VLTrace_Global_Var_Plugin + "'<br>");



	if (Obj_VLTrace_ClassObj_GlobalValues.inquiry_call_param != '') {
		document.write('[SCRIPT type="text/javascript" ');
		document.write('src="' + Obj_VLTrace_ClassObj_GlobalValues.trace_serverurl);
		document.write('?' + Obj_VLTrace_ClassObj_GlobalValues.inquiry_call_param);
		document.write('"][/SCRIPT]');
		document.write('<br>');
	}
}


if(typeof Array.prototype.push == 'undefined'){
  Array.prototype.push = function(x){
    this[this.length] = x;
  }
}

if (typeof Obj_VLTrace_DMD == 'undefined') {
	var Obj_VLTrace_DMD = new Object();
}

var Obj_VLTrace_ClassObj_GlobalValuesDMD = new VLTrace_ClassObj_GlobalValues_DMD(Obj_VLTrace_DMD, new VLTrace_Default_DMD());

var Obj_VLTrace_ClassObj_GlobalValues = new VLTrace_ClassObj_GlobalValues();

if( typeof Array_VLTrace_ClassObj_GlobalValues_Bases == 'undefined' ){
	Array_VLTrace_ClassObj_GlobalValues_Bases = new Array();
}
Array_VLTrace_ClassObj_GlobalValues_Bases.push(Obj_VLTrace_ClassObj_GlobalValues);

if( typeof Array_VLTrace_ClassObj_GlobalValues_Bases_EC == 'undefined' ) {
	Array_VLTrace_ClassObj_GlobalValues_Bases_EC = new Array();
}
Array_VLTrace_ClassObj_GlobalValues_Bases_EC.push(Obj_VLTrace_ClassObj_GlobalValues );

var VLTrace_Global_Var_Plugin = Obj_VLTrace_ClassObj_GlobalValues.trace_plugin;




var OBJ_VLTrace_ClassObj_FirstPartyCookie = new VLTrace_ClassObj_FirstPartyCookie();

function VLTrace_ClassObj_FirstPartyCookie()
{

	this.V5cooktable_rid = '';
	this.V5cooktable_rptexpire = '';
	this.V5cooktable_adexpire = '';
	this.V5cooktable_sta = '';
	this.V5cooktable_ftime = '';
	this.V5cooktable_ctime = '';
	this.V5cooktable_ctimeNow = '';
	this.V5cooktable_cvis = '';
	this.V5cooktable_fre = '';
	this.V5cooktable_rec = '';
	this.V5cooktable_tpv = '';
	this.V5cooktable_rpt = '';

	function V5GetStrPart(str,i,len) {
		var s;
		var j;
		str = str + '';
		if (len > str.length) {
			len = str.length;
		}
		s = str.substr(i,len);
		for (j = len ; j > 0 ; j--) {
			if (s.substr(j - 1,1) != '-') {
				break;
			}
		}
		return(s.substr(0,j));
	}

	function V5SetStrPart(str,len)
	{
		var s;
		var j;
		str = str + '';
		s = str;
		for (j = len - str.length ; j > 0 ; j--) {
			s = s + '-';
		}
		return(s.substr(0,len));
	}

	function V5A62toI(str)
	{
		var i;
		var v;
		var r;
		var c;
		str = str + '';
		r = 0;
		for (i = 0 ; i < str.length ; i++) {
			c = str.charCodeAt(i);
			if (c >= '0'.charCodeAt(0) && c <= '9'.charCodeAt(0)) {
				v = c - '0'.charCodeAt(0);
			} else if (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) {
				v = c - 'a'.charCodeAt(0) + 10;
			} else if (c >= 'A'.charCodeAt(0) && c <= 'Z'.charCodeAt(0)) {
				v = c - 'A'.charCodeAt(0) + 36;
			} else {
				break;
			}
			r = r * 62 + v;
		}
		return (r);
	}

	function V5ItoA62(r)
	{
		var str;
		var s;
		var rr;
		var d;
		var j;
		s = '';
		do {
			rr = Math.floor(r / 62);
			rr = rr * 62;
			d = r - rr;
			if (d >= 0 && d <= 9) {
				s = s + String.fromCharCode( d + '0'.charCodeAt(0) );
			} else if (d >= 10 && d <= 35) {
				s = s + String.fromCharCode( d - 10 + 'a'.charCodeAt(0) );
			} else {
				s = s + String.fromCharCode( d - 36 + 'A'.charCodeAt(0) );
			}
			r = Math.floor(r / 62);
		} while (r > 0);
		str='';
		for (j = s.length ; j > 0 ; j--) {
			str = str + s.substr(j-1,1);
		}
		return(str);
	}

	function V5ItoA62n(r,n)
	{
		var str;
		var j;
		str =  V5ItoA62(r);
		if (str.length > n) {
			str = '';
			for (j = 0 ; j < n ; j++){
				str = str + 'Z';
			}
		}
		return(str);
	}

	function V5GetDaysSince2000(t1970)
	{
		var tz1970;
		var tz2000;
		tz1970 = V5CtfYyyymmdd2Time(V5CtfTime2Yyyymmdd(t1970));
		tz2000 = V5CtfYyyymmdd2Time(20000101);
		return (Math.floor((tz1970 - tz2000) / (24*60*60)));
	}

	function V5CtfTime2Yyyymmdd(t1970)
	{
		var DT = new Date();
		DT.setTime(t1970 * 1000);
		return( DT.getFullYear() * 10000 + (DT.getMonth() + 1) * 100 +  DT.getDate() );
	}

	function V5CtfYyyymmdd2Time(t1970yyyymmdd)
	{
		var DT = new Date();
		var mday = t1970yyyymmdd - ( Math.floor(t1970yyyymmdd / 100) * 100);
		var mon  = Math.floor(t1970yyyymmdd / 100) - ( Math.floor(t1970yyyymmdd / 10000) * 100) - 1;
		var year = Math.floor(t1970yyyymmdd / 10000);
		DT.setFullYear(year);
		DT.setMonth(mon);
		DT.setDate(mday);
		DT.setHours(0);
		DT.setMinutes(0);
		DT.setSeconds(0);
		DT.setMilliseconds(0);
		return (Math.floor(DT.getTime() / 1000));
	}

	this.deleteCookie = function(cook_name)
	{

		var tmp1 = ' ' + document.cookie + ';';
		var tmp2;
		var xx1 = 0;
		var xx2;
		var xx3;

		while (xx1 < tmp1.length) {
			xx2 = tmp1.indexOf(';', xx1);
			tmp2 = tmp1.substring(xx1 + 1, xx2);
			xx3 = tmp2.indexOf('=');
			if (tmp2.substring(0, xx3) == cook_name) {
				document.cookie = cook_name + '= ; expires=Tue, 01-Jan-1970 00:00:00 GMT; path=/;';
				break;
			}
			xx1 = xx2 + 1;
		}

	}

	this.ckCookie = function(cookval)
	{
		var flag = new Array(4);
		var i;
		var j;
		var c;

		for (j = 0 ; j < 4 ; j++) {
			flag[j] = 0;
		}

		j = 0;
		for (i = 0; i < cookval.length; i++) {

			c = cookval.charAt(i);

			if ( ((j == 0) && (c == ':')) || ((j > 0) && (j < 3) && (c == '_')) ) {
				 j++;
				 continue;
			}

			if (j == 2) {
				flag[j] = 1;
			} else {
				if ((c > '9') || (c < '0')) {
					return (false);
				} else {
					flag[j] = 1;
				}
			}

		}

		for (j = 0 ; j < 4 ; j++) {
			if (flag[j] == 0) {
				return (false);
			}
		}

		return(true);

	}

	this.ckVL5cookieFormat = function(cookval)
	{
		var i;
		var c;

		if (cookval.length != 79) {
			return(false);
		}

		for (i = 0 ; i < 79 ; i++) {
			c = cookval.charAt(i);
			if ((c != '-') && !(c >= 'a' && c <= 'z') && !(c >= 'A' && c <= 'Z') && !(c >= '0' && c <= '9')) {
				return (false);
			}
		}

		if (cookval.substr(0,6) != '------') {
			return(false);
		}

		for (i = 14 ; i <= 23 ; i++) {
			c = cookval.charAt(i);
			if ((c > '9') || (c < '0')) {
				return (false);
			}
		}

		for (i = 44 ; i <= 53 ; i++) {
			c = cookval.charAt(i);
			if ((c > '9') || (c < '0')) {
				return (false);
			}
		}

		for (i = 54 ; i <= 63 ; i++) {
			c = cookval.charAt(i);
			if ((c > '9') || (c < '0')) {
				return (false);
			}
		}

		return(true);
	}

	this.getCookie = function(trace_key)
	{
		var trace_tmp1 = " " + document.cookie + ";";
		var trace_tmp2;
		var trace_xx1 = 0;
		var trace_xx2 = 0;
		var trace_xx3;

		while (trace_xx1 < trace_tmp1.length) {
			trace_xx2 = trace_tmp1.indexOf(";", trace_xx1);
			trace_tmp2 = trace_tmp1.substring(trace_xx1 + 1, trace_xx2);
			trace_xx3 = trace_tmp2.indexOf("=");
			if (trace_tmp2.substring(0, trace_xx3) == trace_key) {
				return(unescape(trace_tmp2.substring(trace_xx3 + 1, trace_xx2 - trace_xx1 - 1)));
			}
			trace_xx1 = trace_xx2 + 1;
		}
		return('');
	}

	this.incCookieCt = function(cookval)
	{
		var tmp = '';
		var i;
		for (i = 0; i < cookval.length; i++) {
			var c = cookval.charAt(i);
			if (c == ':') {

				tmp  = (tmp - 0) + 1;
				tmp  = tmp + "";
			}
			tmp = tmp + c;
		}
		return (tmp);
	}

	this.getCookieCtId = function(id)
	{
		var tmp = '';
		var i;
		var j = 0;
		for (i = 0 ; i < id.length; i++) {
			var c = id.charAt(i);
			if (c == '_') {
				j++;
			}
			if (j >= 2) {
				break;
			}
			tmp = tmp + c;
		}
		return (tmp);
	}

	this.V5RegisterCookieTable = function(objGV)
	{
		var cookievlidkey_ary = new Array();
		if (objGV.trace_fpdomain == ''){
			cookievlidkey_ary.push('vlid_');
		}else{
			cookievlidkey_ary.push('vlid2_');
			cookievlidkey_ary.push('vlid_');
		}

		var tmp1 = '';
		var xx1 = 0;
		var xx2 = 0;
		var cookie = '';
		var ii = 0;
		var cookievlidkey = '';
		L: for (i = 0; i < cookievlidkey_ary.length; i++) {
			tmp1 = ' ' + document.cookie + ';';
			xx1 = 0;
			xx2 = 0;
			cookie = '';
			ii = 0;
			cookievlidkey = cookievlidkey_ary[i];
			while (xx1 < tmp1.length) {
				xx2 = tmp1.indexOf(';', xx1);
				tmp2 = tmp1.substring(xx1 + 1, xx2);
				var xx3 = tmp2.indexOf('=');
				if (tmp2.substring(0, xx3) == cookievlidkey + objGV.trace_cid) {
					cookie = unescape(tmp2.substring(xx3 + 1, xx2 - xx1 - 1));
					break L;
				}
				xx1 = xx2 + 1;
			}
		}

		if (cookie == ''){
			return(false);
		}

		if (this.ckVL5cookieFormat(cookie) == false) {
			return(false);
		}

		ii = 6;
		this.V5cooktable_rid = V5GetStrPart(cookie,ii,8);

		ii = ii + 8;
		this.V5cooktable_rptexpire = V5GetStrPart(cookie,ii,10);

		ii = ii + 10;
		this.V5cooktable_adexpire = V5GetStrPart(cookie,ii,10);

		ii = ii + 10;
		this.V5cooktable_sta = V5GetStrPart(cookie,ii,10);

		ii = ii + 10;
		this.V5cooktable_ftime = V5GetStrPart(cookie,ii,10);

		ii = ii + 10;
		this.V5cooktable_ctime = V5GetStrPart(cookie,ii,10);
		this.V5cooktable_ctimeNow = this.V5cooktable_ctime;

		ii = ii + 10;
		this.V5cooktable_cvis = V5A62toI(V5GetStrPart(cookie,ii,3));

		ii = ii + 3;
		this.V5cooktable_fre = V5A62toI(V5GetStrPart(cookie,ii,3));
		this.V5cooktable_fre = this.V5cooktable_fre.toString(10);

		ii = ii + 3;
		this.V5cooktable_rec = V5A62toI(V5GetStrPart(cookie,ii,3));
		this.V5cooktable_rec = this.V5cooktable_rec.toString(10);

		ii = ii + 3;
		this.V5cooktable_tpv = V5A62toI(V5GetStrPart(cookie,ii,3));

		ii = ii + 3;
		if (this.V5cooktable_adexpire > objGV.trace_t1970) {
			this.V5cooktable_rpt = V5A62toI(V5GetStrPart(cookie,ii,3));
		} else {
			this.V5cooktable_rpt = 0;
			this.V5cooktable_adexpire = 0;
		}
		if (this.V5cooktable_rptexpire <= objGV.trace_t1970) {
			this.V5cooktable_rid = '';
			this.V5cooktable_rptexpire = '';
			this.V5cooktable_adexpire = '';
			this.V5cooktable_sta = '';
			this.V5cooktable_ftime = '';
			this.V5cooktable_ctime = '';
			this.V5cooktable_ctimeNow = '';
			this.V5cooktable_cvis = '';
			this.V5cooktable_fre = '';
			this.V5cooktable_rec = '';
			this.V5cooktable_tpv = '';
			this.V5cooktable_rpt = '';

			return(false);
		}

		return(true);

	}

	this.V5getCookie = function(objGV,key)
	{
		var day1;
		var day2;
		var xx1 = 0;
		var xx2 = 0;
		var val;

		xx1 = key.indexOf('_', 0) + 1;
		if (xx1 <= 0) {
			xx1 = key.length;
		}
		key = key.substring(0,xx1);

		if (key == 'ctrid_') {
			if (this.V5cooktable_rid == '' ) {
				return ('');
			} else {
				return (this.V5cooktable_cvis + ':' + this.V5cooktable_ftime + '_' + this.V5cooktable_rid + '_' + this.V5cooktable_ctime);
			}
		}

		if (key == 'ctrsession_') {
			day1 = V5CtfTime2Yyyymmdd(objGV.trace_t1970);
			day2 = V5CtfTime2Yyyymmdd(this.V5cooktable_ctime);


			if ((objGV.trace_t1970 - this.V5cooktable_ctime) < objGV.trace_DBsessionInterval ) {
				return('1');
			} else {
				return('');
			}
		}

		if (key == 'ctrcontpv_') {
			return(this.V5cooktable_tpv);
		}

		if (key == 'ctrconrpt_') {
			return(this.V5cooktable_rpt);
		}

		if (key == 'ctrconfre_') {
			if (this.V5cooktable_fre == '') {
				return('');
			} else {
				return(this.V5cooktable_fre + ':' + V5GetDaysSince2000(this.V5cooktable_ctime));
			}
		}

		if (key == 'ctrconrec_') {
			if (this.V5cooktable_rec == '') {
				return('');
			} else {
				return(this.V5cooktable_rec + ':' + V5GetDaysSince2000(this.V5cooktable_ctime));
			}
		}

		if (key == 'ctrconsta_') {
			if (this.V5cooktable_sta != '') { this.V5cooktable_sta = V5CtfTime2Yyyymmdd(this.V5cooktable_sta); }
			return(this.V5cooktable_sta);
		}
		return('');
	}

	this.V5setCookie = function(objGV,key,val)
	{
		var xx1;
		var xx2;
		xx1 = key.indexOf('_', 0)+1;
		if (xx1 <= 0) {
			xx1 = key.length
		}
		key = key.substring(0,xx1);
		if (key == 'ctrid_') {
			xx1 = 0;
			xx2 = val.indexOf(':', xx1);
			this.V5cooktable_cvis = val.substring(xx1,xx2);
			xx1 = xx2 + 1;
			xx2 = val.indexOf('_', xx1);
			this.V5cooktable_ftime = val.substring(xx1,xx2);
			xx1 = xx2 + 1;
			xx2 = val.indexOf('_', xx1);
			this.V5cooktable_rid = val.substring(xx1,xx2);
			xx1 = xx2 + 1;
			xx2 = val.length;
			this.V5cooktable_ctimeNow = val.substring(xx1,xx2);

			if (this.V5cooktable_ctime == '') {
				this.V5cooktable_ctime = this.V5cooktable_ctimeNow;
			}
		}
		if (key == 'ctrcontpv_') {
			this.V5cooktable_tpv = val;
		}
		if (key == 'ctrconrpt_') {
			this.V5cooktable_rpt = val;
		}
		if (key == 'ctrconfre_') {
			xx1 = 0;
			xx2 = val.indexOf(':', xx1);
			this.V5cooktable_fre = val.substring(xx1,xx2);
		}
		if (key == 'ctrconrec_') {
			xx1 = 0;
			xx2 = val.indexOf(':', xx1);
			this.V5cooktable_rec = val.substring(xx1,xx2);
		}
		if (key == 'ctrconsta_') {
			this.V5cooktable_sta = V5CtfYyyymmdd2Time(val);
		}
	}

	this.V5DischargeCookieTable = function(objGV)
	{
		var cookie = '';
		var s;
		var str_cid;

		this.V5cooktable_rptexpire = objGV.trace_DBcookieexpire;
		cookie = V5SetStrPart('',6);
		cookie = cookie + V5SetStrPart(this.V5cooktable_rid,8);
		if (this.V5cooktable_rptexpire == '') { this.V5cooktable_rptexpire = 0;	}
		cookie = cookie + V5SetStrPart(this.V5cooktable_rptexpire,10);
		if (this.V5cooktable_adexpire == '') { this.V5cooktable_adexpire = 0; }
		cookie = cookie + V5SetStrPart(this.V5cooktable_adexpire,10);
		if (this.V5cooktable_sta == '') { this.V5cooktable_sta = 0; }
		cookie = cookie + V5SetStrPart(this.V5cooktable_sta,10);
		if (this.V5cooktable_ftime == '') { this.V5cooktable_ftime = 0; }
		cookie = cookie + V5SetStrPart(this.V5cooktable_ftime,10);
		if (this.V5cooktable_ctimeNow == '') { this.V5cooktable_ctimeNow = 0; }
		cookie = cookie + V5SetStrPart(this.V5cooktable_ctimeNow,10);
		if (this.V5cooktable_cvis == '') { this.V5cooktable_cvis = 0; }
		cookie = cookie + V5SetStrPart(V5ItoA62n(this.V5cooktable_cvis,3),3);
		if (this.V5cooktable_fre == '') { this.V5cooktable_fre = 0; }
		cookie = cookie + V5SetStrPart(V5ItoA62n(this.V5cooktable_fre,3),3);
		if (this.V5cooktable_rec == '') { this.V5cooktable_rec = 0; }
		cookie = cookie + V5SetStrPart(V5ItoA62n(this.V5cooktable_rec,3),3);
		if (this.V5cooktable_tpv == '') { this.V5cooktable_tpv = 0; }
		cookie = cookie + V5SetStrPart(V5ItoA62n(this.V5cooktable_tpv,3),3);
		if (this.V5cooktable_rpt == '') { this.V5cooktable_rpt = 0; }
		cookie = cookie + V5SetStrPart(V5ItoA62n(this.V5cooktable_rpt,3),3);

		str_cid = objGV.trace_cid + '';
		if ((str_cid != '') && (str_cid != '0')) {
			if (objGV.trace_fpdomain == ''){
				document.cookie = 'vlid_' + objGV.trace_cid + '=' + cookie + '; expires=' + objGV.trace_cookexpire_str + '; path=/;';
			}else{
				document.cookie = 'vlid2_' + objGV.trace_cid + '=' + cookie + '; expires=' + objGV.trace_cookexpire_str + '; domain=' + objGV.trace_fpdomain + '; path=/;';
			}

			if (objGV.trace_reqvlid == 1) {
				VLTrace_vlid = cookie.substr(44,10) + "_" + cookie.substr(6,8);
			}
		}
	}
}


function VLTrace_Function_FP_Rpt2(objGV , objFP , cookie_version)
{
	function getConDate(data) {
		var ret = '';
		var i;
		var c;
		var j = 0;
		for (i = 0 ; i < data.length ; i++) {
			c = data.charAt(i);
			if (j == 0) {
				if (c == ':') {
					j++;
				}
			} else {
				ret = ret + c;
			}
		}
		return ret;
	}

	function getConVal(data) {
		var ret = '';
		var i;
		var c;
		for (i = 0; i < data.length ; i++) {
			c = data.charAt(i);
			if (c == ':') { break; }
			ret = ret + c;
		}
		return ret;
	}


	if (cookie_version == 'v4') {


		objGV.trace_cookconrpt = 0;

		objGV.trace_cookcontpv = objFP.getCookie('ctrcontpv_' + objGV.trace_cid);
		objGV.trace_cookcontpv ++;

		objGV.trace_cookconfre = objFP.getCookie('ctrconfre_' + objGV.trace_cid);

		objGV.trace_cookconrec = objFP.getCookie('ctrconrec_' + objGV.trace_cid);

		objGV.trace_cookconsta = objFP.getCookie('ctrconsta_' + objGV.trace_cid);

		objGV.trace_cookconmon = objFP.getCookie('ctrconmon_' + objGV.trace_cid);

	}

	if (cookie_version == 'v4goo') {

		objGV.trace_cookconrpt = 0;
		objGV.trace_cookcontpv = 1;
		objGV.trace_cookconfre = '';
		objGV.trace_cookconrec = '';
		objGV.trace_cookconsta = '';
		objGV.trace_cookconmon = '';

	}

	if (cookie_version == 'v5') {

		objGV.trace_cookconrpt = objFP.V5getCookie(objGV, 'ctrconrpt_');

		objGV.trace_cookcontpv = objFP.V5getCookie(objGV, 'ctrcontpv_');
		objGV.trace_cookcontpv ++;

		objGV.trace_cookconfre = objFP.V5getCookie(objGV, 'ctrconfre_');

		objGV.trace_cookconrec = objFP.V5getCookie(objGV, 'ctrconrec_');

		objGV.trace_cookconsta = objFP.V5getCookie(objGV, 'ctrconsta_');

		objGV.trace_cookconmon = objFP.V5getCookie(objGV, 'ctrconmon_');
	}


	if ( ( objGV.trace_cookconsta + 0 ) <= 19800101 ) {
		objGV.trace_cookcontpv = 1;
		objGV.trace_cookconfre = '';
		objGV.trace_cookconrec = '';
		objGV.trace_cookconsta = '';
		objGV.trace_cookconmon = '';
	}

	if (objGV.trace_cookconrpt == '')  {
		objGV.trace_cookconrpt = 0;
	}
	if (objGV.trace_cookconrpt > 0)  {
		if (objGV.trace_isnewses == '1') {
			objGV.trace_cookconrpt++;
		}
	}

	if (objGV.trace_cookconfre == '' || getConDate(objGV.trace_cookconfre) == '') {
		objGV.trace_cookconfre = '1:' + objGV.trace_days2000;
	}

	if (objGV.trace_cookconrec == '' || getConDate(objGV.trace_cookconrec) == '') {
		objGV.trace_cookconrec = '0:' + objGV.trace_days2000;
	}

	if (objGV.trace_cookconsta == '') {
		objGV.trace_cookconsta = objGV.trace_t1970yymmdd;
	}

	if (objGV.trace_cookconmon == '') {
		objGV.trace_cookconmon = '0';
	}

	if (getConDate(objGV.trace_cookconfre) < objGV.trace_days2000) {
		var val = getConVal(objGV.trace_cookconfre);
		val++;
		objGV.trace_cookconfre = val + ':' + objGV.trace_days2000;
	}

	if (getConDate(objGV.trace_cookconrec) < objGV.trace_days2000) {
		var val = objGV.trace_days2000 - getConDate(objGV.trace_cookconrec);
		objGV.trace_cookconrec = val + ':' + objGV.trace_days2000;
	}

	var tmpl;
	if (objGV.trace_ad == objGV.trace_DBbanneridparam) {
		tmpl  = parent.location.search + '&' + location.search;
	} else {
		tmpl  = location.search;
	}

	if (objGV.trace_DBpageUrlCaseSensitive == 0){
		tmpl = tmpl.toLowerCase();
	}

	if (tmpl.length > 0) {
		var x;
		x = tmpl.indexOf('?' + objGV.trace_DBbanneridparam + '=');
		if (x == -1) {
			x = tmpl.indexOf('&' + objGV.trace_DBbanneridparam + '=');
		}

		if ((objGV.trace_isnewses == '1') && (x != -1)) {
			objFP.V5cooktable_adexpire =  objGV.trace_DBadcookieexpire;
			objGV.trace_cookconrpt = 1;
		}
	}

	objFP.V5setCookie(objGV, 'ctrcontpv_',objGV.trace_cookcontpv);
	objFP.V5setCookie(objGV, 'ctrconrpt_',objGV.trace_cookconrpt);
	objFP.V5setCookie(objGV, 'ctrconfre_',objGV.trace_cookconfre);
	objFP.V5setCookie(objGV, 'ctrconrec_',objGV.trace_cookconrec);
	objFP.V5setCookie(objGV, 'ctrconsta_',objGV.trace_cookconsta);
	objFP.V5setCookie(objGV, 'ctrconmon_',objGV.trace_cookconmon);
}


var OBJ_VLTrace_ClassObj_GlobalValues_Flash = new VLTrace_ClassObj_GlobalValues();

function VLTrace_Function_sError(){

	VLTrace_Function_Phase2Collection(OBJ_VLTrace_ClassObj_GlobalValues_Flash ,1);

	window.onerror = null;
	return true;
}
function VL_Send(sPid, sStr, sStid)
{

	window.onerror = VLTrace_Function_sError;

	var objGVFL = OBJ_VLTrace_ClassObj_GlobalValues_Flash;

	VLTrace_Function_CopyObjectProperties(objGVFL, OBJ_VLTrace_ClassObj_GlobalValues_Base);



	if (typeof sPid != 'undefined') {
		objGVFL.trace_pid = escape(sPid);
	}

	if (typeof sStr != 'undefined') {
		objGVFL.trace_str  = escape(sStr);
	}

	if (typeof sStid != 'undefined') {
		objGVFL.trace_stid = escape(sStid);
	}

	if ( (typeof sPid == 'undefined') || (typeof sStr == 'undefined') || (typeof sStid == 'undefined') ){
		 VLTrace_Function_sError();
		 return;
	}


	objGVFL.trace_l = escape(document.location);

	objGVFL.trace_r = escape(document.referrer);

	if (objGVFL.trace_notitle == '') {
		objGVFL.trace_t = escape(document.title);
	}

	objGVFL.trace_k = escape(navigator.cookieEnabled);

	objGVFL.trace_f = "true";

	objGVFL.trace_j = escape(navigator.javaEnabled());

	objGVFL.trace_w = escape(screen.width);

	objGVFL.trace_h = escape(screen.height);

	objGVFL.trace_d = escape(screen.colorDepth);

	objGVFL.trace_o = escape(location.protocol);


	if (objGVFL.trace_b == true) {

		objGVFL.trace_a = escape(parent.location);

		if (objGVFL.trace_l != objGVFL.trace_a && typeof objGVFL.trace_a != 'undefined') {
			objGVFL.trace_r = escape(parent.document.referrer);
		}

		if (typeof objGVFL.trace_a != 'undefined') {
			objGVFL.trace_a = unescape(objGVFL.trace_a);

			var tmp;
			var tmp1;
			var tmp2;

			if (objGVFL.trace_DBpageUrlCaseSensitive == 0) {
			  	tmp =  objGVFL.trace_a.toLowerCase();
			} else {
			    tmp =  objGVFL.trace_a;
			}

			tmp1 = tmp.indexOf(objGVFL.trace_DBbanneridparam + '=',0);
			if (tmp1 >= 0) {
				tmp2 = objGVFL.trace_a.indexOf('&',tmp1);
				if (tmp2 < 0) {
					tmp2 = objGVFL.trace_a.length;
				}
				objGVFL.trace_a = objGVFL.trace_a.substring(tmp1,tmp2);
				objGVFL.trace_a = escape(objGVFL.trace_a);
			} else {
				objGVFL.trace_a = '';
			}
		} else {
			objGVFL.trace_a = '';
		}

	}

	if ( ( (objGVFL.trace_tp == '') || (objGVFL.trace_tp < 1) ) && (objGVFL.trace_DBrepeaterflag > 0) ){

                var objFP = OBJ_VLTrace_ClassObj_FirstPartyCookie;


		objFP.V5RegisterCookieTable(objGVFL);

		objGVFL.trace_cookval = objFP.V5getCookie(objGVFL, 'ctrid_');

		if (objGVFL.trace_cookval == '' || objFP.ckCookie(objGVFL.trace_cookval) == false) {

			objFP.V5setCookie(objGVFL, 'ctrid_', objGVFL.trace_newid + '_' + objGVFL.trace_t1970);

			objGVFL.trace_cookval = objGVFL.trace_newid + '_';
			objGVFL.trace_isnewses='1';

		} else {
			if (objFP.V5getCookie(objGVFL, 'ctrsession_') == '') {
				objGVFL.trace_cookval = objFP.incCookieCt(objGVFL.trace_cookval);
				objGVFL.trace_isnewses = '1';
			}
			objFP.V5setCookie(objGVFL, 'ctrid_', objFP.getCookieCtId(objGVFL.trace_cookval) + '_' + objGVFL.trace_t1970);
		}


		objGVFL.trace_cookcontpv = '';
		objGVFL.trace_cookconrpt = '';
		objGVFL.trace_cookconfre = '';
		objGVFL.trace_cookconrec = '';
		objGVFL.trace_cookconsta = '';
		objGVFL.trace_cookconmon = '';

                objFP.V5DischargeCookieTable(objGVFL);

	}
	VLTrace_Function_Phase2Collection(objGVFL , 1);

	window.onerror=null;
}

function VL_SendUrl(sVirtualUrl)
{

	window.onerror = VLTrace_Function_sError;
	var objGVFL = OBJ_VLTrace_ClassObj_GlobalValues_Flash;
	VLTrace_Function_CopyObjectProperties(objGVFL, OBJ_VLTrace_ClassObj_GlobalValues_Base);

	if (typeof sVirtualUrl == 'undefined') {
		 VLTrace_Function_sError();
		 return;
	}

	objGVFL.trace_l = escape(document.location);
	objGVFL.trace_r = escape(document.referrer);
	if (objGVFL.trace_notitle == '') {
		objGVFL.trace_t = escape(document.title);
	}
	objGVFL.trace_k = escape(navigator.cookieEnabled);
	objGVFL.trace_f = "true";
	objGVFL.trace_j = escape(navigator.javaEnabled());
	objGVFL.trace_w = escape(screen.width);
	objGVFL.trace_h = escape(screen.height);
	objGVFL.trace_d = escape(screen.colorDepth);
	objGVFL.trace_o = escape(location.protocol);

	if (objGVFL.trace_b == true) {
		objGVFL.trace_a = escape(parent.location);

		if ((objGVFL.trace_l != objGVFL.trace_a) && (typeof objGVFL.trace_a != 'undefined')) {
			objGVFL.trace_r = escape(parent.document.referrer);
		}

		if (typeof objGVFL.trace_a != 'undefined') {
			objGVFL.trace_a = unescape(objGVFL.trace_a);
			var tmp;
			var tmp1;
			var tmp2;

			if (objGVFL.trace_DBpageUrlCaseSensitive == 0) {
			  	tmp =  objGVFL.trace_a.toLowerCase();
			} else {
				tmp =  objGVFL.trace_a;
			}

			tmp1 = tmp.indexOf(objGVFL.trace_DBbanneridparam + '=',0);
			if (tmp1 >= 0) {
				tmp2 = objGVFL.trace_a.indexOf('&',tmp1);
				if (tmp2 < 0) {
					tmp2 = objGVFL.trace_a.length;
				}
				objGVFL.trace_a = objGVFL.trace_a.substring(tmp1,tmp2);
				objGVFL.trace_a = escape(objGVFL.trace_a);
			} else {
				objGVFL.trace_a = '';
			}
		} else {
			objGVFL.trace_a = '';
		}
	}
	objGVFL.trace_l = location.protocol + '//'+location.host + makeVirtualUrl(sVirtualUrl);

	if (((objGVFL.trace_tp == '') || (objGVFL.trace_tp < 1)) && (objGVFL.trace_DBrepeaterflag > 0)) {
		var objFP = OBJ_VLTrace_ClassObj_FirstPartyCookie;
		objFP.V5RegisterCookieTable(objGVFL);
		objGVFL.trace_cookval = objFP.V5getCookie(objGVFL, 'ctrid_');

		if ((objGVFL.trace_cookval == '') || (objFP.ckCookie(objGVFL.trace_cookval) == false)) {
			objFP.V5setCookie(objGVFL, 'ctrid_', objGVFL.trace_newid + '_' + objGVFL.trace_t1970);
			objGVFL.trace_cookval = objGVFL.trace_newid + '_';
			objGVFL.trace_isnewses='1';
		} else {
			if (objFP.V5getCookie(objGVFL, 'ctrsession_') == '') {
				objGVFL.trace_cookval = objFP.incCookieCt(objGVFL.trace_cookval);
				objGVFL.trace_isnewses = '1';
			}
			objFP.V5setCookie(objGVFL, 'ctrid_', objFP.getCookieCtId(objGVFL.trace_cookval) + '_' + objGVFL.trace_t1970);
		}

		objGVFL.trace_cookcontpv = '';
		objGVFL.trace_cookconrpt = '';
		objGVFL.trace_cookconfre = '';
		objGVFL.trace_cookconrec = '';
		objGVFL.trace_cookconsta = '';
		objGVFL.trace_cookconmon = '';
		objFP.V5DischargeCookieTable(objGVFL);
	}

	VLTrace_Function_Phase2Collection(objGVFL , 1);
	window.onerror=null;
}

var OBJ_VLTrace_ClassObj_GlobalValues_ExtLink = new VLTrace_ClassObj_GlobalValues();

var V5_Trace = new Object();
V5_Trace.ImgMeasure = null;


function VL_SendJump( pageid, page_url , u1, u2, u3){


	var objGVLK = OBJ_VLTrace_ClassObj_GlobalValues_ExtLink;

	VLTrace_Function_CopyObjectProperties(objGVLK, OBJ_VLTrace_ClassObj_GlobalValues_Base);

//	var target = Obj.target;
//	var b1 = target=='_blank';
//	var b2 = (target!='' && typeof target!='undefined') && (typeof parent.frames[target]=='undefined');
//	var clickLinkIsNewWindow = b1 || b2;
	function VPageItem()
	{
		this.vlpageid = pageid;
		this.vlunit1 = u1;
		this.vlunit2 = u2;
		this.vlunit3 = u3;
	}

	Obj = new VPageItem();

	var url                = V5getTraceUrlFileDLExtLink( Obj, 'V_PAGE' );
//	var jsCodeClickLink    = V5getJsCodeClick(Obj);

	var jsCodeClickLink    = 'location.href="'+page_url+'"';
	if( page_url == null || page_url == "" ){jsCodeClickLink = "";}
	var isCompleteV5ReqImg = V5reqImg(url, 500, jsCodeClickLink, false);
	if (isCompleteV5ReqImg){
		setTimeout( jsCodeClickLink, 10);
	}

	if( page_url == null || page_url == "" ){ return true; }
	return false;
}



function VL_FileDL( Obj ){

	var objGVLK = OBJ_VLTrace_ClassObj_GlobalValues_ExtLink;

	VLTrace_Function_CopyObjectProperties(objGVLK, OBJ_VLTrace_ClassObj_GlobalValues_Base);

	var target = Obj.target;
	var b1 = target=='_blank';
	var b2 = (target!='' && typeof target!='undefined') && (typeof parent.frames[target]=='undefined');
	var clickLinkIsNewWindow = b1 || b2;
	var url                = V5getTraceUrlFileDLExtLink( Obj, 'FileDL' );
	var jsCodeClickLink    = V5getJsCodeClick(Obj);
	var isCompleteV5ReqImg = V5reqImg(url, 500, jsCodeClickLink, clickLinkIsNewWindow);
	if( isCompleteV5ReqImg ){ return true; }
	return false;
}

function VL_ExtLink( Obj ){

	var objGVLK = OBJ_VLTrace_ClassObj_GlobalValues_ExtLink;

	VLTrace_Function_CopyObjectProperties(objGVLK, OBJ_VLTrace_ClassObj_GlobalValues_Base);

	var target = Obj.target;
	var b1 = target=='_blank';
	var b2 = (target!='' && typeof target!='undefined') && (typeof parent.frames[target]=='undefined');
	var clickLinkIsNewWindow = b1 || b2;
	var url                = V5getTraceUrlFileDLExtLink( Obj, 'ExtLink' );
	var jsCodeClickLink    = V5getJsCodeClick(Obj);
	var isCompleteV5ReqImg = V5reqImg(url, 500, jsCodeClickLink, clickLinkIsNewWindow);
	if( isCompleteV5ReqImg ){ return true; }
	return false;
}

function V5getJsCodeClick(Obj){

	var objGVLK = OBJ_VLTrace_ClassObj_GlobalValues_ExtLink;

	var target = Obj.target;
	var code = 'location.href="'+Obj.href+'"';
	if( target=='_blank' ){
		code = 'open("'+Obj.href+'")';
	}
	else if( target=='_self' ){
	}
	else if( target=='_top' || target=='_parent' ){
		code = 'parent.location.href="'+Obj.href+'"';
	}
	else if( target!='' && typeof target!='undefined' ){
		if(typeof parent.frames[target] != 'undefined'){
			code = 'parent.frames["'+target+'"].location.href="'+Obj.href+'"';
		}else{
			code = 'open("'+Obj.href+'", "'+target+'")';
		}
	}
	return code;
}
function V5jsSleep(t){
	var d0 = new Date();
	while( (new Date()-d0)<t ){}
}

function V5reqImg(ImageUrl, WaitTime, JsCodeClickLink, ClickLinkIsNewWindow){

	var objGVLK = OBJ_VLTrace_ClassObj_GlobalValues_ExtLink;

	var navi = (navigator.userAgent).toLowerCase();
	var isSafari    = 0 <= navi.indexOf('safari');
	var isFirefox   = 0 <= navi.indexOf('firefox');
	var isWinXpSp2  = 0 <= navi.indexOf("sv1");
	var isFirstRequest     = (ImageUrl!='');
	var img                = V5_Trace.ImgMeasure;
	var imgRequestComplete = false;


	isWinXpSp2 = true;

	if ((isSafari || isFirefox) &&  !ClickLinkIsNewWindow) {
		isWinXpSp2 = false;
	}

	if( isFirstRequest && objGVLK.trace_v==true ){
		img = new Image();
		V5_Trace.ImgMeasure = img;
		V5_Trace.ImgMeasure.src =  ImageUrl+'&jd='+new Date().getTime();
	}
	if( isWinXpSp2 ){
		V5jsSleep(500);
		imgRequestComplete = true;
	}
	else if( isFirefox ){
		setTimeout( JsCodeClickLink, 500);
	}
	else{
		if( img.complete || WaitTime<=0 ){
			if( !isFirstRequest ){
				setTimeout( JsCodeClickLink, 0);
			}
			imgRequestComplete = true;
		}else{
			setTimeout( "V5reqImg('', "+(WaitTime-100)+", '"+JsCodeClickLink+"',"+ClickLinkIsNewWindow+ ")", 100 );
		}
	}
	return imgRequestComplete;
}
function V5getTraceUrlFileDLExtLink( Obj, UrlType ){

	var objGVLK = OBJ_VLTrace_ClassObj_GlobalValues_ExtLink;

	var urlTracer = objGVLK.trace_serverurl;
	var urlQuery  = '';
	var uu        = new Array();
	var euu       = new Array();
	var vlPageId;
	var _trace_r, _trace_l;
	var linkFlg;

	window.onerror = _fError;

	initParameters();
	setArrayMethod();
	setParameters();
	window.onerror = null;
	return getTraceUrl1();

	function _fError(){
		window.onerror = null;
		var traceUrl = getTraceUrl1();
		V5reqImg(traceUrl, 500, '', false);
		return true;
	}

	function initParameters(){
		for( var i=1; i<11; i++ ) {
			uu[i] = null;
			euu[i] = null;
		}
		vlPageId = null;
		_trace_r = 'null';
		_trace_l = 'null';
		linkFlg  = null;
	}

	function setParameters(){
		linkFlg        = (UrlType == 'ExtLink') ? '1' : '2';
		_trace_r       = escape( location.href );
		vlPageId       = getProperty2( Obj, 'vlpageid' );
		_trace_l       = escape( getLinkUrl( Obj ) );

		for(var i=1; i<11; i++){
			uu[i]  = getProperty2( Obj, 'vlunit'+i );
			euu[i] = getProperty2( Obj, 'vlunit'+i+'e' );
		}

		if( UrlType=='ExtLink' ){

			var queryStringExtLink = null;
			var vlpname  = getProperty1( Obj, 'vlpname' );
			var vlpvalue = getProperty1( Obj, 'vlpvalue' );

			if( vlpname!=null && vlpvalue!=null ){
				queryStringExtLink = vlpname+'='+vlpvalue;
			}else{
				var pp = unescape(_trace_l).split('?');
				if( 1<pp.length ){
					_trace_l = escape(pp[0]);
					queryStringExtLink = pp[1];
				}
			}
			if( UrlType=='ExtLink' && queryStringExtLink!=null ){
				var unescape_trace_l = unescape(_trace_l);

				if( 1<unescape_trace_l.split('?').length ){
					_trace_l = escape( unescape_trace_l + '&' +queryStringExtLink );
				}else{
					_trace_l = escape( unescape_trace_l + '?' +queryStringExtLink );
				}
			}
		}
	}

	function getTraceUrl1(){

		objGVLK.trace_l = _trace_l;

		objGVLK.trace_r = _trace_r;

		objGVLK.trace_pid = '';
		if(UrlType == 'FileDL' || UrlType == 'V_PAGE'){
			if (typeof vlPageId != 'undefined') {
				objGVLK.trace_pid = vlPageId;
			}
		}

		objGVLK.trace_a = '';

		objGVLK.trace_t = '';

		if (typeof objGVLK.trace_cookval2 != 'undefined') {
			objGVLK.trace_cookval = objGVLK.trace_cookval2;
		}

		if (UrlType != 'V_PAGE'){
			objGVLK.trace_lf = linkFlg;
		}

		var i;
		for (i = 0 ; i < 10 ; i++ ) {
			if (UrlType == 'FileDL' || UrlType == 'V_PAGE'){
				if (typeof uu[i+1] != 'undefined') {
					objGVLK.trace_uid[i] = uu[i+1];
				} else {
					objGVLK.trace_uid[i] = '';
				}
				if (typeof euu[i+1] != 'undefined') {
					objGVLK.trace_euid[i] = euu[i+1];
				} else {
					objGVLK.trace_euid[i] = '';
				}

			} else {
				objGVLK.trace_uid[i] = '';
				objGVLK.trace_euid[i] = '';
			}
		}

		urlQuery = VLTrace_Function_Phase2ImageParameter(objGVLK);

		return urlTracer + urlQuery;
	}

	function getProperty1(Object, ParopertyName){

		var value = null;
		if(typeof Object.getAttribute!='undefined'){
			value = Object.getAttribute(ParopertyName);
			if( value =='' ){ value=null; }
		}

		if( typeof value!='undefined' && value!=null ){
		}
		else if( typeof Object[ParopertyName]!='undefined' ){
			value = Object[ParopertyName];
		}
		else{
			value = null;
		}
		return value;
	}
	function getProperty2(Object, ParopertyName){
		var value = getProperty1(Object, ParopertyName);
		return value!=null ? value : '';
	}

	function getLinkUrl( Obj ){
		var url = getProperty2(Obj, 'href');

		if( url.substring(0,2)=='//' ){
			url = Obj.protocol+':'+url;
		}
		else if( url.substring(0,1)=='/' ){
			url = location.protocol+'//'+location.host + url;
		}
		else if( url.substring(0,4)!='http' && url.indexOf(Obj.protocol)!=0 ){
			var cc = url.split('/');
			var pp = location.href.split('/');
			pp.pop();
			while( 0<cc.length ){
				var h = cc.shift();
				if( h=='..' ){
					pp.pop();
				}
				else if( h!='.' && h!='' ){
					pp.push(h);
				}
			}
			url = pp.join('/');
		}
		return url;
	}

	function setArrayMethod(){
		if(typeof Array.prototype.push=='undefined'){
			Array.prototype.push = function(x){
				this[this.length] = x;
			}
		}
		if(typeof Array.prototype.pop=='undefined'){
			Array.prototype.pop = function(){
				var x;
				if( this.length!=0 ){
					x = this[ this.length-1 ];
					this.length = this.length-1;
					return x;
				}else{
					return x;
				}
			}
		}
		if(typeof Array.prototype.shift=='undefined'){
			Array.prototype.shift = function(){
				var x;
				if( this.length!=0 ){
					x = this[0];
					for(var i=0; i<this.length-1; i++){
						this[i] = this[i+1];
					}
					this.length = this.length-1;
					return x;
				}else{
					return x;
				}
			}
		}
	}
}



var VLTrace_Global_customer_time = new Date().getTime();

var VLTrace_Global_Var_VB_temp = false;

var VLTrace_Global_Var_EXTid;

var VLTrace_Global_Var_Plugin;

if(typeof(VL_fp_cookval) == 'undefined'){
	var VL_fp_cookval = '';
}

function VLTrace_Function_Phase2ImageParameter(objGV)
{
	var str = '?g=/1';

	if (typeof objGV.trace_l != 'undefined') {
		objGV.trace_l = objGV.trace_l + '';
		if (objGV.trace_l != '' && objGV.trace_l.length > 512) {
			objGV.trace_l = objGV.trace_l.substring(0, 512);
		}
		objGV.trace_l = VLdomainFormat(objGV.trace_l);
	}

	if (typeof objGV.trace_r != 'undefined') {
		objGV.trace_r = objGV.trace_r + '';
		if (objGV.trace_r != '' && objGV.trace_r.length > 512) {
			objGV.trace_r = objGV.trace_r.substring(0, 512);
		}
	}

	if (typeof objGV.trace_a != 'undefined') {
		objGV.trace_a = objGV.trace_a + '';
		if (objGV.trace_a != '' && objGV.trace_a.length > 51 ) {
			objGV.trace_a = objGV.trace_a.substring(0, 51 );
		}
	}

	if (typeof objGV.trace_t != 'undefined') {
		objGV.trace_t = objGV.trace_t + '';
		if (objGV.trace_t!= '' && objGV.trace_t.length > 128) {
			objGV.trace_t = objGV.trace_t.substring(0, 128);
		}
	}

	if (typeof objGV.trace_cid != 'undefined') {
		objGV.trace_cid = objGV.trace_cid + '';
		if (objGV.trace_cid != '') {str = str + '&c=' +  objGV.trace_cid; }
	}

	if (typeof objGV.trace_eid != 'undefined') {
		objGV.trace_eid = objGV.trace_eid + '';
		if (objGV.trace_eid != '') {str = str + '&e=' +  objGV.trace_eid; }
	}

	if (typeof objGV.trace_pid != 'undefined') {
		objGV.trace_pid = objGV.trace_pid + '';
		if (objGV.trace_pid != '') {str = str + '&p=' + objGV.trace_pid; }
	}

	if (typeof objGV.trace_r != 'undefined') {
		objGV.trace_r = objGV.trace_r + '';
		if (objGV.trace_r != '') {str = str + '&r=' + objGV.trace_r; }
	}

	if (typeof objGV.trace_l != 'undefined') {
		objGV.trace_l = objGV.trace_l + '';
		if (objGV.trace_l != '') {
			str = str + '&l=' + objGV.trace_l;
			if (VLTrace_CustomID_postid != '') {
				if (str.indexOf('%3F') != -1) {
					str = str + '%26';
				} else {
					str = str + '%3F';
				}
				str = str + encodeURIComponent(
								objGV.trace_DBpostidparam + '=' + VLTrace_CustomID_postid
							);
			}
			if (VLTrace_CustomID_mailuid != '') {
				if (str.indexOf('%3F') != -1) {
					str = str + '%26';
				} else {
					str = str + '%3F';
				}
				str = str + encodeURIComponent(
								objGV.trace_DBmailuidparam + '=' + VLTrace_CustomID_mailuid
							);
			}
		}
	}

	if (typeof objGV.trace_a != 'undefined') {
		objGV.trace_a = objGV.trace_a + '';
		if (objGV.trace_a != '') {str = str + '&a=' + objGV.trace_a; }
	}

	if (typeof objGV.trace_t != 'undefined') {
		objGV.trace_t = objGV.trace_t + '';
		if (objGV.trace_t != '') {str = str + '&t=' + objGV.trace_t; }
	}

	if (typeof objGV.trace_k != 'undefined') {
		objGV.trace_k = objGV.trace_k + '';
		if (objGV.trace_k != '') {str = str + '&k=' + objGV.trace_k; }
	}

	if (typeof objGV.trace_f != 'undefined') {
		objGV.trace_f = objGV.trace_f + '';
		if (objGV.trace_f != '') {str = str + '&sf=' + objGV.trace_f; }
	}

	if (typeof objGV.trace_j != 'undefined') {
		objGV.trace_j = objGV.trace_j + '';
		if (objGV.trace_j != '') {str = str + '&j=' + objGV.trace_j; }
	}

	if (typeof objGV.trace_w != 'undefined') {
		objGV.trace_w = objGV.trace_w + '';
		if (objGV.trace_w != '') {str = str + '&w=' + objGV.trace_w; }
	}

	if (typeof objGV.trace_h != 'undefined') {
		objGV.trace_h = objGV.trace_h + '';
		if (objGV.trace_h != '') {str = str + '&h=' + objGV.trace_h; }
	}

	if (typeof objGV.trace_d != 'undefined') {
		objGV.trace_d = objGV.trace_d + '';
		if (objGV.trace_d != '') {str = str + '&d=' + objGV.trace_d; }
	}

	if (typeof objGV.trace_o != 'undefined') {
		objGV.trace_o = objGV.trace_o + '';
		if (objGV.trace_o != '') {str = str + '&o=' + objGV.trace_o; }
	}

	if (typeof objGV.trace_cookval != 'undefined') {
		objGV.trace_cookval = objGV.trace_cookval + '';
		VL_fp_cookval = objGV.trace_cookval;
		if (objGV.trace_cookval != '') {str = str + '&cval=' + objGV.trace_cookval; }
	}

	if (typeof objGV.trace_tp != 'undefined') {
		objGV.trace_tp = objGV.trace_tp + '';
		if (objGV.trace_tp != '') {str = str + '&tp=' + objGV.trace_tp; }
	}

	if (typeof objGV.trace_ce != 'undefined') {
		objGV.trace_ce = objGV.trace_ce + '';
		if (objGV.trace_ce != '') {str = str + '&ce=' + objGV.trace_ce; }
	}

	if (typeof objGV.trace_ad != 'undefined') {
		objGV.trace_ad = objGV.trace_ad + '';
		if (objGV.trace_ad != '') {str = str + '&adf=' + objGV.trace_ad; }
	}

	if (typeof objGV.trace_str != 'undefined') {
		objGV.trace_str = objGV.trace_str + '';
		if (objGV.trace_str != '') {str = str + '&str=' + objGV.trace_str; }
	}

	if (typeof objGV.trace_stid != 'undefined') {
		objGV.trace_stid = objGV.trace_stid + '';
		if (objGV.trace_stid !='') {str = str + '&stid=' + objGV.trace_stid; }
	}

	if (typeof objGV.trace_cookcontpv != 'undefined') {
		objGV.trace_cookcontpv = objGV.trace_cookcontpv + '';
 			if (objGV.trace_cookcontpv != '') { str = str + '&cvalcontpv=' + objGV.trace_cookcontpv; }
	}

	if (typeof objGV.trace_cookconrpt != 'undefined') {
		objGV.trace_cookconrpt = objGV.trace_cookconrpt + '';
		if ( objGV.trace_cookconrpt != '') { str = str + '&cvalconrpt=' + objGV.trace_cookconrpt; }
	}

	if (typeof objGV.trace_cookconfre != 'undefined'){
		objGV.trace_cookconfre = objGV.trace_cookconfre + '';
		if ( objGV.trace_cookconfre != '') { str = str + '&cvalconfre=' + objGV.trace_cookconfre; }
	}

	if (typeof objGV.trace_cookconrec != 'undefined') {
		objGV.trace_cookconrec = objGV.trace_cookconrec + '';
		if (objGV.trace_cookconrec != '') { str = str + '&cvalconrec=' + objGV.trace_cookconrec; }
	}

	if (typeof objGV.trace_cookconsta != 'undefined') {
		objGV.trace_cookconsta = objGV.trace_cookconsta + '';
		if (objGV.trace_cookconsta != '') { str = str + '&cvalconsta=' + objGV.trace_cookconsta; }
	}

	if (typeof objGV.trace_cookconmon != 'undefined') {
		objGV.trace_cookconmon = objGV.trace_cookconmon + '';
		if (objGV.trace_cookconmon != '') { str = str + '&cvalconmon=' + objGV.trace_cookconmon; }
	}

	if (typeof objGV.trace_lf != 'undefined') {
		objGV.trace_lf = objGV.trace_lf + '';
		if (objGV.trace_lf != '') { str = str + '&lf=' + objGV.trace_lf; }
	}

	if (typeof objGV.trace_lng != 'undefined') {
		objGV.trace_lng = objGV.trace_lng + '';
		if (objGV.trace_lng != '') {str = str + '&lng=' + objGV.trace_lng; }
	}

	if (typeof VLTrace_Global_customer_time != 'undefined') {
		VLTrace_Global_customer_time = VLTrace_Global_customer_time + '';
		if (VLTrace_Global_customer_time != '') { str = str + '&jt=' + VLTrace_Global_customer_time; }
	}

	if (typeof VLTrace_Global_Var_EXTid != 'undefined') {
		VLTrace_Global_Var_EXTid = VLTrace_Global_Var_EXTid + '';
		str = str + '&guid=' + escape(VLTrace_Global_Var_EXTid);
	}

	if (typeof VLTrace_Global_Var_Plugin != 'undefined') {
		VLTrace_Global_Var_Plugin = VLTrace_Global_Var_Plugin + '';
		if (VLTrace_Global_Var_Plugin != '') { str = str + '&plugin=' + VLTrace_Global_Var_Plugin; }
	}

	{
		var i;
		for (i = 0 ; i < 10 ; i++ ) {
			if (typeof objGV.trace_uid[i] != 'undefined') {
				objGV.trace_uid[i] = objGV.trace_uid[i] + '';
				if (objGV.trace_uid[i] != '') { str = str + '&u' + (i+1) + '=' + objGV.trace_uid[i]; }
			}
			if (typeof objGV.trace_euid[i] != 'undefined') {
				objGV.trace_euid[i] = objGV.trace_euid[i] + '';
				if (objGV.trace_euid[i] != '') { str = str + '&eu' + (i+1) + '=' + objGV.trace_euid[i]; }
			}

		}
	}

	return (str);
}

function  VLTrace_Function_Get_Ext_Browser_Info(objGVBS)
{


	objGVBS.trace_lng = '';

	if (document.all) {
		objGVBS.trace_lng = navigator.browserLanguage;

	} else if (document.layers) {
    	objGVBS.trace_lng = navigator.language;

	} else if (document.getElementById) {
		objGVBS.trace_lng = navigator.language.substr(0,2);
	}

}


function VLTrace_Function_Phase2Collection(objGV , ope)
{
	function MakeImageTag()
	{
		var url = objGV.trace_serverurl + str + '&jd=' + new Date().getTime() + '_' + VLTrace_Global_Var_Image_Counter;

		if (objGV.trace_v == true) {
			document.write('<img src="' + url +'" width="0" height="0" border="0" alt="" style="display:none;">');
		}
	}

	function LoadImage()
	{
		var url = objGV.trace_serverurl + str +'&jd=' + new Date().getTime() + '_' + VLTrace_Global_Var_Image_Counter;
		var vlimg = new Image(1,1);
		vlimg.src = url;
	}

	var str;
	str = VLTrace_Function_Phase2ImageParameter(objGV);

    VLTrace_Global_Var_Image_Counter = VLTrace_Global_Var_Image_Counter + 1;

	if (ope == 0) {
		MakeImageTag();
	} else {
		LoadImage();
	}

}


function VLTrace_Function_CopyObjectProperties(destObj,srcObj)
{
	var prop;

	for (prop in srcObj) {
		destObj[prop] = srcObj[prop];
	}
}


function VLTrace_Function_fError()
{
	VLTrace_Function_Phase2Collection(OBJ_VLTrace_ClassObj_GlobalValues_Base ,0);

	window.onerror = null;
	return true;
}


function VLTrace_Function_Main(objGVBS)
{

	var cookie_version = 'v5';
	var session = '';;

	if (objGVBS.trace_l == '') {
		objGVBS.trace_l = escape(document.location);
	}

	objGVBS.trace_r = escape(document.referrer);

	if (objGVBS.trace_notitle == '') {
		objGVBS.trace_t = escape(document.title);
	}

	objGVBS.trace_k = escape(navigator.cookieEnabled);

	if (objGVBS.trace_noactivex == '') {

		var plugin = '';

		plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"])
				 ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;

		if (plugin) {
			VLTrace_Global_Var_VB_temp = navigator.plugins["Shockwave Flash"].description.split(" ");
		} else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0
		  && (navigator.appVersion.indexOf("Win") != -1)) {

			VLTrace_Global_Var_VB_temp = false;
		}
		if (VLTrace_Global_Var_VB_temp) {
			objGVBS.trace_f = "true";
		} else {
			objGVBS.trace_f = "false";
		}

	} else {
		objGVBS.trace_f = "false";
	}

	objGVBS.trace_j = escape(navigator.javaEnabled());

	objGVBS.trace_w = escape(screen.width);

	objGVBS.trace_h = escape(screen.height);

	objGVBS.trace_d = escape(screen.colorDepth);

	objGVBS.trace_o = escape(location.protocol);

	if (objGVBS.trace_str != '') {
		objGVBS.trace_str = escape(objGVBS.trace_str);
	}

	if (objGVBS.trace_stid != '') {
		objGVBS.trace_stid = escape(objGVBS.trace_stid);
	}

	if (objGVBS.trace_b == true) {

		objGVBS.trace_a = escape(parent.location);

		if (objGVBS.trace_l != objGVBS.trace_a && typeof objGVBS.trace_a != 'undefined') {
			objGVBS.trace_r = escape(parent.document.referrer);
		}

		if (typeof objGVBS.trace_a != 'undefined') {

			var tmp;
			var tmp1;
			var tmp2;

			objGVBS.trace_a = unescape(objGVBS.trace_a);

			if (objGVBS.trace_DBpageUrlCaseSensitive == 0) {
				tmp =  objGVBS.trace_a.toLowerCase();
			} else {
				tmp =  objGVBS.trace_a;
			}

			tmp1 = tmp.indexOf(objGVBS.trace_DBbanneridparam + '=',0);
			if (tmp1 >= 0) {
				tmp2 = objGVBS.trace_a.indexOf('&',tmp1);
				if (tmp2 < 0) {
					tmp2 = objGVBS.trace_a.length;
				}
				objGVBS.trace_a = objGVBS.trace_a.substring(tmp1,tmp2);
				objGVBS.trace_a = escape(objGVBS.trace_a);
			} else {
				objGVBS.trace_a = '';
			}
		} else {
			objGVBS.trace_a = '';
		}

	}

	if ( ( (objGVBS.trace_tp == '') || (objGVBS.trace_tp < 1) ) && (objGVBS.trace_DBrepeaterflag > 0) ){

		var objFP = OBJ_VLTrace_ClassObj_FirstPartyCookie;


		if (objFP.V5RegisterCookieTable(objGVBS) == true) {

			cookie_version = 'v5';

			objGVBS.trace_cookval = objFP.V5getCookie(objGVBS, 'ctrid_');

			session = objFP.V5getCookie(objGVBS, 'ctrsession_');

		} else {

			objGVBS.trace_cookval = '';
			session = '';

			var s  = objGVBS.trace_inherit_old_cookie + ",";
			var ss;
			var xx1 = 0;
			var xx2 = 0;

			while (xx1 < s.length) {
				xx2 = s.indexOf(",", xx1);
				ss = s.substring(xx1, xx2);
				xx1 = xx2 + 1;

				if (objGVBS.trace_cookval == '') {

					if (ss == "v4") {

						objGVBS.trace_cookval = objFP.getCookie('ctrid_'+ objGVBS.trace_cid);

						if (objFP.ckCookie(objGVBS.trace_cookval) == true) {

							cookie_version = 'v4';

							objFP.V5setCookie(objGVBS, 'ctrid_', objGVBS.trace_cookval);

							session = objFP.V5getCookie(objGVBS, 'ctrsession_');

						} else {
							objGVBS.trace_cookval = '';
							session = '';
						}
					}

					if (ss == "v4goo") {
						if (objGVBS.trace_fpdomain == ''){

							objGVBS.trace_cookval = objFP.getCookie('vlid_'+ objGVBS.trace_cid);

						}else{

							objGVBS.trace_cookval = objFP.getCookie('vlid2_'+ objGVBS.trace_cid);

						}

						if (objFP.ckCookie(objGVBS.trace_cookval) == true) {

							cookie_version = 'v4goo';

							objFP.V5setCookie(objGVBS, 'ctrid_', objGVBS.trace_cookval);

							session = objFP.V5getCookie(objGVBS, 'ctrsession_');

						} else {
							objGVBS.trace_cookval = '';
							session = '';
						}
					}

				}
			}
		}


		if (objGVBS.trace_cookval == '' || objFP.ckCookie(objGVBS.trace_cookval) == false) {

			cookie_version = 'v5';

			objFP.V5setCookie(objGVBS, 'ctrid_', objGVBS.trace_newid + '_' + objGVBS.trace_t1970);

			objGVBS.trace_cookval = objGVBS.trace_newid + '_';
			objGVBS.trace_isnewses = '1';

		} else {

			if (session == '') {
				objGVBS.trace_cookval = objFP.incCookieCt(objGVBS.trace_cookval);
				objGVBS.trace_isnewses = '1';
			}
			objFP.V5setCookie(objGVBS, 'ctrid_', objFP.getCookieCtId(objGVBS.trace_cookval) + '_' + objGVBS.trace_t1970);
		}

		objGVBS.trace_cookval2 = objFP.getCookieCtId(objGVBS.trace_cookval) + '_' + objGVBS.trace_t1970;

		if  (objGVBS.trace_DBrepeaterflag >=2 ){
			VLTrace_Function_FP_Rpt2(objGVBS , objFP , cookie_version);
		}

		{
			var s  = objGVBS.trace_delete_old_cookie + ",";
			var ss;
			var xx1 = 0;
			var xx2 = 0;

			while (xx1 < s.length) {
				xx2 = s.indexOf(",", xx1);
				ss = s.substring(xx1, xx2);
				xx1 = xx2 + 1;


				if (ss == "v4goo") {


					objFP.deleteCookie('vlsession_'+ objGVBS.trace_cid);

				}

				if (ss == "v4") {

					objFP.deleteCookie('ctrid_'+ objGVBS.trace_cid);

					objFP.deleteCookie('ctrsession_'+ objGVBS.trace_cid);

					objFP.deleteCookie('ctrconrpt_'+ objGVBS.trace_cid);

					objFP.deleteCookie('ctrcontpv_'+ objGVBS.trace_cid);

					objFP.deleteCookie('ctrconfre_'+ objGVBS.trace_cid);

					objFP.deleteCookie('ctrconrec_'+ objGVBS.trace_cid);

					objFP.deleteCookie('ctrconsta_'+ objGVBS.trace_cid);

					objFP.deleteCookie('ctrconmon_'+ objGVBS.trace_cid);

				}

			}
		}

		objFP.V5DischargeCookieTable(objGVBS);

	}

	VLTrace_Function_Get_Ext_Browser_Info(objGVBS);

	VLTrace_Function_Phase2Collection(objGVBS , 0);
}


if (typeof VLTrace_Global_Var_Image_Counter == 'undefined') {
	var VLTrace_Global_Var_Image_Counter = 0;
}

window.onerror = VLTrace_Function_fError;

if(typeof Array.prototype.shift =='undefined'){

  Array.prototype.shift = function(){
    var x;
    if(this.length!=0){
      x = this[0];
      for(var i=0 ; i<this.length-1 ; i++){
        this[i] = this[i+1];
      }
      this.length = this.length-1;
      return x;
    }else{
      return x;
    }
  }

}

var OBJ_VLTrace_ClassObj_GlobalValues_Base = Array_VLTrace_ClassObj_GlobalValues_Bases.shift();

VLTrace_Function_Main(OBJ_VLTrace_ClassObj_GlobalValues_Base);

window.onerror = null;



var CTD_MAX_URL_LENGTH = 2000;

var CTD_MAX_REQ_QUE = 1000;

var CTD_MAX_OBJ_CNCT = 2;

var CTD_CNCT_TIMEOUT = 120000;

var CTD_VLIMG_TIMEOUT = 1000;

var CTD_TIMER_INTERVAL = 100;

var CTD_PARAM_TOTAL = 26;

var CTD_PARAM_MAX_LEN = 576;

var trace_jt = '';

var vl_fp_cval = '';

if(typeof(VLTrace_Global_customer_time) != 'undefined'){
  trace_jt = VLTrace_Global_customer_time;
}

if(typeof(VL_fp_cookval) != 'undefined'){
  vl_fp_cval = VL_fp_cookval;
}

if (OBJ_VLTrace_ClassObj_GlobalValues_Base.trace_reqcustom == 1) {
	try {
		var _VLTracePlugin = '<sc' + 'ri' + 'pt '+ 'type="text/ja' + 'va' + 'sc' + 'ri' + 'pt" src="';
		_VLTracePlugin += VLTrace_current_js_path + 'VL_Trace_Custom.js';
		_VLTracePlugin += '"></sc' + 'ri' + 'pt>';
		document.write(_VLTracePlugin);
	 } catch(e){}
}

EscapeUTF8 = function(str)
{

  function eu8(s)
  {
    var c = s.charCodeAt(0);
    return(c<16?"%0"+c.toString(16):c<128?"%"+c.toString(16):c<2048?"%"+(c>>6|192).toString(16)+"%"+(c&63|128).toString(16):"%"+(c>>12|224).toString(16)+"%"+(c>>6&63|128).toString(16)+"%"+(c&63|128).toString(16)).toUpperCase()
  }
  var strEsc = '';
  for(var i = 0; i < str.length; i++){
    var c = str.charAt(i);
    strEsc += c.match(/[^*+.-9A-Z_a-z-]/) ? eu8(c) : c;
  }
  return strEsc;
};




function VLTrace_RequestQue()
{

  this.Que = new Array(CTD_MAX_REQ_QUE);

  this.Cnct = new Array(CTD_MAX_OBJ_CNCT);

  this.TimerID = 0;

  this.TimeOutCounter = Math.floor(CTD_CNCT_TIMEOUT / CTD_TIMER_INTERVAL) + 1;

  this.TimeOutCounterVLIMG = Math.floor(CTD_VLIMG_TIMEOUT / CTD_TIMER_INTERVAL) + 1;


  for(var i = 0; i < CTD_MAX_OBJ_CNCT; i++){
    this.Cnct[i]                = new Object();
    this.Cnct[i].ImgObj         = null;
    this.Cnct[i].ImgObj         = new Image();
    this.Cnct[i].TimeOutCounter = 0;
  }

  for(var i = 0; i < CTD_MAX_REQ_QUE; i++){
    this.Que[i] = null;
  }

  this.setQue = function(url)
  {
    for(var i = 0; i < CTD_MAX_REQ_QUE; i++){
      if(this.Que[i] == null){
        this.Que[i] = url;
        break;
      }
    }
  }

  this.getQue = function()
  {
    var url;

    url = this.Que[0];

    if(url != null){
      this.Que[0] = null;
      for(var i = 1; (i < CTD_MAX_REQ_QUE) && (this.Que[i] != null); i++){
        this.Que[i - 1] = this.Que[i];
        this.Que[i]     = null;
      }
    }

    return(url);
  }
}

var OBJ_VLTrace_RequestQue = new VLTrace_RequestQue();


function VLTrace_Function_LoadImageAndCheckComplete(obj)
{
  var isAllComplete;
  var url;


  if(obj.TimeOutCounterVLIMG > 0){

    if(typeof(vl_img) == 'object'){
      if(typeof(vl_img.complete) == 'boolean'){

        if(vl_img.complete == true){
          obj.TimeOutCounterVLIMG = 0;
        }

      }
    }

    if(obj.TimeOutCounterVLIMG > 0){
      obj.TimeOutCounterVLIMG = obj.TimeOutCounterVLIMG - 1;
      return;
    }

  }


  isAllComplete = true;

  for(var i = 0; i < CTD_MAX_OBJ_CNCT; i++){

    if(obj.Cnct[i].TimeOutCounter == 0){

      url = obj.getQue();

      if(url != null){
        obj.Cnct[i].ImgObj.src     = url;
        obj.Cnct[i].TimeOutCounter = obj.TimeOutCounter;
        isAllComplete = false;
      }

    }else{

      if(obj.Cnct[i].ImgObj.complete){

        obj.Cnct[i].TimeOutCounter = 0;

        url = obj.getQue();

        if(url != null){
          obj.Cnct[i].ImgObj.src     = url;
          obj.Cnct[i].TimeOutCounter = obj.TimeOutCounter;
          isAllComplete = false;
        }

      }else{

        obj.Cnct[i].TimeOutCounter = obj.Cnct[i].TimeOutCounter - 1;
        isAllComplete = false;

      }
    }

  }

  if(isAllComplete){

    if(obj.TimerID > 0){
      clearInterval(obj.TimerID);
      obj.TimerID = 0;
    }

  }

}


function VLTrace_ActionParam()
{
  this.dataID = '';

  this.param = new Array(CTD_PARAM_TOTAL + 1);

  for(var i = 0 ; i <= CTD_PARAM_TOTAL; i++){
    this.param[i] = '';
  }
}


function VLTrace_Action(obj)
{

  var Aparameter = new Array(101);

  var Cparameter = new Array(101);

  var JDCounter = 0;

  var ParamIndex = 0;

  for(var i = 0; i <= 100; i++){
    Aparameter[i] = '';
    Cparameter[i] = 0;
  }

  var ArrayCount =  Array_VLTrace_ClassObj_GlobalValues_Bases_EC.length;

  VLTrace_ActionParam.prototype.Compile = function(){

    var pp = ['CustomerID',
              'CustomerSegmentID',
              'ProductID',
              'SiteSearchWord',
              'PageID',
              'SiteBannerID',
              'ReservID1',
              'ReservID2',
              'ReservID3',
              'OptionID1',
              'OptionID2',
              'OptionID3',
              'OrderID',
              'CustomerAttribute1',
              'CustomerAttribute2',
              'TotalAmount',
              'Pieces',
              'ProductAttribute1',
              'ProductAttribute2',
              'CountOfSearch',
              'ReservValue1',
              'ReservValue2',
              'ReservValue3',
              'OptionValue1',
              'OptionValue2',
              'OptionValue3'];

    var IndexOfProperties = function(propertyName){
      for(var i = 0; i < pp.length; i++){
        if(propertyName.toLowerCase() == pp[i].toLowerCase()){

          return i + 1;
        }
      }
      return -1;
    };

    for(var p in this){

      if(typeof(this[p]) == 'string' || typeof(this[p]) == 'number'){

        var index = IndexOfProperties(p);

        if(index >= 0){

          if(this.param[index] == ''){
            this.param[index] = this[p];
          }
          this[p] = '';
        }
      }

    }

    this.param[5] = Array_VLTrace_ClassObj_GlobalValues_Bases_EC[0].trace_pid;
  };


  function ConvItoA(r, figure)
  {
    var str = '';
    var d;
    var strZero = '';
    var strRet = '';


    do{
      d = r % 62;

      if(d >= 0 && d <= 9){
        str = String.fromCharCode(d + '0'.charCodeAt(0)) + str;
      }else if(d >= 10 && d <= 35){
        str = String.fromCharCode(d - 10 + 'a'.charCodeAt(0)) + str;
      }else{
        str = String.fromCharCode(d - 36 + 'A'.charCodeAt(0)) + str;
      }

      r = Math.floor(r / 62);

    }while(r > 0);



    var i;
    for(i = 0; i < figure; i++){
      strZero = strZero + '0';
    }

    strRet = strZero + str;

    str = strRet.substr(str.length);

    return(str);
  }

  function MakeApram(obj, index)
  {
    var strDataID;
    var strParam;
    var lenParam;
    var buf = '';

    if(typeof(obj) == 'undefined'){
      return;
    }

    if(index > 100){
      return;
    }

    Aparameter[index] = '';
    Cparameter[index] = 0;


    strDataID = EscapeUTF8(obj.dataID) + '________';
    Aparameter[index] = strDataID.substr(0, 8);


    obj.Compile();

    for(var i = 1; i <= CTD_PARAM_TOTAL; i++){

      strParam = EscapeUTF8(obj.param[i].replace("\t", " "));

      if((lenParam = strParam.length) > CTD_PARAM_MAX_LEN){
        strParam = strParam.substr(0, CTD_PARAM_MAX_LEN);
        lenParam = CTD_PARAM_MAX_LEN;
      }

      buf = buf + ConvItoA(lenParam, 2) + strParam;
      if(lenParam > 0){
        Aparameter[index] = Aparameter[index] + buf;
        Cparameter[index] = Cparameter[index] + lenParam;
        buf = '';
      }

    }

    if(buf.length > 0){
      Aparameter[index] = Aparameter[index] + '00';
    }

    obj.dataID = '';
    for(var i = 0; i <= CTD_PARAM_TOTAL; i++){
      obj.param[i] = '';
    }

  }

  function VL_Send(url)
  {

    OBJ_VLTrace_RequestQue.setQue(url);

    if(OBJ_VLTrace_RequestQue.TimerID == 0){
      OBJ_VLTrace_RequestQue.TimerID = setInterval('VLTrace_Function_LoadImageAndCheckComplete(OBJ_VLTrace_RequestQue)', CTD_TIMER_INTERVAL);
    }

  }

  this.setSummary = function(obj)
  {
    if(typeof(obj) == 'undefined'){
      return;
    }

    MakeApram(obj, 0);
  }

  this.addDetail = function(obj)
  {
    if(typeof(obj) == 'undefined'){
      return;
    }

    if(ParamIndex >= 100){
      return;
    }

    ParamIndex = ParamIndex + 1;
    MakeApram(obj, ParamIndex);

  }

  this.sendAction = function()
  {
    var str;
    var url;
    var baseurl;
    var gparam = '/2';
    var tpparam = '1';
    var jdtime = new Date().getTime();
    var jdparam;
    var actionFlg;

    for(var aryIndex = 0; aryIndex < ArrayCount; aryIndex++){

      actionFlg = false;

      baseurl = Array_VLTrace_ClassObj_GlobalValues_Bases_EC[aryIndex].trace_serverurl
              + '?g='
              + gparam
              + '&c='
              + Array_VLTrace_ClassObj_GlobalValues_Bases_EC[aryIndex].trace_cid
              + '&jt=' + trace_jt;

      if(vl_fp_cval != ''){
        baseurl = baseurl + '&fpcval=' + vl_fp_cval;
      }else{
        baseurl = baseurl + '&tp=' + tpparam;
      }

      JDCounter++;
      jdparam = '&jd=' + jdtime + '_' + JDCounter;

      url = baseurl + jdparam;
      for(var i = 0 ; i <= ParamIndex; i++){

        if(Aparameter[i] != ''){

          actionFlg = true;

          str = '&a' + (i + 1) + '=' + Aparameter[i] + '&c' + (i + 1) + '=' + ConvItoA(Cparameter[i], 3);

          if((url.length + str.length) <= CTD_MAX_URL_LENGTH){

            url = url + str;

          }else{

            VL_Send(url);

            JDCounter++;
            jdparam = '&jd=' + jdtime + '_' + JDCounter;

            url = baseurl + jdparam + str;

          }
        }
      }

      if(actionFlg){

        VL_Send(url);
      }
    }

    for(var i = 0; i <= 100; i++){
      Aparameter[i] = '';
      Cparameter[i] = 0;
    }

    ParamIndex = 0;
  }

}

function Punycode() {
  var base = 36;
  var tmin = 1, tmax = 26;
  var skew = 38;
  var damp = 700;
  var initial_bias = 72;
  var initial_n    = 0x80;

  var delimiter = "-";

  var charCode_a = "a".charCodeAt(0);
  var charCode_A = "A".charCodeAt(0);
  var charCode_0 = "0".charCodeAt(0);

  function encode_digit(d) {
    return (d < 26) ? String.fromCharCode(charCode_a + d) : String(d - 26);
  }
  function decode_digit(cp) {
    return (cp - charCode_0 < 10) ? (cp - charCode_0 + 26) :
           (cp - charCode_a < 26) ? (cp - charCode_a) :
           (cp - charCode_A < 26) ? (cp - charCode_A) :
           base;
  }

  function adapt(delta, numpoints, firsttime) {
    delta = parseInt(delta / (firsttime ? damp : 2));
    delta += parseInt(delta / numpoints);

    for (var k = 0; delta > ((base - tmin) * tmax) / 2; k += base) {
      delta = parseInt(delta / (base - tmin));
    }

    return k + parseInt(((base - tmin + 1) * delta) / (delta + skew));
  }

  this.decode = function (input) {
    var n      = initial_n;
    var i      = 0;
    var bias   = initial_bias;
    var output = "";

    var b = input.lastIndexOf(delimiter);
    if (b > 0) output = input.substring(0, b);
    b++;

    while (b < input.length) {
      var oldi = i, w = 1;

      for (var k = base; ; k += base) {
        var digit = decode_digit(input.charCodeAt(b++));
        i += digit * w;
        var t = (k <= bias) ? tmin : (k >= bias + tmax) ? tmax : (k - bias);
        if (digit < t) break;
        w *= (base - t);
      }
      bias = adapt(i - oldi, output.length + 1, oldi == 0);

      n += parseInt(i / (output.length + 1));
      i %= (output.length + 1);

      output = output.substring(0, i) + String.fromCharCode(n) + output.substring(i);

      i++;
    }

    return output;
  }

  this.encode = function (input) {
    var n      = initial_n;
    var delta  = 0;
    var bias   = initial_bias;
    var output = "";

    for (var m = Infinity, j = 0; j < input.length; j++) {
      var code = input.charCodeAt(j);

      if (code < n) {
        output += input[j];

      } else if (code < m) {
        m = input.charCodeAt(j);
      }
    }

    var b = output.length, h = b;
    if (b > 0) output += delimiter;

    while (h < input.length) {
      delta += (m - n) * (h + 1);
      n = m;

      for (m = Infinity, j = 0; j < input.length; j++) {
        code = input.charCodeAt(j);

        if (code < n) {
          delta++;

        } else if (code == n) {
          for (var q = delta, k = base; ; k += base) {
            var t = (k <= bias) ? tmin : (k >= bias + tmax) ? tmax : (k - bias);
            if (q < t) break;
            output += encode_digit(t + (q - t) % (base - t));
            q = parseInt((q - t) / (base - t));
          }
          output += encode_digit(q);

          bias = adapt(delta, h + 1, h == b);
          delta = 0;
          h++;

        } else if (code < m) {
          m = input.charCodeAt(j);
        }
      }
      delta++; n++;
    }

    return output;
  }
}
function VLdomainFormat(url)
{
	var u_url = unescape(url);
	var my_protocol = location.protocol+"//";
	u_url=u_url.substr(my_protocol.length);
	if(u_url.length<=4){
	   return url;
	}
	if(u_url.indexOf("xn--") >=0){
	    var u_domain="";
	    var u_url_split_array = u_url.split("/");
	    if(u_url_split_array.length >0){
		     u_domain = u_url_split_array[0];
	    }else{
		     u_domain = u_url;
	    }

	    var pcode = new Punycode();

	    var u_domain_split_array = u_domain.split(".");
	    for(var j=0;j < u_domain_split_array.length;j++ ){
	         var u_d_str = u_domain_split_array[j];
	         if(u_d_str.substr(0,4) == "xn--"){
	            u_d_str = u_d_str.substr(4);
	            u_domain_split_array[j] =pcode.decode(u_d_str);
	         }
	    }
	    var d_domain="";
	    for(var k=0;k < u_domain_split_array.length;k++ ){
	      d_domain+=u_domain_split_array[k]+".";
	    }
	    d_domain = d_domain.substr(0,d_domain.lastIndexOf("."));
	    var domainFormat_url="";
	    for(var i =0;i <u_url_split_array.length;i++ ){
	       if(i==0){
	    	 domainFormat_url += d_domain;
  	       }else{
  	       	   domainFormat_url +="/"+u_url_split_array[i];
  	       }

	    }
	    return escape(my_protocol+domainFormat_url);
	}else{
		return url;
	}
}

function getJsPath()
{
	var js = '';
	if (document.currentScript) {
		js = document.currentScript.src;
	} else {
		var scripts = document.getElementsByTagName('script');
		script = scripts[scripts.length-1];
		if (script.src) {
			js = script.src;
		}
	}
	return js ? js.match(/(.+\/)[^:\\\*?\"<>\|]+$/)[1] : '';
}

function makeVirtualUrl(url)
{
	if (url.substring(0, 1) != '/') {
		url = '/' + url;
	}
	return escape(url);
}

function VL_SendCategory(pageID, sVirtualUrl, unitID1, unitID2, unitID3)
{

	window.onerror = VLTrace_Function_sError;
	var objGVFL = OBJ_VLTrace_ClassObj_GlobalValues_Flash;
	VLTrace_Function_CopyObjectProperties(objGVFL, OBJ_VLTrace_ClassObj_GlobalValues_Base);

	if ( (typeof pageID == 'undefined')
	||   (typeof sVirtualUrl == 'undefined')
	||   (typeof unitID1 == 'undefined')
	||   (typeof unitID2 == 'undefined')
	||   (typeof unitID3 == 'undefined') ){
		 VLTrace_Function_sError();
		 return;
	}

	objGVFL.trace_l = escape(document.location);
	var tmp_r = escape(document.referrer);
	if (tmp_r != '') {
		objGVFL.trace_r = tmp_r;
	}
	if (objGVFL.trace_notitle == '') {
		objGVFL.trace_t = escape(document.title);
	}
	objGVFL.trace_k = escape(navigator.cookieEnabled);
	objGVFL.trace_f = "true";
	objGVFL.trace_j = escape(navigator.javaEnabled());
	objGVFL.trace_w = escape(screen.width);
	objGVFL.trace_h = escape(screen.height);
	objGVFL.trace_d = escape(screen.colorDepth);
	objGVFL.trace_o = escape(location.protocol);

	if (objGVFL.trace_b == true) {
		objGVFL.trace_a = escape(parent.location);

		if ((objGVFL.trace_l != objGVFL.trace_a) && (typeof objGVFL.trace_a != 'undefined')) {
			objGVFL.trace_r = escape(parent.document.referrer);
		}

		if (typeof objGVFL.trace_a != 'undefined') {
			objGVFL.trace_a = unescape(objGVFL.trace_a);
			var tmp;
			var tmp1;
			var tmp2;

			if (objGVFL.trace_DBpageUrlCaseSensitive == 0) {
			  	tmp =  objGVFL.trace_a.toLowerCase();
			} else {
				tmp =  objGVFL.trace_a;
			}

			tmp1 = tmp.indexOf(objGVFL.trace_DBbanneridparam + '=',0);
			if (tmp1 >= 0) {
				tmp2 = objGVFL.trace_a.indexOf('&',tmp1);
				if (tmp2 < 0) {
					tmp2 = objGVFL.trace_a.length;
				}
				objGVFL.trace_a = objGVFL.trace_a.substring(tmp1,tmp2);
				objGVFL.trace_a = escape(objGVFL.trace_a);
			} else {
				objGVFL.trace_a = '';
			}
		} else {
			objGVFL.trace_a = '';
		}
	}

	objGVFL.trace_pid = escape(pageID);

	if (sVirtualUrl != '') {
		objGVFL.trace_l = location.protocol + '//'+location.host + makeVirtualUrl(sVirtualUrl);
	}

	var i;
	for (i = 0 ; i < 10 ; i++) {
		objGVFL.trace_uid[i] = '';
	}
	if (__chk_uid(unitID1) == 1) {
		objGVFL.trace_uid[0] = unitID1;
	}
	if (__chk_uid(unitID2) == 1) {
		objGVFL.trace_uid[1] = unitID2;
	}
	if (__chk_uid(unitID3) == 1) {
		objGVFL.trace_uid[2] = unitID3;
	}

	if (((objGVFL.trace_tp == '') || (objGVFL.trace_tp < 1)) && (objGVFL.trace_DBrepeaterflag > 0)) {
		var objFP = OBJ_VLTrace_ClassObj_FirstPartyCookie;
		objFP.V5RegisterCookieTable(objGVFL);
		objGVFL.trace_cookval = objFP.V5getCookie(objGVFL, 'ctrid_');

		if ((objGVFL.trace_cookval == '') || (objFP.ckCookie(objGVFL.trace_cookval) == false)) {
			objFP.V5setCookie(objGVFL, 'ctrid_', objGVFL.trace_newid + '_' + objGVFL.trace_t1970);
			objGVFL.trace_cookval = objGVFL.trace_newid + '_';
			objGVFL.trace_isnewses='1';
		} else {
			if (objFP.V5getCookie(objGVFL, 'ctrsession_') == '') {
				objGVFL.trace_cookval = objFP.incCookieCt(objGVFL.trace_cookval);
				objGVFL.trace_isnewses = '1';
			}
			objFP.V5setCookie(objGVFL, 'ctrid_', objFP.getCookieCtId(objGVFL.trace_cookval) + '_' + objGVFL.trace_t1970);
		}

		objGVFL.trace_cookcontpv = '';
		objGVFL.trace_cookconrpt = '';
		objGVFL.trace_cookconfre = '';
		objGVFL.trace_cookconrec = '';
		objGVFL.trace_cookconsta = '';
		objGVFL.trace_cookconmon = '';
		objFP.V5DischargeCookieTable(objGVFL);
	}

	VLTrace_Function_Phase2Collection(objGVFL , 1);
	window.onerror=null;

	function __chk_uid(str)
	{
		if (str == '') {
			return (0);
		}

		var  len = str.length;
		if (len > 32) {
			return (0);
		}

		var  ii;
		var  c;
		var  chk_flg;
		for (ii = 0; ii < len; ii++) {

			c = str.charCodeAt(ii);
			chk_flg = 0;

			if (c >= 0x30 && c <= 0x39) {
				chk_flg = 1;

			} if (c >= 0x41 && c <= 0x5a) {
				chk_flg = 1;
			}

			if (c >= 0x61 && c <= 0x7a) {
				chk_flg = 1;
			}

			if (c == 0x5f) {
				chk_flg = 1;
			}

			if (c == 0x2d) {
				chk_flg = 1;
			}

			if (chk_flg == 0) {
				return (0);
			}
		}
		return (1);
	}
}
// TagCreator generated. [END]
//->
