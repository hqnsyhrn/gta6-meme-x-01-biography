import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const source = join(botDir, "POST.json");
const raw = readFileSync(source);

// Fail loudly on a malformed entry file instead of silently copying garbage:
// POST.json must be a JSON object whose url names the X post.
const parsed: unknown = JSON.parse(raw.toString("utf8"));
if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== "string"
) {
  throw new Error("POST.json must be a JSON object with a string url");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "POST.json"), raw);
