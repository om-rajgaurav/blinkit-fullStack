import Fastify from 'fastify';
import "dotenv/config"; // Ensure dotenv is installed
import { dbConnect } from './src/config/dbConnect.js';
import { PORT } from './src/config/config.js';
import { admin, buildAdminRouter } from './src/config/setup.js';
import { registerRoutes } from './src/routes/index.js';

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    // Ensure the Mongo URI is defined
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await dbConnect(mongoUri);

    const app = Fastify();
    // Register routes

    await registerRoutes(app);
    // Build AdminJS router
    await buildAdminRouter(app);

    app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Blinkit listening at http://localhost:${PORT}${admin.options.rootPath}`);

  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

start();
