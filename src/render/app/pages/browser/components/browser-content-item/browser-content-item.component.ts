import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'mp-browser-content-item',
  templateUrl: './browser-content-item.component.html',
  styleUrls: ['./browser-content-item.component.scss']
})
export class BrowserContentItemComponent implements OnInit {

  constructor() {
    console.log('create BrowserContentItemComponent')
  }

  ngOnInit(): void {
  }

}
