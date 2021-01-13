import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngxs/store";
import {BrowserActionsCloseTab, BrowserActionsCreateTab, BrowserActionsUpdateTab} from "../../store/browser.actions";
import {BrowserViewEntity} from "../../../../../../share/entitys/browser-view.entity";
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

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  themeChange(e: DidChangeThemeColorEvent) {
    if (!this.browser) return
    this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
      theme: e.themeColor
    }))
  }

  titleChange(e: PageTitleUpdatedEvent) {
    if (!this.browser) return
    this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
      title: e.title
    }))
  }

  iconChange(icons: PageFaviconUpdatedEvent) {
    if (!this.browser) return
    this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
      icon: icons.favicons[icons.favicons.length - 1]
    }))
  }


  createTab(winOption: Event | any) {
    if (!this.browser) return
    this.store.dispatch(new BrowserActionsCreateTab({url: winOption.url}, this.browser.id,)).subscribe(() => {
    })
  }

  didStartLoading($event: DidNavigateInPageEvent | any) {
    if (!this.browser) return
    this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
      url: $event.target.src,
      title: $event.target.getTitle(),
      loading:true
    }))
  }

  didFinishLoad($event: DidFrameFinishLoadEvent | any) {
    if (!this.browser) return
    this.webview?.instance.focus()
    this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
      url: $event.target.src,
      title: $event.target.getTitle(),
      loading:false
    }))
  }

  didStopLoading($event: Event) {
    if (!this.browser) return
    this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
      loading:false
    }))
  }

  didNavigateInPage($event: DidNavigateInPageEvent | any) {
    console.log('didNavigateInPage')
  }

  close(event: Event) {
    if (!this.browser) return
    this.store.dispatch(new BrowserActionsCloseTab(this.browser.id))
  }
}
