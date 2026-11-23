// The One-Line Laugh — make.fun bounty
// One funny line, a single sentence of at most 200 characters.
// Writes the line to /output/entry.txt (no trailing newline).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "My printer only jams on urgent documents, which is how I know it can read.";

const OUTPUT_PATH = process.env.ENTRY_OUTPUT || "/output/entry.txt";

// The turn: a printer jamming is a dull everyday annoyance — until the
// last four words reframe it as a creature that reads the room and picks
// its moments. The machine is not broken; it is judging you.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`Line must be 1-200 characters, got ${line.length}.`);
  }

  if (line.includes("\n")) {
    throw new Error("Line must be a single line.");
  }

  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("Line must not contain control characters.");
  }

  if (line.trim().length === 0) {
    throw new Error("Line must not be only whitespace.");
  }
}

validateLine(LINE);

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");

console.log(`Wrote ${LINE.length} characters to ${OUTPUT_PATH}`);
