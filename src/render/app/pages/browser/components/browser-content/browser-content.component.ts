import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {
  BrowserActionsCreateTab,
  BrowserActionsDropTab,
  BrowserActionsSelectTab,
  BrowserActionsUpdateTab
} from "../../store/browser.actions";
import {BROWSER_STATE} from "../../store/browser.state";
import {Observable} from "rxjs";
import {BrowserModel} from "../../store/browser.model";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

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

  themeChange(index: number, theme: string) {
    this.store.dispatch(new BrowserActionsUpdateTab(index, {
      theme: theme
    }))
  }

  titleChange(index: number, title: string) {
    this.store.dispatch(new BrowserActionsUpdateTab(index, {
      title: title
    }))
  }

  iconChange(index: number, icons: string[]) {
    this.store.dispatch(new BrowserActionsUpdateTab(index, {
      icon: icons[icons.length - 1] || ''
    }))
  }

  createTab(index: number, winOption: { type: string; url: string }) {
    this.store.dispatch(new BrowserActionsCreateTab(winOption.url)).subscribe(() => {
    })
  }


}
