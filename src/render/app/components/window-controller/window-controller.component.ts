import {Component, OnInit} from '@angular/core';
import {remote, BrowserWindow} from 'electron'

@Component({
  selector: 'mp-window-ctrl',
  templateUrl: './window-controller.template.html',
  styleUrls: ['./window-controller.template.scss']
})
export class WindowControllerComponent implements OnInit {
  isMaxSize: boolean;


  constructor() {
    this.isMaxSize = remote.getCurrentWindow().isMaximized()
  }

  ngOnInit(): void {
  }

  toggleFullScreen() {
    if (this.isMaxSize) {
      remote.getCurrentWindow().unmaximize()
      this.isMaxSize = false
    } else {
      remote.getCurrentWindow().maximize()
      this.isMaxSize = true
    }
  }

  windowMinimize() {
    remote.getCurrentWindow().minimize()
  }
}

