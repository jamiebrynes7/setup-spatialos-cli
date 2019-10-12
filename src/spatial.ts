import fs from 'fs';
import path from 'path';
import download from 'download';
import * as proc from 'process';
import * as core from '@actions/core';

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