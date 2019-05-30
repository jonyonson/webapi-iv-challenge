require('dotenv').config();

const server = require('./server.js');

// handled by dotenv or heroku
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});
