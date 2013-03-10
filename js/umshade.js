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
          decrypt(detectedCyphers);
        }
        // OR INPUT??
        if(msg.type == "textarea"){
          log("grabbed value:"+msg.value+" - and selection:"+msg.selection+" - from: "+msg.id);
          encrypt(msg.value);
         }
      });
    })
  }
  document.querySelector('#grabInput').addEventListener('click', grabInput);
  document.querySelector('#showLocalStorage').addEventListener('click', showLocalStorage);
  document.querySelector('#clearStrg').addEventListener('click', clearStrg);
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

  // this is to stored/exchanged
  stringifiedEncryptionObject = JSON.stringify(dataEn);
  //TODO how to store blurbs of messages in localstorage for identifying what we want to share?
  //minimizng manipulations on the strigified object.

  log("object looks like this: "+stringifiedEncryptionObject);
  log("cyphertext is: "+ cyphertext);

  //the password is the arm, is there anything better?
  setItem(dataEn.password, stringifiedEncryptionObject);

  // TODO set the box with the cyphertext, copy to clipboard
  // $(document.getElementById('cypherOutput')).val(cyphertext);
  // log("and back againt to test: "+ 

 var testBack = sjcl.decrypt(dataEn.password, stringifiedEncryptionObject);
 log("decrypted test: "+testBack);
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