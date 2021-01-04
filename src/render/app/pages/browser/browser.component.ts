import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {BROWSER_STATE, BrowserState} from "./store/browser.state";
import {Observable} from "rxjs";
import {BrowserModel} from "./store/browser.model";
import {BrowserActionsCreateTab, BrowserActionsHistoryGo} from "./store/browser.actions";
import {BrowserTabEntity} from "../../entitys/browser-tab.entity";

@Component({
  selector: 'mp-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {


  @Select(BROWSER_STATE)
  $browserState: Observable<BrowserModel> | undefined;

  @Select(BrowserState.currentTab)
  $currentTab: Observable<BrowserTabEntity> | undefined;

  currentTab: BrowserTabEntity | undefined;


  constructor(private store: Store) {
    this.$currentTab?.subscribe(s => this.currentTab = s)
  }

  ngOnInit(): void {
    this.createNewTab()
  }

  createNewTab() {
    this.store.dispatch(new BrowserActionsCreateTab())
  }

  historyGo(bf: -1 | 1 | 0) {
    this.store.dispatch(new BrowserActionsHistoryGo(bf))
  }
}
