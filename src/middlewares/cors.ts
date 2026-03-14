import cors from "cors";

const clientUrl = process.env.CLIENT_URL;

export const corsMiddleware = cors({
  origin: clientUrl,
  credentials: true,
});
