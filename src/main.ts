import fs from 'fs';
import path from 'path';
import * as core from '@actions/core';
import * as proc from 'process';
import { downloadSpatialCli, getDownloadUrl } from './spatial';

async function run() {
  try {
    let url = getDownloadUrl();

    const destDir = path.join(proc.env['HOME'] || "~/", ".spatial");
    fs.mkdir(destDir, (err) => {
      throw new Error(err && err.message || "Unknown error occured when creating directory.");
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
