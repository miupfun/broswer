import {app, BrowserWindow} from 'electron';
import {is, openSystemPreferences} from 'electron-util';

app.on('ready', () => {
  const w = new BrowserWindow({
    show: false,
    frame: !is.windows,
    titleBarStyle: "hidden",
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
