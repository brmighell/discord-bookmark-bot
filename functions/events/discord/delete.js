const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let user_id = context.params.event.member.user.id;
let channel_id = context.params.event.channel_id;
let args = context.params.event.data.options;

let storedValue = await lib.utils.kv.get({
  key: user_id
});

let num = args[0].value;
let index = (num - 1);

if (index < storedValue.length && index >= 0) {
  storedValue.splice(index, 1);
  
  await lib.utils.kv.set({
    key: user_id,
    value: storedValue
  });
  
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: channel_id,
    content: `Successfully deleted bookmark #${num}!`
  });
} else {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: channel_id,
    content: `Please input a valid bookmark number!`
  });
}

