import { add } from "./api.ts";
import { getWorkId, getWorks } from "./ao3.ts";
import { parseArgs } from "@std/cli/parse-args";

const args = parseArgs(Deno.args, {
  boolean: "dry-run",
});

const answer = prompt("Enter URLs:") || "";
const urls = answer.split(/\s+/).filter(Boolean);
const ids = urls.map(getWorkId);

const works = await getWorks(ids);

if (args["dry-run"]) {
  console.log("Works to add:");
  for (const work of works) {
    console.log(`${work.title} - ${work.words} words`);
  }
} else await add(...works);
