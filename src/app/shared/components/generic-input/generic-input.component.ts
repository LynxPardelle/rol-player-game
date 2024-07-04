import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
/* Modules */
import { SharedModule } from '../../shared.module';
/* Components */
import { GenericButtonComponent } from '../generic-button/generic-button.component';
import { GenericDropdownComponent } from '../generic-dropdown/generic-dropdown.component';
/* Types */
import { TSpanInput } from '../../types/span.type';
import { TDropDownOption } from '../../types/dropDownOption.type';
import { TButton } from '../../types/button.type';
import { TCondition, TInputMask } from '../../types/inputMask.type';
/* Services */
import { SharedService } from '../../services/shared.service';
import { NgxAngoraService } from 'ngx-angora-css';
/* Directives */
import { ExistsDirective } from '../../directives/exists.directive';
/* Pipes */
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
/* Libraries */
import { createMask, InputMaskModule } from '@ngneat/input-mask';
@Component({
  selector: 'generic-input',
  standalone: true,
  imports: [
    SharedModule,
    InputMaskModule,
    NgTemplateOutlet,
    /* Components */
    GenericButtonComponent,
    GenericDropdownComponent,
    /* Directives */
    ExistsDirective,
    /* Pipes */
    SafeHtmlPipe,
  ],
  templateUrl: './generic-input.component.html',
  styleUrl: './generic-input.component.scss',
})
export class GenericInputComponent implements OnInit {
  public trueInputMask: any = createMask({});
  public spansNotPassed: TSpanInput[] = [];
  /* Input */
  @Input() hasBeenTouched: boolean = false;
  @Input() labelTitle: string = '';
  @Input() placeholder: string = '';
  @Input() thingFather: {
    [key: string]: any;
    lockeds?: any;
  } = { thing: '' };
  @Input() thing: string = 'thing';
  @Input() type: string = 'text';
  @Input() spans: TSpanInput[] = [];
  @Input() disabled: boolean = false;
  @Input() inputClasses: string = ' ank ';
  @Input() inputDisabledClasses: string = ' ank ';
  @Input() labelClasses: string = ' ank ';
  @Input() buttonClasses: string = ' ank ';
  @Input() listClasses: string = '';
  @Input() disabledClassButton: string = ' ank ';
  @Input() readonlyClassButton: string = ' ank ';
  @Input() containerClasses: string = ' ank-d-flex ank-alignItems-center ';
  @Input() options: TDropDownOption[] = [];
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() readonlyClasses: string = '';
  @Input() inputMask: any = createMask({});
  @Input() inputMaskActive: boolean = false;
  @Input() buttons: TButton[] | undefined;
  @Input() ignoreLocked: boolean = false;
  @Input() inputId: string = '';
  @Input() maxInput?: number;
  @Input() minInput?: number;
  @Input() maxInputDate?: Date;
  @Input() minInputDate?: Date;
  @Input() withTimePicker: boolean = false;
  @Input() rangeInputFormat: string = 'dd/MM/yyyy h:mm a';
  @Input() dateInputFormat: string = 'dd/MM/yyyy h:mm a';
  @Input() checkBoxTrueClasses: string = '';
  @Input() checkBoxFalseClasses: string = '';
  @Input() radioSelectedClasses: string = '';
  @Input() radioNotSelectedClasses: string = '';
  @Input() showData: boolean = true;
  /* Output */
  @Output() changesInput = new EventEmitter<any>();
  @Output() clickedTitle = new EventEmitter<string | number>();
  @Output() clicked = new EventEmitter<TDropDownOption>();
  @Output() buttonClick = new EventEmitter<string>();
  @Output() buttonId = new EventEmitter<{ label: string; buttonId: string }>();
  @Output() dropdownId = new EventEmitter<{
    label: string;
    dropdownId: string;
  }>();
  constructor(
    private _sharedService: SharedService,
    private _ank: NgxAngoraService
  ) {}
  ngOnInit(): void {
    /* if (
      this.type === 'date' &&
      !!this.thingFather[this.thing] &&
      this.thingFather[this.thing] !== undefined &&
      this.thingFather[this.thing] !== null
    ) {
      this.changeToDate(this.thingFather[this.thing]);
    } */
    this.trueInputMask = !!this.inputMask[0]
      ? this.iMFind(this.inputMask)
      : createMask(this.inputMask);
    this.cssCreate();
  }
  writtingInInput(event: any) {
    this.hasBeenTouched = true;
    this.trueInputMask = !!this.inputMask[0]
      ? this.iMFind(this.inputMask)
      : createMask(this.inputMask);
    if (!this.thingFather.lockeds) this.thingFather.lockeds = {};
    this.thingFather.lockeds[this.thing] =
      !this.spans.every((s) => {
        let passEval = this.evalThing(s.evalThing);
        if (!passEval) {
          this.pushOrRemoveToSpansNotPassed(s, 'remove');
        } else {
          this.pushOrRemoveToSpansNotPassed(s, 'push');
        }
        return !passEval;
      }) || false;
    this.thingFather[this.thing] = event;
    if (this.type === 'date') {
      let day: number | string = new Date(
        this.thingFather[this.thing]
      ).getDate();
      let month: number | string =
        new Date(this.thingFather[this.thing]).getMonth() + 1;
      let year = new Date(this.thingFather[this.thing]).getFullYear();
      if (day < 10) {
        day = '0' + day.toString();
      }
      if (month < 10) {
        month = '0' + month.toString();
      }
      this.thingFather[this.thing] = year + '-' + month + '-' + day;
      console.log(this.thingFather[this.thing]);
    }
    this.changesInput.emit(this.thingFather);
  }
  evalThing(thingToEval: string): boolean {
    console.log('evalThing', thingToEval);
    if (this.hasBeenTouched === true) {
      switch (true) {
        case thingToEval === 'required':
          return this.thingFather[this.thing]?.length <= 0;
          break;
        case thingToEval.includes('!validRegEx'):
          let newRegexN = new RegExp(thingToEval.replace('!validRegEx', ''));
          return !newRegexN.test(this.thingFather[this.thing]);
          break;
        case thingToEval.includes('validRegEx'):
          let newRegex = new RegExp(thingToEval.replace('validRegEx', ''));
          return !newRegex.test(this.thingFather[this.thing]);
          break;
        case thingToEval.includes('min'):
          if (this.type !== 'date') {
            return (
              this.thingFather[this.thing].length <
              parseInt(thingToEval.replace('min', ''))
            );
          } else {
            return (
              new Date(this.thingFather[this.thing]) <
              new Date(thingToEval.replace('min', ''))
            );
          }
          break;
        case thingToEval.includes('max'):
          if (this.type !== 'date') {
            return (
              this.thingFather[this.thing].length >
              parseInt(thingToEval.replace('max', ''))
            );
          } else {
            return (
              new Date(this.thingFather[this.thing]) >
              new Date(thingToEval.replace('min', ''))
            );
          }
          break;
        default:
          return false;
          break;
      }
    } else {
      return false;
    }
  }
  pushOrRemoveToSpansNotPassed(span: TSpanInput, type: 'push' | 'remove') {
    if (type === 'remove') {
      this.spansNotPassed = this.spansNotPassed.filter((s) => {
        return s.text !== span.text;
      });
    } else if (!this.spansNotPassed.some((s) => s.text === span.text)) {
      this.spansNotPassed.push(span);
    }
  }

