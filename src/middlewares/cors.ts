import cors from "cors";

const origins = process.env.CLIENT_URL?.split(",") || [];

export const corsMiddleware = cors({
  origin: origins,
  credentials: true,
});
