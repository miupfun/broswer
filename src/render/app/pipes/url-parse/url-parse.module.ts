import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { UrlHostPipe } from "./url-host.pipe";

@NgModule({
  declarations: [UrlHostPipe],
  imports: [CommonModule],
  exports: [
    UrlHostPipe
  ]
})
export class UrlParseModule {

}