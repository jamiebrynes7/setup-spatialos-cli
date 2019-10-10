import fs from 'fs';
import path from 'path';
import download from 'download';
import * as proc from 'process';
import * as core from '@actions/core';

export function getDownloadUrl() : string {
    switch (proc.platform) {
      case "win32":
        return "https://console.improbable.io/toolbelt/download/latest/win";
      case "darwin":
        return "https://console.improbable.io/toolbelt/download/latest/mac"
      case "linux":
        return "https://console.improbable.io/toolbelt/download/latest/linux";
      default:
        throw new Error(`Unsupported platform: ${proc.platform}.`);
    }
  }
  
  export function downloadSpatialCli(url: string, destDir: string) : Promise<void> {
    return new Promise((resolve, reject) => {
      let exeLocation = path.join(destDir, "spatial");
    
      if (proc.platform == "win32") {
        exeLocation += ".exe";
      }
  
      let req = download(url);
      let output = fs.createWriteStream(exeLocation, {
          mode: 0o755
      });
  
      req.pipe(output);
      req.on('end', () => {
          output.close();
          core.debug("Closed file stream.");
          resolve();
      });
      req.on('error', reject);
      output.on('error', reject);
    })
  }