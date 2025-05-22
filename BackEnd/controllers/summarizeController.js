const { createClient } = require('@supabase/supabase-js');
const { generateSummary } = require('../utils/cohereaiLLM');
const { sendToSlack } = require('../utils/slack');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const summarizeTodos = async (req, res) => {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      return res.status(500).json({ error: 'Supabase environment variables not configured.' });
    }

    if (!process.env.COHERE_API_KEY) {
      return res.status(500).json({ error: 'Cohere API key not configured.' });
    }

    if (!process.env.SLACK_WEBHOOK_URL) {
      return res.status(500).json({ error: 'Slack webhook URL not configured.' });
    }

    const { data: todos, error } = await supabase
      .from('Todo_List')
      .select('*')
      .eq('completed', false);

    if (error) return res.status(500).json({ error: error.message });

    if (!Array.isArray(todos) || todos.length === 0) {
      return res.status(200).json({ message: 'No pending todos.' });
    }

    const summary = await generateSummary(todos);

    await sendToSlack(summary);

    res.status(200).json({ message: 'Summary sent to Slack!', summary });
  } catch (err) {
    console.error('Error in summarizeTodos:', err);
    res.status(500).json({ error: 'Failed to summarize and send to Slack.' });
  }
};

module.exports = { summarizeTodos };
