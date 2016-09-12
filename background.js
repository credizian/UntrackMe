// Try on this URL: http://lifehacker.com/nine-simple-tips-for-improving-your-table-manners-at-fa-1782221528?utm_campaign=socialflow_lifehacker_facebook&utm_source=lifehacker_facebook&utm_medium=socialflow

//Initiate Badge
chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });

//Retrieve the previous blocked count from storage
//Did localStorage actions based on code here: http://stackoverflow.com/questions/12632463/is-localstorage-getitemitem-better-than-localstorage-item-or-localstoragei 
//& http://stackoverflow.com/questions/23221642/unexpected-token-u-json-parse-issue
var numOfBlocked = JSON.parse(localStorage.numOfBlocked || '[]');

//Update Badge for retrieved count
chrome.browserAction.setBadgeText({text: numOfBlocked.toString()});

//For debugging to make sure count is coming through correctly
//console.log(numOfBlocked);

//See request before browser navigation to it to block the tracking parts
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var result = details.url.search(/\?/);
    var currentURL = details.url;

    if(result > 0) {

      //Switch Statement based on: http://stackoverflow.com/questions/2896626/switch-statement-for-string-matching-in-javascript
      switch (true) {
        case /\?utm_source=/.test(currentURL):
          break;
        case /\?utm_campaign=/.test(currentURL):
          break;
        case /\?src=/.test(currentURL):
          break;
        case /\?sr_source=/.test(currentURL):
          break;
        case /\?smid=/.test(currentURL):
          break;
        case /\?smid=/.test(currentURL):
          break;
        case /\?utm_content=/.test(currentURL):
          break;
        case /\?utm_medium=/.test(currentURL):
          break;
        case /\?utm_term=/.test(currentURL):
          break;
        case /\?content=/.test(currentURL):
          break;
      	case /&utm_campaign=/.test(currentURL):
          break;
      	case /&utm_medium=/.test(currentURL):
          break;
      	case /&utm_term=/.test(currentURL):
          break;
        default:
          //This default gets hit if no tracking signature detected in URL
          //console.log("No URL tracking detected");
          return{};
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
    } //else {
        // console.log("No tracking detected");
      //}
  },
{urls: ["<all_urls>"]},
["blocking"]);
