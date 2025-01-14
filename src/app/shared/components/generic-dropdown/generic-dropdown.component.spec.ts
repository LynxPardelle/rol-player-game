import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDropdownComponent } from './generic-dropdown.component';

describe('GenericDropdownComponent', () => {
  let component: GenericDropdownComponent;
  let fixture: ComponentFixture<GenericDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
