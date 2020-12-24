import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'mp-broswer-webview',
  templateUrl: './broswer-webview.component.html',
  styleUrls: ['./broswer-webview.component.scss'],
})
export class BroswerWebviewComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('webview', {static: true, read: ElementRef})
  private webview!: ElementRef;

  @Input()
  src: string | undefined;

  @Output()
  themeChange: EventEmitter<string> = new EventEmitter<string>()
  @Output()
  titleChange: EventEmitter<string> = new EventEmitter<string>()
  @Output()
  iconChange: EventEmitter<string[]> = new EventEmitter<string[]>()

  @Output()
  newWindow: EventEmitter<{ type: string, url: string }> = new EventEmitter<{ type: string, url: string }>()

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.webview.nativeElement.addEventListener('did-start-loading', () => {
    })
    this.webview.nativeElement.addEventListener('did-stop-loading', () => {
    })
    this.webview.nativeElement.addEventListener('new-window', (e: any) => {
      this.newWindow.emit({
        type: e.type,
        url: e.url
      })
    })
    this.webview.nativeElement.addEventListener('will-navigate', () => {
    })
    this.webview.nativeElement.addEventListener('did-navigate', () => {
    })

    this.webview.nativeElement.addEventListener('did-navigate-in-page', () => {
    })

    this.webview.nativeElement.addEventListener('did-change-theme-color', (e: any) => {
      this.themeChange.emit(e.themeColor)
    })
    this.webview.nativeElement.addEventListener('page-title-updated', (e: any) => {
      this.titleChange.emit(e.title)
    })
    this.webview.nativeElement.addEventListener('page-favicon-updated', (e: any) => {
      this.iconChange.emit(e.favicons || [])
    })
    this.webview.nativeElement.addEventListener('dom-ready', () => {
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      console.log(changes.src.currentValue)
    }
  }
}
