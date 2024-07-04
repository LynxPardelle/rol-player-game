import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
/* Types */
import { TDropDownOption } from '../../types/dropDownOption.type';
/* Services */
import { SharedService } from '../../services/shared.service';
import { NgxAngoraService } from 'ngx-angora-css';
/* Components */
import { GenericInputComponent } from '../generic-input/generic-input.component';
/* Directives */
import { ExistsDirective } from '../../directives/exists.directive';
import { SharedModule } from '../../shared.module';
@Component({
  selector: 'generic-dropdown',
  standalone: true,
  imports: [SharedModule, GenericInputComponent, ExistsDirective],
  templateUrl: './generic-dropdown.component.html',
  styleUrl: './generic-dropdown.component.scss',
})
export class GenericDropdownComponent {
  /* Inputs */
  @Input() buttonId: string = '';
  @Input() dropdownId: string = '';
  @Input() labelTitle: string = '';
  @Input() placeholder: string | number = '';
  @Input() labelClasses: string = '';
  @Input() listClasses: string = '';
  @Input() buttonClasses: string = '';
  @Input() disabledClassButton: string = '';
  @Input() chipClasses: string = '';
  @Input() selectedItemClasses: string = '';
  @Input() public listContainerClasses: string = '';
  @Input() options: TDropDownOption[] = [];
  @Input() disabled: boolean = false;
  @Input() withSearcher: boolean = false;
  @Input() multiselect: boolean = false;
  @Input() dropdownOpen: boolean = false;
  @Input() inputId: string = '';
  @Input() inputClasses: string = '';
  @Input() inputDisabledClasses: string = '';

  public searcher: any = { search: '' };
  public splitter: string = String.fromCharCode(219);
  public splitterRegEx: RegExp = new RegExp(this.splitter, 'g');
  /* Output */
  @Output() clickedTitle = new EventEmitter<string | number>();
  @Output() clicked = new EventEmitter<TDropDownOption>();

  @Output() changesInput = new EventEmitter<any>();
  @Output() buttonIdEmit = new EventEmitter<string>();
  @Output() dropdownIdEmit = new EventEmitter<string>();

  @ViewChild('chipList', { static: false }) chipList: ElementRef | undefined;
  constructor(
    private _sharedService: SharedService,
    private _ank: NgxAngoraService
  ) {
    this.chipList = undefined;
  }
  ngOnInit(): void {
    this.buttonId = this._sharedService.getRandomId(9);
    this.buttonIdEmit.emit(this.buttonId);
    this.dropdownId = this._sharedService.getRandomId(9);
    this.dropdownIdEmit.emit(this.dropdownId);
    this.searcher.search = '';
    this.cssCreate();
  }

  getOptions(): TDropDownOption[] {
    if (!!this.withSearcher) {
      let searchRegex = new RegExp(this.searcher.search, 'gi');
      return this.options.filter((o: TDropDownOption) => {
        return o.option.match(searchRegex);
      });
    } else {
      return this.options;
    }
  }

  InputReacher(event: any) {
    this.changesInput.emit(event);
  }

  onClicked(event: TDropDownOption) {
    setTimeout(() => {
      this.searcher.search = '';
    }, 100);
    if (!!this.multiselect) {
      if (this.placeholder !== '' && typeof this.placeholder !== 'number') {
        let placeholderSplit = this.placeholder.split(this.splitter);
        if (placeholderSplit.includes(event.option)) {
          let i = placeholderSplit.indexOf(event.option);
          placeholderSplit.splice(i, 1);
        } else {
          placeholderSplit.push(event.option);
        }
        this.placeholder = placeholderSplit.join(this.splitter);
        this.scrollToBottom();
      } else {
        this.placeholder = event.option;
      }
      let newEvent: TDropDownOption = {
        type: 'menuitemMultiselect',
        option: event.option,
        click: event.click,
      };
      newEvent.option = event.option.replace(event.option, this.placeholder);
      this.clicked.emit(newEvent);
    } else {
      this.clicked.emit(event);
    }
  }
  hasOption(option: string): boolean {
    if (this.placeholder !== '' && typeof this.placeholder !== 'number') {
      // let placeholderSplit = this.placeholder.split(this.splitter);
      return !this.placeholder.includes('Elementos por página: ')
        ? this.placeholder.includes(option) &&
            (option.length > 1 || this.placeholder.length === 1)
        : this.placeholder.replace('Elementos por página: ', '') === option;
    } else {
      return false;
    }
  }

  checkElementWidth(elementId: string): number {
    return this._sharedService.checkElementValue(elementId, 'offsetWidth');
  }

  cssCreate() {
    this._ank.cssCreate();
  }

  scrollToBottom(): void {
    console.log('scroll', this.chipList);
    if (this.chipList) {
      const nativeElement = this.chipList.nativeElement;
      console.log('scroll', nativeElement);
      if (nativeElement) {
        setTimeout(() => {
          nativeElement.scrollTop = nativeElement.scrollHeight;
        });
      }
    }
  }
}
