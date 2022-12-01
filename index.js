const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;
let server;

// middleware config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api/users/', userRoutes);

// -------- Deployment --------

__dirname = path.resolve();
__dirname = path.join(__dirname, '/..');
console.log(__dirname);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// -------- Deployment --------

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
