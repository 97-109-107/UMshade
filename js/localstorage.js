function listAllItems(){  
    for (i=0; i<=localStorage.length-1; i++)  
    {  
        key = localStorage.key(i);  
        log(localStorage.getItem(key));
    }  
}

// Store item in local storage:
  function setItem(key, value){
    try {
      window.localStorage.removeItem(key);      // <-- Local storage!
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
	  log('Retrieving blurbs that don\'t match '+prekey);
	  var templog = [];
	  for(i=0; i<=localStorage.length-1; i++){  
	        key = localStorage.key(i);  
	        var blurb = localStorage.getItem(key).split('%%%');
	        if(blurb[3]!="dummy" && blurb[3]!=null){
	        	templog.push([blurb[2],blurb[0],blurb[3]]);
	        }
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