const axios = require('axios');

const generateSummary = async (todos) => {
  const pending = todos
    .filter(todo => !todo.completed)
    .map((todo, i) => `${i + 1}. ${todo.title}`)
    .join('\n');

  const completed = todos
    .filter(todo => todo.completed)
    .map((todo, i) => `${i + 1}. ${todo.title}`)
    .join('\n');

  const prompt = `Summarize the following to-do list by separating pending and completed tasks. Provide a brief overview of what has been completed and what remains:\n\nPending Tasks:\n${pending || 'None'}\n\nCompleted Tasks:\n${completed || 'None'}`;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/generate',
      {
        model: 'command',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.generations?.[0]?.text?.trim() || 'No summary generated.';
  } catch (error) {
    console.error('Error generating summary:', error.response?.data || error.message);
    console.log('Prompt sent to Cohere:', prompt);

    return 'Failed to generate summary.';
  }
};

module.exports = { generateSummary };
