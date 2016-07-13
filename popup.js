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
            chrome.runtime.sendMessage({directive: "popup-click"}, function(response) {});
        }
        else {      //toggle off
            $('#toggle').html('No more distractions!');
            clearInterval(counter);
            $('#setTime').show();
            $('#startTime').show();
            $('#timer').hide();
        }
    });
});

// TODO: 0 sec validation
