const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://<app_name>.herokuapp.com:443';
const CHATID = process.env.CHATID;

const bot = new TelegramBot(TOKEN, {
  webHook: {
    port: process.env.PORT || 443
  }
});

bot.setWebHook(`${WEBHOOK_URL}/bot${TOKEN}`);

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => bot.sendMessage(msg.chat.id, match[1]));

// Listen for 'photos'.
bot.on('photo', (msg) => {
  if (msg.chat.id === msg.from.id) { // Only forward messages from real people
      // Send the photo to the group
      bot.sendPhoto(CHATID, msg.photo[msg.photo.length-1].file_id);
  }
});

// Listen for 'videos'.
bot.on('video', (msg) => {
  if (msg.chat.id === msg.from.id) { // Only forward messages from real people
    bot.sendVideo(CHATID, msg.video.file_id);
  }
});

// Handling the error;
bot.on('error', e => console.error(e.stack));
