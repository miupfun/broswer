import {Component, OnInit} from '@angular/core';
import {Action, Select} from "@ngxs/store";
import {BROWSER_STATE} from "../../store/browser.state";
import {Observable} from "rxjs";
import {BrowserModel} from "../../store/browser.model";
import {BrowserActionsSetTabTheme} from "../../store/browser.actions";
import {BrowserWebviewController} from "../../../../components/broswer-webview";

@Component({
  selector: 'mp-browser-content',
  templateUrl: './browser-content.component.html',
  styleUrls: ['./browser-content.component.scss']
})
export class BrowserContentComponent implements OnInit {

  @Select(BROWSER_STATE)
  $store: Observable<BrowserModel> | undefined;

  constructor(private browserController: BrowserWebviewController) {
  }

  ngOnInit(): void {
  }


  @Action(BrowserActionsSetTabTheme)
  setTheme() {
    console.log('----------')
  }

}
