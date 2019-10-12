import fs from 'fs';
import path from 'path';
import * as core from '@actions/core';
import * as proc from 'process';
import exec from 'child_process';
import { downloadSpatialCli, getDownloadUrl } from './spatial';

async function run() {
  try {
    const version = core.getInput("version");
    const url = getDownloadUrl(version);

    const homeDir = proc.env['HOME'] || "~/";
    const destDir = path.join(homeDir, ".spatial");
    fs.mkdirSync(destDir, {recursive: true});

    await downloadSpatialCli(url, destDir);
    core.addPath(destDir);

    // Setup configuration
    const configDir = path.join(homeDir, ".improbable", "oauth2");
    fs.mkdirSync(configDir, { recursive: true });

    const oauthTokenFile = path.join(configDir, "oauth2_refresh_token");
    const oauthToken = core.getInput("oauth_token");
    fs.writeFileSync(oauthTokenFile, oauthToken);

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
