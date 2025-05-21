const supabase = require('../utils/supabaseClient');



const getTodos = async (req, res) => {
  const { data, error } = await supabase.from('Todo_List').select('*').order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};


const addTodo = async (req, res) => {
  const { title } = req.body;
  const { data, error } = await supabase.from('Todo_List').insert([{ title, completed: false }]).select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};


const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('Todo_List').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Todo deleted successfully' });
};

module.exports={getTodos,addTodo,deleteTodo}