const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let user_id = context.params.event.member.user.id;
let channel_id = context.params.event.channel_id;
let args = context.params.event.data.options;

let storedValue = await lib.utils.kv.get({
  key: user_id
});

let num = args[0].value;
let index = (num - 1);
let newTitle = args[1].value;

// Only need to error-check the index; the second arg is a non-optional string
if (index < storedValue.length && index >= 0) {
  storedValue[index].title = newTitle;
  
  await lib.utils.kv.set({
    key: user_id,
    value: storedValue
  });
  
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: channel_id,
    content: `Successfully renamed bookmark #${num} to ${newTitle}!`
  });
} else {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: channel_id,
    content: `Please input a valid bookmark number!`
  });
}