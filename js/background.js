// Try on this URL: 
// http://lifehacker.com/nine-simple-tips-for-improving-your-table-manners-at-fa-1782221528?utm_campaign=socialflow_lifehacker_facebook&utm_source=lifehacker_facebook&utm_medium=socialflow

//Initiate Badge
chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });

//Retrieve the previous blocked count from storage
var keepProtecting = true;
var refererBlock = false;

var popups = chrome.extension.getViews({type: "popup"})

var numOfBlocked = JSON.parse(localStorage.numOfBlocked || '[]');
//For debugging to make sure count is coming through correctly
//console.log(numOfBlocked);

//Update Badge for retrieved count
chrome.browserAction.setBadgeText({text: numOfBlocked.toString()});


// To action on disabling for 2 minutes
function f() { 
	keepProtecting = false;
	chrome.notifications.create(
	    'notif',
	    {   
		    type: 'basic', 
		    iconUrl: 'icon-128.png', 
		    title: "UntrackMe Notification", 
		    message: "You've paused URL protection for 3 minutes - be vigilant!" 
	    }, 
	    function() {} 
	);

	function setTheDelay() { 
		// alert('hit setTheDelay');
		keepProtecting = true;
	}
	setTimeout(setTheDelay, 180000);
}

//See request before browser navigation to it to block the tracking parts
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		var result = 0;
		var result1 = details.url.search(/\?/);
		var result2 = details.url.search(/&/);

		switch (true) {
			case (result1>0):
				result = result1;
				break;
			case (result2>0):
				result = result2;
				break;
			default:
				return {};
		}

		var currentURL = details.url;

		if(result > 0 && keepProtecting) {
			// console.log("the result length is",result);

			//Switch Statement based on: http://stackoverflow.com/questions/2896626/switch-statement-for-string-matching-in-javascript
			switch (true) {
				case /\?utm_source=/.test(currentURL):
				case /\?utm_campaign=/.test(currentURL):
				case /\?src=/.test(currentURL):
				case /\?sr_source=/.test(currentURL):
				case /\?smid=/.test(currentURL):
				case /\?smid=/.test(currentURL):
				case /\?utm_content=/.test(currentURL):
				case /\?utm_medium=/.test(currentURL):
				case /\?utm_term=/.test(currentURL):
				case /\?mbid=social/.test(currentURL):
				case /\?content=/.test(currentURL):
				case /&utm_campaign=/.test(currentURL):
				case /&utm_medium=/.test(currentURL):
				case /&utm_term=/.test(currentURL):
					break;
				default:
				  //This default gets hit if no tracking signature detected in URL
				  //console.log("No URL tracking detected");
				  return {};
			}

			// This only gets hit if the the Switch statement hits a tracker and we remove having to repeat return statement for each scenario
			console.log("Tracking detected: ",details.url);
			numOfBlocked++;

			//Create string version of numOfBlocked count since we will be using it twice
			var stringNumOfBlocked = numOfBlocked.toString();

			//Update local storage with new blocked count and update the badge
			localStorage.setItem('numOfBlocked', stringNumOfBlocked);

			chrome.browserAction.setBadgeText({text: stringNumOfBlocked});

			return {redirectUrl: details.url.substring(0,result)};

		} else {
			// console.log("No tracking detected:",keepProtetcting);
				return {}
			}
	},
{urls: ["<all_urls>"]},
["blocking"]);


chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
		for (var i = 0; i < details.requestHeaders.length; ++i) {
			// console.log("the header is",JSON.stringify(details.requestHeaders[i]));
			if (details.requestHeaders[i].name === 'Referer' && keepProtecting && refererBlock) {
				// console.log("the referer value is",details.requestHeaders[i].value);
				// console.log("the value after response is",details.requestHeaders[i+1].value);
			  	details.requestHeaders.splice(i, 1);
			  	// console.log("the new referer value new is",details.requestHeaders[i].value);
			  	break;
			}
		}
		return {requestHeaders: details.requestHeaders};
    },
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]);
