import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NgxSignatureModule} from '../../projects/ngx-signature/src/lib/ngx-signature.module';
import {SignatureComponent} from './test/signature/signature.component';

@NgModule({
  declarations: [
    AppComponent,
    SignatureComponent,
    // NgxSignatureComponent,

  ],
  imports: [
    BrowserModule,
    ImageCropperModule,
    NgxSignatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
