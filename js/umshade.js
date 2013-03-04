$(document).ready(function() {
  $('.hideable').hide();
// alert("dsda");
  // innerHTML("New text");
// document.write("from outside");
// document.write("from outside");

});
  // document.getElementById('tag-id').innerHTML = '<ol><li>html data</li></ol>';


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
function clearInput(id){
  $(document.getElementById(id)).val('');
}
function sortMultiDimensional(a,b)
{
    // for instance, this will sort the array using the second element    
    return ((a[2] < b[2]) ? -1 : ((a[2] > b[2]) ? 1 : 0));
}
function decrypt(zcyphertext, zpassphrase){
    var tempCt = zcyphertext.substring(prekey.length,zcyphertext.length-postkey.length);
    var tempPph = zpassphrase.substring(prekey.length,zpassphrase.length-postkey.length-2);
       tempPph = tempPph.split(keysep);
       tempCt = tempCt.split(keysep);
        var j = '{'+ 
      "\"iv\"" +':'  +"\"" +tempPph[1] +"\","+
      "\"salt\""  +':'  +"\"" +tempPph[2]    +"\","+
      "\"ct\"" +':'  +"\"" +tempCt[0]     +"\""+
      '}';
      try{
       var r = sjcl.decrypt(tempPph[0], j);
       return r;
      }catch(err){
        
      }
       
}
function checkForPassword(zcyphertext){
    var tempCt = zcyphertext.substring(prekey.length,zcyphertext.length-postkey.length);
   tempCt = tempCt.split(keysep);
   var passFromStorage = getItem(tempCt[1]);
   if(passFromStorage!=null){
        var r = passFromStorage.split('%%%'); 
        return r[0];
   }
}
function showDetected(){
   alert(detectedCyphers);
}
function addToStorage(zpassphrase, zcyphertext, zblurb){ 
      var ts = Math.round((new Date()).getTime() / 1000);
    var sep = '%%%';
    var temp = zpassphrase.substring(prekey.length,zpassphrase.length-postkey.length).split(keysep);
    var temp2 =zpassphrase+sep+zcyphertext+sep+zblurb+sep+ts;
    setItem(temp[3], temp2);
}

function storePassphrase(arg){
    var sep = '%%%';
    var temp = arg.substring(prekey.length,arg.length-postkey.length).split(keysep);
    var temp2 =arg+sep+"dummy"+sep+"dummy"+sep+"dummy";
    setItem(temp[3], temp2);
}

function clearPassphrases(){
   clearStrg()
}

function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}

$('#toggleOptions').click(function() {
  });
  
$(document).keyup(function(event){
    if(event.keyCode!='111'){
      if(optionsHidden==true){
      hideable.show();
      optionsHidden=false;
    }else{
      hideable.hide();
      optionsHidden=true;
    }
 }
});
// $(document.getElementById('cypherOutput')).val(cyphertext);
// document.getElementById("asd").value = '<ol><li>html data</li></ol>';

