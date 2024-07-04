import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
/* Modules */
import { SharedModule } from '../../shared.module';
/* Services */
import { SharedService } from '../../services/shared.service';
import { NgxAngoraService } from 'ngx-angora-css';
/* Directives */
import { ExistsDirective } from '../../directives/exists.directive';
/* Pipes */
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
@Component({
  selector: 'generic-button',
  standalone: true,
  imports: [SharedModule, ExistsDirective, SafeHtmlPipe],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.scss',
})
export class GenericButtonComponent implements OnInit {
  @Input() buttonId?: string = '';
  @Input() buttonInner?: string = '';
  @Input() buttonBGColor?: string = 'disk';
  @Input() buttonTextColor?: string = 'white';
  @Input() buttonClass?: string = '';
  @Input() buttonDisabledClass?: string = '';
  @Input() buttonType?: 'rounded' | 'squared' = 'rounded';
  @Input() disabled: boolean = false;
  @Input() tooltip: string = '';
  @Input() tooltipPosition:
    | 'after'
    | 'before'
    | 'above'
    | 'below'
    | 'left'
    | 'right' = 'below';
  @Input() showTooltip: boolean = false;
  @Input() tooltipClass: string = '';
  @Output() buttonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() getButtonId: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _sharedService: SharedService,
    private _ank: NgxAngoraService
  ) {}

  ngOnInit(): void {
    if (this.buttonId === '') {
      this.buttonId = this._sharedService.getRandomId(10);
    }
    this.getButtonId.emit(this.buttonId);
    this.manageButtonType();
  }

  manageButtonType(): void {
    switch (this.buttonType) {
      case 'rounded':
        this.buttonClass += ' ank-r-2rem ank-p-0_4rem  ';
        break;
      case 'squared':
        this.buttonClass += ' ank-p-0_6rem ';
        break;
    }
  }

  cssCreate(): void {
    this._ank.cssCreate();
  }
}
