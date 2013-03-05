chrome.extension.onConnect.addListener(function(port) {
	var text = document.body.textContent || document.body.innerText;
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
		  }
		  if(msg["command"] == "fetch_body"){
		  	port.postMessage({
		  		type:"body",
		  		value:document.body.innerText
		  	});
		  }
		  if(msg["command"] == "decrypt"){
			  	// I know this is a big no-no, but couldn't get over some particularities of the facebook time-line page.
			  var pattern = new RegExp ("(!\\?)(?:<(?:\"[^\"]*\"[\'\"]*|\'[^\']*\'[\'\"]*|[^\'\">])*?>)?(.)*?"+"("+msg.key+")"+"(?:<(?:\"[^\"]*\"[\'\"]*|\'[^\']*\'[\'\"]*|[^\'\">])*?>)?(.)*?(\\?!)", "g");
				  document.body.innerHTML = document.body.innerHTML.replace(pattern,msg.content);
				  console.log("got a call to replace with "+msg.lookfor +' with '+msg.content+' key is '+msg.key);
				  console.log("pattern is: "+ pattern);
		  }
		  if(msg["command"] == "log"){
			  console.log(msg.log);
		  }
	});
});
