import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {BROWSER_STATE, BrowserState} from "./store/browser.state";
import {Observable} from "rxjs";
import {BrowserModel} from "./store/browser.model";
import {BrowserActionsCreateTab, BrowserActionsHistoryGo, BrowserActionsToggleDevTool} from "./store/browser.actions";
import {BrowserTabEntity, RouteUtil} from "../../../../share";

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


  constructor(private store: Store,
              private elementRef: ElementRef,
              private renderer2: Renderer2) {
    this.$currentTab?.subscribe(currentTab => {
      this.currentTab = currentTab
    })
  }

  ngOnInit(): void {
    this.createNewTab()
  }

  createNewTab() {
    this.store.dispatch(new BrowserActionsCreateTab({
      url: RouteUtil.getPageUrl('new_tab'),
      defaultIcon: 'icon-tab'
    })).subscribe(() => {
    })
  }

  historyGo(bf: -1 | 1 | 0) {
    this.store.dispatch(new BrowserActionsHistoryGo(bf))
  }

  toggleDevTool() {
    this.store.dispatch(new BrowserActionsToggleDevTool())
  }

  openChange(e: boolean) {
    console.log(e)
  }

}
