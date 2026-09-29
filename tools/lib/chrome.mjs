import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const CANDIDATES = [
  process.env.CHROME_PATH,
  "/usr/bin/chromium",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
].filter(Boolean);

export function chromePath() {
  const found = CANDIDATES.find((p) => existsSync(p));
  if (!found) throw new Error("no Chrome found; set CHROME_PATH");
  return found;
}

export const launch = () =>
  puppeteer.launch({ executablePath: chromePath(), headless: true, args: ["--no-sandbox", "--font-render-hinting=none"] });
