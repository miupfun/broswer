import {Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {Store} from "@ngxs/store";
import {BrowserActionsCreateTab, BrowserActionsSelectTab} from "../../pages/browser/store/browser.actions";
import {BROWSER_STATE} from "../../pages/browser/store/browser.state";
import Process = NodeJS.Process;
import {RouteUtil} from "../../../../share/utils/route.util";

@Component({
  selector: 'mp-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnChanges {

  process: Process = process;

  constructor(private  renderer2: Renderer2, private electronRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
