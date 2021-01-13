import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {UrlUtil} from "../../utils/url.util";

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
    const url = this.value
    let urlParse = ''
    if (UrlUtil.isUrl(url)) {
      urlParse = UrlUtil.format(url)
    } else {
      urlParse = `https://www.baidu.com/s?cl=3&tn=baidutop10&fr=top1000&wd=${url}&rsv_idx=2&rsv_dl=fyb_n_homepage&hisfilter=1`
    }
    window.open(UrlUtil.format(urlParse))
    window.close()
  }

  ngAfterViewInit(): void {
  }
}
