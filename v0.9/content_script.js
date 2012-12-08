chrome.extension.onConnect.addListener(function(port) {
	var text = document.body.textContent || document.body.innerText;
	//var numbers = text.match(/!\?.*\?!/g);
	var numbers = text.match(/[!?]{2}[^!?]+[!?]{2}/g); //improved reg
	port.onMessage.addListener(function(msg) {
  		port.postMessage({
  				type:"regexresult",
	  			value:numbers});
	})
});

function iconin() {
	chrome.extension.sendMessage({icon:"A"},function(response){});
}
function iconout() {
	chrome.extension.sendMessage({icon:"B"},function(response){});
}

var el = document.getElementsByTagName('textarea' || "input");
for (var i = 0; i < el.length; i++) { 
	el[i].addEventListener("blur", iconout, false);
	el[i].addEventListener("focus", iconin, false);
}
	 
chrome.extension.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		  if(msg["command"] == "get"){
				console.log("got a call to get selection/box. Type is "+document.activeElement.type);
	  	  		port.postMessage({
	  	  			type: document.activeElement.type, 
	  	  			id:document.activeElement.id.toString(),
	  	  			value:document.activeElement.value,
	  	  			selection: window.getSelection().toString()});
	  	}
		  if(msg["command"] == "replace"){
			  console.log("got a call to replace with "+msg.cypher+" at "+msg.id +" or "+msg.lookfor+ ' key is: '+msg.passphrase);
			  $('#'+msg.id).focus();
			  $('#'+msg.id).val('');
			  $('#'+msg.id).sendkeys(msg.cypher);
			  $('#'+msg.id).sendkeys('{enter}');
			  $('#'+msg.id).focus();
			  $('#'+msg.id).trigger('keypress');
			  //document.getElementById(msg.id).value=msg.cypher;
			  //document.body.innerHTML = document.body.innerHTML.replace(msg.lookfor,"msg.cypher");
		  }
		  if(msg["command"] == "decrypt"){
			  /*var wbrs = document.getElementsByTagName('wbr');

			  while (wbrs.length) {
			      wbrs[0].parentNode.removeChild(wbrs[0]);
			  }*/
			  //document.body.innerHTML 	= document.body.innerHTML.replace(msg.lookfor,msg.content);
			  //var cypherAndKey = /[!?]{2}[^!?]*/+msg.key+/[!?]{2}/;
			  //var pattern = new RegExp("[!?]{2}[^!?]*"+msg.key+"[!?]{2}");
			  //var pattern = /\b"!?"\b/gi;
			  //(!\?){1}.*(a891d050){1}(\?!){1}\
			  //var pattern = new RegExp(/!\\?.*\s*(a891d050){1}.*\s*\\?!/);
			  //var pattern = /!\?[\s\S]*a891d050[\s\S]*\?!/;
			  //var pattern = /(!\?)(?:<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*?>)?(.)*?(a891d050)(?:<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*?>)?(.)*?(\?!)/;
			  var pattern = new RegExp ("(!\\?)(?:<(?:\"[^\"]*\"[\'\"]*|\'[^\']*\'[\'\"]*|[^\'\">])*?>)?(.)*?"+"("+msg.key+")"+"(?:<(?:\"[^\"]*\"[\'\"]*|\'[^\']*\'[\'\"]*|[^\'\">])*?>)?(.)*?(\\?!)", "g");
			  //document.body.innerHTML = document.body.innerHTML.replace(/[!?]{2}[^!?]*85a5ff09[!?]{2}/,msg.content);
			  //while(pattern.test(document.body.innerHTML)==true){
				  document.body.innerHTML = document.body.innerHTML.replace(pattern,msg.content);
			  	  //$("body *").replaceText( pattern, "the other" );
			  	  //$('body *').replaceText( /(!\?).*(!)/gi, 'TEXT', true );
				  console.log("got a call to replace with "+msg.lookfor +' with '+msg.content+' key is '+msg.key);
				  console.log("pattern is: "+ pattern);
			  //}
		  }
		  if(msg["command"] == "log"){
			  console.log(": "+msg.log);
		  }
	});
});
/*
<script type="text/javascript">
$('#butt').click(function(){
$('#textareaid').focus();	
$('#textareaid').keyup();
return false;
});
</script>*/