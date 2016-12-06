/*
File:popup.html
Author:SolinariWu
Descript:Google Extensions Easy Sample-Show current page URL
Date:2016/7/25
Reference:http://www.cnblogs.com/guogangj/p/3235703.html
          https://developer.chrome.com/extensions
*/


var IS_SCRIPT_STARTED = false;


document.getElementById('startScript').onclick = function() {
    if (!IS_SCRIPT_STARTED) {
        IS_SCRIPT_STARTED = true;
        console.log('---> start');
    }
}

document.getElementById('stopScript').onclick = function() {
    if (IS_SCRIPT_STARTED) {
        IS_SCRIPT_STARTED = false;
        console.log('---> stop')
    }
}


document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.getSelected(null, function (tab) {
        // Send a request to the content script.
        setTimeout(function(){
        chrome.tabs.sendRequest(tab.id, {
            action: "getDom"
        }, function (response) {
            console.log(response);
        });
        }, 3000)
    });
    // chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    // var url = tabs[0].url;
    // $("#msgLabel").text(url);
    // chrome.tabs.create({ url: url }, function(tab) {
    //     chrome.tabs.remove(tab.id);
    // });
    // });
});