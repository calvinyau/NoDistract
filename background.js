var toggle = false;
var startCount;
var count;
var counter;

function blockSite(tabid, changeInfo, tab) {
    // changeInfo.url is undefined when status == complete
    if (changeInfo.status == 'loading') {
        console.log("LOADING");
        if (tab.url.includes("facebook.com") && changeInfo.url === undefined) {
            chrome.tabs.update({url: "https://google.com"});
            alert("Refresh");
        }
        else if (changeInfo.url.includes("facebook.com")) {
            chrome.tabs.update({url: "https://google.com"});
            console.log(changeInfo.url);
            alert("New Page");
        }
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.startTime) {
            toggle = true;
            console.log("Start time received in bg: " + request.startTime);
            count = request.startTime;
            counter = setInterval(function() {
                count = count-1;
                if (count <= 0) {   // timer has run out
                    clearInterval(counter);
                    chrome.tabs.onUpdated.removeListener(blockSite);
                    toggle = false;
                    sendResponse("END");
                    return;
                }
            }, 60000);

            chrome.tabs.onUpdated.addListener(blockSite);
            sendResponse({});
            return;
        }
        else if (request == "END") {
            chrome.tabs.onUpdated.removeListener(blockSite);
            toggle = false;
            console.log("END request received in bg");
            clearInterval(counter);
            sendResponse({reply: "END"});
            return;
        }
    });