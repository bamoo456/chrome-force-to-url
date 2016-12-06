var IS_SCRIPT_STARTED = false;
var targetUrl = 'https://www.uniair.com.tw/uniweb/b2c/cfresav01.aspx';
var busyUrl = 'http://www.uniair.com.tw/uniweb/openpage/2017_Spring_busy/index.html';
var targetTabsTimer = {};


document.getElementById('startScript').onclick = function () {
    if (!IS_SCRIPT_STARTED) {
        IS_SCRIPT_STARTED = true;
        startScripts();
    }
}

document.getElementById('stopScript').onclick = function () {
    if (IS_SCRIPT_STARTED) {
        IS_SCRIPT_STARTED = false;
        for (var i in targetTabsTimer) {
            clearTimeout(targetTabsTimer[i]);
        }
    }
}

function startScripts() {
    chrome.tabs.query({
        active: false
    }, function (tabs) {
        tabs.forEach(function (tab) {
            if (tab.url === busyUrl) {
                tryConnectTabToUrl(tab.id, targetUrl);
            }
        });
    });
}

function tryConnectTabToUrl(tabId, url) {
    targetTabsTimer[tabId] = setTimeout(function () {
        chrome.tabs.get(tabId, function (tab) {
            if (tab.url === url) return;

            chrome.tabs.update(tabId, {
                url: url
            }, function () {
                tryConnectTabToUrl(tabId, url);
            });
        });
    }, 1000);
}

// Init tabs ready for connecting
document.addEventListener('DOMContentLoaded', function () {
    for (var i = 0; i < 2; i++) {
        chrome.tabs.create({
            url: targetUrl,
            active: false
        });
    }
});
