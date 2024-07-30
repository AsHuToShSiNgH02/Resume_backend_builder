const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const resumeRoutes = require('./routes/resume');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = config.get('port');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

mongoose.connect(config.get('mongoURI'), {
})
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
