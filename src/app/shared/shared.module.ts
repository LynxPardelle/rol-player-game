import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Modules */
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const modules: any[] = [FormsModule, ReactiveFormsModule, MaterialModule];
@NgModule({
  declarations: [],
  imports: [CommonModule, [...modules]],
  exports: [[...modules]],
})
export class SharedModule {}
