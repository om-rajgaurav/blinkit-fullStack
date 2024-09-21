import Fastify from 'fastify';
import "dotenv/config";
import { dbConnect } from './src/config/dbConnect.js';


const start = async () => {
  const PORT = process.env.PORT || 3000;
  const mongoUri = process.env.MONGO_URI
  await dbConnect(mongoUri);
  const app = Fastify();
  app.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log(`Blinkit listening at http://localhost:${PORT}`);
    }
  });
}

start()