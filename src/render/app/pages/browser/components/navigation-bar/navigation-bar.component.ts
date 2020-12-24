import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {BrowserActionsCreateTab, BrowserActionsSelectTab} from "../../store/browser.actions";
import {BROWSER_STATE} from "../../store/browser.state";

@Component({
  selector: 'mp-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Input('color')
  color: string = '';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  addTab() {
    const length = this.store.selectSnapshot(BROWSER_STATE).tabs.length
    this.store.dispatch(new BrowserActionsCreateTab()).subscribe(() => {
      this.store.dispatch(new BrowserActionsSelectTab(length)).subscribe()
    })
  }

}
