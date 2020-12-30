import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {BrowserActionsCreateTab, BrowserActionsSelectTab} from "../../pages/browser/store/browser.actions";
import {BROWSER_STATE} from "../../pages/browser/store/browser.state";
import Platform = NodeJS.Platform;

@Component({
  selector: 'mp-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Input('backgroundColor')
  backgroundColor: string = '';

  @Input('foregroundColor')
  foregroundColor: string = ''

  platForm: Platform | null = null

  constructor(private store: Store) {
    this.platForm = process.platform
  }

  ngOnInit(): void {
  }

  addTab() {
    const length = this.store.selectSnapshot(BROWSER_STATE).tabs.length
    this.store.dispatch(new BrowserActionsCreateTab()).subscribe(() => {
    })
  }

}
