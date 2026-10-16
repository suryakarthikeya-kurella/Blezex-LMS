import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  // vendor chunks cache independently of app code; route code is split with React.lazy in App.tsx
  build: { rollupOptions: { output: { manualChunks: { react: ["react", "react-dom", "react-router-dom"], supabase: ["@supabase/supabase-js"], forms: ["react-hook-form", "zod", "@hookform/resolvers"] } } } },
});
