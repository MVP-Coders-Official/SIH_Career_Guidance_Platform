import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';
dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    // handle server startup errors
    server.on('error', err => {
      console.error('Server startup failed:', err.message);
      console.error(err);
      process.exit(1);
    });
  })
  .catch(err => {
    console.error('Failed to connect DB:', err.message);
    console.error(err);
    process.exit(1);
  });