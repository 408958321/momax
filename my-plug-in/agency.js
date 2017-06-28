var client = function(){
	
	var engine = {

		//呈现引擎
		ie: 0,
		gecko: 0,
		webkit: 0,
		khtml: 0,
		opera: 0,

		//具体版本号
		ver: null
	};

	var browser = {

		//浏览器
		ie: 0,
		firefox: 0,
		safari: 0,
		konq: 0,
		opera: 0,
		chrome: 0,

		//具体的版本
		ver: null
	};

	var system = {
		win: false,
		mac: false,
		x11: false,

		//移动设备
		iphone: false,
		ipod: false,
		ipad: false,
		ios: false,
		android: false,
		nokiaN: false,
		winMobile: false
	};
	//检测呈现引擎、平台和设备
	var ua = navigator.userAgent;

	if (window.opera) {
		engine.ver = browser.ver = window.opera.version();
		engine.opera = browser.opera = parseFloat(engine.ver);
	} else if (/AppleWebKit\/(\S+)/.test(ua)) {
		engine.ver = RegExp["$1"];
		engine.webkit = parseFloat(engine.ver);

		//确定是 Chrome 还是 Safari
		if (/Chrome\/(\S+)/.test(ua)) {
			browser.ver = RegExp["$1"];
			browser.chrome = parseFloat(browser.ver);
		} else if (/Version\/(\S+)/.test(ua)) {
			browser.ver = RegExp["$1"];
			browser.safari = parseFloat(browser.ver);
		} else {
			//近似地确定版本号
			var safariVersion = 1;
			if (engine.webkit < 100) {
				safariVersion = 1;
			}else if (engine.webkit < 312) {
				safariVersion = 1.2;
			}else if (engine.webkit < 412) {
				safariVersion = 2;
			}

			browser.safari = browser.ver = safariVersion;
		}
	} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
		engine.ver = browser.ver = RegExp["$1"];
		engine.khtml = browser.konq = parseFloat(engine.ver);
	} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
		engine.ver = RegExp["$1"];
		engine.gecko = parseFloat(engine.ver);

		//确定是不是FireFox
		if (/Firefox\/(\S+)/.test(ua)) {
			browser.ver = RegExp["$1"];
			browser.firefox = parseFloat(browser.ver);
		}
	} else if (/MSIE ([^;]+)/.test(ua)) {
		engine.ver = browser.ver =RegExp["$1"];
		engine.ie = browser.ie = parseFloat(engine.ver);
	}

	var p = navigator.platform;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.x11 = (p.indexOf("X11") == 0) || (p.indexOf("Linux") == 0);

	system.iphone = ua.indexOf("iPhone") > -1;
	system.ipod  = ua.indexOf("ipod") > -1;
	system.ipad  = ua.indexOf("ipad") > -1;

	//检测ios版本
	if(system.mac && ua.indexOf("Mobole") > -1) {
		if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
			system.ios = parseFloat(RegExp.$1.replace("_", "."));
		} else {
			system.ios = 2; // 不能真正检测出来
		}
	}

	//检测Android 版本
	if(/Android (\d+\.\d+)/.test(ua)) {
		system.android = parseFloat(RegExp.$1);
	}

	system.nokiaN = us.indexOf("NokiaN") > -1;

	//windows mobile
	if (system.win == "CE") {
		system.winMobile = system.win;
	} else if (system.win == "Ph") {
		if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
			system.win = "Phone";
			system.winMobile = parseFloat(RegExp["$1"]);
		}
	}

	return {
		engine: engine,
		browser: browser,
		system: system
	};

}();

console.log(client.engine);
console.log(client.browser);
console.log(client.system);