import serverless from "serverless-http";
import app, { connectDB } from "../server.js";

const handler = serverless(app);

export default async function handlerWrapper(req, res) {
  await connectDB(); // ensure cached DB connection
  return handler(req, res);
}
