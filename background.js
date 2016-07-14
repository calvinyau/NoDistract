var toggle = false;
var count;
var counter;
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
                // chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
                //     console.log("FIRST");
                //     if (changeInfo.status == 'loading') {
                //         console.log("LOADING");
                //         chrome.tabs.getCurrent(function(tab){});
                //         if (tab.url.includes("facebook.com") && changeInfo.url == undefined) {
                //             console.log("HEllO");
                //             alert("yo");
                //         }
                //         else if (changeInfo.url.includes("facebook.com")) {
                //             // chrome.extension.sendRequest({redirect: "https://www.google.com"});
                //             // this.close();
                //             window.location.url = "https://www.google.com";
                //             console.log("DSADASD");
                //             alert("wtf");
                //         }
                //     }
                // });
                chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
                    console.log("FIRST");
                    // changeInfo.url is undefined when status == complete
                    if (changeInfo.status == 'loading') {
                        console.log("LOADING");
                        //chrome.tabs.getCurrent(function(tab){});
                        if (tab.url.includes("facebook.com") && changeInfo.url == undefined) {
                            chrome.tabs.update({url: "https://google.com"});
                            alert("Refresh");
                        }
                        else if (changeInfo.url.includes("facebook.com")) {
                            chrome.tabs.update({url: "https://google.com"});
                            console.log(changeInfo.url);
                            alert("New Page");
                        }
                    }
                });
                sendResponse({});
                break;
            }
            else {
                toggle = false;
                sendResponse({});
                break;
            }

        case "time":
            

        default:
            // helps debug when request directive doesn't match
            alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
);


// chrome.tabs.onUpdated.addListener(function tabId, changeInfo, tab) {
//         alert(changeInfo.url) 
// });