function listAllItems(parsed){  
  var r=[];
    for (i=0; i<=localStorage.length-1; i++)  
    {  
        key = localStorage.key(i);  
        if (parsed==true){
          r.push(JSON.parse(localStorage.getItem(key)));
        }else{
          r.push(localStorage.getItem(key));
        }
    }  
    return r;
}

// Store item in local storage:
  function setItem(key, value){
    try {
      // window.localStorage.removeItem(key);      // <-- Local storage!
      // log("duplicate key?");
      window.localStorage.setItem(key, value);  // <-- Local storage!
    } catch(e) {
      log("Error inside setItem");
      log(e);
    }
  }

  // Gets item from local storage with specified key.
  function getItem(key) {
    var value;
    log('Retrieving key [' + key + ']');
    try {
      value = window.localStorage.getItem(key);  // <-- Local storage!
    }catch(e) {
      log("Error inside getItem() for key:" + key);
      log(e);
      value = "null";
    }
    log("Returning value: " + value);
    return value;
}
  function getBlurbs(){
	// returns the past messages that were encrypted and the keys to them
	  var templog = [];
	  for(i=0; i<=localStorage.length-1; i++){  
	        key = localStorage.key(i);  
	        var blurb = JSON.parse(localStorage.getItem(key))
			//if(blurb[3]!="dummy" && blurb[3]!=null){
                templog.push(blurb);
			//}
	    }
	  return templog;
  }

  // Clears all key/value pairs in local storage.
  function clearStrg() {
    log('about to clear local storage');
    window.localStorage.clear(); // <-- Local storage!
    log('cleared');
  }

  function localStorageLog() {
	  var templog = [];
	  for (i=0; i<=localStorage.length-1; i++)  
	    {  
	        key = localStorage.key(i);  
	        templog.push(' \r\n'+key+" @ "+localStorage.getItem(key));
	    }  
	  return templog;
  }
