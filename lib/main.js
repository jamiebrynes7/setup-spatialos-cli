"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const download_1 = __importDefault(require("download"));
const core = __importStar(require("@actions/core"));
const proc = __importStar(require("process"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let url = getDownloadUrl();
            const destDir = path_1.default.join(proc.env['HOME'] || "~/", ".spatial");
            fs_1.default.mkdir(destDir, (err) => {
                throw new Error(err && err.message || "Unknown error occured when creating directory.");
            });
            yield downloadSpatialCli(url, destDir);
            core.addPath(destDir);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
function getDownloadUrl() {
    switch (proc.platform) {
        case "win32":
            return "https://console.improbable.io/toolbelt/download/latest/win";
        case "darwin":
            return "https://console.improbable.io/toolbelt/download/latest/mac";
        case "linux":
            return "https://console.improbable.io/toolbelt/download/latest/linux";
        default:
            throw new Error(`Unsupported platform: ${proc.platform}.`);
    }
}
function downloadSpatialCli(url, destDir) {
    return new Promise((resolve, reject) => {
        let exeLocation = path_1.default.join(destDir, "spatial");
        if (proc.platform == "win32") {
            exeLocation += ".exe";
        }
        let req = download_1.default(url);
        let output = fs_1.default.createWriteStream(exeLocation, {
            mode: 0o755
        });
        req.pipe(output);
        req.on('end', () => {
            output.close();
            resolve();
        });
        req.on('error', reject);
        output.on('error', reject);
    });
}
