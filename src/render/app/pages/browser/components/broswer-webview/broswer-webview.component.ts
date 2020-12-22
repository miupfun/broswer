import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'mp-broswer-webview',
  templateUrl: './broswer-webview.component.html',
  styleUrls: ['./broswer-webview.component.scss']
})
export class BroswerWebviewComponent implements OnInit, AfterViewInit {

  @ViewChild('webview', {static: true, read: ElementRef})
  private webview!: ElementRef;

  private src: string = 'http://www.baidu.com'

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.webview.nativeElement.addEventListener('did-start-loading', () => {
      console.log('did-start-loading')
    })
    this.webview.nativeElement.addEventListener('did-stop-loading', () => {
      console.log('did-stop-loading')
    })
    this.webview.nativeElement.addEventListener('new-window', () => {
      console.log('new-window')
    })
    this.webview.nativeElement.addEventListener('will-navigate', () => {
      console.log('will-navigate')
    })
    this.webview.nativeElement.addEventListener('did-navigate', () => {
      console.log('did-navigate')
    })
    this.webview.nativeElement.addEventListener('did-change-theme-color', (e: Event) => {
      console.log('did-change-theme-color')
      console.log(e)
    })
    this.webview.nativeElement.addEventListener('did-navigate-in-page', () => {
      console.log('did-navigate-in-page')
    })
    this.webview.nativeElement.addEventListener('dom-ready', () => {
    })
  }

}
