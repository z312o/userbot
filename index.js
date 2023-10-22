const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const path = require('path');
const fs = require('fs');
const { reactToMessage } = require('./messageController/reaction');
const { changeGroupSubject } = require('./messageController/groupManagement');

// Initialize the WhatsApp client without session data
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, 'wwebjs_auth') }),
});

// Event when the client is ready
client.on('ready', () => {
  console.log('Client is ready!');
});

// Event when a new message is received
client.on('message', async (message) => {
  const chat = await message.getChat();

  // Check if it's a group chat
  if (chat.isGroup) {
    // Handle group chat messages
    const command = message.body.trim().toLowerCase();

    if (command === '!start') {
      // Respond to the !start command in the group chat
      const introMsg = '👋 Hello!\n\nMy name is Zero. \n\nAnd I am a UserBot';
      message.reply(introMsg);
    } else if (message.hasMedia || message.hasLink) {
      // React to messages with media or links
      reactToMessage(message);
    }
    // Add more commands as needed
    else if (command === '!help') {
      // Respond to the !help command in the group chat
      const helpMsg = 'Here are some available commands:\n\n- !start: Get started with the bot\n- !help: Display this help message\n- !time: Get the current date and time\n- !devtips: Get a random development tip';
      message.reply(helpMsg);
    } else if (command === '!time') {
      // Get the current date and time
      const currentTime = new Date().toLocaleString();
      message.reply(`Current date and time: ${currentTime}`);
    } else if (command === '!devtips') {
      // Get a random development tip
      const devTips = await fs.promises.readFile('./devTips.json', 'utf8');
      const tips = JSON.parse(devTips);
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      message.reply(randomTip);
    }
    // Add more command handlers here
  }
});

// Generate the QR code for authentication
client.on('qr', (qr) => {
  console.log('Scan the QR code with your phone:');
  qrcode.toDataURL(qr, (err, url) => {
    if (err) {
      console.error('Error generating QR code:', err);
    } else {
      // Log the base64 string representation of the QR code
      console.log(url);
    }
  });
});

// Connect the client
client.initialize();

// Prevent the Node.js project from idling by keeping the script running forever
setInterval(() => {
  console.log('Bot is still running...');
}, 60 * 60 * 1000);
