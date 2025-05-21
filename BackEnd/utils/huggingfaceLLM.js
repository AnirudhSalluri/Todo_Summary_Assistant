const axios = require('axios');

const generateSummary = async (todos) => {
  const todoList = todos.map((todo, i) => `${i + 1}. ${todo.title}`).join('\n');

  const response = await axios.post(
    'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    { inputs: `Summarize this: ${todoList}` },
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`
      }
    }
  );

  return response.data[0]?.summary_text || 'No summary generated.';
};

module.exports = { generateSummary };
