import {RouteUtil} from "../../../share";
import {MpInjectable, MpWindowManager} from "../../core";

@MpInjectable()
export class BrowserWindowManager extends MpWindowManager {


  constructor() {
    super();
  }

  init() {
    return super.init({
      show: false,
      titleBarStyle: "hiddenInset",
      width: 1280,
      height: 720,
      frame: false,
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
    })
  }

}