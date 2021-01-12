import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UrlEncodePipe} from './url-encode.pipe';
import {UrlDecodePipe} from "./url-decode.pipe";


@NgModule({
  declarations: [UrlEncodePipe, UrlDecodePipe],
  exports: [
    UrlDecodePipe
  ],
  imports: [
    CommonModule
  ]
})
export class UrlEncodeModule {
}
