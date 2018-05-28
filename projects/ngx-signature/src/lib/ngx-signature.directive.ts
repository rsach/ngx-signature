import {Directive, EventEmitter, Host, HostListener, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NgxSignatureComponent} from './ngx-signature.component';

@Directive({
  selector: '[appNgxSignature]'
})
export class NgxSignatureDirective {

  @Output() onSignatureDone: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog
  ) { }

  @HostListener('click', ['$event']) openComponent(evt) {

    this.dialog.open(NgxSignatureComponent, {
      panelClass: 'transparent'
    }).afterClosed().subscribe(res => {
      // console.log()
      if (res) {
        this.onSignatureDone.emit(res);
      }
    });
  }
}
