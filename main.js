const { BrowserWindow, app, ipcMain } = require("electron")
const { exec } = require("child_process");
const { join } = require("path");

class AudioController {
  playPause() {
    exec("xdotool key XF86AudioPlay");
  }

  prev() {
    exec("xdotool key XF86AudioPrev");
  }

  next() {
    exec("xdotool key XF86AudioNext");
  }
}

const audioController = new AudioController();

const createWindow = () => {

  const win = new BrowserWindow({
    width: 250,
    height: 120,
    alwaysOnTop: true,
    frame: false,
    opacity: 0,
    resizable: true,
    movable: true,
    hasShadow: true,
    autoHideMenuBar: true,
    roundedCorners: true,
    transparent: true,
    center: true,
    title: "JARVIS",
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  win.loadFile('index.html')

}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on("prev", audioController.prev);
  ipcMain.on("next", audioController.next);
  ipcMain.on("playPause", audioController.playPause);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

