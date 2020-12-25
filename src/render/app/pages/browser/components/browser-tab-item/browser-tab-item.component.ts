import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BrowserTabEntity} from "../../../../entitys/browser-tab.entity";
import {Store} from "@ngxs/store";

@Component({
  selector: 'mp-browser-tab-item',
  templateUrl: './browser-tab-item.component.html',
  styleUrls: ['./browser-tab-item.component.scss']
})
export class BrowserTabItemComponent implements OnInit {
  @Input()
  tab: BrowserTabEntity | undefined;

  @Input()
  active: boolean = false

  @Output()
  select: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store: Store) {
    console.log('create tab')
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
}
