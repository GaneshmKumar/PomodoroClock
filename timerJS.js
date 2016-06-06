$(document).ready(function() {
  var timer = 0
  var sec = 59
  var min = 0
  var total = 0
  var temp = 0
  var paused = 0
  var percent = 1
  var completed = 1
  var clicked = 0
var countdownTimer = ""
var inf = ""
$("#progress").attr("style","width:0%");

$("#play").click(function() {
  $("#input").prop('disabled', true);

  time = parseInt($("#input").val())

  if(time > 0 && time < 1000)
    {

      clicked ++;
      if(clicked !== 1 && paused !== 1 && completed !== 1)
        {

          return;
        }
      if(paused !== 1 || completed === 1)
        {

          completed  = 0;
          percent = 0
          sec = 59
      timer = $("#input").val();

      total = timer * 59;
      min = timer - 1;

      $("#progress").attr("aria-valuemin","0");
          $("#progress").attr("style","width:0%");
      $("#progress").attr("aria-valuemax",total);
}


      countdownTimer = setInterval(secondPassed, 1000);
       function secondPassed() {

         if(sec.toString().length < 2)
           sec = "0"+sec;
         if(min.toString().length < 2)
           min = "0"+min;
    document.getElementById('timer').innerHTML = min + " : " + sec;


         sec --;
         temp ++;
         percent  = (temp/total)*100;
         $("#progress").attr("style","width:"+percent+"%");


         if(sec == "0")
           {
             sec = 59;
             if(min != "1")
                min --;
           }
         if(min == "-1")
           {
             document.getElementById('timer').innerHTML = "00 : 00";
             min = 0
             sec = 59
             completed  = 1;
             $("#progress").attr("style","width:"+percent+"%");
             clearInterval(countdownTimer);

           }

}



    }

});// end play

  $("#pause").click(function() {
    $("#input").prop('disabled', true);
    paused = 1
    clearInterval(countdownTimer);
    inf = setTimeout(function() {

    }, Infinity);
  }); //end pause

  $("#reset").click(function() {
    $("#input").val('');
    $("#input").prop('disabled', false);
    min = 0;
    sec = 0
    total = 0
    completed = 1
    clicked = 0
    percent  = 0
    temp = 0
    $("#timer").text("00 : 00");
    $("#progress").attr("style","width:0%");
    clearInterval(countdownTimer);


  }); //end reset
}); // end ready
