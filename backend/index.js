const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
if (process.env.USE_CORS === 'true') {
  app.use(cors());
}
app.use(express.json());

// API Routes
const marsRoutes = require('./routes/marsRoutes');
app.use('/api/mars', marsRoutes);

// Serve React static files only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './build')));

  // // Catch-all to serve React app for unknown routes
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, './build', 'index.html'));
  // });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});