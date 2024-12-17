/**
 *  post embed to discord
 */


const DISCORD_POST_URL = properties['LIVE_DISCORD_WEBHOOK_URL']; // defined in script properties (Script Settings > Scroll to bottom)
// const DISCORD_POST_URL = properties['TEST_DISCORD_WEBHOOK_URL'];


const randomColor = Math.floor(Math.random() * 0xFFFFFF);
let items = []; // not actual purchased items, this is filled with fields that get published in discord embed
let options; // text customizations for embed

function postEmbed() {
  preparePayload();
  response = UrlFetchApp.fetch(DISCORD_POST_URL, options);
}

function preparePayload() {
  let payloadContentString = "";
  payloadContentString = "\n[Prefilled ESL Form](" + eslLinkRes + ")\n";
  if(isAmazon) {
    payloadContentString = payloadContentString + "[Generated Amazon Cart](" + amazonLink + ")";
  }
  if(!isAmazon) {
    payloadContentString = payloadContentString + "[Generated Spreadsheet Link](" + newSheetUrl + ")"
  }

  // fields that constitute main content body of discord embed
  items = [
      { "name": "Committee", "value": committeeName, "inline": false },
      { "name": "Special Notes", "value": specialNotes, "inline": false },
      { "name": "Contact", "value": email + "\n" + phoneNumber, "inline": false },
      { "name": "Vendor", "value": vendorName, "inline": false },
      { "name": "Shipping", "value": `$${parseFloat(shipping).toFixed(2)}`, "inline": false},
      { "name": "Shipping Type", "value": shippingType, "inline": false },
      ...nameArr.map((name, index) => ({
        "name": `__${quantityArr[index]}x__ ${name}`,
        "value": `[Link](${linksArr[index]}) - $${parseFloat(priceArr[index]).toFixed(2)}`,
        "inline": false
      })),
      { "name": "Total Price", "value": `$${parseFloat(totalPrice.toFixed(2))}`, "inline": false }
    ];

  options = {
          // "muteHttpExceptions": true,
          "method": "post",
          "headers": {
          "Content-Type": "application/json",
          },
    "payload": JSON.stringify({
    "content": discordTag + " " + payloadContentString, // this is the unformatted (normal) text above the rich embed
    "embeds": [{
      "title": `${itemsOrdered} unique links!`,
      "color": randomColor,
      "fields": items,
      "footer": {
        "text": footerText,
        ...(footerUrl ? { "icon_url": footerUrl } : {})
      },
      "thumbnail": {
        "url": thumbNailUrl
      },
      "timestamp": new Date().toISOString()
    }]
  })
  };
}

// posts error message to discord
function postKill(process) { 
  discordTag = "<@339824792092016640>"; // ping tguyen
  items = []; // clear contents
  const options = {
          "method": "post",
          "headers": {
          "Content-Type": "application/json",
          },
    "payload": JSON.stringify({
    "content": discordTag + "\n" + specialErrorMessage, // this is the unformatted text above the rich embed
    "embeds": [{
      "title": `something broke lmao (${process})`,
      "color": randomColor,
      "fields": items,
      "footer": {
        "text": footerText,
        ...(footerUrl ? { "icon_url": footerUrl } : {})
      },
      "timestamp": new Date().toISOString()
      }]
    })
  };

    UrlFetchApp.fetch(DISCORD_POST_URL, options);


    return;
}