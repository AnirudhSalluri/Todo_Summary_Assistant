const { createClient } = require('@supabase/supabase-js');
const { generateSummary } = require('../utils/cohereaiLLM');
const { sendToSlack } = require('../utils/slack');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const summarizeTodos = async (req, res) => {
  try {
    const { data: todos, error } = await supabase
      .from('Todo_List')
      .select('*')
      .eq('completed', false);

    if (error) return res.status(500).json({ error: error.message });
    if (!todos.length) return res.status(200).json({ message: 'No pending todos.' });

    const summary = await generateSummary(todos);
    await sendToSlack(summary);

    res.status(200).json({ message: 'Summary sent to Slack!', summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to summarize and send to Slack.' });
  }
};

module.exports = { summarizeTodos };
