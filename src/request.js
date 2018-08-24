/**
 * 封装ajax统一控制
 * @param {Object} rquest
 */
import $ from 'jquery';
window.baseUrl = 'http://127.0.0.1:9999'
window.request = function(rquest){
	return new Promise(function(resolve, reject) {
		$.ajax({
			url:  window.baseUrl+rquest.url,
			type: rquest.type || 'get',
			data: rquest.data || {},
			async: rquest.async == undefined ? true : rquest.async,
			contentType: rquest.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
			success: function(res) {
				resolve(res);
			},
			error: function(res) {
				reject(res);
			}
		});
	});
}
