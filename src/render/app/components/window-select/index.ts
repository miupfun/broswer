import { NgModule, OnInit, ElementRef, Renderer2, Directive, Input } from '@angular/core';


@Directive({
  selector: '[mpWinNoSelect]'
})
export class WindowSelectDirective implements OnInit {

  @Input('mpWinNoSelect')
  noSelect: boolean | 'true' | 'false' | '' | 'none' | 'text' | 'all' | 'element' = ''

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) { }

  ngOnInit(): void {
    switch (this.noSelect) {
      case '':
      case 'true':
      case true:
      case 'none':
        this.renderer2.setStyle(this.elementRef.nativeElement, 'user-select', 'none')
        break
      case 'false':
      case false:
      case 'text':
        this.renderer2.setStyle(this.elementRef.nativeElement, 'user-select', 'text')
        break
      default:
        this.renderer2.setStyle(this.elementRef.nativeElement, 'user-select', '' + this.noSelect)
        break
    }


  }

}




@NgModule({
  declarations: [WindowSelectDirective],
  exports: [WindowSelectDirective]
})
export class MpWindowSelectModule {

}