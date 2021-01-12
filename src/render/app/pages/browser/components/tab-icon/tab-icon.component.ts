import {Component, Input, OnInit} from '@angular/core';
import {BrowserTabEntity} from "../../../../../../share";

@Component({
  selector: 'mp-tab-icon',
  templateUrl: './tab-icon.component.html',
  styleUrls: ['./tab-icon.component.scss']
})
export class TabIconComponent implements OnInit {

  @Input()
  tab: BrowserTabEntity | undefined

  constructor() {
  }

  ngOnInit(): void {
  }

}
