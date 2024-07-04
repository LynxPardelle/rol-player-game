import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Directive({
  selector: '[exists]',
  standalone: true,
})
export class ExistsDirective implements OnInit {
  @Input() exists!: boolean;
  @Output('exists') initEvent: EventEmitter<boolean> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {
    if (this.exists) {
      setTimeout(() => this.initEvent.emit(), 100);
    }
  }
}
