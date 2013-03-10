var toCrypt = '';
var data = '';
var dataEn = [];
var dadeDe = [];
var regex = /(?:ct":")(.*)"}/g; 
var password = pid().toString()+pid().toString();
var passphrase = '' // password + salt and iv;
var prekey = '--Message encrypted with Umshade---'
// var keysep = ':::'
var postkey = '---learn why on umshade.it---'
var localstoragesep = '$$$'
var once = true;
var cyphertext = '';
var decrypted ='';
var detectedCyphers = [];
var body =""
// var bodyRegExp = /\!\?\S*\?\!/gm; // checks for occurence of cypher-lookalikes
// var bodyRegExp = /\/prekey/gm; // checks for occurence of cypher-lookalikes
// var bodyRegExp = new RegExp(prekey+'/\S*/'+postkey,'g'); // checks for occurence of cypher-lookalikes
var bodyRegExp = new RegExp(prekey+'.*'+postkey,'g'); // checks for occurence of cypher-lookalikes
var style=["<font STYLE=\"background-color: #E0FFE2; padding-left:2px; padding-right:2px;\">","</font>"];
var port;
var emulatedLocalStorage = ["!?this:::ihave?!"];

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
        // OR INPUT??
        if(msg.type == "textarea"){
          log("grabbed value:"+msg.value+" - and selection:"+msg.selection+" - from: "+msg.id);
          encrypt(msg.value);
        }
      });
    })
  }
  // document.querySelector('#parse').addEventListener('click', clickHandler);
  document.querySelector('#grabInput').addEventListener('click', grabInput);
  document.querySelector('#showLocalStorage').addEventListener('click', showLocalStorage);
  document.querySelector('#showBlurbs').addEventListener('click', showBlurbs);
  // document.querySelector('button').addEventListener('click', clickHandler);
  // main();
});

function showLocalStorage(){
  log(listAllItems());
  // log(showBlurbs);
}

function encrypt(value){
  dataEn = JSON.parse(sjcl.encrypt(password, value));
  cyphertext = prekey + dataEn.ct + postkey;
  // removing the cyphertext prior to serialization so it actually makes sense to share
  delete dataEn.ct;
  // adding the password which is generated from the pid
  dataEn.password = password;
  // this is to stored/exchanged
  stringifiedEncryptionObject = JSON.stringify(dataEn);

  log(dataEn);
  log(cyphertext);

  setItem(dataEn.password, stringifiedEncryptionObject);
  // TODO set the box with the cyphertext, copy to clipboard
  // $(document.getElementById('cypherOutput')).val(cyphertext);
}

function filterBody(innerbody){
   var array = innerbody.match(bodyRegExp);
   return array; 
}

function browserActionPressEvent() {
      port.postMessage({command: "fetch_body"}); 
      // get textarea textbox for encryption
};

// function awesomeTask() {
//   awesome();
// }
function grabInput(e) {
  // setTimeout(awesomeTask, 1000);
  port.postMessage({command: "grabInput"}); 
}
// function main() {
// }

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