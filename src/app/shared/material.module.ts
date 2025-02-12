import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Modules */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
const modules: any[] = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatTooltipModule,
  MatChipsModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
];
@NgModule({
  declarations: [],
  imports: [CommonModule, [...modules]],
  exports: [[...modules]],
})
export class MaterialModule {}
