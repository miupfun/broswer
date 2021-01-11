import {MpAppOn, MpInjectable} from "../../core";
import {BrowserWindowManager} from "../window/browser.window";

@MpInjectable()
export class MainController {

  constructor(private browserWindowManager: BrowserWindowManager) {
  }

  @MpAppOn('ready')
  async appReady() {
    console.log('app ready')
    const window = await this.browserWindowManager.init()
    window.show()
  }
}