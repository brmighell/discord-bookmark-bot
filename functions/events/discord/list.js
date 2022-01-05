// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let user_id = context.params.event.member.user.id;
let channel_id = context.params.event.channel_id;

let storedValue = await lib.utils.kv.get({
  key: user_id
});

let bookmarkArray = [];

storedValue.forEach(function(item, index) {
  // Title field will only be non-empty if the bookmark has been renamed. Since
  // embeds can't handle empty titles, we need to assign a generic one for 
  // printing
  let title = item.title ? 
    (`${index + 1}: ` + item.title) : 
    ("Bookmark " + (index + 1));
  
  // Each bookmark includes the first 250 characters of the linked message's
  // content. Note that the bookmark object is designed to be understandable
  // by Discord's embed printer
  let bookmark = {
    "name": title,
    "value": `${item.content.slice(0, 250)}
    [Link](${item.link})`
  };
  bookmarkArray.push(bookmark);
})

if (storedValue.length === 0) {
  await lib.discord.channels['@0.2.0'].messages.create({
    "channel_id": channel_id,
    "content": "You don't have any bookmarks! Access the context menu for a message and choose `Apps -> Add bookmark` to get started!",
  });
} else {
  await lib.discord.channels['@0.2.0'].messages.create({
    "channel_id": channel_id,
    "content": "",
    "tts": false,
    "embeds": [
      {
        "type": "rich",
        "title": `Bookmark List`,
        "description": "",
        "color": 0x00FFFF,
        "fields": bookmarkArray
      }
    ]
  });
}