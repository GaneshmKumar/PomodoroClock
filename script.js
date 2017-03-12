/*
* @Author: GaNeShKuMaRm
* @Date:   2017-03-12 11:32:23
* @Last Modified by:   GaNeShKuMaRm
* @Last Modified time: 2017-03-12 13:33:21
*/

'use strict';

var paused = false;
var breakTime = 0, sessionTime = 0;

var minimum = 0;
var maximum = 100;

$(document).ready(function() {
    $("#session .fa-minus-circle, #break .fa-minus-circle").on("click", function() {
        var currVal = Number($(this).parent().text());
        setVal(currVal - 1, $(this));
    });
    $("#session .fa-plus-circle, #break .fa-plus-circle").on("click", function() {
        var currVal = Number($(this).parent().text());
        setVal(currVal + 1, $(this));
    });

    //started
    $("#clock").on("click", function() {
        /*if(paused == false)
        {
            paused = true;
        }
        else
        {
            paused = false;
        }*/
        breakTime = Number($("#break .time").text());
        sessionTime = Number($("#session .time").text());
        runTimer();
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
    if(val / 10 == 0)
    {
        val = '0' + val.toString();
    }
    return val;
}

function setGradient(minimum, maximum)
{
    var gradient = '-webkit-linear-gradient(top, #212121 ' + maximum + '%, #2196F3 ' + minimum + '%)'
    $("#completed").css('background', gradient);
}

function setTimer(min, sec)
{
    minimum ++;
    maximum --;
    var minStr = getStringValue(min);
    var secStr = getStringValue(sec);
    setGradient(minimum ,maximum);
    $("#timer").text(minStr + " : " + secStr);
}

function runTimer() {
    var min = sessionTime - 1;
    var sec = 59;
    setTimer(min, sec);
    while(min != -1)
    {
        setInterval(function() {
            if(sec == 0)
            {
                sec = 59;
                min --;
            }
            else
            {
                sec --;
            }
            console.log(sec);
        }, 1000)
    }
}