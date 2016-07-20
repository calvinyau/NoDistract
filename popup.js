var count;
var counter;
var background = chrome.extension.getBackgroundPage();
var days;
var hours;
var minutes;

document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('toggle');
    if (background.toggle == true) {
        $('#toggle').html('Take a break!');
        $('#setTime').hide();
        $('#startTime').hide();
        $('#timer').show();
        count = background.count;
        // TODO: FIX INITIAL SET
        if (count > 60) {
            hours = Math.floor(count/60);
            minutes = count % 60;
            document.getElementById("timer").text(hours + " hours" + " minutes");
        }
        // TODO: FIX INITIAL SET
        counter = setInterval(function() {
            count = count-1;
            if (count <= 0) {
                clearInterval(counter);
                $('#toggle').html('No more distractions!');
                $('#setTime').show();
                $('#startTime').show();
                $('#timer').hide();
                return;
            }

            // TODO: FIX COUNTDOWN
            document.getElementById("timer").innerHTML = count + " secs";
        }, 60000); // 1 minute interval
    }

    toggle.addEventListener('click', function() {
        if ($('#toggle').text() == 'No more distractions!') {  //toggle on
            $('#toggle').html('Take a break!');
            $('#setTime').hide();
            $('#startTime').hide();
            $('#timer').show();
            count = document.getElementById('startTime').value;
            document.getElementById("timer").innerHTML = count + " secs";
            chrome.runtime.sendMessage({operation: "startTime", startTime: count}, function(response) {
                if (response == "END") {
                    $('#toggle').html('No more distractions!');
                    $('#setTime').show();
                    $('#startTime').show();
                    $('#timer').hide();
                    return;
                }
            });
            counter = setInterval(function() {
                count = count-1;
                if (count <= 0) {
                    clearInterval(counter);
                    $('#toggle').html('No more distractions!');
                    $('#setTime').show();
                    $('#startTime').show();
                    $('#timer').hide();
                    return;
                }
                document.getElementById("timer").innerHTML = count + " secs";
            }, 1000);
        }
        else {      //toggle off
            chrome.runtime.sendMessage("END",
                function(response) {
                    if (response.reply == "END") {
                        console.log("received end confirmation in pop")
                        $('#toggle').html('No more distractions!');
                        $('#setTime').show();
                        $('#startTime').show();
                        $('#timer').hide();
                        return;
                    }
                });
        }
    });
});

// chrome.browserAction.onClicked.addListener(function(tab) {
//     // var toggle = document.getElementById('toggle');
//     // if ($('#toggle').text() == 'No more distractions!') {
//     if (background.toggle == true) {
//         chrome.runtime.sendMessage({operation: "currentTime"}, function(response) {
//             if (response.time_left) {
//                 count = response.time_left;
//                 document.getElementById("timer").innerHTML = count + " secs";
//                 counter = setInterval(function() {
//                     count = count-1;
//                     if (count <= 0) {
//                         clearInterval(counter);
//                     }
//                     document.getElementById("timer").innerHTML = count + " secs";
//                 }, 1000);
//             }
//         });
//     }
// });

