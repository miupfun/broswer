import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {BrowserModel} from "../../store/browser.model";
import {BrowserActionsCloseTab, BrowserActionsSelectTab} from "../../store/browser.actions";
import {Observable} from "rxjs";
import {BROWSER_STATE} from "../../store/browser.state";

@Component({
  selector: 'mp-browser-tab',
  templateUrl: './browser-tab.component.html',
  styleUrls: ['./browser-tab.component.scss']
})
export class BrowserTabComponent implements OnInit {

  @Select(BROWSER_STATE)
  $browserState: Observable<BrowserModel> | undefined


  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  selectTab(index: number) {
    this.store.dispatch(new BrowserActionsSelectTab(index))
  }

  closeTab(index: number) {
    this.store.dispatch(new BrowserActionsCloseTab(index))
  }

}
