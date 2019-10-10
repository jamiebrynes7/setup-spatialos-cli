import fs from 'fs';
import path from 'path';
import * as core from '@actions/core';
import * as proc from 'process';
import exec from 'child_process';
import { downloadSpatialCli, getDownloadUrl } from './spatial';

async function run() {
  try {
    let url = getDownloadUrl();

    const destDir = path.join(proc.env['HOME'] || "~/", ".spatial");
    fs.mkdir(destDir, {recursive: true}, (err) => {
      if (err != null) {
        throw err;
      }
    });

    await downloadSpatialCli(url, destDir);
    core.addPath(destDir);

    exec.exec("spatial version");

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
