const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const todoRoutes = require("./routes/todos");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", todoRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../FrontEnd/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../FrontEnd/dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
