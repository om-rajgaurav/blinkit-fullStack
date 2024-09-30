import "dotenv/config";
import fastifySession from "@fastify/session";
import connectMongoDBSession from "connect-mongodb-session";
import { Admin } from "../models/index.js"; 

const MongoDBStore = connectMongoDBSession(fastifySession);

export const sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

sessionStore.on("error", (error) => {
  console.log("Session store error", error);
});

// Simple email/password authentication
export const authenticate = async (email, password) => {
  // Check if user exists
  // if(!email || !password) return null;
  // const user = Admin.findOne({ email });
  // console.log('user',user)
  // if (!user) return null;
  // // Check if password is correct
  // if (user.password !== password) return null;
  // return Promise.resolve({email:email,password:password});
  if(email == "raj@gmail.com" && password == "Test@123"){
    return Promise.resolve({email:email,password:password})
  }
}

export const PORT = process.env.PORT || 3000;

export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD || "password";

// Validate essential environment variables
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

if (!process.env.COOKIE_PASSWORD) {
  throw new Error('COOKIE_PASSWORD is not defined in environment variables');
}
 