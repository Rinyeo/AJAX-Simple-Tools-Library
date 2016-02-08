/* 
 * @name   Ajax Simple Tools Library
 * @author Riny
*/

;
window.Ajax = function () {

	// 定义一个空 function, 给下面的 success 和 failure 使用
	function fn() {}

	// 主要方法
	function request(url, opt) {

		// option 选项的值
		// methed: 请求方式, 默认为get
		// data: 数据发送额外数据, 默认为空
		// asyn: 是否以异步方式发送请求, 默认为true
		// timeout: 设置请求超时时间, 单位为毫秒, 默认为0, 不超时
		// success: 请求成功后调用该方法, 默认为空function
		// failure: 请求失败后调用该方法, 默认为空function
		var methed  = opt.methed.toUpperCase() || 'GET',
			data    = opt.data                 || null,
			asyn    = opt.asyn                 || true,
			timeout = opt.timeout   		   || 0,
			success = opt.success 			   || fn,
			failure = opt.failure			   || fn;

		// time      : 为时间戳，防止get方式数据缓存
		// isTimeout : 为ajax超时标记
		// timer     : 为定时器
		var time      = new Date().getTime(),
	 	    isTimeout = false,
		    timer     = null;

		// 处理 data 为对象转换成 string
		if(typeof data == 'object') {
			var str = '';
			for(var key in data) {
				str += key + '=' + data[key] +'&';
			}
			data = str.slice(0,str.length-1);
		}

		// 判断是否为GET方法 为url添加data数据
		if (methed == 'GET') {
			if (data) {
				url += (data.indexOf('?') == -1 ? '?' : '&') + data;
				url += '&t=' + time;
				data = null;
			}
			else {
				url += 't=' + time;
			}
		};

		// 创建对象
		var xhr  = function () {

			// IE7+、Firefox、Chrome、Safari 以及 Opera
			try {
				return new XMLHttpRequest();
			}

			// 处理异常
			catch(e) {

				// IE5 和 IE 使用 ActiveX 对象
				try {
					return new ActiveXObject('Microsoft.XMLHTTP');
				} 

				// 处理异常
				catch(e) {
					failure(null,'create xhr failed',e);
				}
			}
		}();

		// 判断是否超时
		if (timeout > 0) {
			timer = setTimeout(function () {
				 isTimeout = true;
				 xhr.abort();
			}, timeout);
		}

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && !isTimeout) {

				// 调用 _onreadystatechange 方法
				_onreadystatechange(xhr, success, failure);

				// 清除定时器
				clearTimeout(timer);
			};
			
		}

		

		xhr.open(methed, url, asyn);

		// 判断是否为 POST 方法
		if (methed == 'POST') {

			// 添加请求头部
			xhr.setRequestHeader('Content-length', data.length);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;');
		}

		xhr.send(data);

		return xhr;
	}

	// 外部定义 _onreadystatechange 方法
	function _onreadystatechange (xhr, success, failure) {

		if (xhr.status >= 200 && xhr.status < 300) {
			success(xhr);
		}
		else {
			failure(xhr);
		}
	}

	// 返回一个对象, 对象中 request 属性为 request 方法
	return {request: request};
}();