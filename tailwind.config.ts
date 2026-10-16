import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {
    fontFamily: { display: ["Bricolage Grotesque","sans-serif"], body: ["DM Sans","sans-serif"], hand: ["Caveat","cursive"],
      sans: ["Inter","ui-sans-serif","system-ui","sans-serif"], heading: ["Manrope","Inter","sans-serif"] },
    colors: { ink:"#111111", paper:"#F7F6F2", hairline:"#E7E5DF", brand:"#FF4D1C", "brand-dark":"#D63A0F", muted:"#616161" },
  } },
} satisfies Config;
