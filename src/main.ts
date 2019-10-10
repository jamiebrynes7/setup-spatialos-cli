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
    fs.mkdirSync(destDir, {recursive: true});

    await downloadSpatialCli(url, destDir);
    core.addPath(destDir);

    exec.exec("spatial version", (err, stdout, stderr) => {
      core.warning(stdout);
      core.warning(stderr);
      if (err !== null) {
        core.error(err.message);
      }
    });

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
