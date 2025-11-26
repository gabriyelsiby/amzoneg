import app, { connectDB } from "../server.js";

export default async function handler(req, res) {
  await connectDB();            // ⭐ IMPORTANT: connect to MongoDB on every request
  return app(req, res);         // forward request to Express
}
