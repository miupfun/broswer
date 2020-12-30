import {app, BrowserWindow} from 'electron';
import {is} from 'electron-util';

app.on('ready', () => {
  const w = new BrowserWindow({
    show: false,
    frame: !is.windows,
    titleBarStyle: "hidden",
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    center: true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      webviewTag: true
    }
  });
  w.loadURL(`${process.env.$RENDER}#/browser`).then(() => {
    w.show();
  });
});
