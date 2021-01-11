import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {BrowserModel} from "../../store/browser.model";
import {BrowserActionsCloseTab, BrowserActionsDropTab, BrowserActionsSelectTab} from "../../store/browser.actions";
import {Observable} from "rxjs";
import {BROWSER_STATE} from "../../store/browser.state";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {BrowserTabEntity} from "../../../../../../share";

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

  selectTab(tab: BrowserTabEntity) {
    this.store.dispatch(new BrowserActionsSelectTab(tab.id))
  }

  closeTab(tab: BrowserTabEntity) {
    this.store.dispatch(new BrowserActionsCloseTab(tab.id))
  }

  drop(event: CdkDragDrop<any>) {
    this.store.dispatch(new BrowserActionsDropTab(event.previousIndex, event.currentIndex))
  }
}
