import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { AppTableComponent } from './app-table/app-table.component';
import { CkpGetPipe } from './services/pipes/ckpGetPipe';
import { CkpCellFormat } from './services/pipes/ckpCellFormat';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule
  ],
  declarations: [
    AppTableComponent,
    CkpGetPipe,
    CkpCellFormat
  ],
  providers: [
  ],
  exports: [
    AppTableComponent,
    CkpGetPipe,
    CkpCellFormat
  ],
  entryComponents: [
  ],
})
export class SharedModule { }
