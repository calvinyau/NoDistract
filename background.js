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
                    toggle = false;
                    sendResponse("END");
                    return;
                }
            }, 1000);

            chrome.tabs.onUpdated.addListener(blockSite);
            sendResponse({});
            return;
        }
        if (request.operation == "currentTime") {
            console.log("Time left requested from bg: ");
            sendResponse({time_left: count});
        }
        else if (request == "END") {
            // TODO: INITIATE END OF POPUP TIMER
            chrome.tabs.onUpdated.removeListener(blockSite);
            toggle = false;
            console.log("END request received in bg");
            clearInterval(counter);
            console.log(toggle);
            sendResponse({reply: "END"});
            return;
        }
    });



    // function(request, sender, sendResponse) {
    //     switch (request.operation) {
    //     case "popup-click":
    //         if (toggle == false) {      // turn ON timer
    //             toggle = true;

    //             // chrome.tabs.executeScript(null, { // defaults to the current tab
    //             //     file: "contentscript.js", // script to inject into page and run in sandbox
    //             //     allFrames: true // This injects script into iframes in the page and doesn't work before 4.0.266.0.
    //             // });
    //             startCount = request.startTime;
    //             counter = setInterval(function() {
    //                 startCount = startCount-1;
    //                 if (startCount <= 0) {
    //                     clearInterval(counter);
    //                     // $('#toggle').html('No more distractions!');
    //                     // $('#setTime').show();
    //                     // $('#startTime').show();
    //                     // $('#timer').hide();
    //                     // return;
    //                 }
    //                 // document.getElementById("timer").innerHTML = startCount + " secs";
    //             }, 1000);


    //             chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
    //                 // changeInfo.url is undefined when status == complete
    //                 if (changeInfo.status == 'loading') {
    //                     console.log("LOADING");
    //                     //chrome.tabs.getCurrent(function(tab){});
    //                     if (tab.url.includes("facebook.com") && changeInfo.url == undefined) {
    //                         chrome.tabs.update({url: "https://google.com"});
    //                         alert("Refresh");
    //                     }
    //                     else if (changeInfo.url.includes("facebook.com")) {
    //                         chrome.tabs.update({url: "https://google.com"});
    //                         console.log(changeInfo.url);
    //                         alert("New Page");
    //                     }
    //                 }
    //             });
    //             sendResponse({});
    //             break;
    //         }
    //         else {                      // turn OFF timer
    //             toggle = false;
    //             sendResponse({});
    //             break;
    //         }

    //     default:
    //         // helps debug when request directive doesn't match
    //         alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
    //     }
    // }
// });


// chrome.tabs.onUpdated.addListener(function tabId, changeInfo, tab) {
//         alert(changeInfo.url) 
// });