import {Component, NgZone, OnInit} from '@angular/core';
import {remote} from 'electron'
import Platform = NodeJS.Platform;

@Component({
  selector: 'mp-window-ctrl',
  templateUrl: './window-controller.template.html',
  styleUrls: ['./window-controller.template.scss']
})
export class WindowControllerComponent implements OnInit {
  isMaxSize: boolean;
  isFullScreen: boolean = remote.getCurrentWindow().isFullScreen()

  constructor(private zone: NgZone) {
    this.isMaxSize = remote.getCurrentWindow().isMaximized()
  }

  ngOnInit(): void {
    remote.getCurrentWindow().on('maximize', () => {
      this.zone.run(() => {
        this.isMaxSize = true
      })
    })

    remote.getCurrentWindow().on('unmaximize', () => {
      this.zone.run(() => {
        this.isMaxSize = false
      })
    })

    remote.getCurrentWindow().on('enter-full-screen', () => {
      this.zone.run(() => {
        this.isFullScreen = true
      })
    })

    remote.getCurrentWindow().on('leave-full-screen', () => {
      this.zone.run(() => {
        this.isFullScreen = false
      })
    })
  }

  toggleFullScreen() {
    if (this.isMaxSize) {
      remote.getCurrentWindow().unmaximize()
    } else {
      remote.getCurrentWindow().maximize()
    }
  }

  windowMinimize() {
    remote.getCurrentWindow().minimize()
  }

  windowClose() {
    remote.getCurrentWindow().close()
  }
}

