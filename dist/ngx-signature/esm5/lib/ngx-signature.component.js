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
var NgxSignatureComponent = /** @class */ (function () {
    function NgxSignatureComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.dragging = false;
        this.selected = false;
        this.selected_tab = 'draw';
        this.onSignatureDone = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.signaturePad = new SignaturePad.default(this.signaturePadCanvas.nativeElement);
        // $('#ngx-signature').on('hidden.bs.modal',  () => {
        //   this.resetModal();
        // });
        // $('#ngx-signature').on('show.bs.modal',  () => {
        //   $('a[href=\'#draw\']').click();
        // });
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    NgxSignatureComponent.prototype.onDragOver = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var /** @type {?} */ files = evt.dataTransfer.files;
        this.dragging = true;
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    NgxSignatureComponent.prototype.onDragLeave = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.dragging = false;
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    NgxSignatureComponent.prototype.onDrop = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        this.dragging = false;
        console.log(evt);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxSignatureComponent.prototype.uploadFileChange = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.validateFiles(e.target.files)) {
            this.selected = true;
            this.uploadFileChangedEvent = e;
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NgxSignatureComponent.prototype.imageCropped = /**
     * @param {?} image
     * @return {?}
     */
    function (image) {
        this.croppedImage = image;
    };
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.imageLoaded = /**
     * @return {?}
     */
    function () {
        // show cropper
    };
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.loadImageFailed = /**
     * @return {?}
     */
    function () {
        // show message
    };
    /**
     * @param {?} files
     * @return {?}
     */
    NgxSignatureComponent.prototype.validateFiles = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        if (files.length) {
            for (var /** @type {?} */ i = 0; i < files.length; i++) {
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
    };
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.doneCropping = /**
     * @return {?}
     */
    function () {
        this.responseImage = this.croppedImage;
        // this.onSignatureDone.emit(this.responseImage);
        this.dialogRef.close(this.responseImage);
        // $('#ngx-signature').modal('hide');
    };
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.doneDrawing = /**
     * @return {?}
     */
    function () {
        this.responseImage = this.signaturePad.toDataURL();
        // this.onSignatureDone.emit(this.responseImage);
        this.dialogRef.close(this.responseImage);
        // $('#ngx-signature').modal('hide');
    };
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.clearDrawing = /**
     * @return {?}
     */
    function () {
        if (this.signaturePad && this.signaturePad.clear) {
            this.signaturePad.clear();
        }
    };
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.resetModal = /**
     * @return {?}
     */
    function () {
        // Clear Drawing section
        this.clearDrawing();
        // Clear Upload Section
        this.uploadFileChangedEvent = null;
        this.croppedImage = null;
        this.selected = false;
        // Clear snap section
        this.stopVideoStream();
    };
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.stopVideoStream = /**
     * @return {?}
     */
    function () {
        if (this.videoStream && this.videoStream.getTracks) {
            var /** @type {?} */ tracks = this.videoStream.getTracks();
            for (var /** @type {?} */ i in tracks) {
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
    };
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.activateDrawTab = /**
     * @return {?}
     */
    function () {
        this.selected_tab = 'draw';
        this.resetModal();
    };
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.activateCameraTab = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.selected_tab = 'camera';
        this.resetModal();
        var /** @type {?} */ browser = /** @type {?} */ (navigator);
        browser.getUserMedia = (browser.getUserMedia ||
            browser.webkitGetUserMedia ||
            browser.mozGetUserMedia ||
            browser.msGetUserMedia);
        browser.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
            _this.videoStream = stream;
            _this.cameraElement.nativeElement.src = window.URL.createObjectURL(stream);
            _this.cameraElement.nativeElement.play();
        });
    };
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.activateUploadTab = /**
     * @return {?}
     */
    function () {
        this.selected_tab = 'upload';
        this.resetModal();
    };
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.takeSnapshot = /**
     * @return {?}
     */
    function () {
        this.cameraSnapshotCanvas
            .nativeElement
            .getContext('2d')
            .drawImage(this.cameraElement.nativeElement, 0, 0, this.cameraSnapshotCanvas.nativeElement.width, this.cameraSnapshotCanvas.nativeElement.height);
        this.stopVideoStream();
        this.selected = true;
        var /** @type {?} */ c = fx.canvas();
        var /** @type {?} */ texture = c.texture(this.cameraSnapshotCanvas.nativeElement);
        c.draw(texture)
            .hueSaturation(-1, -1) // grayscale
            .unsharpMask(20, 2)
            .brightnessContrast(0.2, 0.9)
            .update();
        console.log(c);
        this.capturedImage = c.toDataURL();
    };
    /**
     * @return {?}
     */
    NgxSignatureComponent.prototype.retakeSnapshot = /**
     * @return {?}
     */
    function () {
        this.resetModal();
        this.activateCameraTab();
    };
    NgxSignatureComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-signature',
                    template: "<div class=\"ngx-signature-modal\" id=\"ngx-signature\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n\n          <!-- Modal Header -->\n          <div class=\"modal-header\">\n            <h4 class=\"modal-title\">E-Sign</h4>\n            <button type=\"button\" class=\"close\" (click)=\"dialogRef.close()\">&times;</button>\n          </div>\n\n          <!-- Modal body -->\n          <div class=\"modal-body\">\n              <ul class=\"nav nav-tabs\" role=\"tablist\">\n                  <li class=\"nav-item\">\n                    <a class=\"nav-link\" [ngClass]=\"selected_tab === 'draw' ? 'active' : ''\" (click)=\"activateDrawTab()\" role=\"tab\" > <i class=\"fa fa-edit\"></i> Draw</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a class=\"nav-link\" [ngClass]=\"selected_tab === 'camera' ? 'active' : ''\" (click)=\"activateCameraTab()\" role=\"tab\" > <i class=\"fa fa-camera\"></i> Snap</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a class=\"nav-link\" [ngClass]=\"selected_tab === 'upload' ? 'active' : ''\" (click)=\"activateUploadTab()\" role=\"tab\" > <i class=\"fa fa-image\"></i> Upload</a>\n                  </li>\n              </ul>\n              <div  [style.visibility]=\"selected_tab === 'draw' ? 'visible' : 'hidden'\" role=\"tabpanel\" class=\"tab-pane \" [ngClass]=\"selected_tab === 'draw' ? 'active' : 'fade'\" id=\"draw\">\n                  <span class=\"draw-text\">You can sign using your touchpad or mouse inside rectangular area</span>\n                  <canvas #signaturePad height=\"300\" width=\"470\" class=\"signature-pad\"></canvas>\n                  <button (click)=\"clearDrawing()\" class=\"btn btn-light\">Clear</button>\n                  <button (click)=\"doneDrawing()\" class=\"btn btn-primary pull-right\">\n                    Done\n                  </button>\n              </div>\n              <div [style.visibility]=\"selected_tab === 'upload' ? 'visible' : 'hidden'\" role=\"tabpanel\" class=\"tab-pane\" [ngClass]=\"selected_tab === 'upload' ? 'active' : 'fade'\" id=\"upload\">\n                  <div *ngIf=\"!selected\" class=\"upload\" [ngClass]=\"{'dragging' : dragging}\">\n                    <input type=\"file\" (change)=\"uploadFileChange($event)\" #fileUpload >\n                    <button *ngIf=\"!dragging\" class=\"btn\">\n                      <i class=\"fa fa-upload\"></i> Select a file to upload\n                    </button>\n                    <button *ngIf=\"dragging\" class=\"btn btn-light\">\n                      Drop file here to upload\n                    </button>\n                  </div>\n                  <div *ngIf=\"selected\" class=\"image\">\n                      <span class=\"crop-text\">Crop the image to the best fit</span>\n                      <image-cropper\n                        [imageChangedEvent]=\"uploadFileChangedEvent\"\n                        [maintainAspectRatio]=\"false\"\n                        format=\"png\"\n                        (imageCropped)=\"imageCropped($event)\"\n                        (imageLoaded)=\"imageLoaded()\"\n                        (loadImageFailed)=\"loadImageFailed()\"\n                      ></image-cropper>\n                      <br>\n                      <button (click)=\"doneCropping()\" class=\"btn btn-primary pull-right\">\n                        Done\n                      </button>\n                  </div>\n              </div>\n              <div [style.visibility]=\"selected_tab === 'camera' ? 'visible' : 'hidden'\" role=\"tabpanel\" class=\"tab-pane\" [ngClass]=\"selected_tab === 'camera' ? 'active' : 'fade'\" id=\"camera\">\n                  <div *ngIf=\"!selected\" class=\"capture\">\n                      <span class=\"camera-text\">Put signature near your camera and click on take snapshot</span>\n                      <canvas #cameraSnapshot height=\"300\" width=\"470\" style=\"display:none\"></canvas>\n\n                      <video  #camera height=\"300\" width=\"470\" class=\"signature-pad\"></video>\n                      <button class=\"btn btn-primary btn-block\" (click)=\"takeSnapshot()\">Take Snapshot</button>\n                  </div>\n                  <div *ngIf=\"selected\" class=\"capture\">\n                      <span class=\"crop-text\">Crop the image to the best fit</span>\n                      <image-cropper\n                        [imageBase64]=\"capturedImage\"\n                        [maintainAspectRatio]=\"false\"\n                        format=\"png\"\n                        (imageCropped)=\"imageCropped($event)\"\n                        (imageLoaded)=\"imageLoaded()\"\n                        (loadImageFailed)=\"loadImageFailed()\"\n                      ></image-cropper>\n                      <button (click)=\"retakeSnapshot()\" class=\"btn btn-light\">Retake Snapshot</button>\n\n                      <button (click)=\"doneCropping()\" class=\"btn btn-primary pull-right\">\n                        Done\n                      </button>\n                  </div>\n              </div>\n          </div>\n\n\n\n        </div>\n      </div>\n</div>\n",
                    styles: [".upload{margin-top:15px;margin-bottom:15px;padding:15px;width:100%;min-height:100px;border:2px dashed silver;text-align:center;display:flex;flex-direction:row;justify-content:center;align-items:center;position:relative}.upload input[type=file]{position:absolute;top:0;left:0;height:100%;width:100%;opacity:0;cursor:pointer}.upload.dragging{border:2px dashed #212121}:host image-cropper>.cropper{outline-color:rgba(1,1,1,.2)}.camera-text,.crop-text,.draw-text{display:block;text-align:center;padding-top:15px;padding-bottom:5px;font-size:14px}.tab-pane{display:none}.tab-pane.active{display:block}.signature-pad{border:1px solid #000;border-radius:5px}"]
                },] },
    ];
    /** @nocollapse */
    NgxSignatureComponent.ctorParameters = function () { return [
        { type: MatDialogRef, },
    ]; };
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
    return NgxSignatureComponent;
}());
export { NgxSignatureComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNpZ25hdHVyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2lnbmF0dXJlLyIsInNvdXJjZXMiOlsibGliL25neC1zaWduYXR1cmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEtBQUssWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFZLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDOztJQXVIeEQsK0JBQ1M7UUFBQSxjQUFTLEdBQVQsU0FBUzt3QkFuQlAsS0FBSzt3QkFDTCxLQUFLOzRCQUtELE1BQU07K0JBRTZCLElBQUksWUFBWSxFQUFVO0tBYXZFOzs7O0lBRUwsd0NBQVE7OztJQUFSO1FBRUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7Ozs7O0tBT3JGOzs7OztJQUVxQywwQ0FBVTs7OztjQUFDLEdBQUc7UUFDbEQsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixxQkFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Ozs7OztJQUdnQiwyQ0FBVzs7OztjQUFDLEdBQUc7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RSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNOLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNyQixXQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNsQixrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2FBQzVCLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFZixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELDhDQUFjOzs7SUFBZDtRQUNFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUMxQjs7Z0JBalNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLHNtS0F5Rlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsNm9CQUE2b0IsQ0FBQztpQkFDeHBCOzs7O2dCQW5Ha0IsWUFBWTs7O29DQTZHNUIsTUFBTTttQ0FHTixTQUFTLFNBQUMsWUFBWTt1Q0FDdEIsU0FBUyxTQUFDLGNBQWM7a0NBQ3hCLFNBQVMsU0FBQyxRQUFRO3lDQUNsQixTQUFTLFNBQUMsZ0JBQWdCOytCQW9CMUIsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQ0FPbkMsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzsyQkFLcEMsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Z0NBMUpsQzs7U0EyR2EscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBTaWduYXR1cmVQYWQgZnJvbSAnc2lnbmF0dXJlX3BhZCc7XG5pbXBvcnQgKiBhcyBmeCBmcm9tICdnbGZ4LWVzNic7XG5pbXBvcnQgeyBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5cblxuLy8gZGVjbGFyZSBjb25zdCAkO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtc2lnbmF0dXJlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibmd4LXNpZ25hdHVyZS1tb2RhbFwiIGlkPVwibmd4LXNpZ25hdHVyZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cblxuICAgICAgICAgIDwhLS0gTW9kYWwgSGVhZGVyIC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+RS1TaWduPC9oND5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKClcIj4mdGltZXM7PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8IS0tIE1vZGFsIGJvZHkgLS0+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzXCIgcm9sZT1cInRhYmxpc3RcIj5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBbbmdDbGFzc109XCJzZWxlY3RlZF90YWIgPT09ICdkcmF3JyA/ICdhY3RpdmUnIDogJydcIiAoY2xpY2spPVwiYWN0aXZhdGVEcmF3VGFiKClcIiByb2xlPVwidGFiXCIgPiA8aSBjbGFzcz1cImZhIGZhLWVkaXRcIj48L2k+IERyYXc8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIFtuZ0NsYXNzXT1cInNlbGVjdGVkX3RhYiA9PT0gJ2NhbWVyYScgPyAnYWN0aXZlJyA6ICcnXCIgKGNsaWNrKT1cImFjdGl2YXRlQ2FtZXJhVGFiKClcIiByb2xlPVwidGFiXCIgPiA8aSBjbGFzcz1cImZhIGZhLWNhbWVyYVwiPjwvaT4gU25hcDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm5hdi1saW5rXCIgW25nQ2xhc3NdPVwic2VsZWN0ZWRfdGFiID09PSAndXBsb2FkJyA/ICdhY3RpdmUnIDogJydcIiAoY2xpY2spPVwiYWN0aXZhdGVVcGxvYWRUYWIoKVwiIHJvbGU9XCJ0YWJcIiA+IDxpIGNsYXNzPVwiZmEgZmEtaW1hZ2VcIj48L2k+IFVwbG9hZDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDxkaXYgIFtzdHlsZS52aXNpYmlsaXR5XT1cInNlbGVjdGVkX3RhYiA9PT0gJ2RyYXcnID8gJ3Zpc2libGUnIDogJ2hpZGRlbidcIiByb2xlPVwidGFicGFuZWxcIiBjbGFzcz1cInRhYi1wYW5lIFwiIFtuZ0NsYXNzXT1cInNlbGVjdGVkX3RhYiA9PT0gJ2RyYXcnID8gJ2FjdGl2ZScgOiAnZmFkZSdcIiBpZD1cImRyYXdcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZHJhdy10ZXh0XCI+WW91IGNhbiBzaWduIHVzaW5nIHlvdXIgdG91Y2hwYWQgb3IgbW91c2UgaW5zaWRlIHJlY3Rhbmd1bGFyIGFyZWE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8Y2FudmFzICNzaWduYXR1cmVQYWQgaGVpZ2h0PVwiMzAwXCIgd2lkdGg9XCI0NzBcIiBjbGFzcz1cInNpZ25hdHVyZS1wYWRcIj48L2NhbnZhcz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImNsZWFyRHJhd2luZygpXCIgY2xhc3M9XCJidG4gYnRuLWxpZ2h0XCI+Q2xlYXI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImRvbmVEcmF3aW5nKClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIERvbmVcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBbc3R5bGUudmlzaWJpbGl0eV09XCJzZWxlY3RlZF90YWIgPT09ICd1cGxvYWQnID8gJ3Zpc2libGUnIDogJ2hpZGRlbidcIiByb2xlPVwidGFicGFuZWxcIiBjbGFzcz1cInRhYi1wYW5lXCIgW25nQ2xhc3NdPVwic2VsZWN0ZWRfdGFiID09PSAndXBsb2FkJyA/ICdhY3RpdmUnIDogJ2ZhZGUnXCIgaWQ9XCJ1cGxvYWRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhc2VsZWN0ZWRcIiBjbGFzcz1cInVwbG9hZFwiIFtuZ0NsYXNzXT1cInsnZHJhZ2dpbmcnIDogZHJhZ2dpbmd9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIChjaGFuZ2UpPVwidXBsb2FkRmlsZUNoYW5nZSgkZXZlbnQpXCIgI2ZpbGVVcGxvYWQgPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiIWRyYWdnaW5nXCIgY2xhc3M9XCJidG5cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXVwbG9hZFwiPjwvaT4gU2VsZWN0IGEgZmlsZSB0byB1cGxvYWRcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJkcmFnZ2luZ1wiIGNsYXNzPVwiYnRuIGJ0bi1saWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgIERyb3AgZmlsZSBoZXJlIHRvIHVwbG9hZFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNlbGVjdGVkXCIgY2xhc3M9XCJpbWFnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY3JvcC10ZXh0XCI+Q3JvcCB0aGUgaW1hZ2UgdG8gdGhlIGJlc3QgZml0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbWFnZS1jcm9wcGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBbaW1hZ2VDaGFuZ2VkRXZlbnRdPVwidXBsb2FkRmlsZUNoYW5nZWRFdmVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbWFpbnRhaW5Bc3BlY3RSYXRpb109XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ9XCJwbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGltYWdlQ3JvcHBlZCk9XCJpbWFnZUNyb3BwZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoaW1hZ2VMb2FkZWQpPVwiaW1hZ2VMb2FkZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAobG9hZEltYWdlRmFpbGVkKT1cImxvYWRJbWFnZUZhaWxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICA+PC9pbWFnZS1jcm9wcGVyPlxuICAgICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJkb25lQ3JvcHBpbmcoKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIERvbmVcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBbc3R5bGUudmlzaWJpbGl0eV09XCJzZWxlY3RlZF90YWIgPT09ICdjYW1lcmEnID8gJ3Zpc2libGUnIDogJ2hpZGRlbidcIiByb2xlPVwidGFicGFuZWxcIiBjbGFzcz1cInRhYi1wYW5lXCIgW25nQ2xhc3NdPVwic2VsZWN0ZWRfdGFiID09PSAnY2FtZXJhJyA/ICdhY3RpdmUnIDogJ2ZhZGUnXCIgaWQ9XCJjYW1lcmFcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhc2VsZWN0ZWRcIiBjbGFzcz1cImNhcHR1cmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbWVyYS10ZXh0XCI+UHV0IHNpZ25hdHVyZSBuZWFyIHlvdXIgY2FtZXJhIGFuZCBjbGljayBvbiB0YWtlIHNuYXBzaG90PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxjYW52YXMgI2NhbWVyYVNuYXBzaG90IGhlaWdodD1cIjMwMFwiIHdpZHRoPVwiNDcwXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48L2NhbnZhcz5cblxuICAgICAgICAgICAgICAgICAgICAgIDx2aWRlbyAgI2NhbWVyYSBoZWlnaHQ9XCIzMDBcIiB3aWR0aD1cIjQ3MFwiIGNsYXNzPVwic2lnbmF0dXJlLXBhZFwiPjwvdmlkZW8+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tYmxvY2tcIiAoY2xpY2spPVwidGFrZVNuYXBzaG90KClcIj5UYWtlIFNuYXBzaG90PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzZWxlY3RlZFwiIGNsYXNzPVwiY2FwdHVyZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY3JvcC10ZXh0XCI+Q3JvcCB0aGUgaW1hZ2UgdG8gdGhlIGJlc3QgZml0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbWFnZS1jcm9wcGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBbaW1hZ2VCYXNlNjRdPVwiY2FwdHVyZWRJbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbWFpbnRhaW5Bc3BlY3RSYXRpb109XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ9XCJwbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGltYWdlQ3JvcHBlZCk9XCJpbWFnZUNyb3BwZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoaW1hZ2VMb2FkZWQpPVwiaW1hZ2VMb2FkZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAobG9hZEltYWdlRmFpbGVkKT1cImxvYWRJbWFnZUZhaWxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICA+PC9pbWFnZS1jcm9wcGVyPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cInJldGFrZVNuYXBzaG90KClcIiBjbGFzcz1cImJ0biBidG4tbGlnaHRcIj5SZXRha2UgU25hcHNob3Q8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImRvbmVDcm9wcGluZygpXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgRG9uZVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnVwbG9hZHttYXJnaW4tdG9wOjE1cHg7bWFyZ2luLWJvdHRvbToxNXB4O3BhZGRpbmc6MTVweDt3aWR0aDoxMDAlO21pbi1oZWlnaHQ6MTAwcHg7Ym9yZGVyOjJweCBkYXNoZWQgc2lsdmVyO3RleHQtYWxpZ246Y2VudGVyO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7cG9zaXRpb246cmVsYXRpdmV9LnVwbG9hZCBpbnB1dFt0eXBlPWZpbGVde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO29wYWNpdHk6MDtjdXJzb3I6cG9pbnRlcn0udXBsb2FkLmRyYWdnaW5ne2JvcmRlcjoycHggZGFzaGVkICMyMTIxMjF9Omhvc3QgaW1hZ2UtY3JvcHBlcj4uY3JvcHBlcntvdXRsaW5lLWNvbG9yOnJnYmEoMSwxLDEsLjIpfS5jYW1lcmEtdGV4dCwuY3JvcC10ZXh0LC5kcmF3LXRleHR7ZGlzcGxheTpibG9jazt0ZXh0LWFsaWduOmNlbnRlcjtwYWRkaW5nLXRvcDoxNXB4O3BhZGRpbmctYm90dG9tOjVweDtmb250LXNpemU6MTRweH0udGFiLXBhbmV7ZGlzcGxheTpub25lfS50YWItcGFuZS5hY3RpdmV7ZGlzcGxheTpibG9ja30uc2lnbmF0dXJlLXBhZHtib3JkZXI6MXB4IHNvbGlkICMwMDA7Ym9yZGVyLXJhZGl1czo1cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4U2lnbmF0dXJlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgdXBsb2FkRmlsZUNoYW5nZWRFdmVudDtcbiAgY2FwdHVyZWRJbWFnZTtcbiAgY3JvcHBlZEltYWdlO1xuXG4gIHNlbGVjdGVkX3RhYiA9ICdkcmF3JztcblxuICBAT3V0cHV0KCkgb25TaWduYXR1cmVEb25lOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHJlc3BvbnNlSW1hZ2U7XG4gIEBWaWV3Q2hpbGQoJ2ZpbGVVcGxvYWQnKSBmaWxlSW5wdXRGaWVsZDtcbiAgQFZpZXdDaGlsZCgnc2lnbmF0dXJlUGFkJykgc2lnbmF0dXJlUGFkQ2FudmFzO1xuICBAVmlld0NoaWxkKCdjYW1lcmEnKSBjYW1lcmFFbGVtZW50O1xuICBAVmlld0NoaWxkKCdjYW1lcmFTbmFwc2hvdCcpIGNhbWVyYVNuYXBzaG90Q2FudmFzO1xuXG4gIHNpZ25hdHVyZVBhZDtcbiAgdmlkZW9TdHJlYW07XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxOZ3hTaWduYXR1cmVDb21wb25lbnQ+LFxuICAgIC8vIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2dcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuc2lnbmF0dXJlUGFkID0gbmV3IFNpZ25hdHVyZVBhZC5kZWZhdWx0KHRoaXMuc2lnbmF0dXJlUGFkQ2FudmFzLm5hdGl2ZUVsZW1lbnQpO1xuICAgIC8vICQoJyNuZ3gtc2lnbmF0dXJlJykub24oJ2hpZGRlbi5icy5tb2RhbCcsICAoKSA9PiB7XG4gICAgLy8gICB0aGlzLnJlc2V0TW9kYWwoKTtcbiAgICAvLyB9KTtcbiAgICAvLyAkKCcjbmd4LXNpZ25hdHVyZScpLm9uKCdzaG93LmJzLm1vZGFsJywgICgpID0+IHtcbiAgICAvLyAgICQoJ2FbaHJlZj1cXCcjZHJhd1xcJ10nKS5jbGljaygpO1xuICAgIC8vIH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKSBvbkRyYWdPdmVyKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBmaWxlcyA9IGV2dC5kYXRhVHJhbnNmZXIuZmlsZXM7XG4gICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cbiAgfVxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKSBvbkRyYWdMZWF2ZShldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKSBwdWJsaWMgb25Ecm9wKGV2dCkge1xuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBjb25zb2xlLmxvZyhldnQpO1xuICB9XG5cblxuICB1cGxvYWRGaWxlQ2hhbmdlKGUpIHtcbiAgICBpZiAodGhpcy52YWxpZGF0ZUZpbGVzKGUudGFyZ2V0LmZpbGVzKSl7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudXBsb2FkRmlsZUNoYW5nZWRFdmVudCA9IGU7XG4gICAgfVxuICB9XG4gIGltYWdlQ3JvcHBlZChpbWFnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5jcm9wcGVkSW1hZ2UgPSBpbWFnZTtcbiAgfVxuICBpbWFnZUxvYWRlZCgpIHtcbiAgICAgIC8vIHNob3cgY3JvcHBlclxuICB9XG4gIGxvYWRJbWFnZUZhaWxlZCgpIHtcbiAgICAgIC8vIHNob3cgbWVzc2FnZVxuICB9XG5cbiAgdmFsaWRhdGVGaWxlcyhmaWxlcykge1xuICAgIGlmIChmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghKGZpbGVzW2ldLnR5cGUubWF0Y2goJ2ltYWdlJykpKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0ludmFsaWQgZmlsZSEgT25seSBpbWFnZXMgYXJlIGFsbG93ZWQuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCAoKGZpbGVzW2ldLnNpemUgLyAxMDI0KSAvIDEwMjQpID4gNSkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdJbnZhbGlkIGZpbGUhIEZpbGUgc2l6ZSBleGNlZWRzIDUgTUIuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZG9uZUNyb3BwaW5nKCkge1xuICAgIHRoaXMucmVzcG9uc2VJbWFnZSA9IHRoaXMuY3JvcHBlZEltYWdlO1xuICAgIC8vIHRoaXMub25TaWduYXR1cmVEb25lLmVtaXQodGhpcy5yZXNwb25zZUltYWdlKTtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0aGlzLnJlc3BvbnNlSW1hZ2UpO1xuICAgIC8vICQoJyNuZ3gtc2lnbmF0dXJlJykubW9kYWwoJ2hpZGUnKTtcbiAgfVxuXG4gIGRvbmVEcmF3aW5nKCkge1xuICAgIHRoaXMucmVzcG9uc2VJbWFnZSA9IHRoaXMuc2lnbmF0dXJlUGFkLnRvRGF0YVVSTCgpO1xuICAgIC8vIHRoaXMub25TaWduYXR1cmVEb25lLmVtaXQodGhpcy5yZXNwb25zZUltYWdlKTtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0aGlzLnJlc3BvbnNlSW1hZ2UpO1xuXG4gICAgLy8gJCgnI25neC1zaWduYXR1cmUnKS5tb2RhbCgnaGlkZScpO1xuICB9XG5cblxuICBjbGVhckRyYXdpbmcoKSB7XG4gICAgaWYgKHRoaXMuc2lnbmF0dXJlUGFkICYmIHRoaXMuc2lnbmF0dXJlUGFkLmNsZWFyKSB7XG4gICAgICB0aGlzLnNpZ25hdHVyZVBhZC5jbGVhcigpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0TW9kYWwoKSB7XG4gICAgLy8gQ2xlYXIgRHJhd2luZyBzZWN0aW9uXG4gICAgdGhpcy5jbGVhckRyYXdpbmcoKTtcbiAgICAvLyBDbGVhciBVcGxvYWQgU2VjdGlvblxuICAgIHRoaXMudXBsb2FkRmlsZUNoYW5nZWRFdmVudCA9IG51bGw7XG4gICAgdGhpcy5jcm9wcGVkSW1hZ2UgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAvLyBDbGVhciBzbmFwIHNlY3Rpb25cbiAgICB0aGlzLnN0b3BWaWRlb1N0cmVhbSgpO1xuICB9XG5cbiAgc3RvcFZpZGVvU3RyZWFtKCkge1xuICAgIGlmICh0aGlzLnZpZGVvU3RyZWFtICYmIHRoaXMudmlkZW9TdHJlYW0uZ2V0VHJhY2tzKSB7XG4gICAgICBjb25zdCB0cmFja3MgPSB0aGlzLnZpZGVvU3RyZWFtLmdldFRyYWNrcygpO1xuICAgICAgZm9yIChjb25zdCBpIGluIHRyYWNrcykge1xuICAgICAgICBpZiAodHJhY2tzW2ldICYmIHRyYWNrc1tpXS5zdG9wKSB7XG4gICAgICAgICAgdHJhY2tzW2ldLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5jYW1lcmFFbGVtZW50ICYmIHRoaXMuY2FtZXJhRWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICB0aGlzLmNhbWVyYUVsZW1lbnQubmF0aXZlRWxlbWVudC5zcmMgPSAnJztcbiAgICAgIGlmICh0aGlzLmNhbWVyYUVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXVzZSkge1xuICAgICAgICB0aGlzLmNhbWVyYUVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXVzZSgpO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgYWN0aXZhdGVEcmF3VGFiKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRfdGFiID0gJ2RyYXcnO1xuICAgIHRoaXMucmVzZXRNb2RhbCgpO1xuICB9XG5cbiAgYWN0aXZhdGVDYW1lcmFUYWIoKSB7XG4gICAgdGhpcy5zZWxlY3RlZF90YWIgPSAnY2FtZXJhJztcblxuICAgIHRoaXMucmVzZXRNb2RhbCgpO1xuXG4gICAgY29uc3QgYnJvd3NlciA9IDxhbnk+bmF2aWdhdG9yO1xuICAgIGJyb3dzZXIuZ2V0VXNlck1lZGlhID0gKFxuICAgICAgYnJvd3Nlci5nZXRVc2VyTWVkaWEgfHxcbiAgICAgIGJyb3dzZXIud2Via2l0R2V0VXNlck1lZGlhIHx8XG4gICAgICBicm93c2VyLm1vekdldFVzZXJNZWRpYSB8fFxuICAgICAgYnJvd3Nlci5tc0dldFVzZXJNZWRpYVxuICAgICk7XG5cbiAgICBicm93c2VyLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe3ZpZGVvIDogdHJ1ZSwgYXVkaW8gOiBmYWxzZX0pLnRoZW4oc3RyZWFtID0+IHtcbiAgICAgIHRoaXMudmlkZW9TdHJlYW0gPSBzdHJlYW07XG4gICAgICB0aGlzLmNhbWVyYUVsZW1lbnQubmF0aXZlRWxlbWVudC5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xuICAgICAgdGhpcy5jYW1lcmFFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGxheSgpO1xuICAgIH0pO1xuICB9XG5cbiAgYWN0aXZhdGVVcGxvYWRUYWIoKSB7XG4gICAgdGhpcy5zZWxlY3RlZF90YWIgPSAndXBsb2FkJztcblxuICAgIHRoaXMucmVzZXRNb2RhbCgpO1xuICB9XG5cbiAgdGFrZVNuYXBzaG90KCkge1xuICAgIHRoaXMuY2FtZXJhU25hcHNob3RDYW52YXNcbiAgICAgIC5uYXRpdmVFbGVtZW50XG4gICAgICAuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgLmRyYXdJbWFnZShcbiAgICAgICAgdGhpcy5jYW1lcmFFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHRoaXMuY2FtZXJhU25hcHNob3RDYW52YXMubmF0aXZlRWxlbWVudC53aWR0aCxcbiAgICAgICAgdGhpcy5jYW1lcmFTbmFwc2hvdENhbnZhcy5uYXRpdmVFbGVtZW50LmhlaWdodFxuICAgICAgKTtcbiAgICB0aGlzLnN0b3BWaWRlb1N0cmVhbSgpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgIGNvbnN0IGMgPSBmeC5jYW52YXMoKTtcbiAgICBjb25zdCB0ZXh0dXJlID0gYy50ZXh0dXJlKHRoaXMuY2FtZXJhU25hcHNob3RDYW52YXMubmF0aXZlRWxlbWVudCk7XG4gICAgYy5kcmF3KHRleHR1cmUpXG4gICAgICAgICAgICAuaHVlU2F0dXJhdGlvbigtMSwgLTEpLy8gZ3JheXNjYWxlXG4gICAgICAgICAgICAudW5zaGFycE1hc2soMjAsIDIpXG4gICAgICAgICAgICAuYnJpZ2h0bmVzc0NvbnRyYXN0KDAuMiwgMC45KVxuICAgICAgICAgICAgLnVwZGF0ZSgpO1xuICAgIGNvbnNvbGUubG9nKGMpO1xuXG4gICAgdGhpcy5jYXB0dXJlZEltYWdlID0gYy50b0RhdGFVUkwoKTtcbiAgfVxuXG4gIHJldGFrZVNuYXBzaG90KCkge1xuICAgIHRoaXMucmVzZXRNb2RhbCgpO1xuICAgIHRoaXMuYWN0aXZhdGVDYW1lcmFUYWIoKTtcbiAgfVxufVxuIl19