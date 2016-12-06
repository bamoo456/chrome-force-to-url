



chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    if (request.action == "getDom")
        sendResponse({
            dom: "The dom that you want to get"
        });
    else
        sendResponse({}); // Send nothing..
});
