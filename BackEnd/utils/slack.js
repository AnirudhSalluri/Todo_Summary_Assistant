const axios = require('axios');

const sendToSlack = async (summary) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  await axios.post(webhookUrl, {
    text: `📝 *Todo Summary:*\n${summary}`,
  });
};

module.exports = { sendToSlack };
