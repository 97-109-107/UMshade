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
var style=["<font STYLE=\"background-color: #E0FFE2; padding-left:2px; padding-right:2px;\">","</font>"];

// handle clicks and popup events
document.addEventListener('DOMContentLoaded', function () {
  // once the popup is loaded, fetch the websites contents
  window.onload = function () {
    browserActionPressEvent();
    // port.postMessage({command: "log",log:"test"}); 
    chrome.tabs.connect(tab["id"]).postMessage({command: "log",log:"test"}); 
  }
  document.querySelector('button').addEventListener('click', clickHandler);
  main();
});

function browserActionPressEvent() {
var port = chrome.tabs.connect({name: "knockknock"});
 chrome.tabs.getSelected(null,function(tab){
   var port = chrome.tabs.connect(tab["id"]);
      // port.postMessage({command: "get"}); 
      port.postMessage({command: "fetch_body"}); 
      port.onMessage.addListener(function(msg){
                if(msg.type == "body"){
                  body = msg.value;
                  var myRe = /(\!\?\S*\?\!)/g;
                  var myArray = myRe.exec(body);
                  port.postMessage({command: "log",log:body}); 
                  port.postMessage({command: "log",log:myArray}); 
               }else{
                // alert(prekey);
               }

            }
        )
    })}

function awesomeTask() {
  awesome();
}

function clickHandler(e) {
  setTimeout(awesomeTask, 1000);
}

function main() {
}





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