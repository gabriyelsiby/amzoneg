import serverless from "serverless-http";
import app, { connectDB } from "../server.js";

const handler = serverless(app);

export default async function handlerWrapper(req, res) {
  await connectDB(); 
  return handler(req, res);
}
