import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
export declare class NgxSignatureDirective {
    private dialog;
    onSignatureDone: EventEmitter<string>;
    constructor(dialog: MatDialog);
    openComponent(evt: any): void;
}
