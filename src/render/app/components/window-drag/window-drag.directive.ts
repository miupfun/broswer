import { ElementRef, Renderer2, OnInit, Input } from '@angular/core';
import { Directive } from "@angular/core";

@Directive({ selector: '[mpWinDrag]' }
)
export class WindowDragDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
  }

  @Input('mpWinDrag')
  isDrag: any = true;

  ngOnInit(): void {
    if (this.isDrag === '0' || this.isDrag === 'false' || this.isDrag === false) {
      this.renderer2.setStyle(this.elementRef.nativeElement, '-webkit-app-region', 'no-drag')
    } else {
      this.renderer2.setStyle(this.elementRef.nativeElement, '-webkit-app-region', 'drag')
    }
  }

}