  changeValue(value: any) {
    this.thingFather[this.thing.toString()] = value;
    this.changesInput.emit(this.thingFather);
    setTimeout(() => {
      this.cssCreate();
    }, 10);
  }
  changeToDate(value: any) {
    if (!!value && typeof value === 'string' && value.includes('/')) {
      let first2Chars = value.substring(0, 2);
      let second2CharsMinChar3 = value.substring(3, 5);
      if (parseInt(first2Chars) > 12) {
        let newValue =
          second2CharsMinChar3 +
          '/' +
          first2Chars +
          value.substring(5, value.length);
        value = newValue;
      }
    }
    this.thingFather[this.thing.toString()] = new Date(value);
    this.thingFather[this.thing.toString()] = this.thingFather[
      this.thing.toString()
    ]
      .toISOString()
      .split('T')[0];
    this.changesInput.emit(this.thingFather);
    setTimeout(() => {
      this.cssCreate();
    }, 10);
  }
  iMFind(inputMasks: TInputMask[]): any {
    return inputMasks.find((iM: TInputMask) => {
      return iM.conditions.every((c: TCondition) => {
        let itPass: boolean = false;
        switch (c.condition) {
          case 'required':
            itPass = this.thingFather[this.thing].length > 0;
            break;
          case 'minLength':
            itPass = this.thingFather[this.thing].length >= c.value;
            break;
          case 'maxLength':
            itPass = this.thingFather[this.thing].length <= c.value;
            break;
          case 'min':
            itPass = this.thingFather[this.thing] >= c.value;
            break;
          case 'max':
            itPass = this.thingFather[this.thing] <= c.value;
            break;
          case 'equal':
            itPass = this.thingFather[this.thing] === c.value;
            break;
          case '!equal':
            itPass = this.thingFather[this.thing] !== c.value;
            break;
          case 'includes':
            itPass = this.thingFather[this.thing].includes(c.value);
            break;
          case '!includes':
            itPass = !this.thingFather[this.thing].includes(c.value);
            break;
          case 'validRegEx':
            let newRegex = new RegExp(c.value);
            itPass = newRegex.test(this.thingFather[this.thing]);
            break;
          case '!validRegEx':
            let newRegexN = new RegExp(c.value);
            itPass = !newRegexN.test(this.thingFather[this.thing]);
            break;
          default:
            break;
        }
        return itPass;
      });
    })?.inputMask;
  }
  buttonIdListen(event: string) {
    this._ank.consoleParser({
      thing: { name: 'buttonIdListen Event', event: event },
      stoper: false,
    });
    let newEvent = {
      label: this.labelTitle,
      buttonId: event,
    };
    this.buttonId.emit(newEvent);
  }
  dropdownIdListen(event: any) {
    this._ank.consoleParser({
      thing: { name: 'dropDownIdListen Event', event: event },
      stoper: false,
    });
    let newEvent = {
      label: this.labelTitle,
      dropdownId: event,
    };
    this.dropdownId.emit(newEvent);
  }
  cssCreate() {
    this._ank.cssCreate();
  }
}
