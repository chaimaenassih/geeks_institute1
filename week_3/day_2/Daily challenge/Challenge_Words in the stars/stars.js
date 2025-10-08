
(function () {
  "use strict";

  function toWords(input) {
    return String(input || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
  }

  function printFramed(words) {
    if (!Array.isArray(words) || words.length === 0) {
      console.log("(no words provided)");
      return;
    }
    const maxLen = words.reduce((m, w) => Math.max(m, w.length), 0);
    const border = "*".repeat(maxLen + 4);
    console.log(border);
    for (const w of words) {
      console.log(`* ${w.padEnd(maxLen, " ")} *`);
    }
    console.log(border);
  }

  async function main() {
    // If we're in a browser, use prompt()
    if (typeof prompt === "function") {
      const input = prompt("Enter words separated by commas:", "Hello, World, in, a, frame");
      const words = toWords(input);
      printFramed(words);
      return;
    }

    if (typeof process !== "undefined" && process.stdin) {
      const rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
      });
      await new Promise(resolve => {
        rl.question("Enter words separated by commas: ", answer => {
          const words = toWords(answer);
          printFramed(words);
          rl.close();
          resolve();
        });
      });
      return;
    }

    // If neither env is available
    console.log("Environment not supported. Please run in a browser console or with Node.js.");
  }

  main();
})();
