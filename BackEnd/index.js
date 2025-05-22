const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path")
dotenv.config();
console.log(process.env.PORT)

const todoRoutes = require("./routes/todos");

const app = express();
app.use(cors());
app.use(express.json());




app.use(express.static(path.join(__dirname, '../FrontEnd/dist')));

app.use("/api",todoRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/dist/index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
