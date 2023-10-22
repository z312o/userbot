// messageController/groupManagement.js

// Function to change the group subject
const changeGroupSubject = async (chat, newSubject) => {
    try {
      await chat.setSubject(newSubject);
      console.log(`Changed group subject to "${newSubject}"`);
    } catch (error) {
      console.error(`Error changing group subject: ${error.message}`);
    }
  };
  
  // Export the group management functions
  module.exports = { changeGroupSubject };
  