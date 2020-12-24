import {Component, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {BROWSER_STATE} from "./store/browser.state";
import {Observable} from "rxjs";
import {BrowserModel} from "./store/browser.model";

@Component({
  selector: 'mp-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  @Select(BROWSER_STATE)
  $browserState: Observable<BrowserModel> | undefined;


  @Select(BROWSER_STATE, 'currentTabIndex')
  $index: Observable<number> | undefined;
  browserModel: BrowserModel | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.$browserState?.subscribe((value) => {
      console.log('change')
      this.browserModel = value
    })

    this.$index?.subscribe((s) => {
      console.log('change -----')
      console.log(s)
    })
  }
}
