import fs from 'fs';
import path from 'path';
import download from 'download';
import * as proc from 'process';
import * as core from '@actions/core';

export function getSpatialOauthConfigDir(): string {

  let configParentDir: string;

  switch (proc.platform) {
    case "win32":
      const localAppData = proc.env['LOCALAPPDATA'];

      if (!localAppData) {
        throw new Error("Could not find local app data directory.");
      }

      configParentDir = localAppData;
      break;
    case "darwin":
    case "linux":
      const homeDir = proc.env['HOME'] || "~/";
      
      if (!homeDir) {
        throw new Error("Could not find HOME directory.")
      }

      configParentDir = homeDir;
      break;
    default:
      throw new Error(`Unsupported platform: ${proc.platform}.`);
  }

  return path.join(configParentDir, ".improbable", "oauth2");
}

export function getDownloadUrl(version: string) : string {
    switch (proc.platform) {
      case "win32":
        return `https://console.improbable.io/toolbelt/download/${version}/win`;
      case "darwin":
        return `https://console.improbable.io/toolbelt/download/${version}/mac`;
      case "linux":
        return `https://console.improbable.io/toolbelt/download/${version}/linux`;
      default:
        throw new Error(`Unsupported platform: ${proc.platform}.`);
    }
  }
  
  export function downloadSpatialCli(url: string, destDir: string) : Promise<void> {
    return new Promise(async (resolve, reject) => {
      let exeLocation = path.join(destDir, "spatial");
    
      if (proc.platform == "win32") {
        exeLocation += ".exe";
      }

      try {
        await download(url).then((data) => {
          fs.writeFileSync(exeLocation, data, {
            mode: 0o755
          });
          resolve();
        });
      }
      catch (error) {
        reject(error);
      }
    })
  }