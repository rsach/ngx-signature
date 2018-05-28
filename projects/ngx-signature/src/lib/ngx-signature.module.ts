import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSignatureComponent } from './ngx-signature.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSignatureDirective } from './ngx-signature.directive';
import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    MatDialogModule,
    NoopAnimationsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    NgxSignatureComponent,
    NgxSignatureDirective
  ],
  exports: [
    NgxSignatureComponent,
    NgxSignatureDirective
  ],
  entryComponents: [
    NgxSignatureComponent
  ]
})
export class NgxSignatureModule { }
