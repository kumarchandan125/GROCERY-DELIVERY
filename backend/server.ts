import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

app.use("/api/v1/auth", authRouter);

//product routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/upload", uploadRouter);

//orders routes
app.use("/api/v1/orders", orderRouter);

//inngest
app.use("/api/inngest", serve({ client: inngest, functions }));

//Error handeling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({
    message: error.message,
  });
});

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export default app;
