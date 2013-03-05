var toCrypt = '';
var data = '';
var dataEn = [];
var dadeDe = [];
var regex = /(?:ct":")(.*)"}/g; 
var password = pid().toString()+pid().toString();
var passphrase = '' // password + salt and iv;
var prekey = '!?' 
var keysep = ':::'
var postkey = '?!' 
var localstoragesep = '$$$'
var once = true;
var cyphertext = '';
var decrypted ='';
var detectedCyphers = [];
var body =""
var bodyRegExp = /(\!\?\S*\?\!)/g; // checks for occurence of cypher-lookalikes
var style=["<font STYLE=\"background-color: #E0FFE2; padding-left:2px; padding-right:2px;\">","</font>"];
var port;

// handle clicks and popup events
document.addEventListener('DOMContentLoaded', function () {
  window.onload = function(){
    // open communication
    chrome.tabs.getSelected(null,function(tab){
      port = chrome.tabs.connect(tab["id"]);

      // the popup is loaded == the button has been clicked so, fetch the websites contents
      browserActionPressEvent();

      //handle listening
      port.onMessage.addListener(function(msg){
        if(msg.type == "body"){
          var detectedCyphers = filterBody(msg.value);
          log(detectedCyphers);
        }
      });
    })
  }
  document.querySelector('button').addEventListener('click', clickHandler);
  main();
});

function filterBody(innerbody){
   var array = bodyRegExp.exec(innerbody);
   return array; 
}

function browserActionPressEvent() {
      port.postMessage({command: "fetch_body"}); 
};

/*function awesomeTask() {
  awesome();
}
function clickHandler(e) {
  setTimeout(awesomeTask, 1000);
}
function main() {
}*/

// HELPERS 
function pid(){
    var S4 = function (){
        return Math.floor(
                Math.random() * 0x10000 /* 65536 */
            ).toString(16);
    };
    return(
            S4()+S4() 
);}

function log(arg){
    port.postMessage({command:"log", log: arg});
}