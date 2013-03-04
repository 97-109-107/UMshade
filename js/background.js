chrome.browserAction.setIcon({path: 'img/iconA.png'});
chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
	if(request["icon"]=="A")
		chrome.browserAction.setIcon({path: 'img/iconB.png'});
	else
		chrome.browserAction.setIcon({path: 'img/iconA.png'});
});

var first_run = false;
if (!localStorage['ran_before']) {
  first_run = true;
  localStorage['ran_before'] = '1';
}

  function onInstall() {
  chrome.tabs.create({'url': chrome.extension.getURL('http://umshade.it/first-run.html')}, function(tab) {
    // Tab opened.
  });
  }

  function onUpdate() {
    alert("Extension Updated");
  }

  function getVersion() {
    var details = chrome.app.getDetails();
    return details.version;
  }

  // Check if the version has changed.
  var currVersion = getVersion();
  var prevVersion = localStorage['version']
  if (currVersion != prevVersion) {
    // Check if we just installed this extension.
    if (typeof prevVersion == 'undefined') {
      onInstall();
    } else {
      onUpdate();
    }
    localStorage['version'] = currVersion;
  }