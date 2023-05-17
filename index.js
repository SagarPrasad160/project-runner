#!/usr/bin/env/ node

const debounce = require("lodash.debounce");
const chokidar = require("chokidar");
const program = require("caporal");
const fs = require("fs");
const { spawn } = require("child_process");

program
  .version("1.0.0")
  .argument("[filename]", "Name of file to execute")
  .action(async ({ filename }) => {
    const name = filename || "index.js";
    try {
      await fs.promises.access(name);
    } catch (error) {
      throw new Error(`${name} file not found`);
    }

    const start = debounce(() => {
      spawn("node", [name], { stdio: "inherit" });
    }, 100);

    chokidar
      .watch(".", {
        ignored: /(\.git)|(node_modules)/,
      })
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
  });

program.parse(process.argv);
