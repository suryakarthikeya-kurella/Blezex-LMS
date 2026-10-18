import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {
    fontFamily: {
      display: ["Outfit", "Bricolage Grotesque", "system-ui", "sans-serif"],
      body: ["Plus Jakarta Sans", "DM Sans", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      hand: ["Caveat", "cursive"]
    },
    colors: { ink:"#111111", paper:"#F7F6F2", hairline:"#E7E5DF", brand:"#FF4D1C", muted:"#616161" },
  } },
} satisfies Config;
