var counter;
var background = chrome.extension.getBackgroundPage();
var hours;
var minutes;
var totalTime;

document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('toggle');
    // Continue timer if already started
    if (background.toggle == true) {
        $('#toggle').html('Take a break!');
        $('#setTime').hide();
        $('#startHours').hide();
        $('#startMinutes').hide();
        $('#hr').hide();
        $('#min').hide();
        $('#timer').show();

        totalTime = background.totalTime;
        hours = Math.floor(totalTime/60);
        minutes = totalTime % 60;
        document.getElementById("timer").innerHTML = hours + " hrs " + minutes + " min remaining";

        counter = setInterval(function() {
            totalTime = totalTime - 1;
            if (totalTime <= 0) {
                clearInterval(counter);
                $('#toggle').html('No more distractions!');
                $('#setTime').show();
                $('#startHours').show();
                $('#startMinutes').show();
                $('#hr').show();
                $('#min').show();
                $('#timer').hide();
                return;
            }
            hours = Math.floor(totalTime/60);
            minutes = totalTime % 60;
            document.getElementById("timer").innerHTML = hours + " hrs " + minutes + " min remaining";
        }, 60000); // 1 minute interval
    }

    // create new timer
    toggle.addEventListener('click', function() {
        if ($('#toggle').text() == 'No more distractions!') {  //toggle on
            $('#toggle').html('Take a break!');
            $('#setTime').hide();
            $('#startHours').hide();
            $('#startMinutes').hide();
            $('#hr').hide();
            $('#min').hide();
            $('#timer').show();

            hours = document.getElementById('startHours').value;
            minutes = document.getElementById('startMinutes').value;
            totalTime = parseInt(hours) * 60 + parseInt(minutes);
            document.getElementById("timer").innerHTML = hours + " hrs " + minutes + " min remaining";

            chrome.runtime.sendMessage({startHours: hours, startMinutes: minutes}, function(response) {
                if (response == "END") {
                    $('#toggle').html('No more distractions!');
                    $('#setTime').show();
                    $('#startHours').show();
                    $('#startMinutes').show();
                    $('#hr').show();
                    $('#min').show();
                    $('#timer').hide();
                    return;
                }
            });

            counter = setInterval(function() {
                totalTime = totalTime - 1;
                if (totalTime <= 0) {
                    clearInterval(counter);
                    $('#toggle').html('No more distractions!');
                    $('#setTime').show();
                    $('#startHours').show();
                    $('#startMinutes').show();
                    $('#hr').show();
                    $('#min').show();
                    $('#timer').hide();
                    return;
                }
                hours = Math.floor(totalTime/60);
                minutes = totalTime % 60;
                document.getElementById("timer").innerHTML = hours + " hrs " + minutes + " min remaining";
            }, 60000);
        }
        else {      //toggle off
            chrome.runtime.sendMessage("END",
                function(response) {
                    if (response.reply == "END") {
                        clearInterval(counter);
                        $('#toggle').html('No more distractions!');
                        $('#setTime').show();
                        $('#startHours').show();
                        $('#startMinutes').show();
                        $('#hr').show();
                        $('#min').show();
                        $('#timer').hide();
                        return;
                    }
                });
        }
    });
});

