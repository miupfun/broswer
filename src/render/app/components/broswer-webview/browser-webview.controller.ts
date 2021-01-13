import {Injectable} from '@angular/core';
import {BrowserWebviewComponent} from "./browser-webview.component";
import {LoadURLOptions} from "electron";
import {UrlUtil} from "../../utils/url.util";
import * as Url from "url";

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
        webview.instance.reloadIgnoringCache()
        break
    }
  }

  navigationTo(id: any, url: string, options?: LoadURLOptions) {
    const webview = this.viewViews.find(c => c.id === id)
    if (!webview) {
      return
    }
    let urlParse = ''
    if (UrlUtil.isUrl(url)) {
      urlParse = UrlUtil.format(url)
    } else {
      urlParse = `https://www.baidu.com/s?cl=3&tn=baidutop10&fr=top1000&wd=${url}&rsv_idx=2&rsv_dl=fyb_n_homepage&hisfilter=1`
    }
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
