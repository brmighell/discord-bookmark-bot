const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let user_id = context.params.event.member.user.id;
let channel_id = context.params.event.channel_id;

await lib.utils.kv.set({
  key: user_id,
  value: []
});

await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: channel_id,
  content: `Successfully cleared bookmark list!`
});