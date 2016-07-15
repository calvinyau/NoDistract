var count;
var counter;

document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('toggle');
    toggle.addEventListener('click', function() {
        if ($('#toggle').text() == 'No more distractions!') {  //toggle on
            $('#toggle').html('Take a break!');
            $('#setTime').hide();
            $('#startTime').hide();
            $('#timer').show();
            count = document.getElementById('startTime').value;
            document.getElementById("timer").innerHTML = count + " secs";

            chrome.runtime.sendMessage({operation: "popup-click", startTime: count}, function(response) {});

            // BE TOLD WHEN TIME RUNS OUT



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
            chrome.runtime.sendMessage({operation: "popup-click"}, function(response) {});






        }
        else {      //toggle off
            $('#toggle').html('No more distractions!');
            clearInterval(counter);
            $('#setTime').show();
            $('#startTime').show();
            $('#timer').hide();
            chrome.runtime.sendMessage({operation: "popup-click", startTime: 0}, function(response) {});
        }
    });
});

// TODO: 0 sec validation
