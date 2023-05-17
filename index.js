#!/usr/bin/env/ node

const debounce = require("lodash.debounce");
const chokidar = require("chokidar");

const start = debounce(() => {
  console.log("Started Program");
}, 100);

chokidar.watch(".").on("add", start).on("change", start).on("unlink", start);

console.log("hi changed");
