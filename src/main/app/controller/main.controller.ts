import {MpAppOn, MpInjectable} from "../../core";
import {BrowserWindow} from "../window/browser.window";

@MpInjectable()
export class MainController {

  constructor(private browserWindow: BrowserWindow) {
  }

  @MpAppOn('ready')
  appReady() {
    console.log('app ready')
    this.browserWindow.once('ready-to-show', () => {
      console.log('ready to show')
      this.browserWindow.show()
    })
  }
}