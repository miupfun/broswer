import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {environment} from "../../../environments/environment";
import {BrowserWebviewController} from "./browser-webview.controller";

@Component({
  selector: 'mp-browser-webview',
  templateUrl: './browser-webview.component.html',
  styleUrls: ['./browser-webview.component.scss'],
})
export class BrowserWebviewComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('webview', {static: true, read: ElementRef})
  private webview!: ElementRef;


  @Input()
  id: any = BrowserWebviewComponent.nextId();

  @Input()
  src: string | undefined;


  nodeApiEnable: boolean = false

  @Output()
  themeChange: EventEmitter<string> = new EventEmitter<string>()
  @Output()
  titleChange: EventEmitter<string> = new EventEmitter<string>()
  @Output()
  iconChange: EventEmitter<string[]> = new EventEmitter<string[]>()

  @Output()
  newWindow: EventEmitter<{ type: string, url: string }> = new EventEmitter<{ type: string, url: string }>()

  constructor(private renderer2: Renderer2, private browserWebviewController: BrowserWebviewController) {
    console.log('create webview')
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

    this.webview.nativeElement.addEventListener('dom-ready', (e: any) => {
      this.webview.nativeElement.openDevTools({
        mode: "right"
      })
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && changes.src.currentValue) {
      this.nodeApiEnable = changes.src.currentValue.startsWith(environment.rendererUrl)
    }
  }

  ngOnDestroy(): void {


  }

  private static currentId = 0;

  public static nextId() {
    return this.currentId++
  }
}
