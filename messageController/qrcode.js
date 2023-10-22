const qrcode = require('qrcode-terminal');

async function generateQRCode(sessionId) {
  const qrCode = await new Promise((resolve, reject) => {
    qrcode.toString(sessionId, { type: 'terminal' }, (err, qr) => {
      if (err) reject(err);
      resolve(qr);
    });
  });

  return qrCode;
}

module.exports = {
  generateQRCode,
};