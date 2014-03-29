
/// ** -------- Variables -------- **

/// Random tagline phrases
var taglinePhrases = [
   "Wordiness is Explodiness!",
   "Do not try this at home!",
   "It's like Expelliarmus, for words!",
   "Take a break, and explode some words!",
   "99% more effective than the other leading brand!",
   "But wait, there's more!",
   "Expect the unexpected!",
];

var shareUrls = {
    "facebook"  : "https://www.facebook.com/sharer/sharer.php?u=", 
    "twitter"   : /*"http://twitter.com/home?status="*/
                  "http://twitter.com/share?text=" + encodeURIComponent("Exploding words are awesome #wordplode") + "&url=http://wordplode.smallcode.me"
}

var thisWebsite = encodeURIComponent(document.location);

var emptyText = {"color": "#BCB465", "text-shadow": "none"};
var occupiedText = {"color": "#222", "text-shadow": "3px 2px 1px rgba(100, 95, 95, 0.82)"};

/// --------------------------------

/// ** -------- Functions -------- **

// Generates a random number
function ran(min, max) {
  return Math.floor( Math.random() * (max - min) + min );
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

  var theX = newX;
  var theY = newY;
  var transformValue = "(" + theX + "px, " + theY + "px)";

  /// Apply the CSS transition property.
  /// Cross-browser goodness!
  $(thing).css({
    "-webkit-transform": "translate" + transformValue,
    "-moz-transform"   : "translate" + transformValue,
    "-o-transform"     : "translate" + transformValue,
    "transform"        : "translate" + transformValue
  });
  $(thing).css("opacity", "0");
}

/// Applies a random CSS translate on each span of a 'lettered' text.
/// VAR: "thing" -> css selector
function explode(thing) {
   console.log("Explode start");

   $(thing + " span").each(function(i, el){
     /// Apply a random translation to each span
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

/// Break some text into individual characters.
/// VAR: "thing" -> css selector
function letter(thing) {
   console.log("Lettering start");
   $(thing).html( fillWhitespace($(thing)) );
   $(thing).lettering().children("span").addClass("changableText");
   console.log("Lettering done");
   return;
}

/// Makes "Cool Text" (When you hover over it, it rotates...).
/// VAR: "thing" -> css selector
function coolText(thing) {
  $(thing).html( fillWhitespace(thing) );
  $(thing).lettering().children("span").addClass("coolText");
}

/// Makes "Up Text" (When you hover over it, it goes up...).
/// VAR: "thing" -> css selector
function upText(thing) {
  $(thing).html( fillWhitespace(thing) );
  $(thing).lettering().children("span").addClass("upText");
}

/// Takes the inputbox text and puts in the 'big-font' section
function updateInput() {
   if( $("#explodeInput").val() == "" ) {
      $("#renderedText").text("...This will explode!!");
      $("#renderedText").css(emptyText);
   }
   else {
      $("#renderedText").text( $("#explodeInput").val() );
      $("#renderedText").css(occupiedText);
   }
}

/// Explodes the 'big-font' text
function explodeText() {
   /// If the input box actually has something...
   if( $("#explodeInput").val() == "" ) {
      console.log("an input must be entered...");
   }
   else {

      /// Break the text into individual characters
      setTimeout(function() {
         letter("#renderedText");
         lettersEndEvent();
      }, 40);


      /// Begin Rumbling the text
      setTimeout(function() {
         console.log("start start");
         $("#renderedTextP").trigger("startRumble");
         console.log("start stop");
      }, 50);

      /// Stop Rumbling the text
      setTimeout(function() {
         console.log("stop start");
         $("#renderedTextP").trigger("stopRumble");
         console.log("stop stop");
      }, 550);

      /// Explode the text randomly
      setTimeout(function() {
         explode("#renderedText");
      }, 560);

   }
}

/// Take action when the animation ends.
function lettersEndEvent() {
  $("#renderedText span:eq(0)").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
    console.log("...The animation has ended");
    $("#explodeInput").val("");
    updateInput();
  });
}

/// Display a random tagline every 'x' seconds.
/// 'x' = 7 seconds
function randomTagline() {
  setInterval(function() {
    $("#page-tagline p").fadeOut("slow", function() {
      $("#page-tagline p").text( taglinePhrases[ran(0, taglinePhrases.length)] );
      $("#page-tagline p").fadeIn("slow");
    });
  }, 7000);
}

/// --------------------------------

/// ** -------- Actions -------- **

/// Bindings and Listeners
$(document).ready(function() {
  /// Each time the input changes, run the 'updateInput' function
  $("#explodeInput").bind("input", updateInput);

  /// When the explode is clicked, run the 'explodeText' function
  $("#explodeButton").bind("click", explodeText);

  /// When the [Enter] key is pressed, run the 'explodeText' function
  $("#explodeInput").bind("keydown", function(event){
      if(event.keyCode == 13) {
         console.log("Exploding!!");
         explodeText();
      }
  });

});

/// Actions
$(document).ready(function() {

  /// Set the initial text of the "#renderedText"
  updateInput();

  /// Set a random tagline
  $("#page-tagline p").text( taglinePhrases[ran(0, taglinePhrases.length)] );
  randomTagline();

  /// Set-up 'CoolText'
  /// .. Header
  coolText("#page-head h1");
  /// .. Header nav
  $("#page-nav ul li a").each(function(){
     coolText( $(this) );
  });
  /// .. My name
  upText("#creator p a");
  /// .. "Share This"
  upText("#footShareText");
  /// .. The Explode Button
  upText("#explodeButton");

  /// .. Information Text
  coolText("#instr-info1 h1");
  coolText("#instr-info2 p.instrQuestion");

  /// .. About Page title
  coolText(".page-about h2");

  /// .. About Page links
  $(".page-about ul li a").each(function() {
     upText( $(this) );
  });

  /// .. About Page creator name
  upText(".page-about p a");

  /// Set-up the '#renderedText' to rumble
  $("#renderedTextP").jrumble({
     x: 2,
     y: 4,
     rotation: 5
  });

  /// Set up Social Sharing buttons
  $(".webicon.twitter").attr("href", shareUrls["twitter"] );
  $(".webicon.facebook").attr("href", shareUrls["facebook"] + thisWebsite );

  /// Default action for all HTML elements with the class "popup"
  $(".popup").click(function(e) {
     e.preventDefault();
     e.stopPropagation();
     popupCenter( $(this).attr("href"), $(this).attr("buttonInfo") );
  });

});

