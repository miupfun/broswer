import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngxs/store";
import {
  BrowserActionsAddWebHistory,
  BrowserActionsCloseTab,
  BrowserActionsCreateTab,
  BrowserActionsUpdateTab
} from "../../store/browser.actions";
import {BrowserViewEntity} from "../../../../../../share";
import {
  DidChangeThemeColorEvent,
  DidFrameFinishLoadEvent,
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
  browser: BrowserViewEntity | undefined;

  @ViewChild(BrowserWebviewComponent)
  webview: BrowserWebviewComponent | undefined;

  currentIcon: string | undefined;
  currentTheme: string | undefined;
  currentUrl: string | undefined;
  currentTitle: string | undefined;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  themeChange(e: DidChangeThemeColorEvent) {
    if (!this.browser) return
    this.currentTheme = e.themeColor
    this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
      theme: this.currentTheme
    }))
  }

  titleChange(e: PageTitleUpdatedEvent) {
    if (!this.browser) return
    this.currentTitle = e.title
    this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
      title: this.currentTitle
    }))
  }

  iconChange(icons: PageFaviconUpdatedEvent) {
    if (!this.browser) return
    this.currentIcon = icons.favicons[icons.favicons.length - 1]
    this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
      icon: this.currentIcon
    }))
  }

  createTab(winOption: Event | any) {
    if (!this.browser) return
    this.store.dispatch(new BrowserActionsCreateTab({url: winOption.url}, this.browser.id,)).subscribe(() => {
    })
  }

  didStartLoading($event: DidNavigateInPageEvent | any) {
    if (!this.browser) return
    this.currentUrl = $event.target.src
    this.currentTitle = $event.target.getTitle()
    this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
      url: this.currentUrl,
      title: this.currentTitle,
      loading: true
    }))
  }

  didFinishLoad($event: DidFrameFinishLoadEvent | any) {
    if (!this.browser) return
    this.webview?.instance.focus()
    this.currentUrl = $event.target.src
    this.currentTitle = $event.target.getTitle()
    this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
      url: this.currentUrl,
      title: this.currentTitle,
      loading: false
    })).subscribe(() => {
      this.addHistory()
    })

  }

  didStopLoading($event: Event) {
    if (!this.browser) return
    this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
      loading: false
    }))
  }

  didNavigateInPage($event: DidNavigateInPageEvent | any) {
    console.log('didNavigateInPage')
  }

  close(event: Event) {
    if (!this.browser) return
    this.store.dispatch(new BrowserActionsCloseTab(this.browser.id))
  }

  addHistory() {
    setTimeout(() => {
      this.store.dispatch(new BrowserActionsAddWebHistory({
        url: this.currentUrl || '',
        title: this.currentTitle || '',
        icon: this.currentIcon || '',
        time: new Date()
      }))
    }, 1000)
  }
}
