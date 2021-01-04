import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngxs/store";
import {BrowserActionsCreateTab, BrowserActionsUpdateTab} from "../../store/browser.actions";
import {BrowserViewEntity} from "../../../../entitys/browser-view.entity";
import {
  DidChangeThemeColorEvent,
  DidNavigateInPageEvent,
  PageFaviconUpdatedEvent,
  PageTitleUpdatedEvent
} from "electron";
import {BrowserWebviewComponent} from "../../../../components/broswer-webview";

@Component({
  selector: 'mp-browser-content-item',
  templateUrl: './browser-content-item.component.html',
  styleUrls: ['./browser-content-item.component.scss']
})
export class BrowserContentItemComponent implements OnInit {


  @Input('browser')
  browser: BrowserViewEntity | null = null;

  @ViewChild(BrowserWebviewComponent)
  webview: BrowserWebviewComponent | null = null;


  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  themeChange(e: DidChangeThemeColorEvent) {
    if (this.browser) {
      this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
        theme: e.themeColor
      }))
    }
  }

  titleChange(e: PageTitleUpdatedEvent) {
    if (this.browser)
      this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
        title: e.title
      }))
  }

  iconChange(icons: PageFaviconUpdatedEvent) {
    if (this.browser)
      this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
        icon: icons.favicons[icons.favicons.length - 1]
      }))
  }

  loadFinish(webview: Document | any) {
    console.log(webview)
  }

  createTab(winOption: Event | any) {
    if (this.browser)
      this.store.dispatch(new BrowserActionsCreateTab(this.browser.id, winOption.url)).subscribe(() => {
      })
  }

  didNavigateInPage($event: DidNavigateInPageEvent | any) {
    if (this.browser) {
      this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
        canGoForward: $event.target?.canGoForward(),
        canGoBack: $event.target?.canGoBack(),
        url: $event.target.getURL(),
        title: $event.target.getTitle()
      }))
    }
  }
}
