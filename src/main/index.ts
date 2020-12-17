import { app, BrowserWindow } from 'electron';

app.on('ready', () => {
  const w = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    titleBarStyle: "hidden",
    tabbingIdentifier: 'accelerometer',
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,
      nodeIntegrationInWorker: true,
      contextIsolation: false
    }
  });
  w.loadURL(process.env.$RENDER as string).then(() => {
    console.log('2' + Date.now())
    console.log('2' + Date.now())
    w.show();
  });
});
