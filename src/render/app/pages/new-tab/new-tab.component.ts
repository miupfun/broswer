import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {UrlUtil} from "../../utils/url.util";
import * as Url from "url";

@Component({
  selector: 'mp-new-tab',
  templateUrl: './new-tab.component.html',
  styleUrls: ['./new-tab.component.scss']
})
export class NewTabComponent implements OnInit, AfterViewInit {

  value: string = ''

  constructor(private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('新的标签页')
  }

  submit() {
    if (!this.value) {
      return
    }
    window.open(UrlUtil.format(this.value))
    window.close()
  }

  ngAfterViewInit(): void {
  }
}
