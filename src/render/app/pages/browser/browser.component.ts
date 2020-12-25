import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {BROWSER_STATE} from "./store/browser.state";
import {Observable} from "rxjs";
import {BrowserModel} from "./store/browser.model";
import {BrowserActionsCreateTab, BrowserActionsSelectTab} from "./store/browser.actions";

@Component({
  selector: 'mp-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  @Select(BROWSER_STATE)
  $browserState: Observable<BrowserModel> | undefined;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }
}
