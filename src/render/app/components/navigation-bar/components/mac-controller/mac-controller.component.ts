import {Component, NgZone, OnInit} from '@angular/core';
import {remote} from "electron";

@Component({
  selector: 'mp-mac-controller',
  templateUrl: './mac-controller.component.html',
  styleUrls: ['./mac-controller.component.scss']
})
export class MacControllerComponent implements OnInit {
  isFullScreen: boolean = remote.getCurrentWindow().isFullScreen()

  constructor(private zone: NgZone) {
  }

  ngOnInit(): void {
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
    remote.getCurrentWindow().on('will-resize', () => {
      this.zone.run(() => {
        this.isFullScreen = false;
      })
    })
    
    

  }

}
