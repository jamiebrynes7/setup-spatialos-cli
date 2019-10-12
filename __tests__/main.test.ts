import * as path from 'path'
import * as os from 'os';
import * as fs from 'fs';
import { getDownloadUrl, downloadSpatialCli } from '../src/spatial';
import * as process from 'process';

jest.setTimeout(60000);

interface DownloadLocation {
    downloadDir: string,
    executable: string
}

async function getTempDownloadLocation():  Promise<DownloadLocation> {
    return new Promise((resolve, reject) => {
        fs.mkdtemp(`${os.tmpdir()}/`, (err, data) => {
            if (err != null) {
                reject(err);
            }

            const getExt = () => {
                switch (process.platform) {
                    case "win32":
                        return ".exe";
                    default:
                        return "";
                }
            };

            let spatialPath = path.join(data, `spatial${getExt()}`);

            resolve({
                downloadDir: data,
                executable: spatialPath
            });
        });
    });
}

test('get latest spatial', async() => {
    let url = getDownloadUrl("latest");
    let downloadLocation = await getTempDownloadLocation();

    await downloadSpatialCli(url, downloadLocation.downloadDir);
    
    console.log(downloadLocation.executable);
    fs.exists(downloadLocation.executable, (exists) => expect(exists));
});

test('get pinned spatial', async() => {
    let url = getDownloadUrl("20190416.094616.a865bb5b54");
    let downloadLocation = await getTempDownloadLocation();

    await downloadSpatialCli(url, downloadLocation.downloadDir);
    
    console.log(downloadLocation.executable);
    fs.exists(downloadLocation.executable, (exists) => expect(exists));
});

test('nonexisting version fails', async() => {
    let url = getDownloadUrl("20190418.doesnt.exist");
    let downloadLocation = await getTempDownloadLocation();

    expect(() => {
        downloadSpatialCli(url, downloadLocation.downloadDir).then(
            success => { expect(false); }, 
            err => {});
    });
})
