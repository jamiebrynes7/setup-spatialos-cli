import fs from 'fs';
import path from 'path';
import * as core from '@actions/core';
import * as proc from 'process';
import { downloadSpatialCli, getDownloadUrl } from './spatial';

async function run() {
  try {
    let url = getDownloadUrl();

    const destDir = path.join(proc.env['HOME'] || "~/", ".spatial");
    fs.mkdir(destDir, {recursive: true}, (err) => {
      throw err;
    });

    await downloadSpatialCli(url, destDir);
    core.addPath(destDir);

  } catch (error) {
    core.setFailed(error.message);
  }
}

async function main() {
  try {
      await run();
  } catch (error) {
      core.setFailed(error.message);
  }
}

main();
