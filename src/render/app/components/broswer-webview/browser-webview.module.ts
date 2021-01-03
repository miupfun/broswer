import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserWebviewComponent} from "./browser-webview.component";
import {BrowserWebviewController} from "./browser-webview.controller";


@NgModule({
  declarations: [BrowserWebviewComponent],
  imports: [
    CommonModule
  ],
  providers: [BrowserWebviewController],
  exports: [BrowserWebviewComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MpBrowserWebviewModule {
}
