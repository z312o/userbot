
async function reactToMessage(msg) {
    try {
      
      const reaction = await msg.react('👍');
      console.log('Reaction added:', reaction);
    } catch (error) {
      console.error('Error handling reaction:', error);
    }
  }
  
  module.exports = {
    reactToMessage,
  };
  
