import {Component, OnInit} from '@angular/core';
import {Select, Selector, Store} from "@ngxs/store";
import {BrowserActionsCreateTab, BrowserActionsSelectTab, BrowserActionsUpdateTab} from "../../store/browser.actions";
import {BrowserTabEntity} from "../../../../entitys/browser-tab.entity";
import {BROWSER_STATE} from "../../store/browser.state";
import {Observable} from "rxjs";

@Component({
  selector: 'mp-browser-content',
  templateUrl: './browser-content.component.html',
  styleUrls: ['./browser-content.component.scss']
})
export class BrowserContentComponent implements OnInit {

  @Select(BROWSER_STATE, 'tabs')
  $tabs: Observable<BrowserTabEntity[]> | undefined;

  @Select(BROWSER_STATE, 'currentTabIndex')
  $currentTabIndex: Observable<number> | undefined

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.$tabs?.subscribe(s => {
      console.log(s)
    })
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
    this.store.dispatch(new BrowserActionsCreateTab(index, winOption.url)).subscribe(() => {
      this.store.dispatch(new BrowserActionsSelectTab(index + 1))
    })
  }
}
