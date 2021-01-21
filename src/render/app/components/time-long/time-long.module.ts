import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimeLongPipe} from './time-long.pipe';


@NgModule({
  declarations: [TimeLongPipe],
  imports: [
    CommonModule
  ],
  exports: [TimeLongPipe]
})
export class TimeLongModule {
}
