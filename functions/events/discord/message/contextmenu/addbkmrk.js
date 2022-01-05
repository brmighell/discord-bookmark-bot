// Using Node.js 14.x +
// use "lib" package from npm
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let event = context.params.event;
let user_id = context.params.event.member.user.id;
let message = context.params.event.data.resolved.messages[0];

let storedValue = await lib.utils.kv.get({
  key: user_id
});

if (!storedValue) {
  storedValue = [];
}

if (storedValue.length < 10) {
  let bookmark = {
    title: "",
    username: message.author.username,
    content: message.content,
    link: `https://discord.com/channels/${event.guild_id}/${event.channel_id}/${message.id}`,
  }

  storedValue.push(bookmark);
 
  await lib.utils.kv.set({
    key: user_id,
    value: storedValue
  });
} else {
  await lib.discord.users['@0.2.0'].dms.create({
    recipient_id: user_id,
    content: "We currently only support ten bookmarks per user! Please delete bookmarks if you want to add more. Supported commands for deletion are: `/delete <bookmark #>` and `/clear`"
  });
}