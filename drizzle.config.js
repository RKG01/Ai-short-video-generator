import { defineConfig } from "drizzle-kit";

export default defineConfig({

  dialect: "postgresql",
  schema: "./configs/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url:"postgresql://ai-short-video-generator_owner:npg_V4EHSAQuqm7g@ep-sparkling-grass-a8y1oonc-pooler.eastus2.azure.neon.tech/ai-short-video-generator?sslmode=require"
  },    
});
