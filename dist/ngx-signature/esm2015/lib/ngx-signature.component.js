/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { ViewChild } from '@angular/core';
import * as SignaturePad from 'signature_pad';
import * as fx from 'glfx-es6';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export class NgxSignatureComponent {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
        this.dragging = false;
        this.selected = false;
        this.selected_tab = 'draw';
        this.onSignatureDone = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.signaturePad = new SignaturePad.default(this.signaturePadCanvas.nativeElement);
        // $('#ngx-signature').on('hidden.bs.modal',  () => {
        //   this.resetModal();
        // });
        // $('#ngx-signature').on('show.bs.modal',  () => {
        //   $('a[href=\'#draw\']').click();
        // });
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const /** @type {?} */ files = evt.dataTransfer.files;
        this.dragging = true;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.dragging = false;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDrop(evt) {
        this.dragging = false;
        console.log(evt);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    uploadFileChange(e) {
        if (this.validateFiles(e.target.files)) {
            this.selected = true;
            this.uploadFileChangedEvent = e;
        }
    }
    /**
     * @param {?} image
     * @return {?}
     */
    imageCropped(image) {
        this.croppedImage = image;
    }
    /**
     * @return {?}
     */
    imageLoaded() {
        // show cropper
    }
    /**
     * @return {?}
     */
    loadImageFailed() {
        // show message
    }
    /**
     * @param {?} files
     * @return {?}
     */
    validateFiles(files) {
        if (files.length) {
            for (let /** @type {?} */ i = 0; i < files.length; i++) {
                if (!(files[i].type.match('image'))) {
                    alert('Invalid file! Only images are allowed.');
                    return false;
                }
                if (((files[i].size / 1024) / 1024) > 5) {
                    alert('Invalid file! File size exceeds 5 MB.');
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * @return {?}
     */
    doneCropping() {
        this.responseImage = this.croppedImage;
        // this.onSignatureDone.emit(this.responseImage);
        this.dialogRef.close(this.responseImage);
        // $('#ngx-signature').modal('hide');
    }
    /**
     * @return {?}
     */
    doneDrawing() {
        this.responseImage = this.signaturePad.toDataURL();
        // this.onSignatureDone.emit(this.responseImage);
        this.dialogRef.close(this.responseImage);
        // $('#ngx-signature').modal('hide');
    }
    /**
     * @return {?}
     */
    clearDrawing() {
        if (this.signaturePad && this.signaturePad.clear) {
            this.signaturePad.clear();
        }
    }
    /**
     * @return {?}
     */
    resetModal() {
        // Clear Drawing section
        this.clearDrawing();
        // Clear Upload Section
        this.uploadFileChangedEvent = null;
        this.croppedImage = null;
        this.selected = false;
        // Clear snap section
        this.stopVideoStream();
    }
    /**
     * @return {?}
     */
    stopVideoStream() {
        if (this.videoStream && this.videoStream.getTracks) {
            const /** @type {?} */ tracks = this.videoStream.getTracks();
            for (const /** @type {?} */ i in tracks) {
                if (tracks[i] && tracks[i].stop) {
                    tracks[i].stop();
                }
            }
        }
        if (this.cameraElement && this.cameraElement.nativeElement) {
            this.cameraElement.nativeElement.src = '';
            if (this.cameraElement.nativeElement.pause) {
                this.cameraElement.nativeElement.pause();
            }
        }
    }
    /**
     * @return {?}
     */
    activateDrawTab() {
        this.selected_tab = 'draw';
        this.resetModal();
    }
    /**
     * @return {?}
     */
    activateCameraTab() {
        this.selected_tab = 'camera';
        this.resetModal();
        const /** @type {?} */ browser = /** @type {?} */ (navigator);
        browser.getUserMedia = (browser.getUserMedia ||
            browser.webkitGetUserMedia ||
            browser.mozGetUserMedia ||
            browser.msGetUserMedia);
        browser.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
            this.videoStream = stream;
            this.cameraElement.nativeElement.src = window.URL.createObjectURL(stream);
            this.cameraElement.nativeElement.play();
        });
    }
    /**
     * @return {?}
     */
    activateUploadTab() {
        this.selected_tab = 'upload';
        this.resetModal();
    }
    /**
     * @return {?}
     */
    takeSnapshot() {
        this.cameraSnapshotCanvas
            .nativeElement
            .getContext('2d')
            .drawImage(this.cameraElement.nativeElement, 0, 0, this.cameraSnapshotCanvas.nativeElement.width, this.cameraSnapshotCanvas.nativeElement.height);
        this.stopVideoStream();
        this.selected = true;
        const /** @type {?} */ c = fx.canvas();
        const /** @type {?} */ texture = c.texture(this.cameraSnapshotCanvas.nativeElement);
        c.draw(texture)
            .hueSaturation(-1, -1) // grayscale
            .unsharpMask(20, 2)
            .brightnessContrast(0.2, 0.9)
            .update();
        console.log(c);
        this.capturedImage = c.toDataURL();
    }
    /**
     * @return {?}
     */
    retakeSnapshot() {
        this.resetModal();
        this.activateCameraTab();
    }
}
NgxSignatureComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-signature',
                template: `<div class="ngx-signature-modal" id="ngx-signature">
    <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">E-Sign</h4>
            <button type="button" class="close" (click)="dialogRef.close()">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
              <ul class="nav nav-tabs" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link" [ngClass]="selected_tab === 'draw' ? 'active' : ''" (click)="activateDrawTab()" role="tab" > <i class="fa fa-edit"></i> Draw</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" [ngClass]="selected_tab === 'camera' ? 'active' : ''" (click)="activateCameraTab()" role="tab" > <i class="fa fa-camera"></i> Snap</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" [ngClass]="selected_tab === 'upload' ? 'active' : ''" (click)="activateUploadTab()" role="tab" > <i class="fa fa-image"></i> Upload</a>
                  </li>
              </ul>
              <div  [style.visibility]="selected_tab === 'draw' ? 'visible' : 'hidden'" role="tabpanel" class="tab-pane " [ngClass]="selected_tab === 'draw' ? 'active' : 'fade'" id="draw">
                  <span class="draw-text">You can sign using your touchpad or mouse inside rectangular area</span>
                  <canvas #signaturePad height="300" width="470" class="signature-pad"></canvas>
                  <button (click)="clearDrawing()" class="btn btn-light">Clear</button>
                  <button (click)="doneDrawing()" class="btn btn-primary pull-right">
                    Done
                  </button>
              </div>
              <div [style.visibility]="selected_tab === 'upload' ? 'visible' : 'hidden'" role="tabpanel" class="tab-pane" [ngClass]="selected_tab === 'upload' ? 'active' : 'fade'" id="upload">
                  <div *ngIf="!selected" class="upload" [ngClass]="{'dragging' : dragging}">
                    <input type="file" (change)="uploadFileChange($event)" #fileUpload >
                    <button *ngIf="!dragging" class="btn">
                      <i class="fa fa-upload"></i> Select a file to upload
                    </button>
                    <button *ngIf="dragging" class="btn btn-light">
                      Drop file here to upload
                    </button>
                  </div>
                  <div *ngIf="selected" class="image">
                      <span class="crop-text">Crop the image to the best fit</span>
                      <image-cropper
                        [imageChangedEvent]="uploadFileChangedEvent"
                        [maintainAspectRatio]="false"
                        format="png"
                        (imageCropped)="imageCropped($event)"
                        (imageLoaded)="imageLoaded()"
                        (loadImageFailed)="loadImageFailed()"
                      ></image-cropper>
                      <br>
                      <button (click)="doneCropping()" class="btn btn-primary pull-right">
                        Done
                      </button>
                  </div>
              </div>
              <div [style.visibility]="selected_tab === 'camera' ? 'visible' : 'hidden'" role="tabpanel" class="tab-pane" [ngClass]="selected_tab === 'camera' ? 'active' : 'fade'" id="camera">
                  <div *ngIf="!selected" class="capture">
                      <span class="camera-text">Put signature near your camera and click on take snapshot</span>
                      <canvas #cameraSnapshot height="300" width="470" style="display:none"></canvas>

                      <video  #camera height="300" width="470" class="signature-pad"></video>
                      <button class="btn btn-primary btn-block" (click)="takeSnapshot()">Take Snapshot</button>
                  </div>
                  <div *ngIf="selected" class="capture">
                      <span class="crop-text">Crop the image to the best fit</span>
                      <image-cropper
                        [imageBase64]="capturedImage"
                        [maintainAspectRatio]="false"
                        format="png"
                        (imageCropped)="imageCropped($event)"
                        (imageLoaded)="imageLoaded()"
                        (loadImageFailed)="loadImageFailed()"
                      ></image-cropper>
                      <button (click)="retakeSnapshot()" class="btn btn-light">Retake Snapshot</button>

                      <button (click)="doneCropping()" class="btn btn-primary pull-right">
                        Done
                      </button>
                  </div>
              </div>
          </div>



        </div>
      </div>
</div>
`,
                styles: [`.upload{margin-top:15px;margin-bottom:15px;padding:15px;width:100%;min-height:100px;border:2px dashed silver;text-align:center;display:flex;flex-direction:row;justify-content:center;align-items:center;position:relative}.upload input[type=file]{position:absolute;top:0;left:0;height:100%;width:100%;opacity:0;cursor:pointer}.upload.dragging{border:2px dashed #212121}:host image-cropper>.cropper{outline-color:rgba(1,1,1,.2)}.camera-text,.crop-text,.draw-text{display:block;text-align:center;padding-top:15px;padding-bottom:5px;font-size:14px}.tab-pane{display:none}.tab-pane.active{display:block}.signature-pad{border:1px solid #000;border-radius:5px}`]
            },] },
];
/** @nocollapse */
NgxSignatureComponent.ctorParameters = () => [
    { type: MatDialogRef, },
];
NgxSignatureComponent.propDecorators = {
    "onSignatureDone": [{ type: Output },],
    "fileInputField": [{ type: ViewChild, args: ['fileUpload',] },],
    "signaturePadCanvas": [{ type: ViewChild, args: ['signaturePad',] },],
    "cameraElement": [{ type: ViewChild, args: ['camera',] },],
    "cameraSnapshotCanvas": [{ type: ViewChild, args: ['cameraSnapshot',] },],
    "onDragOver": [{ type: HostListener, args: ['dragover', ['$event'],] },],
    "onDragLeave": [{ type: HostListener, args: ['dragleave', ['$event'],] },],
    "onDrop": [{ type: HostListener, args: ['drop', ['$event'],] },],
};
function NgxSignatureComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxSignatureComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxSignatureComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NgxSignatureComponent.propDecorators;
    /** @type {?} */
    NgxSignatureComponent.prototype.dragging;
    /** @type {?} */
    NgxSignatureComponent.prototype.selected;
    /** @type {?} */
    NgxSignatureComponent.prototype.uploadFileChangedEvent;
    /** @type {?} */
    NgxSignatureComponent.prototype.capturedImage;
    /** @type {?} */
    NgxSignatureComponent.prototype.croppedImage;
    /** @type {?} */
    NgxSignatureComponent.prototype.selected_tab;
    /** @type {?} */
    NgxSignatureComponent.prototype.onSignatureDone;
    /** @type {?} */
    NgxSignatureComponent.prototype.responseImage;
    /** @type {?} */
    NgxSignatureComponent.prototype.fileInputField;
    /** @type {?} */
    NgxSignatureComponent.prototype.signaturePadCanvas;
    /** @type {?} */
    NgxSignatureComponent.prototype.cameraElement;
    /** @type {?} */
    NgxSignatureComponent.prototype.cameraSnapshotCanvas;
    /** @type {?} */
    NgxSignatureComponent.prototype.signaturePad;
    /** @type {?} */
    NgxSignatureComponent.prototype.videoStream;
    /** @type {?} */
    NgxSignatureComponent.prototype.dialogRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNpZ25hdHVyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2lnbmF0dXJlLyIsInNvdXJjZXMiOlsibGliL25neC1zaWduYXR1cmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEtBQUssWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFZLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBb0cxRCxNQUFNOzs7O0lBbUJKLFlBQ1M7UUFBQSxjQUFTLEdBQVQsU0FBUzt3QkFuQlAsS0FBSzt3QkFDTCxLQUFLOzRCQUtELE1BQU07K0JBRTZCLElBQUksWUFBWSxFQUFVO0tBYXZFOzs7O0lBRUwsUUFBUTtRQUVOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7Ozs7OztLQU9yRjs7Ozs7SUFFcUMsVUFBVSxDQUFDLEdBQUc7UUFDbEQsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0Qix1QkFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Ozs7OztJQUdnQixXQUFXLENBQUMsR0FBRztRQUNw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QUFHLEVBQUUsR0FBRyxDQUFDO2FBQzVCLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFZixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDMUI7OztZQWpTRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F5Rlg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsNm9CQUE2b0IsQ0FBQzthQUN4cEI7Ozs7WUFuR2tCLFlBQVk7OztnQ0E2RzVCLE1BQU07K0JBR04sU0FBUyxTQUFDLFlBQVk7bUNBQ3RCLFNBQVMsU0FBQyxjQUFjOzhCQUN4QixTQUFTLFNBQUMsUUFBUTtxQ0FDbEIsU0FBUyxTQUFDLGdCQUFnQjsyQkFvQjFCLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7NEJBT25DLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7dUJBS3BDLFlBQVksU0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFNpZ25hdHVyZVBhZCBmcm9tICdzaWduYXR1cmVfcGFkJztcbmltcG9ydCAqIGFzIGZ4IGZyb20gJ2dsZngtZXM2JztcbmltcG9ydCB7IE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cblxuXG4vLyBkZWNsYXJlIGNvbnN0ICQ7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1zaWduYXR1cmUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJuZ3gtc2lnbmF0dXJlLW1vZGFsXCIgaWQ9XCJuZ3gtc2lnbmF0dXJlXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuXG4gICAgICAgICAgPCEtLSBNb2RhbCBIZWFkZXIgLS0+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj5FLVNpZ248L2g0PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIChjbGljayk9XCJkaWFsb2dSZWYuY2xvc2UoKVwiPiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDwhLS0gTW9kYWwgYm9keSAtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIiByb2xlPVwidGFibGlzdFwiPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIFtuZ0NsYXNzXT1cInNlbGVjdGVkX3RhYiA9PT0gJ2RyYXcnID8gJ2FjdGl2ZScgOiAnJ1wiIChjbGljayk9XCJhY3RpdmF0ZURyYXdUYWIoKVwiIHJvbGU9XCJ0YWJcIiA+IDxpIGNsYXNzPVwiZmEgZmEtZWRpdFwiPjwvaT4gRHJhdzwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm5hdi1saW5rXCIgW25nQ2xhc3NdPVwic2VsZWN0ZWRfdGFiID09PSAnY2FtZXJhJyA/ICdhY3RpdmUnIDogJydcIiAoY2xpY2spPVwiYWN0aXZhdGVDYW1lcmFUYWIoKVwiIHJvbGU9XCJ0YWJcIiA+IDxpIGNsYXNzPVwiZmEgZmEtY2FtZXJhXCI+PC9pPiBTbmFwPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBbbmdDbGFzc109XCJzZWxlY3RlZF90YWIgPT09ICd1cGxvYWQnID8gJ2FjdGl2ZScgOiAnJ1wiIChjbGljayk9XCJhY3RpdmF0ZVVwbG9hZFRhYigpXCIgcm9sZT1cInRhYlwiID4gPGkgY2xhc3M9XCJmYSBmYS1pbWFnZVwiPjwvaT4gVXBsb2FkPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgPGRpdiAgW3N0eWxlLnZpc2liaWxpdHldPVwic2VsZWN0ZWRfdGFiID09PSAnZHJhdycgPyAndmlzaWJsZScgOiAnaGlkZGVuJ1wiIHJvbGU9XCJ0YWJwYW5lbFwiIGNsYXNzPVwidGFiLXBhbmUgXCIgW25nQ2xhc3NdPVwic2VsZWN0ZWRfdGFiID09PSAnZHJhdycgPyAnYWN0aXZlJyA6ICdmYWRlJ1wiIGlkPVwiZHJhd1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkcmF3LXRleHRcIj5Zb3UgY2FuIHNpZ24gdXNpbmcgeW91ciB0b3VjaHBhZCBvciBtb3VzZSBpbnNpZGUgcmVjdGFuZ3VsYXIgYXJlYTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxjYW52YXMgI3NpZ25hdHVyZVBhZCBoZWlnaHQ9XCIzMDBcIiB3aWR0aD1cIjQ3MFwiIGNsYXNzPVwic2lnbmF0dXJlLXBhZFwiPjwvY2FudmFzPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiY2xlYXJEcmF3aW5nKClcIiBjbGFzcz1cImJ0biBidG4tbGlnaHRcIj5DbGVhcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZG9uZURyYXdpbmcoKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgRG9uZVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IFtzdHlsZS52aXNpYmlsaXR5XT1cInNlbGVjdGVkX3RhYiA9PT0gJ3VwbG9hZCcgPyAndmlzaWJsZScgOiAnaGlkZGVuJ1wiIHJvbGU9XCJ0YWJwYW5lbFwiIGNsYXNzPVwidGFiLXBhbmVcIiBbbmdDbGFzc109XCJzZWxlY3RlZF90YWIgPT09ICd1cGxvYWQnID8gJ2FjdGl2ZScgOiAnZmFkZSdcIiBpZD1cInVwbG9hZFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFzZWxlY3RlZFwiIGNsYXNzPVwidXBsb2FkXCIgW25nQ2xhc3NdPVwieydkcmFnZ2luZycgOiBkcmFnZ2luZ31cIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgKGNoYW5nZSk9XCJ1cGxvYWRGaWxlQ2hhbmdlKCRldmVudClcIiAjZmlsZVVwbG9hZCA+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCIhZHJhZ2dpbmdcIiBjbGFzcz1cImJ0blwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdXBsb2FkXCI+PC9pPiBTZWxlY3QgYSBmaWxlIHRvIHVwbG9hZFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImRyYWdnaW5nXCIgY2xhc3M9XCJidG4gYnRuLWxpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgRHJvcCBmaWxlIGhlcmUgdG8gdXBsb2FkXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2VsZWN0ZWRcIiBjbGFzcz1cImltYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjcm9wLXRleHRcIj5Dcm9wIHRoZSBpbWFnZSB0byB0aGUgYmVzdCBmaXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGltYWdlLWNyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpbWFnZUNoYW5nZWRFdmVudF09XCJ1cGxvYWRGaWxlQ2hhbmdlZEV2ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFttYWludGFpbkFzcGVjdFJhdGlvXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdD1cInBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoaW1hZ2VDcm9wcGVkKT1cImltYWdlQ3JvcHBlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChpbWFnZUxvYWRlZCk9XCJpbWFnZUxvYWRlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChsb2FkSW1hZ2VGYWlsZWQpPVwibG9hZEltYWdlRmFpbGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAgID48L2ltYWdlLWNyb3BwZXI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImRvbmVDcm9wcGluZygpXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgRG9uZVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IFtzdHlsZS52aXNpYmlsaXR5XT1cInNlbGVjdGVkX3RhYiA9PT0gJ2NhbWVyYScgPyAndmlzaWJsZScgOiAnaGlkZGVuJ1wiIHJvbGU9XCJ0YWJwYW5lbFwiIGNsYXNzPVwidGFiLXBhbmVcIiBbbmdDbGFzc109XCJzZWxlY3RlZF90YWIgPT09ICdjYW1lcmEnID8gJ2FjdGl2ZScgOiAnZmFkZSdcIiBpZD1cImNhbWVyYVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFzZWxlY3RlZFwiIGNsYXNzPVwiY2FwdHVyZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FtZXJhLXRleHRcIj5QdXQgc2lnbmF0dXJlIG5lYXIgeW91ciBjYW1lcmEgYW5kIGNsaWNrIG9uIHRha2Ugc25hcHNob3Q8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGNhbnZhcyAjY2FtZXJhU25hcHNob3QgaGVpZ2h0PVwiMzAwXCIgd2lkdGg9XCI0NzBcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvY2FudmFzPlxuXG4gICAgICAgICAgICAgICAgICAgICAgPHZpZGVvICAjY2FtZXJhIGhlaWdodD1cIjMwMFwiIHdpZHRoPVwiNDcwXCIgY2xhc3M9XCJzaWduYXR1cmUtcGFkXCI+PC92aWRlbz5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1ibG9ja1wiIChjbGljayk9XCJ0YWtlU25hcHNob3QoKVwiPlRha2UgU25hcHNob3Q8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNlbGVjdGVkXCIgY2xhc3M9XCJjYXB0dXJlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjcm9wLXRleHRcIj5Dcm9wIHRoZSBpbWFnZSB0byB0aGUgYmVzdCBmaXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGltYWdlLWNyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpbWFnZUJhc2U2NF09XCJjYXB0dXJlZEltYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFttYWludGFpbkFzcGVjdFJhdGlvXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdD1cInBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoaW1hZ2VDcm9wcGVkKT1cImltYWdlQ3JvcHBlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChpbWFnZUxvYWRlZCk9XCJpbWFnZUxvYWRlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChsb2FkSW1hZ2VGYWlsZWQpPVwibG9hZEltYWdlRmFpbGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAgID48L2ltYWdlLWNyb3BwZXI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwicmV0YWtlU25hcHNob3QoKVwiIGNsYXNzPVwiYnRuIGJ0bi1saWdodFwiPlJldGFrZSBTbmFwc2hvdDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZG9uZUNyb3BwaW5nKClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBEb25lXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cblxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AudXBsb2Fke21hcmdpbi10b3A6MTVweDttYXJnaW4tYm90dG9tOjE1cHg7cGFkZGluZzoxNXB4O3dpZHRoOjEwMCU7bWluLWhlaWdodDoxMDBweDtib3JkZXI6MnB4IGRhc2hlZCBzaWx2ZXI7dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOnJvdztqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtwb3NpdGlvbjpyZWxhdGl2ZX0udXBsb2FkIGlucHV0W3R5cGU9ZmlsZV17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7b3BhY2l0eTowO2N1cnNvcjpwb2ludGVyfS51cGxvYWQuZHJhZ2dpbmd7Ym9yZGVyOjJweCBkYXNoZWQgIzIxMjEyMX06aG9zdCBpbWFnZS1jcm9wcGVyPi5jcm9wcGVye291dGxpbmUtY29sb3I6cmdiYSgxLDEsMSwuMil9LmNhbWVyYS10ZXh0LC5jcm9wLXRleHQsLmRyYXctdGV4dHtkaXNwbGF5OmJsb2NrO3RleHQtYWxpZ246Y2VudGVyO3BhZGRpbmctdG9wOjE1cHg7cGFkZGluZy1ib3R0b206NXB4O2ZvbnQtc2l6ZToxNHB4fS50YWItcGFuZXtkaXNwbGF5Om5vbmV9LnRhYi1wYW5lLmFjdGl2ZXtkaXNwbGF5OmJsb2NrfS5zaWduYXR1cmUtcGFke2JvcmRlcjoxcHggc29saWQgIzAwMDtib3JkZXItcmFkaXVzOjVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hTaWduYXR1cmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBkcmFnZ2luZyA9IGZhbHNlO1xuICBzZWxlY3RlZCA9IGZhbHNlO1xuICB1cGxvYWRGaWxlQ2hhbmdlZEV2ZW50O1xuICBjYXB0dXJlZEltYWdlO1xuICBjcm9wcGVkSW1hZ2U7XG5cbiAgc2VsZWN0ZWRfdGFiID0gJ2RyYXcnO1xuXG4gIEBPdXRwdXQoKSBvblNpZ25hdHVyZURvbmU6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcmVzcG9uc2VJbWFnZTtcbiAgQFZpZXdDaGlsZCgnZmlsZVVwbG9hZCcpIGZpbGVJbnB1dEZpZWxkO1xuICBAVmlld0NoaWxkKCdzaWduYXR1cmVQYWQnKSBzaWduYXR1cmVQYWRDYW52YXM7XG4gIEBWaWV3Q2hpbGQoJ2NhbWVyYScpIGNhbWVyYUVsZW1lbnQ7XG4gIEBWaWV3Q2hpbGQoJ2NhbWVyYVNuYXBzaG90JykgY2FtZXJhU25hcHNob3RDYW52YXM7XG5cbiAgc2lnbmF0dXJlUGFkO1xuICB2aWRlb1N0cmVhbTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPE5neFNpZ25hdHVyZUNvbXBvbmVudD4sXG4gICAgLy8gcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZ1xuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5zaWduYXR1cmVQYWQgPSBuZXcgU2lnbmF0dXJlUGFkLmRlZmF1bHQodGhpcy5zaWduYXR1cmVQYWRDYW52YXMubmF0aXZlRWxlbWVudCk7XG4gICAgLy8gJCgnI25neC1zaWduYXR1cmUnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgICgpID0+IHtcbiAgICAvLyAgIHRoaXMucmVzZXRNb2RhbCgpO1xuICAgIC8vIH0pO1xuICAgIC8vICQoJyNuZ3gtc2lnbmF0dXJlJykub24oJ3Nob3cuYnMubW9kYWwnLCAgKCkgPT4ge1xuICAgIC8vICAgJCgnYVtocmVmPVxcJyNkcmF3XFwnXScpLmNsaWNrKCk7XG4gICAgLy8gfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pIG9uRHJhZ092ZXIoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IGZpbGVzID0gZXZ0LmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblxuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pIG9uRHJhZ0xlYXZlKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pIHB1YmxpYyBvbkRyb3AoZXZ0KSB7XG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIGNvbnNvbGUubG9nKGV2dCk7XG4gIH1cblxuXG4gIHVwbG9hZEZpbGVDaGFuZ2UoZSkge1xuICAgIGlmICh0aGlzLnZhbGlkYXRlRmlsZXMoZS50YXJnZXQuZmlsZXMpKXtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy51cGxvYWRGaWxlQ2hhbmdlZEV2ZW50ID0gZTtcbiAgICB9XG4gIH1cbiAgaW1hZ2VDcm9wcGVkKGltYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNyb3BwZWRJbWFnZSA9IGltYWdlO1xuICB9XG4gIGltYWdlTG9hZGVkKCkge1xuICAgICAgLy8gc2hvdyBjcm9wcGVyXG4gIH1cbiAgbG9hZEltYWdlRmFpbGVkKCkge1xuICAgICAgLy8gc2hvdyBtZXNzYWdlXG4gIH1cblxuICB2YWxpZGF0ZUZpbGVzKGZpbGVzKSB7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCEoZmlsZXNbaV0udHlwZS5tYXRjaCgnaW1hZ2UnKSkpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnSW52YWxpZCBmaWxlISBPbmx5IGltYWdlcyBhcmUgYWxsb3dlZC4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoICgoZmlsZXNbaV0uc2l6ZSAvIDEwMjQpIC8gMTAyNCkgPiA1KSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0ludmFsaWQgZmlsZSEgRmlsZSBzaXplIGV4Y2VlZHMgNSBNQi4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBkb25lQ3JvcHBpbmcoKSB7XG4gICAgdGhpcy5yZXNwb25zZUltYWdlID0gdGhpcy5jcm9wcGVkSW1hZ2U7XG4gICAgLy8gdGhpcy5vblNpZ25hdHVyZURvbmUuZW1pdCh0aGlzLnJlc3BvbnNlSW1hZ2UpO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMucmVzcG9uc2VJbWFnZSk7XG4gICAgLy8gJCgnI25neC1zaWduYXR1cmUnKS5tb2RhbCgnaGlkZScpO1xuICB9XG5cbiAgZG9uZURyYXdpbmcoKSB7XG4gICAgdGhpcy5yZXNwb25zZUltYWdlID0gdGhpcy5zaWduYXR1cmVQYWQudG9EYXRhVVJMKCk7XG4gICAgLy8gdGhpcy5vblNpZ25hdHVyZURvbmUuZW1pdCh0aGlzLnJlc3BvbnNlSW1hZ2UpO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMucmVzcG9uc2VJbWFnZSk7XG5cbiAgICAvLyAkKCcjbmd4LXNpZ25hdHVyZScpLm1vZGFsKCdoaWRlJyk7XG4gIH1cblxuXG4gIGNsZWFyRHJhd2luZygpIHtcbiAgICBpZiAodGhpcy5zaWduYXR1cmVQYWQgJiYgdGhpcy5zaWduYXR1cmVQYWQuY2xlYXIpIHtcbiAgICAgIHRoaXMuc2lnbmF0dXJlUGFkLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRNb2RhbCgpIHtcbiAgICAvLyBDbGVhciBEcmF3aW5nIHNlY3Rpb25cbiAgICB0aGlzLmNsZWFyRHJhd2luZygpO1xuICAgIC8vIENsZWFyIFVwbG9hZCBTZWN0aW9uXG4gICAgdGhpcy51cGxvYWRGaWxlQ2hhbmdlZEV2ZW50ID0gbnVsbDtcbiAgICB0aGlzLmNyb3BwZWRJbWFnZSA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgIC8vIENsZWFyIHNuYXAgc2VjdGlvblxuICAgIHRoaXMuc3RvcFZpZGVvU3RyZWFtKCk7XG4gIH1cblxuICBzdG9wVmlkZW9TdHJlYW0oKSB7XG4gICAgaWYgKHRoaXMudmlkZW9TdHJlYW0gJiYgdGhpcy52aWRlb1N0cmVhbS5nZXRUcmFja3MpIHtcbiAgICAgIGNvbnN0IHRyYWNrcyA9IHRoaXMudmlkZW9TdHJlYW0uZ2V0VHJhY2tzKCk7XG4gICAgICBmb3IgKGNvbnN0IGkgaW4gdHJhY2tzKSB7XG4gICAgICAgIGlmICh0cmFja3NbaV0gJiYgdHJhY2tzW2ldLnN0b3ApIHtcbiAgICAgICAgICB0cmFja3NbaV0uc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmNhbWVyYUVsZW1lbnQgJiYgdGhpcy5jYW1lcmFFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY2FtZXJhRWxlbWVudC5uYXRpdmVFbGVtZW50LnNyYyA9ICcnO1xuICAgICAgaWYgKHRoaXMuY2FtZXJhRWxlbWVudC5uYXRpdmVFbGVtZW50LnBhdXNlKSB7XG4gICAgICAgIHRoaXMuY2FtZXJhRWxlbWVudC5uYXRpdmVFbGVtZW50LnBhdXNlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBhY3RpdmF0ZURyYXdUYWIoKSB7XG4gICAgdGhpcy5zZWxlY3RlZF90YWIgPSAnZHJhdyc7XG4gICAgdGhpcy5yZXNldE1vZGFsKCk7XG4gIH1cblxuICBhY3RpdmF0ZUNhbWVyYVRhYigpIHtcbiAgICB0aGlzLnNlbGVjdGVkX3RhYiA9ICdjYW1lcmEnO1xuXG4gICAgdGhpcy5yZXNldE1vZGFsKCk7XG5cbiAgICBjb25zdCBicm93c2VyID0gPGFueT5uYXZpZ2F0b3I7XG4gICAgYnJvd3Nlci5nZXRVc2VyTWVkaWEgPSAoXG4gICAgICBicm93c2VyLmdldFVzZXJNZWRpYSB8fFxuICAgICAgYnJvd3Nlci53ZWJraXRHZXRVc2VyTWVkaWEgfHxcbiAgICAgIGJyb3dzZXIubW96R2V0VXNlck1lZGlhIHx8XG4gICAgICBicm93c2VyLm1zR2V0VXNlck1lZGlhXG4gICAgKTtcblxuICAgIGJyb3dzZXIubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7dmlkZW8gOiB0cnVlLCBhdWRpbyA6IGZhbHNlfSkudGhlbihzdHJlYW0gPT4ge1xuICAgICAgdGhpcy52aWRlb1N0cmVhbSA9IHN0cmVhbTtcbiAgICAgIHRoaXMuY2FtZXJhRWxlbWVudC5uYXRpdmVFbGVtZW50LnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgICB0aGlzLmNhbWVyYUVsZW1lbnQubmF0aXZlRWxlbWVudC5wbGF5KCk7XG4gICAgfSk7XG4gIH1cblxuICBhY3RpdmF0ZVVwbG9hZFRhYigpIHtcbiAgICB0aGlzLnNlbGVjdGVkX3RhYiA9ICd1cGxvYWQnO1xuXG4gICAgdGhpcy5yZXNldE1vZGFsKCk7XG4gIH1cblxuICB0YWtlU25hcHNob3QoKSB7XG4gICAgdGhpcy5jYW1lcmFTbmFwc2hvdENhbnZhc1xuICAgICAgLm5hdGl2ZUVsZW1lbnRcbiAgICAgIC5nZXRDb250ZXh0KCcyZCcpXG4gICAgICAuZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLmNhbWVyYUVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgdGhpcy5jYW1lcmFTbmFwc2hvdENhbnZhcy5uYXRpdmVFbGVtZW50LndpZHRoLFxuICAgICAgICB0aGlzLmNhbWVyYVNuYXBzaG90Q2FudmFzLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0XG4gICAgICApO1xuICAgIHRoaXMuc3RvcFZpZGVvU3RyZWFtKCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgY29uc3QgYyA9IGZ4LmNhbnZhcygpO1xuICAgIGNvbnN0IHRleHR1cmUgPSBjLnRleHR1cmUodGhpcy5jYW1lcmFTbmFwc2hvdENhbnZhcy5uYXRpdmVFbGVtZW50KTtcbiAgICBjLmRyYXcodGV4dHVyZSlcbiAgICAgICAgICAgIC5odWVTYXR1cmF0aW9uKC0xLCAtMSkvLyBncmF5c2NhbGVcbiAgICAgICAgICAgIC51bnNoYXJwTWFzaygyMCwgMilcbiAgICAgICAgICAgIC5icmlnaHRuZXNzQ29udHJhc3QoMC4yLCAwLjkpXG4gICAgICAgICAgICAudXBkYXRlKCk7XG4gICAgY29uc29sZS5sb2coYyk7XG5cbiAgICB0aGlzLmNhcHR1cmVkSW1hZ2UgPSBjLnRvRGF0YVVSTCgpO1xuICB9XG5cbiAgcmV0YWtlU25hcHNob3QoKSB7XG4gICAgdGhpcy5yZXNldE1vZGFsKCk7XG4gICAgdGhpcy5hY3RpdmF0ZUNhbWVyYVRhYigpO1xuICB9XG59XG4iXX0=