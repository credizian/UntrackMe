document.addEventListener('DOMContentLoaded', function() {
	
	if (chrome.extension.getBackgroundPage().numOfBlocked != "") {
		displayValue = chrome.extension.getBackgroundPage().numOfBlocked;
	} else {
		displayValue = 0;
	};
	document.getElementById('untrackedCount').innerHTML = "Tracking blocked: " + displayValue + " times";

	document.getElementById('delayButton').addEventListener('click', function() {
		chrome.extension.getBackgroundPage().f();
		window.close();
	}, false);

	document.getElementById('go-to-options').addEventListener('click', function() {
		if (chrome.runtime.openOptionsPage) {
			// New way to open options pages, if supported (Chrome 42+).
			chrome.runtime.openOptionsPage();
		} else {
			// Reasonable fallback.
			window.open(chrome.runtime.getURL('options.html'));
		}
	}, false);


}, false);