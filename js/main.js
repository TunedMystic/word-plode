// Generates a random number
function ran(min, max) {
  return Math.random() * (max - min) + min;
}

// Converts from degrees to radians.
function toRadians(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
function toDegrees(radians) {
  return radians * 180 / Math.PI;
};

/// Takes an element and applies a css transition to it.
/// VAR: "thing" -> css selector
function randomShoot(thing) {
  var angle = toRadians( ran(0, 360) );
  var distance = ran(140, 160);
  var newX = distance * Math.cos(angle);
  var newY = distance * Math.sin(angle);

  /// Merge the value with the existing location
  //var theX = $(thing).offset()["left"] + newX;
  //var theY = $(thing).offset()["top"] + newY;
  var theX = newX;
  var theY = newY;
  /*console.log(
    "angle: " + angle + "\n" +
    "distance: " + distance + "\n" +
    "newX: " + newX + "\n" +
    "newY: " + newY + "\n" +
    "origX: " + $(thing).offset()["left"] + "\n" +
    "origY: " + $(thing).offset()["top"] + "\n" +
    "theX: " + theX + "\n" +
    "theY: " + theY
    );
  return "(" + theX + "px, " + theY + "px)";*/
  var transformValue = "(" + theX + "px, " + theY + "px)";
  //console.log(transformValue);

  /// I had to change "transform" into "-webkit-transform" for it to work!
  /// NOTE: I will have to specify the other vendor prefixes...
  $(thing).css("-webkit-transform", "translate" + transformValue);
  $(thing).css("opacity", "0");
}

/// VAR: "thing" -> css selector
function explode(thing) {
   console.log("Explode start");

   if( $("#renderedText").children().length == 0 ) {
      console.log("NO CHILDREN");
   }
   else {
      console.log("Children YES!!");
   }

   $(thing + " span").each(function(i, el){
     /// Apply a random translation to each span
     //console.log( randomShoot(el) );
     randomShoot(el);
   });
   ///$("#word").trigger("webkitAnimationEnd");
   console.log("Explode done");
}


/// Takes an element and replaces every
/// whitespace with an ' &nbsp; ' element.
/// VAR: "thing" -> css selector
function fillWhitespace(thing) {
   var txt = $(thing).text();
   var txt2 = "";
   var i = 0;
   for(i = 0; i < txt.length; i++) {
      if(txt[i] == " ") {
         txt2 += "&nbsp;";
      }
      else
         txt2 += txt[i];
   }
   return txt2;
}

/// VAR: "thing" -> css selector
function letter(thing) {
   console.log("Lettering start");
   $(thing).html( fillWhitespace($(thing)) );
   $(thing).lettering().children("span").addClass("changableText");
   console.log("Lettering done");
   return;
}

/// Takes the inputbox text and puts in the 'big-font' section
function updateInput() {
   if( $("#explodeInput").val() == "" ) {
      $("#renderedText").text("...This will explode!!");
   }
   else {
      $("#renderedText").text( $("#explodeInput").val() );
   }
}

var tag = "#renderedText";

/// Explodes the 'big-font' text
function explodeText() {
   /// If the input box actually has something...
   if( $("#explodeInput").val() == "" ) {
      console.log("an input must be entered...");
   }
   else {
      /*letter("#renderedText");
      setTimeout(function() {
         explode("#renderedText")
      }, 100);*/
      ///$.when( letter("#renderedText") ).then( explode("#renderedText") );
      /*$( letter("#renderedText") ).promise().done(function() {
         explode("#renderedText");
      });
      $.when( letter("#renderedText") ).done(function() {
         explode("#renderedText")
      });*/

      


      /*letter("#renderedText");

       /// Start rumbling
      $("#renderedTextP").trigger("startRumble");

      /// Wait half a second, then stop it
      setTimeout(function() {
         $("#renderedTextP").trigger("stopRumble")
      }, 500);

      explode("#renderedText");*/

      setTimeout(function() {
         letter("#renderedText");
      }, 40);

      setTimeout(function() {
         console.log("start start");
         $("#renderedTextP").trigger("startRumble");
         console.log("start stop");
      }, 50);

      setTimeout(function() {
         console.log("stop start");
         $("#renderedTextP").trigger("stopRumble");
         console.log("stop stop");
      }, 550);

      setTimeout(function() {
         explode("#renderedText");
      }, 560);

   }
}

var exp = function() {
   explodeText();
}

var xp = function() {
   explode("#renderedText");
}

var lt = function() {
   letter("#renderedText");
}

$("#explodeInput").bind("input", updateInput);

$("#renderedTextP").jrumble({
   x: 2,
   y: 4,
   rotation: 5
});

$("#explodeInput").bind("keydown", function(event){
    if(event.keyCode == 13) {
       console.log("Exploding!!");
       explodeText();
    }
});

/// $("#explodeInput").bind("input", updateInput);

/*var p;
$(document).ready(function() {
  $("#renderedText").lettering().children("span").addClass("changableText");
  p = $("#renderedText span")[0];

  $("#renderedText span:eq(0)").on("webkitTransitionEnd", function() {
    console.log("...The animation has ended");
  });
});*/