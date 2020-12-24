import {Component, Input, OnInit} from '@angular/core';
import {BROWSER_STATE, BrowserState} from "../../store/browser.state";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {BrowserModel} from "../../store/browser.model";
import {BrowserActionsSelectTab} from "../../store/browser.actions";

@Component({
  selector: 'mp-browser-tab',
  templateUrl: './browser-tab.component.html',
  styleUrls: ['./browser-tab.component.scss']
})
export class BrowserTabComponent implements OnInit {

  @Input()
  browserModel: BrowserModel | undefined;

  constructor(private store: Store) {
  }

  ngOnInit(): void {

  }

  selectTab(index: number) {
    this.store.dispatch(new BrowserActionsSelectTab(index))
  }
}
