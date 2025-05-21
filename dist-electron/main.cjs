"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const isDev = !electron_1.app.isPackaged;
function createWindow() {
  const mainWindow = new electron_1.BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    fullscreen: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path_1.default.join(__dirname, "../dist/index.html")); // built Vite output
  }
}
electron_1.app.whenReady().then(() => {
  createWindow();
  electron_1.app.on("activate", () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron_1.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron_1.app.quit();
});
