#!/usr/bin/env node

import { execSync } from "child_process";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const git_hash = execSync("git rev-parse --short HEAD").toString().trim();

console.log(`${pkg.version}-${git_hash}`);
