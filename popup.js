/*
File:popup.html
Author:SolinariWu
Descript:Google Extensions Easy Sample-Show current page URL
Date:2016/7/25
Reference:http://www.cnblogs.com/guogangj/p/3235703.html
          https://developer.chrome.com/extensions
*/
document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    $("#msgLabel").text(url);   
    });
});
