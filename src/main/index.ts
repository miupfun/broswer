import {app, BrowserWindow} from 'electron';
import {is} from 'electron-util';
import {RouteUtil} from "../share/utils/route.util";

app.on('ready', () => {
  const w = new BrowserWindow({
    show: false,
    frame: !is.windows,
    titleBarStyle: "hiddenInset",
    width: 1280,
    height: 720,
    minWidth: 480,
    minHeight: 480,
    center: true,
    backgroundColor: '#fff',
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      webviewTag: true,
    }
  });
  w.loadURL(RouteUtil.getPageUrl('browser')).then(() => {
    w.show();
  });
});
app.on('window-all-closed', () => {
  app.quit()
  app.exit()
})
