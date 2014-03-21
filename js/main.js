// 63650395
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

/// Takes an element and applies a css transition to it
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
  $(thing).css("transform", "translate" + transformValue);
}

function explode(thing) {
   $(thing + " span").each(function(i, el){
     /// Apply a random translation to each span
     //console.log( randomShoot(el) );
     randomShoot(el);
   });
   ///$("#word").trigger("webkitAnimationEnd");
}

var c;
function explodeForever() {
  c = setInterval(function(){
    explode("#word");
  }, 1500);
}
function stopExplode() {
  clearInterval(c);
}

/// Takes an element and replaces every
/// whitespace with an ' &nbsp; ' element.
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

var p;
$(document).ready(function() {
  $("#renderedText").lettering().children("span").addClass("changableText");
  p = $("#renderedText span")[0];

  $("#renderedText span:eq(0)").on("webkitTransitionEnd", function() {
    console.log("...The animation has ended");
  });
});