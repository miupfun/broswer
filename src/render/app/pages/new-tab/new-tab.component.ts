import {Component, Inject, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {UrlUtil} from "../../utils/url.util";

@Component({
  selector: 'mp-new-tab',
  templateUrl: './new-tab.component.html',
  styleUrls: ['./new-tab.component.scss']
})
export class NewTabComponent implements OnInit {

  value: string = ''

  constructor(private title: Title, @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.title.setTitle('asd')
    this.document.getElementById('favicon')?.setAttribute('href', '/assets/favicon/tab.svg')
  }

  submit() {
    if (!this.value)
      return
    location.href = UrlUtil.format(this.value)
  }
}
