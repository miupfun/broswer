import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {BrowserState} from "../../store/browser.state";
import {Observable} from "rxjs";
import {BrowserHistoryEntity} from "../../../../../../share";
import {
  BrowserActionsCreateTab,
  BrowserActionsFinishEditUrl,
  BrowserActionsNavigationTo
} from "../../store/browser.actions";

@Component({
  selector: 'mp-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {


  @Select(BrowserState.history)
  $viewHistory: Observable<BrowserHistoryEntity[]> | undefined

  constructor(private store: Store) {
  }

  openNewTab(history: BrowserHistoryEntity) {
    let currentTab = this.store.selectSnapshot(BrowserState.currentTab);
    if (currentTab) {
      this.store.dispatch(new BrowserActionsNavigationTo(currentTab.id, history.url))
    }
  }

  ngOnInit(): void {
  }

}
