/*
* @Author: GaNeShKuMaRm
* @Date:   2017-03-12 11:32:23
* @Last Modified by:   GaNeShKuMaRm
* @Last Modified time: 2017-03-12 17:01:19
*/

'use strict';

var paused = true;
var breakTime = 0, sessionTime = 0;

var total = 0;
var current = 0;
var percent = 0;

var interval;

var min, sec;

var inf;

var init = 0, count = 0;

var gradientColor = "#2196F3";
$(document).ready(function() {
    $("#session .fa-minus-circle, #break .fa-minus-circle").on("click", function() {
        if(paused == true)
        {
            stopTimer();
            setGradient();
            var currVal = Number($(this).parent().text());
            setVal(currVal - 1, $(this));
            percent = 0;
            count = 0;
            init = 0;
            stopTimer();
            setGradient();
        }
    });

    $("#session .fa-plus-circle, #break .fa-plus-circle").on("click", function() {
        if(paused == true)
        {
            stopTimer();
            setGradient();
            var currVal = Number($(this).parent().text());
            setVal(currVal + 1, $(this));
            percent = 0;
            count = 0;
            init = 0;
        }
    });

    //started
    $("#clock").on("click", function() {
        if(paused == false && init != 0)
        {
            paused = true;
            clearInterval(interval);
        }
        else if(paused == true && init != 0)
        {
            paused = false;
            startTimer();
        }
        if(init == 0)
        {
            paused = false;
            breakTime = Number($("#break .time").text());
            sessionTime = Number($("#session .time").text());
            init ++;
            $(".fa").prop('disabled', true);
            runTimer(sessionTime);
            //runTimer(breakTime);
        }

    });
}); //ready

function setVal(newVal, thisObj) {
    if(newVal > 0 && newVal < 100)
    {
        thisObj.parent().children(".time").text(newVal);
        if(thisObj.parent().attr("id") == "session")
        {
            setGradient(0, 100);
            $("#timer").text(newVal);
        }
    }
}

function getStringValue(val) {
    if(val.length == 1)
    {
        var x = "0".concat(val);
        return x;
    }
    return val;
}

function setGradient()
{
    var gradient = '-webkit-linear-gradient(top, #212121 ' + (100 - percent) + '%, ' + gradientColor + ' ' + percent + '%)'
    $("#completed").css('background', gradient);
}

function setTimer(min, sec, current)
{
    percent  = (current / total) * 100;
    var minStr = getStringValue(min.toString());
    var secStr = getStringValue(sec.toString());
    setGradient();
    $("#timer").text(minStr + " : " + secStr);
}

function runTimer(time) {
    if(count == 2)
    {
        stopTimer();
        setBreakSpec("#2196f3", "Session");
        count = 0;
        paused = true;
    }
    else
    {
        count ++;
        min = time - 1;
        sec = 59;
        total = (min + 1) * 59;
        startTimer(min, sec);
    }
}

function startTimer() {
        interval = setInterval(function() {
        current ++;
        setTimer(min, sec, current);
        if(min == -1)
        {
            stopTimer();
            setBreakSpec("#ff4436", "Break!");
            runTimer(breakTime);
        }
        if(sec == 0)
        {
            sec = 59;
            min --;
        }
        else
        {
            sec --;
        }
    }, 1000);
}

function stopTimer() {
    $("#timer").text(sessionTime);
    init = 0;
    percent = 0;
    paused = true;
    current = 0;
    setGradient();
    clearInterval(interval);
    return false;
}

function setBreakSpec(color, text) {
    $("#clock").css("border-color", color);
    $("#completed p").text(text);
    gradientColor = color;
}
