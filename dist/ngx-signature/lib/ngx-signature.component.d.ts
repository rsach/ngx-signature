import { OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export declare class NgxSignatureComponent implements OnInit {
    dialogRef: MatDialogRef<NgxSignatureComponent>;
    dragging: boolean;
    selected: boolean;
    uploadFileChangedEvent: any;
    capturedImage: any;
    croppedImage: any;
    selected_tab: string;
    onSignatureDone: EventEmitter<string>;
    responseImage: any;
    fileInputField: any;
    signaturePadCanvas: any;
    cameraElement: any;
    cameraSnapshotCanvas: any;
    signaturePad: any;
    videoStream: any;
    constructor(dialogRef: MatDialogRef<NgxSignatureComponent>);
    ngOnInit(): void;
    onDragOver(evt: any): void;
    onDragLeave(evt: any): void;
    onDrop(evt: any): void;
    uploadFileChange(e: any): void;
    imageCropped(image: string): void;
    imageLoaded(): void;
    loadImageFailed(): void;
    validateFiles(files: any): boolean;
    doneCropping(): void;
    doneDrawing(): void;
    clearDrawing(): void;
    resetModal(): void;
    stopVideoStream(): void;
    activateDrawTab(): void;
    activateCameraTab(): void;
    activateUploadTab(): void;
    takeSnapshot(): void;
    retakeSnapshot(): void;
}