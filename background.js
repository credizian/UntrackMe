// Try on this URL: http://lifehacker.com/nine-simple-tips-for-improving-your-table-manners-at-fa-1782221528?utm_campaign=socialflow_lifehacker_facebook&utm_source=lifehacker_facebook&utm_medium=socialflow

numOfBlocks = 0;
chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
chrome.browserAction.setBadgeText({text: numOfBlocks.toString()});

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
      	case /&utm_campaign=/.test(currentURL): 
          break;
      	case /&utm_medium=/.test(currentURL): 
          break;
      	case /&utm_term=/.test(currentURL): 
          break;
        default:
          // console.log("No URL tracking detected");
          return{};
      }
      // This return only gets hit if the the Switch statement hits a tracker and we remove having to repeat return statement for each scenario
      console.log("Tracking detected: ",details.url);
      numOfBlocks++;
      chrome.browserAction.setBadgeText({text: numOfBlocks.toString()});
      return {redirectUrl: details.url.substring(0,result)};
    } //else {
        // console.log("No tracking detected");
      //}
  },
{urls: ["<all_urls>"]},
["blocking"]);