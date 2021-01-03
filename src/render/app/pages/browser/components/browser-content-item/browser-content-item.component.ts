import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {BrowserActionsCreateTab, BrowserActionsUpdateTab} from "../../store/browser.actions";
import {BrowserViewEntity} from "../../../../entitys/browser-view.entity";

@Component({
  selector: 'mp-browser-content-item',
  templateUrl: './browser-content-item.component.html',
  styleUrls: ['./browser-content-item.component.scss']
})
export class BrowserContentItemComponent implements OnInit {


  @Input('browser')
  browser: BrowserViewEntity | null = null;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  themeChange(theme: string) {
    if (this.browser) {
      this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
        theme: theme
      }))
    }
  }

  titleChange(title: string) {
    if (this.browser)
      this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
        title: title
      }))
  }

  iconChange(icons: string[]) {
    if (this.browser)
      this.store.dispatch(new BrowserActionsUpdateTab(this.browser.id, {
        icon: icons[icons.length - 1] || ''
      }))
  }

  createTab( winOption: { type: string; url: string }) {
    if(this.browser)
    this.store.dispatch(new BrowserActionsCreateTab(this.browser.id,winOption.url)).subscribe(() => {
    })
  }

}
