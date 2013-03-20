var toCrypt = '';
var data = '';
var dataEn = [];
var dadeDe = [];
var regex = /(?:ct":")(.*)"}/g; 
var password = pid().toString()+pid().toString();
var passphrase = '' // password + salt and iv;
var prekey = '---Message encrypted with Umshade---'
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
var bodyRegExp = new RegExp(prekey+'(.*)'+postkey,'g'); // checks for occurence of cypher-lookalikes
var style=["<font STYLE=\"background-color: #E0FFE2; padding-left:2px; padding-right:2px;\">","</font>"];
var port;

// handle clicks and popup events
document.addEventListener('DOMContentLoaded', function () {
  window.onload = function(){
      //show stored blurbs for sharing - maybe needs reversing?
      var tempBlurbs = getBlurbs().splice(0,6);
      tempBlurbs.forEach(function(p){
          $("#blurbs ul").append("<li><p class='alignleft'>Text on the left.</p><p class='alignright'>Text on the right.</p></li>");
          copy("sss");
      });
    // open communication
    chrome.tabs.getSelected(null,function(tab){
      port = chrome.tabs.connect(tab["id"]);

      // the popup is loaded == the button has been clicked so, fetch the websites contents
      browserActionPressEvent();

      //handle listening
      port.onMessage.addListener(function(msg){
        if(msg.type == "body"){
          detectedCyphers = filterBody(msg.value);
          //decrypt(detectedCyphers);
    }
        // OR INPUT??
        if(msg.type == "textarea"){
          log("grabbed value:"+msg.value+" - and selection:"+msg.selection+" - from: "+msg.id);
          var cypherToCopy = encrypt(msg.value);
         }
      });
    })
  }
  document.querySelector('#grabInput').addEventListener('click', grabInput);
  
  document.querySelector('#showLs').addEventListener('click', showLocalStorage);
  document.querySelector('#wipeLs').addEventListener('click', clearStrg);
  document.querySelector('#showBlurbs').addEventListener('click', showBlurbs);
  document.querySelector('#debug').addEventListener('click', debugAction);
  document.querySelector('#detectCyphers').addEventListener('click', detectCyphers);
});
function decrypt(cyphertextsFromBody){
//TODO merge the loops into one
//trimming the cyphertext indentifiers
for(var x = cyphertextsFromBody.length - 1; x >= 0; x--) {
  cyphertextsFromBody[x]=cyphertextsFromBody[x].substring(prekey.length, cyphertextsFromBody[x].length-postkey.length);
};

//will try decrypting each with from localstorage, already parsed back into objects
storedDecryptionObjects = listAllItems(true);
for (var i = storedDecryptionObjects.length - 1; i >= 0; i--) {
    // test agains all known elements
    for (var c = cyphertextsFromBody.length - 1; c >= 0; c--){
  try{
    // inserting the ct back into the json - it was removed so the plate is actually broken when you pass the 'secret'
    storedDecryptionObjects[i].ct = cyphertextsFromBody[c];
    // turning it back into a json so the sjcl can handle it further
    var tempJsonEncryptionDetails = JSON.stringify(storedDecryptionObjects[i]);

    var decryptionResult = sjcl.decrypt(storedDecryptionObjects[i].password, tempJsonEncryptionDetails);
    log("decryptionResult: "+decryptionResult);
  }catch(e){
    };
  }
};
}

function encrypt(value){
  dataEn = JSON.parse(sjcl.encrypt(password, value));
  cyphertext = prekey + dataEn.ct + postkey;
  // removing the cyphertext prior to serialization so it actually makes sense to share
  delete dataEn.ct;
  // adding the password which is generated from the pid
  dataEn.password = password;
  
  //we create one without the blurb, for sharing 
  stringifiedEncryptionObjectToShare = JSON.stringify(dataEn);

  // this is to stored
  dataEn.blurb = value.substring(0,25);
  stringifiedEncryptionObject = JSON.stringify(dataEn);

  log("object looks like this: "+stringifiedEncryptionObject);
  log("cyphertext is: "+ cyphertext);

  //the password is the arm, is there anything better?
  setItem(dataEn.password, stringifiedEncryptionObject);

  // TODO set the box with the cyphertext, copy to clipboard
  $(document.getElementById('cypherOutput')).val(stringifiedEncryptionObjectToShare);
  // log("and back againt to test: "+ 

  var testBack = sjcl.decrypt(dataEn.password, stringifiedEncryptionObject);
  log("decrypted test: "+testBack);

  //we return it so that we have something do display in the text-copy box
  return stringifiedEncryptionObject
}

function filterBody(innerbody){
   var array = innerbody.match(bodyRegExp);
   return array; 
}

function browserActionPressEvent() {
      // get textarea textbox for encryption
      port.postMessage({command: "fetch_body"}); 
};

function grabInput(e) {
  port.postMessage({command: "grabInput"}); 
 
}

// HELPERS 
function copy(str) {
    var sandbox = $('#sandbox').val(str).select();
    document.execCommand('copy');
    sandbox.val('');
}
function copyTextToClipboard(text) {
    //var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}
function detectCyphers(){
    log(detectedCyphers);
}

function debugAction(){
    log("debug fired");
}

function showBlurbs(){
    //TODO show blurbs, not objects
    log(getBlurbs());
}


function pid(){
    var S4 = function (){
        return Math.floor(
                Math.random() * 0x10000 /* 65536 */
            ).toString(16);
    };
    return(
            S4()+S4() 
);}

function debug(arg){
    port.postMessage({command:"debug", log: arg});
}
function log(arg){
    port.postMessage({command:"log", log: arg});
}
function showLocalStorage(){
  log(listAllItems());
}
