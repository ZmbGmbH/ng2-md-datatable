import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MdDataTableModule } from '@zmb-gmbh/ng2-md-datatable';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MdDataTableModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: AppService, useClass: AppService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
