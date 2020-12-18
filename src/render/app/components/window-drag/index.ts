import { NgModule } from "@angular/core";
import { ElementRef, Renderer2, OnInit, Input } from '@angular/core';
import { Directive } from "@angular/core";

@Directive({ selector: '[mpWinDrag]' }
)
export class WindowDragDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
  }

  @Input('mpWinDrag')
  canDrag: boolean | 'true' | 'false' | '' = '';

  ngOnInit(): void {
    switch (this.canDrag) {
      case '':
      case 'true':
      case true:
        this.renderer2.setStyle(this.elementRef.nativeElement, '-webkit-app-region', 'drag')
        break
      case false:
      case 'false':
        this.renderer2.setStyle(this.elementRef.nativeElement, '-webkit-app-region', 'no-drag')
        break
    }

  }

}


@NgModule({
  declarations: [WindowDragDirective],
  exports: [WindowDragDirective]
})
export class MpWindowDragModule {

}