import { app, BrowserWindow } from 'electron';
import { DemoClass } from './demo';
import { is, api, showAboutWindow, openSystemPreferences } from 'electron-util';
import * as Path from 'path';

app.on('ready', () => {
  new DemoClass().say()
  console.log(is.macos)
  const w = new BrowserWindow({
    show: false,
    frame: !is.windows,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,
      nodeIntegrationInWorker: true,
      contextIsolation: false
    }
  });
  w.loadURL(process.env.$RENDER as string).then(() => {
    w.show();
    openSystemPreferences('security')
  });
});
