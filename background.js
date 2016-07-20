var toggle = false;
var counter;
var hours;
var minutes;
var totalTime;

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
        if ((request.startHours > 0) || (request.startMinutes > 0)) {
            toggle = true;
            hours = request.startHours;
            minutes = request.startMinutes;
            totalTime = parseInt(hours) * 60 + parseInt(minutes);
            counter = setInterval(function() {
                totalTime = totalTime-1;
                if (totalTime <= 0) {   // timer has run out
                    clearInterval(counter);
                    chrome.tabs.onUpdated.removeListener(blockSite);
                    toggle = false;
                    sendResponse("END");
                    return;
                }
            }, 1000);

            chrome.tabs.onUpdated.addListener(blockSite);
            sendResponse({});
            return;
        }
        else if (request == "END") {
            chrome.tabs.onUpdated.removeListener(blockSite);
            toggle = false;
            clearInterval(counter);
            sendResponse({reply: "END"});
            return;
        }
    });