import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import open from "open";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Ovo će automatski otvoriti pretraživač
  },
});

// // Opcionalno: ako želite da koristite 'open' direktno, možete dodati sledeći kod
// open("http://localhost:3000"); // Zamenite sa pravim URL-om i portom vaše aplikacije
