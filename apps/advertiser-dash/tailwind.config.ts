// tailwind config is required for editor support
import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.tsx"],
  presets: [sharedConfig]
};

export default config;

