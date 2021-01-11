import {MpBrowserWindow, MpInjectable} from "../../core";
import {RouteUtil} from "../../../share";

@MpInjectable()
export class BrowserWindow extends MpBrowserWindow {

  constructor() {
    super({
      show: false,
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
      },
      url: RouteUtil.getPageUrl('browser'),
    });
  }


}