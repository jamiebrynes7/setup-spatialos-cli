import * as path from 'path'
import * as os from 'os';
import * as fs from 'fs';
import { getDownloadUrl, downloadSpatialCli } from '../src/spatial';
import * as process from 'process';

jest.setTimeout(60000);

test('download spatial', async() => {
    let url = getDownloadUrl();
    let tmpDir = os.tmpdir();
    await downloadSpatialCli(url, tmpDir);

    const getExt = () => {
        switch (process.platform) {
            case "win32":
                return ".exe";
            default:
                return "";
        }
    };

    let expectedPath = path.join(tmpDir, `spatial${getExt()}`);
    console.log(expectedPath);
    fs.exists(path.join(tmpDir, "spatial.exe"), (exists) => expect(exists));
});