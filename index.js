const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://<app_name>.herokuapp.com:443';

const bot = new TelegramBot(TOKEN, {
  webhook: {
    port: process.env.PORT || 443
  }
});

bot.setWebHook(`${WEBHOOK_URL}/bot${TOKEN}`);

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for 'photos'.
bot.on('photo', (msg) => {  
  const chatId = process.env.CHATID; // Group ID;
  if (msg.chat.id === msg.from.id) { // Only forward messages from real people
      // Send the photo to the group
      bot.sendPhoto(chatId, msg.photo[msg.photo.length-1].file_id);
  }
});

// Listen for 'videos'.
bot.on('video', (msg) => {  
  const chatId = process.env.CHATID; // Group ID;
  if (msg.chat.id === msg.from.id) { // Only forward messages from real people
    bot.sendVideo(chatId, msg.video.file_id);
  }
});
