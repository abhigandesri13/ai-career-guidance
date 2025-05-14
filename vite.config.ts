import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
export default defineConfig({
  base: "/your-repo-name/", // Ensure this matches your GitHub repo name
  plugins: [react()],
});


