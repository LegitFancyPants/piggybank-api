import "dotenv/config";
import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transactionRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "PiggyBank REST API is running",
    endpoints: ["/api/transactions", "/api/goals"],
  });
});

app.use("/api/transactions", transactionRoutes);
app.use("/api/goals", goalRoutes);

if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`PiggyBank REST API running on http://localhost:${port}`);
  });
}

export default app;
