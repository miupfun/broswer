import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2, SimpleChanges,
  ViewChild
} from '@angular/core';
import {BrowserWebviewController} from "./browser-webview.controller";
import {
  ConsoleMessageEvent,
  DidChangeThemeColorEvent,
  DidFailLoadEvent,
  DidFrameFinishLoadEvent,
  DidNavigateEvent,
  DidNavigateInPageEvent,
  LoadCommitEvent,
  PageFaviconUpdatedEvent,
  PageTitleUpdatedEvent,
  WebviewTag
} from 'electron'

@Component({
  selector: 'mp-browser-webview',
  templateUrl: './browser-webview.component.html',
  styleUrls: ['./browser-webview.component.scss'],
})
export class BrowserWebviewComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @ViewChild('webview', {static: true, read: ElementRef})
  private webview!: ElementRef<WebviewTag>;

  @Input()
  src: string | undefined;

  @Input()
  id: any;

  @Input()
  nodeApiEnable: boolean | undefined

  public get instance() {
    return this.webview.nativeElement
  }

  @Output()
  private loadCommit: EventEmitter<LoadCommitEvent> = new EventEmitter<LoadCommitEvent>()
  @Output()
  private didFinishLoad: EventEmitter<Event> = new EventEmitter<Event>()
  @Output()
  private didFailLoad: EventEmitter<DidFailLoadEvent> = new EventEmitter<DidFailLoadEvent>()
  @Output()
  private didFrameFinishLoad: EventEmitter<DidFrameFinishLoadEvent> = new EventEmitter<DidFrameFinishLoadEvent>()
  @Output()
  private didStartLoading: EventEmitter<Event> = new EventEmitter<Event>()
  @Output()
  private didStopLoading: EventEmitter<Event> = new EventEmitter<Event>()
  @Output()
  private newWindow: EventEmitter<Event> = new EventEmitter<Event>()
  @Output()
  private willNavigate: EventEmitter<Event> = new EventEmitter<Event>()
  @Output()
  private didChangeThemeColor: EventEmitter<DidChangeThemeColorEvent> = new EventEmitter<DidChangeThemeColorEvent>()
  @Output()
  private pageTitleUpdate: EventEmitter<PageTitleUpdatedEvent> = new EventEmitter<PageTitleUpdatedEvent>()
  @Output()
  private pageFaviconUpdated: EventEmitter<PageFaviconUpdatedEvent> = new EventEmitter<PageFaviconUpdatedEvent>()
  @Output()
  private enterHtmlFullScreen: EventEmitter<Event> = new EventEmitter<Event>()
  @Output()
  private leaveHtmlFullScreen: EventEmitter<Event> = new EventEmitter<Event>()
  @Output()
  private consoleMessage: EventEmitter<ConsoleMessageEvent> = new EventEmitter<ConsoleMessageEvent>()
  @Output()
  private didNavigate: EventEmitter<DidNavigateEvent> = new EventEmitter<DidNavigateEvent>()
  @Output()
  private didNavigateInPage: EventEmitter<DidNavigateInPageEvent> = new EventEmitter<DidNavigateInPageEvent>()
  @Output()
  private domReady: EventEmitter<Event> = new EventEmitter<Event>()
  @Output()
  private close: EventEmitter<Event> = new EventEmitter<Event>()
  @Output()
  private crashed: EventEmitter<Event> = new EventEmitter<Event>()
  @Output()
  private pluginCrashed: EventEmitter<Event> = new EventEmitter<Event>()


  constructor(private browserWebviewController: BrowserWebviewController) {
  }

  ngOnInit(): void {
    this.browserWebviewController.register(this)
  }

  ngAfterViewInit(): void {
    this.instance.addEventListener('load-commit', (e) => this.loadCommit.emit(e))
    this.instance.addEventListener('did-finish-load', (e) => this.didFinishLoad.emit(e))
    this.instance.addEventListener('did-fail-load', (e) => this.didFailLoad.emit(e))
    this.instance.addEventListener('did-frame-finish-load', (e) => this.didFrameFinishLoad.emit(e))
    this.instance.addEventListener('did-start-loading', (e) => this.didStartLoading.emit(e))
    this.instance.addEventListener('did-stop-loading', (e) => this.didStopLoading.emit(e))
    this.instance.addEventListener('dom-ready', (e) => this.domReady.emit(e))
    this.instance.addEventListener('page-title-updated', (e) => this.pageTitleUpdate.emit(e))
    this.instance.addEventListener('page-favicon-updated', (e) => this.pageFaviconUpdated.emit(e))
    this.instance.addEventListener('did-change-theme-color', (e) => this.didChangeThemeColor.emit(e))
    this.instance.addEventListener('enter-html-full-screen', (e) => this.enterHtmlFullScreen.emit(e))
    this.instance.addEventListener('leave-html-full-screen', (e) => this.leaveHtmlFullScreen.emit(e))
    this.instance.addEventListener('console-message', (e) => this.consoleMessage.emit(e))
    this.instance.addEventListener('new-window', (e) => this.newWindow.emit(e))
    this.instance.addEventListener('will-navigate', (e) => this.willNavigate.emit(e))
    this.instance.addEventListener('did-navigate', (e) => this.didNavigate.emit(e))
    this.instance.addEventListener('did-navigate-in-page', (e) => this.didNavigateInPage.emit(e))
    this.instance.addEventListener('close', (e) => this.close.emit(e))
    this.instance.addEventListener('crashed', (e) => this.crashed.emit(e))
    this.instance.addEventListener('plugin-crashed', (e) => this.pluginCrashed.emit(e))
  }

  ngOnDestroy(): void {
    this.browserWebviewController.unRegister(this)
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
