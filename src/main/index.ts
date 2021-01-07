import {app, BrowserView, BrowserWindow, ipcMain} from 'electron';
import {is} from 'electron-util';
import {RouteUtil} from "../share/utils/route.util";

app.on('ready', () => {
  const headerHeight = 36
  const w = new BrowserWindow({
    show: false,
    frame: !is.windows,
    titleBarStyle: "hiddenInset",
    width: 1280,
    height: 720,
    minWidth: 480,
    minHeight: 480,
    center: true,
    fullscreen:true,
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


    const view = new BrowserView()
    view.setBounds({x: 0, y: headerHeight, width: w.getBounds().width, height: w.getBounds().height - headerHeight})
    view.setAutoResize({
      width:true,
      height:true,
      vertical:false,
      horizontal:false
    })
    w.setBrowserView(view)
    view.webContents.loadURL('https://angular.io')
    view.webContents.toggleDevTools()
  });
});
app.on('window-all-closed', () => {
  app.quit()
  app.exit()
})
ipcMain.on('create-new-Tab', () => {

})
