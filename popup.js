/*
File:popup.html
Author:SolinariWu
Descript:Google Extensions Easy Sample-Show current page URL
Date:2016/7/25
Reference:http://www.cnblogs.com/guogangj/p/3235703.html
          https://developer.chrome.com/extensions
*/


var IS_SCRIPT_STARTED = false;


document.getElementById('startScript').onclick = function () {
    if (!IS_SCRIPT_STARTED) {
        IS_SCRIPT_STARTED = true;
        startScripts();
    }
}

document.getElementById('stopScript').onclick = function () {
    if (IS_SCRIPT_STARTED) {
        IS_SCRIPT_STARTED = false;
    }
}

var targetUrl = 'https://tw.yahoo.com/';
var count = 0;

function startScripts() {
    periodlyUpdate();
}

function periodlyUpdate() {
    setTimeout(function () {
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                if (tab.url === targetUrl) {
                    console.log('---> try to update the url')
                    chrome.tabs.sendRequest(tab.id, {
                        action: "getDom"
                    }, function (response) {
                        console.log(response);
                        console.log('----ready to update to yahoo');
                        chrome.tabs.update(tab.id, {
                            url: 'http://tw.yahoo.com'
                        });
                        // ready to next run
                        if (IS_SCRIPT_STARTED) periodlyUpdate();
                    });
                }
            });
        });
    }, 1000);
}




document.addEventListener('DOMContentLoaded', function () {
    for (var i=0; i< 2; i++) {
        chrome.tabs.create({url: 'https://tw.yahoo.com', active: false});
    }
    // chrome.tabs.getSelected(null, function (tab) {
    //     // Send a request to the content script.
    //     setTimeout(function () {
    //         chrome.tabs.sendRequest(tab.id, {
    //             action: "getDom"
    //         }, function (response) {
    //             console.log(response);
    //         });
    //     }, 3000)
    // });
    // chrome.tabs.query({
    //     'active': true,
    //     'lastFocusedWindow': true
    // }, function (tabs) {
    //     var url = tabs[0].url;
    //     $("#msgLabel").text(url);
    //     chrome.tabs.create({
    //         url: url
    //     }, function (tab) {
    //         chrome.tabs.remove(tab.id);
    //     });
    // });
});