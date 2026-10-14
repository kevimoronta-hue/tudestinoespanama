#!/usr/bin/env node
/**
 * Hero clips via Google Veo (Gemini API) — fallback while the Higgsfield account is blocked.
 *
 * Image-to-video from the documented reference frames (media/references/frames/*.jpg),
 * one generation per scene AND per orientation (16:9 and 9:16 are generated natively,
 * never cropped from each other). Output: media/clips/<scene>-<16x9|9x16>.mp4, ready for
 * scripts/build-hero-video.sh.
 *
 * The API key is read from GEMINI_API_KEY (environment or .env.local) and never printed.
 *
 * Usage:
 *   node scripts/veo-generate.mjs --dry-run            # show the plan, no API call
 *   node scripts/veo-generate.mjs                      # all 10 clips (skips existing files)
 *   node scripts/veo-generate.mjs --only 03-casco      # one scene, both orientations
 *   node scripts/veo-generate.mjs --ratio 9x16         # one orientation
 *   node scripts/veo-generate.mjs --force              # overwrite existing clips
 *   node scripts/veo-generate.mjs --model veo-3.1-fast-generate-preview --resolution 720p --duration 4
 */
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
const SCENES = ["01-arrival", "02-canal", "03-casco", "04-skyline", "05-nature"];
const RATIOS = { "16x9": "16:9", "9x16": "9:16" };

/* ---------- args ---------- */
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const model = opt("model", "veo-3.1-generate-preview");
const resolution = opt("resolution", "1080p");
const duration = opt("duration", resolution === "720p" ? "4" : "8");
const only = opt("only", "");
const ratioFilter = opt("ratio", "");
const concurrency = Number(opt("concurrency", "2"));
const dryRun = flag("dry-run");
const force = flag("force");

if (!["4", "6", "8"].includes(duration)) fail(`--duration must be 4, 6 or 8 (got ${duration})`);
if (resolution !== "720p" && duration !== "8") fail(`${resolution} requires --duration 8`);

/* ---------- key ---------- */
function readKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  const envFile = path.join(ROOT, ".env.local");
  if (existsSync(envFile)) {
    const line = readFileSync(envFile, "utf8")
      .split(/\r?\n/)
      .find((l) => l.startsWith("GEMINI_API_KEY="));
    if (line) return line.slice("GEMINI_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
  }
  return "";
}

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}

/* ---------- plan ---------- */
const prompts = JSON.parse(readFileSync(path.join(ROOT, "data/hero-prompts.json"), "utf8"));
const jobs = [];
for (const scene of SCENES) {
  if (only && !only.split(",").includes(scene)) continue;
  for (const ratio of Object.keys(RATIOS)) {
    if (ratioFilter && ratioFilter !== ratio) continue;
    const frame = path.join(ROOT, "media/references/frames", `${scene}-${ratio}.jpg`);
    const out = path.join(ROOT, "media/clips", `${scene}-${ratio}.mp4`);
    if (!existsSync(frame)) fail(`missing reference frame ${path.relative(ROOT, frame)}`);
    if (existsSync(out) && !force) {
      console.log(`skip  ${scene}-${ratio} (exists — use --force to regenerate)`);
      continue;
    }
    jobs.push({ scene, ratio, frame, out, prompt: `${prompts.scenes[scene][ratio]} ${prompts.global}` });
  }
}

console.log(`model=${model} resolution=${resolution} duration=${duration}s clips=${jobs.length}`);
for (const j of jobs) console.log(`plan  ${j.scene}-${j.ratio} ← ${path.relative(ROOT, j.frame)}`);
if (dryRun || jobs.length === 0) process.exit(0);

const key = readKey();
if (!key) fail("GEMINI_API_KEY not found (environment or .env.local)");
const headers = { "x-goog-api-key": key, "Content-Type": "application/json" };

/* ---------- API ---------- */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(url, init) {
  const res = await fetch(url, init);
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text.slice(0, 400) };
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(body.error ?? body).slice(0, 600)}`);
  return body;
}

async function generate(job) {
  const tag = `${job.scene}-${job.ratio}`;
  const body = {
    instances: [
      {
        prompt: job.prompt,
        image: { bytesBase64Encoded: readFileSync(job.frame).toString("base64"), mimeType: "image/jpeg" },
      },
    ],
    parameters: {
      aspectRatio: RATIOS[job.ratio],
      resolution,
      durationSeconds: Number(duration),
      personGeneration: "allow_adult",
    },
  };

  const op = await api(`${BASE_URL}/models/${model}:predictLongRunning`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  console.log(`start ${tag} → ${op.name}`);

  let status = op;
  const started = Date.now();
  while (!status.done) {
    if (Date.now() - started > 15 * 60_000) throw new Error(`${tag}: timeout after 15 min (operation ${op.name})`);
    await sleep(10_000);
    status = await api(`${BASE_URL}/${op.name}`, { headers });
  }
  if (status.error) throw new Error(`${tag}: ${JSON.stringify(status.error).slice(0, 600)}`);

  const resp = status.response?.generateVideoResponse;
  const uri = resp?.generatedSamples?.[0]?.video?.uri;
  if (!uri) {
    const why = resp?.raiMediaFilteredReasons ?? resp?.raiMediaFilteredCount ?? JSON.stringify(status.response).slice(0, 400);
    throw new Error(`${tag}: no video returned (${JSON.stringify(why)})`);
  }

  const video = await fetch(uri, { headers: { "x-goog-api-key": key }, redirect: "follow" });
  if (!video.ok) throw new Error(`${tag}: download HTTP ${video.status}`);
  mkdirSync(path.dirname(job.out), { recursive: true });
  const tmp = `${job.out}.part`;
  writeFileSync(tmp, Buffer.from(await video.arrayBuffer()));
  renameSync(tmp, job.out);
  console.log(`done  ${tag} → ${path.relative(ROOT, job.out)} (${Math.round((Date.now() - started) / 1000)} s)`);
  return { tag, operation: op.name };
}

/* ---------- run with limited concurrency ---------- */
const results = [];
const failures = [];
let next = 0;
async function worker() {
  while (next < jobs.length) {
    const job = jobs[next++];
    try {
      results.push(await generate(job));
    } catch (e) {
      failures.push(`${job.scene}-${job.ratio}: ${e.message}`);
      console.error(`FAIL  ${job.scene}-${job.ratio}: ${e.message}`);
    }
  }
}
await Promise.all(Array.from({ length: Math.max(1, concurrency) }, worker));

const log = path.join(ROOT, "media/clips/veo-log.json");
writeFileSync(
  log,
  JSON.stringify({ at: new Date().toISOString(), model, resolution, duration, results, failures }, null, 2),
);
console.log(`\n${results.length} ok, ${failures.length} failed — log: ${path.relative(ROOT, log)}`);
process.exit(failures.length ? 1 : 0);
