import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list.component';
import { SearchComponent } from './components/search/search.component';
import { DetailDialogComponent } from './components/dialog/details-dialog.component';
import { MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    SearchComponent,
    DetailDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DetailDialogComponent,
  ]
})
export class AppModule { }
