const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

// if not live >> the local MongoDB server's database
// Users are only permitted to access our MongoDB instance on port 27017 via IP 127.0.0.1. I
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on http://localhost:${PORT}`));