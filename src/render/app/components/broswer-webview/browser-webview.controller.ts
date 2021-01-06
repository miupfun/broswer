import {Injectable} from '@angular/core';
import {BrowserWebviewComponent} from "./browser-webview.component";
import {LoadURLOptions} from "electron";
import {UrlUtil} from "../../utils/url.util";

@Injectable({
  providedIn: 'any'
})
export class BrowserWebviewController {

  private viewViews: BrowserWebviewComponent[] = []

  constructor() {
  }

  register(component: BrowserWebviewComponent) {
    if (!this.viewViews.includes(component)) {
      this.viewViews.push(component)
    }
  }

  unRegister(component: BrowserWebviewComponent) {
    this.viewViews = this.viewViews.filter(com => com !== component)
  }

  historyGo(id: any, bf: 0 | 1 | -1) {
    const webview = this.viewViews.find(c => c.id === id)
    if (!webview) {
      return
    }
    switch (bf) {
      case 1:
        webview.instance.executeJavaScript(`history.forward()`).then()
        break
      case -1:
        webview.instance.executeJavaScript(`history.back()`).then()
        break
      default:
        webview.instance.reload()
        break
    }
  }

  navigationTo(id: any, url: string, options?: LoadURLOptions) {
    const webview = this.viewViews.find(c => c.id === id)
    if (!webview) {
      return
    }
    const urlParse = UrlUtil.format(url)
    webview.instance.executeJavaScript(`location.href="${urlParse}"`).then()
  }

  toggleDevTool(id: any) {
    const webview = this.viewViews.find(c => c.id === id)
    if (!webview) {
      return
    }
    if (webview.instance.isDevToolsOpened()) {
      webview.instance.closeDevTools()
    } else {
      webview.instance.openDevTools()
    }
  }
}
