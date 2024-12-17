function generateAmazonLink() {
  amazonLink = "https://www.amazon.com/gp/aws/cart/add.html?";

  for(let i = 1; i <= itemsOrdered; i++) {
    let asin = extractASIN(linksArr[i-1]);
    // if(asin == null) {
      // asin = extractASIN(expandURL(linksArr[i-1])); // try to extract again after expanding the (possibly) originally shortened URL
    // }
    // if(asin == null) { // check again
    //   Logger.log("ASIN extraction broke for item " + i-1 + " " + nameArr[i-1]);
    // }
    amazonLink = amazonLink + "ASIN." + i + "=" + asin + "&Quantity." + i + "=" +  quantityArr[i-1] + "&";
  }
}

function extractASIN(url) {
  // Define a regex to capture the 10-character ASIN in the link
  // Logger.log("Extracting ASIN from URL: " + url);
  const asinRegex = /(?:dp|gp\/product|ASIN[.=])\/?([A-Z0-9]{10})/i;
  
  // Execute the regex on the URL
  const match = url.match(asinRegex);
  
  // Return the captured ASIN, or null if no match is found
  return match ? match[1] : null;
}

// following function is useless because ran into issue of CAPTCHAs when expanding shortened Amazon links lol
// function expandURL(shortUrl) { // for urls like https://t.ly/X0jSD or https://a.co/d/gdZBinY
//   let response = UrlFetchApp.fetch(shortUrl, {"followRedirects": true});
//   Logger.log(response);
//   let redirectedUrl = response.getUrl();
//     return redirectedUrl;
// }