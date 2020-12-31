import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {BrowserActionsCreateTab, BrowserActionsSetTabTheme, BrowserActionsUpdateTab} from "../../store/browser.actions";
import {BROWSER_STATE} from "../../store/browser.state";
import {Observable} from "rxjs";
import {BrowserModel} from "../../store/browser.model";

@Component({
  selector: 'mp-browser-content',
  templateUrl: './browser-content.component.html',
  styleUrls: ['./browser-content.component.scss']
})
export class BrowserContentComponent implements OnInit {

  @Select(BROWSER_STATE)
  $store: Observable<BrowserModel> | undefined;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  themeChange(id: string, theme: string) {
    this.store.dispatch(new BrowserActionsUpdateTab(id, {
      theme: theme
    }))
  }

  titleChange(id: string, title: string) {
    this.store.dispatch(new BrowserActionsUpdateTab(id, {
      title: title
    }))
  }

  iconChange(id: string, icons: string[]) {
    this.store.dispatch(new BrowserActionsUpdateTab(id, {
      icon: icons[icons.length - 1] || ''
    }))
  }

  createTab(id: string, winOption: { type: string; url: string }) {
    this.store.dispatch(new BrowserActionsCreateTab(winOption.url, id)).subscribe(() => {
    })
  }
}
