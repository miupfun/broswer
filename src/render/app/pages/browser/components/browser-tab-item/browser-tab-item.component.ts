import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BrowserTabEntity} from "../../../../../../share/entitys/browser-tab.entity";
import {Store} from "@ngxs/store";
import {BrowserActionsCloseTab, BrowserActionsEditUrl} from "../../store/browser.actions";

@Component({
  selector: 'mp-browser-tab-item',
  templateUrl: './browser-tab-item.component.html',
  styleUrls: ['./browser-tab-item.component.scss']
})
export class BrowserTabItemComponent implements OnInit {
  @Input()
  tab: BrowserTabEntity | null = null;

  @Input()
  active: boolean = false

  @Output()
  select: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  selectTab() {
    this.select.emit()
  }

  closeTab(e: Event) {
    e.stopPropagation()
    this.close.emit()
  }

  editTabUrl() {
    if (!this.tab) {
      return
    }
    if (this.tab.options.tabUrlReadOnly) {
      return;
    }
    this.store.dispatch(new BrowserActionsEditUrl(this.tab.id))
  }
}
