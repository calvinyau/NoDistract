var toggle = false;
chrome.tabs.executeScript(null, { file: "assets/jquery-3.0.0.min.js", allFrames: true});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.directive) {
        case "popup-click":
            if (toggle == false) {
                toggle = true;

                // chrome.tabs.executeScript(null, { // defaults to the current tab
                //     file: "contentscript.js", // script to inject into page and run in sandbox
                //     allFrames: true // This injects script into iframes in the page and doesn't work before 4.0.266.0.
                // });
                // sendResponse({}); // sending back empty response to sender
                // break;
                chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
                    if (changeInfo.status == 'loading') {
                        if (changeInfo.url.includes("facebook.com")) {
                            // chrome.extension.sendRequest({redirect: "https://www.google.com"});
                            // window.location.replace("http://stackoverflow.com");
                            // window.location = "http://google.com";
                            // window.location.href = "http://google.com";
                            // chrome.tabs.update(null, {url:"http://google.com"});
                            alert("wtf");
                            sendResponse({}); // sending back empty response to sender
                            break;
                        }
                        else if (tab.url.includes("facebook.com")) {
                            alert("same");
                        }
                    }
                });
            }
            else {
                toggle = false;
                sendResponse({});
                break;
            }

        default:
            // helps debug when request directive doesn't match
            alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
);


// chrome.tabs.onUpdated.addListener(function tabId, changeInfo, tab) {
//         alert(changeInfo.url) 
// });