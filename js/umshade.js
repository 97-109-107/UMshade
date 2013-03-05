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
var style=["<font STYLE=\"background-color: #E0FFE2; padding-left:2px; padding-right:2px;\">","</font>"];
var body =""

function awesome() {
 chrome.tabs.getSelected(null,function(tab){
   var port = chrome.tabs.connect(tab["id"]);
      port.postMessage({command: "get"}); 
      port.postMessage({command: "fetch_encrypted"}); 
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
  test = "val2";
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler);
  main();
});
  // HELPERS 
function pid()
{
    var S4 = function ()
    {
        return Math.floor(
                Math.random() * 0x10000 /* 65536 */
            ).toString(16);
    };
    return (
            S4()+S4() 
        );
}