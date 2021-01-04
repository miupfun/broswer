import {Injectable} from '@angular/core';
import {BrowserWebviewComponent} from "./browser-webview.component";

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

  historyGo(id: any, bf: 0 | 1 | -1) {
    const webview = this.viewViews.find(c => c.id === id)
    if (!webview) {
      return
    }
    switch (bf) {
      case 1:
        webview.instance.goForward()
        break
      case -1:
        webview.instance.goBack()
        break
      default:
        webview.instance.reload()
        break
    }
  }
}
