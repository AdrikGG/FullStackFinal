const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const gameRoutes = require('./routes/games');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
let server;

// middleware config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api/users/', userRoutes);
app.use('/api/games/', gameRoutes);

mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('Database connection established'))
  .catch((err) => console.log('Error connecting to database: ', err));

server = app.listen(PORT, () => {
  console.log(`Node server running on port: ${PORT}`);
});
