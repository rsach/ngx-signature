import { Injectable, Directive, EventEmitter, HostListener, Output, Component, ViewChild, NgModule, defineInjectable } from '@angular/core';
import SignaturePad__default from 'signature_pad';
import { canvas } from 'glfx-es6';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxSignatureService = /** @class */ (function () {
    function NgxSignatureService() {
    }
    NgxSignatureService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    NgxSignatureService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxSignatureService.ngInjectableDef = defineInjectable({ factory: function NgxSignatureService_Factory() { return new NgxSignatureService(); }, token: NgxSignatureService, providedIn: "root" });
    return NgxSignatureService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        this.signaturePad = new SignaturePad__default(this.signaturePadCanvas.nativeElement);
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
        var /** @type {?} */ c = canvas();
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxSignatureDirective = /** @class */ (function () {
    function NgxSignatureDirective(dialog) {
        this.dialog = dialog;
        this.onSignatureDone = new EventEmitter();
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    NgxSignatureDirective.prototype.openComponent = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        var _this = this;
        this.dialog.open(NgxSignatureComponent, {
            panelClass: 'transparent'
        }).afterClosed().subscribe(function (res) {
            // console.log()
            if (res) {
                _this.onSignatureDone.emit(res);
            }
        });
    };
    NgxSignatureDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appNgxSignature]'
                },] },
    ];
    /** @nocollapse */
    NgxSignatureDirective.ctorParameters = function () { return [
        { type: MatDialog, },
    ]; };
    NgxSignatureDirective.propDecorators = {
        "onSignatureDone": [{ type: Output },],
        "openComponent": [{ type: HostListener, args: ['click', ['$event'],] },],
    };
    return NgxSignatureDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxSignatureModule = /** @class */ (function () {
    function NgxSignatureModule() {
    }
    NgxSignatureModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    return NgxSignatureModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NgxSignatureService, NgxSignatureComponent, NgxSignatureModule, NgxSignatureDirective as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNpZ25hdHVyZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXNpZ25hdHVyZS9saWIvbmd4LXNpZ25hdHVyZS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtc2lnbmF0dXJlL2xpYi9uZ3gtc2lnbmF0dXJlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXNpZ25hdHVyZS9saWIvbmd4LXNpZ25hdHVyZS5kaXJlY3RpdmUudHMiLCJuZzovL25neC1zaWduYXR1cmUvbGliL25neC1zaWduYXR1cmUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4U2lnbmF0dXJlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgU2lnbmF0dXJlUGFkIGZyb20gJ3NpZ25hdHVyZV9wYWQnO1xuaW1wb3J0ICogYXMgZnggZnJvbSAnZ2xmeC1lczYnO1xuaW1wb3J0IHsgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuXG5cbi8vIGRlY2xhcmUgY29uc3QgJDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXNpZ25hdHVyZScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm5neC1zaWduYXR1cmUtbW9kYWxcIiBpZD1cIm5neC1zaWduYXR1cmVcIj5cbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XG5cbiAgICAgICAgICA8IS0tIE1vZGFsIEhlYWRlciAtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiPkUtU2lnbjwvaDQ+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZSgpXCI+JnRpbWVzOzwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPCEtLSBNb2RhbCBib2R5IC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdiBuYXYtdGFic1wiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm5hdi1saW5rXCIgW25nQ2xhc3NdPVwic2VsZWN0ZWRfdGFiID09PSAnZHJhdycgPyAnYWN0aXZlJyA6ICcnXCIgKGNsaWNrKT1cImFjdGl2YXRlRHJhd1RhYigpXCIgcm9sZT1cInRhYlwiID4gPGkgY2xhc3M9XCJmYSBmYS1lZGl0XCI+PC9pPiBEcmF3PC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBbbmdDbGFzc109XCJzZWxlY3RlZF90YWIgPT09ICdjYW1lcmEnID8gJ2FjdGl2ZScgOiAnJ1wiIChjbGljayk9XCJhY3RpdmF0ZUNhbWVyYVRhYigpXCIgcm9sZT1cInRhYlwiID4gPGkgY2xhc3M9XCJmYSBmYS1jYW1lcmFcIj48L2k+IFNuYXA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIFtuZ0NsYXNzXT1cInNlbGVjdGVkX3RhYiA9PT0gJ3VwbG9hZCcgPyAnYWN0aXZlJyA6ICcnXCIgKGNsaWNrKT1cImFjdGl2YXRlVXBsb2FkVGFiKClcIiByb2xlPVwidGFiXCIgPiA8aSBjbGFzcz1cImZhIGZhLWltYWdlXCI+PC9pPiBVcGxvYWQ8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8ZGl2ICBbc3R5bGUudmlzaWJpbGl0eV09XCJzZWxlY3RlZF90YWIgPT09ICdkcmF3JyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nXCIgcm9sZT1cInRhYnBhbmVsXCIgY2xhc3M9XCJ0YWItcGFuZSBcIiBbbmdDbGFzc109XCJzZWxlY3RlZF90YWIgPT09ICdkcmF3JyA/ICdhY3RpdmUnIDogJ2ZhZGUnXCIgaWQ9XCJkcmF3XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRyYXctdGV4dFwiPllvdSBjYW4gc2lnbiB1c2luZyB5b3VyIHRvdWNocGFkIG9yIG1vdXNlIGluc2lkZSByZWN0YW5ndWxhciBhcmVhPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGNhbnZhcyAjc2lnbmF0dXJlUGFkIGhlaWdodD1cIjMwMFwiIHdpZHRoPVwiNDcwXCIgY2xhc3M9XCJzaWduYXR1cmUtcGFkXCI+PC9jYW52YXM+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJjbGVhckRyYXdpbmcoKVwiIGNsYXNzPVwiYnRuIGJ0bi1saWdodFwiPkNsZWFyPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJkb25lRHJhd2luZygpXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICBEb25lXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgW3N0eWxlLnZpc2liaWxpdHldPVwic2VsZWN0ZWRfdGFiID09PSAndXBsb2FkJyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nXCIgcm9sZT1cInRhYnBhbmVsXCIgY2xhc3M9XCJ0YWItcGFuZVwiIFtuZ0NsYXNzXT1cInNlbGVjdGVkX3RhYiA9PT0gJ3VwbG9hZCcgPyAnYWN0aXZlJyA6ICdmYWRlJ1wiIGlkPVwidXBsb2FkXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXNlbGVjdGVkXCIgY2xhc3M9XCJ1cGxvYWRcIiBbbmdDbGFzc109XCJ7J2RyYWdnaW5nJyA6IGRyYWdnaW5nfVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiAoY2hhbmdlKT1cInVwbG9hZEZpbGVDaGFuZ2UoJGV2ZW50KVwiICNmaWxlVXBsb2FkID5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIiFkcmFnZ2luZ1wiIGNsYXNzPVwiYnRuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS11cGxvYWRcIj48L2k+IFNlbGVjdCBhIGZpbGUgdG8gdXBsb2FkXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiZHJhZ2dpbmdcIiBjbGFzcz1cImJ0biBidG4tbGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICBEcm9wIGZpbGUgaGVyZSB0byB1cGxvYWRcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzZWxlY3RlZFwiIGNsYXNzPVwiaW1hZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNyb3AtdGV4dFwiPkNyb3AgdGhlIGltYWdlIHRvIHRoZSBiZXN0IGZpdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW1hZ2UtY3JvcHBlclxuICAgICAgICAgICAgICAgICAgICAgICAgW2ltYWdlQ2hhbmdlZEV2ZW50XT1cInVwbG9hZEZpbGVDaGFuZ2VkRXZlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW21haW50YWluQXNwZWN0UmF0aW9dPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0PVwicG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChpbWFnZUNyb3BwZWQpPVwiaW1hZ2VDcm9wcGVkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGltYWdlTG9hZGVkKT1cImltYWdlTG9hZGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGxvYWRJbWFnZUZhaWxlZCk9XCJsb2FkSW1hZ2VGYWlsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgPjwvaW1hZ2UtY3JvcHBlcj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZG9uZUNyb3BwaW5nKClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBEb25lXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgW3N0eWxlLnZpc2liaWxpdHldPVwic2VsZWN0ZWRfdGFiID09PSAnY2FtZXJhJyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nXCIgcm9sZT1cInRhYnBhbmVsXCIgY2xhc3M9XCJ0YWItcGFuZVwiIFtuZ0NsYXNzXT1cInNlbGVjdGVkX3RhYiA9PT0gJ2NhbWVyYScgPyAnYWN0aXZlJyA6ICdmYWRlJ1wiIGlkPVwiY2FtZXJhXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXNlbGVjdGVkXCIgY2xhc3M9XCJjYXB0dXJlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYW1lcmEtdGV4dFwiPlB1dCBzaWduYXR1cmUgbmVhciB5b3VyIGNhbWVyYSBhbmQgY2xpY2sgb24gdGFrZSBzbmFwc2hvdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8Y2FudmFzICNjYW1lcmFTbmFwc2hvdCBoZWlnaHQ9XCIzMDBcIiB3aWR0aD1cIjQ3MFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PC9jYW52YXM+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8dmlkZW8gICNjYW1lcmEgaGVpZ2h0PVwiMzAwXCIgd2lkdGg9XCI0NzBcIiBjbGFzcz1cInNpZ25hdHVyZS1wYWRcIj48L3ZpZGVvPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLWJsb2NrXCIgKGNsaWNrKT1cInRha2VTbmFwc2hvdCgpXCI+VGFrZSBTbmFwc2hvdDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2VsZWN0ZWRcIiBjbGFzcz1cImNhcHR1cmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNyb3AtdGV4dFwiPkNyb3AgdGhlIGltYWdlIHRvIHRoZSBiZXN0IGZpdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW1hZ2UtY3JvcHBlclxuICAgICAgICAgICAgICAgICAgICAgICAgW2ltYWdlQmFzZTY0XT1cImNhcHR1cmVkSW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW21haW50YWluQXNwZWN0UmF0aW9dPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0PVwicG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChpbWFnZUNyb3BwZWQpPVwiaW1hZ2VDcm9wcGVkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGltYWdlTG9hZGVkKT1cImltYWdlTG9hZGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGxvYWRJbWFnZUZhaWxlZCk9XCJsb2FkSW1hZ2VGYWlsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgPjwvaW1hZ2UtY3JvcHBlcj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJyZXRha2VTbmFwc2hvdCgpXCIgY2xhc3M9XCJidG4gYnRuLWxpZ2h0XCI+UmV0YWtlIFNuYXBzaG90PC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJkb25lQ3JvcHBpbmcoKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIERvbmVcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuXG5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC51cGxvYWR7bWFyZ2luLXRvcDoxNXB4O21hcmdpbi1ib3R0b206MTVweDtwYWRkaW5nOjE1cHg7d2lkdGg6MTAwJTttaW4taGVpZ2h0OjEwMHB4O2JvcmRlcjoycHggZGFzaGVkIHNpbHZlcjt0ZXh0LWFsaWduOmNlbnRlcjtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO3Bvc2l0aW9uOnJlbGF0aXZlfS51cGxvYWQgaW5wdXRbdHlwZT1maWxlXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtvcGFjaXR5OjA7Y3Vyc29yOnBvaW50ZXJ9LnVwbG9hZC5kcmFnZ2luZ3tib3JkZXI6MnB4IGRhc2hlZCAjMjEyMTIxfTpob3N0IGltYWdlLWNyb3BwZXI+LmNyb3BwZXJ7b3V0bGluZS1jb2xvcjpyZ2JhKDEsMSwxLC4yKX0uY2FtZXJhLXRleHQsLmNyb3AtdGV4dCwuZHJhdy10ZXh0e2Rpc3BsYXk6YmxvY2s7dGV4dC1hbGlnbjpjZW50ZXI7cGFkZGluZy10b3A6MTVweDtwYWRkaW5nLWJvdHRvbTo1cHg7Zm9udC1zaXplOjE0cHh9LnRhYi1wYW5le2Rpc3BsYXk6bm9uZX0udGFiLXBhbmUuYWN0aXZle2Rpc3BsYXk6YmxvY2t9LnNpZ25hdHVyZS1wYWR7Ym9yZGVyOjFweCBzb2xpZCAjMDAwO2JvcmRlci1yYWRpdXM6NXB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIE5neFNpZ25hdHVyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGRyYWdnaW5nID0gZmFsc2U7XG4gIHNlbGVjdGVkID0gZmFsc2U7XG4gIHVwbG9hZEZpbGVDaGFuZ2VkRXZlbnQ7XG4gIGNhcHR1cmVkSW1hZ2U7XG4gIGNyb3BwZWRJbWFnZTtcblxuICBzZWxlY3RlZF90YWIgPSAnZHJhdyc7XG5cbiAgQE91dHB1dCgpIG9uU2lnbmF0dXJlRG9uZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICByZXNwb25zZUltYWdlO1xuICBAVmlld0NoaWxkKCdmaWxlVXBsb2FkJykgZmlsZUlucHV0RmllbGQ7XG4gIEBWaWV3Q2hpbGQoJ3NpZ25hdHVyZVBhZCcpIHNpZ25hdHVyZVBhZENhbnZhcztcbiAgQFZpZXdDaGlsZCgnY2FtZXJhJykgY2FtZXJhRWxlbWVudDtcbiAgQFZpZXdDaGlsZCgnY2FtZXJhU25hcHNob3QnKSBjYW1lcmFTbmFwc2hvdENhbnZhcztcblxuICBzaWduYXR1cmVQYWQ7XG4gIHZpZGVvU3RyZWFtO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Tmd4U2lnbmF0dXJlQ29tcG9uZW50PixcbiAgICAvLyBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLnNpZ25hdHVyZVBhZCA9IG5ldyBTaWduYXR1cmVQYWQuZGVmYXVsdCh0aGlzLnNpZ25hdHVyZVBhZENhbnZhcy5uYXRpdmVFbGVtZW50KTtcbiAgICAvLyAkKCcjbmd4LXNpZ25hdHVyZScpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAgKCkgPT4ge1xuICAgIC8vICAgdGhpcy5yZXNldE1vZGFsKCk7XG4gICAgLy8gfSk7XG4gICAgLy8gJCgnI25neC1zaWduYXR1cmUnKS5vbignc2hvdy5icy5tb2RhbCcsICAoKSA9PiB7XG4gICAgLy8gICAkKCdhW2hyZWY9XFwnI2RyYXdcXCddJykuY2xpY2soKTtcbiAgICAvLyB9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSkgb25EcmFnT3ZlcihldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgZmlsZXMgPSBldnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xuICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSkgb25EcmFnTGVhdmUoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgfVxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSkgcHVibGljIG9uRHJvcChldnQpIHtcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgY29uc29sZS5sb2coZXZ0KTtcbiAgfVxuXG5cbiAgdXBsb2FkRmlsZUNoYW5nZShlKSB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGVGaWxlcyhlLnRhcmdldC5maWxlcykpe1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgICB0aGlzLnVwbG9hZEZpbGVDaGFuZ2VkRXZlbnQgPSBlO1xuICAgIH1cbiAgfVxuICBpbWFnZUNyb3BwZWQoaW1hZ2U6IHN0cmluZykge1xuICAgIHRoaXMuY3JvcHBlZEltYWdlID0gaW1hZ2U7XG4gIH1cbiAgaW1hZ2VMb2FkZWQoKSB7XG4gICAgICAvLyBzaG93IGNyb3BwZXJcbiAgfVxuICBsb2FkSW1hZ2VGYWlsZWQoKSB7XG4gICAgICAvLyBzaG93IG1lc3NhZ2VcbiAgfVxuXG4gIHZhbGlkYXRlRmlsZXMoZmlsZXMpIHtcbiAgICBpZiAoZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIShmaWxlc1tpXS50eXBlLm1hdGNoKCdpbWFnZScpKSkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdJbnZhbGlkIGZpbGUhIE9ubHkgaW1hZ2VzIGFyZSBhbGxvd2VkLicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggKChmaWxlc1tpXS5zaXplIC8gMTAyNCkgLyAxMDI0KSA+IDUpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnSW52YWxpZCBmaWxlISBGaWxlIHNpemUgZXhjZWVkcyA1IE1CLicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGRvbmVDcm9wcGluZygpIHtcbiAgICB0aGlzLnJlc3BvbnNlSW1hZ2UgPSB0aGlzLmNyb3BwZWRJbWFnZTtcbiAgICAvLyB0aGlzLm9uU2lnbmF0dXJlRG9uZS5lbWl0KHRoaXMucmVzcG9uc2VJbWFnZSk7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodGhpcy5yZXNwb25zZUltYWdlKTtcbiAgICAvLyAkKCcjbmd4LXNpZ25hdHVyZScpLm1vZGFsKCdoaWRlJyk7XG4gIH1cblxuICBkb25lRHJhd2luZygpIHtcbiAgICB0aGlzLnJlc3BvbnNlSW1hZ2UgPSB0aGlzLnNpZ25hdHVyZVBhZC50b0RhdGFVUkwoKTtcbiAgICAvLyB0aGlzLm9uU2lnbmF0dXJlRG9uZS5lbWl0KHRoaXMucmVzcG9uc2VJbWFnZSk7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodGhpcy5yZXNwb25zZUltYWdlKTtcblxuICAgIC8vICQoJyNuZ3gtc2lnbmF0dXJlJykubW9kYWwoJ2hpZGUnKTtcbiAgfVxuXG5cbiAgY2xlYXJEcmF3aW5nKCkge1xuICAgIGlmICh0aGlzLnNpZ25hdHVyZVBhZCAmJiB0aGlzLnNpZ25hdHVyZVBhZC5jbGVhcikge1xuICAgICAgdGhpcy5zaWduYXR1cmVQYWQuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxuICByZXNldE1vZGFsKCkge1xuICAgIC8vIENsZWFyIERyYXdpbmcgc2VjdGlvblxuICAgIHRoaXMuY2xlYXJEcmF3aW5nKCk7XG4gICAgLy8gQ2xlYXIgVXBsb2FkIFNlY3Rpb25cbiAgICB0aGlzLnVwbG9hZEZpbGVDaGFuZ2VkRXZlbnQgPSBudWxsO1xuICAgIHRoaXMuY3JvcHBlZEltYWdlID0gbnVsbDtcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgLy8gQ2xlYXIgc25hcCBzZWN0aW9uXG4gICAgdGhpcy5zdG9wVmlkZW9TdHJlYW0oKTtcbiAgfVxuXG4gIHN0b3BWaWRlb1N0cmVhbSgpIHtcbiAgICBpZiAodGhpcy52aWRlb1N0cmVhbSAmJiB0aGlzLnZpZGVvU3RyZWFtLmdldFRyYWNrcykge1xuICAgICAgY29uc3QgdHJhY2tzID0gdGhpcy52aWRlb1N0cmVhbS5nZXRUcmFja3MoKTtcbiAgICAgIGZvciAoY29uc3QgaSBpbiB0cmFja3MpIHtcbiAgICAgICAgaWYgKHRyYWNrc1tpXSAmJiB0cmFja3NbaV0uc3RvcCkge1xuICAgICAgICAgIHRyYWNrc1tpXS5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuY2FtZXJhRWxlbWVudCAmJiB0aGlzLmNhbWVyYUVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5jYW1lcmFFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3JjID0gJyc7XG4gICAgICBpZiAodGhpcy5jYW1lcmFFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGF1c2UpIHtcbiAgICAgICAgdGhpcy5jYW1lcmFFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGF1c2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIGFjdGl2YXRlRHJhd1RhYigpIHtcbiAgICB0aGlzLnNlbGVjdGVkX3RhYiA9ICdkcmF3JztcbiAgICB0aGlzLnJlc2V0TW9kYWwoKTtcbiAgfVxuXG4gIGFjdGl2YXRlQ2FtZXJhVGFiKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRfdGFiID0gJ2NhbWVyYSc7XG5cbiAgICB0aGlzLnJlc2V0TW9kYWwoKTtcblxuICAgIGNvbnN0IGJyb3dzZXIgPSA8YW55Pm5hdmlnYXRvcjtcbiAgICBicm93c2VyLmdldFVzZXJNZWRpYSA9IChcbiAgICAgIGJyb3dzZXIuZ2V0VXNlck1lZGlhIHx8XG4gICAgICBicm93c2VyLndlYmtpdEdldFVzZXJNZWRpYSB8fFxuICAgICAgYnJvd3Nlci5tb3pHZXRVc2VyTWVkaWEgfHxcbiAgICAgIGJyb3dzZXIubXNHZXRVc2VyTWVkaWFcbiAgICApO1xuXG4gICAgYnJvd3Nlci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHt2aWRlbyA6IHRydWUsIGF1ZGlvIDogZmFsc2V9KS50aGVuKHN0cmVhbSA9PiB7XG4gICAgICB0aGlzLnZpZGVvU3RyZWFtID0gc3RyZWFtO1xuICAgICAgdGhpcy5jYW1lcmFFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICAgIHRoaXMuY2FtZXJhRWxlbWVudC5uYXRpdmVFbGVtZW50LnBsYXkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFjdGl2YXRlVXBsb2FkVGFiKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRfdGFiID0gJ3VwbG9hZCc7XG5cbiAgICB0aGlzLnJlc2V0TW9kYWwoKTtcbiAgfVxuXG4gIHRha2VTbmFwc2hvdCgpIHtcbiAgICB0aGlzLmNhbWVyYVNuYXBzaG90Q2FudmFzXG4gICAgICAubmF0aXZlRWxlbWVudFxuICAgICAgLmdldENvbnRleHQoJzJkJylcbiAgICAgIC5kcmF3SW1hZ2UoXG4gICAgICAgIHRoaXMuY2FtZXJhRWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICB0aGlzLmNhbWVyYVNuYXBzaG90Q2FudmFzLm5hdGl2ZUVsZW1lbnQud2lkdGgsXG4gICAgICAgIHRoaXMuY2FtZXJhU25hcHNob3RDYW52YXMubmF0aXZlRWxlbWVudC5oZWlnaHRcbiAgICAgICk7XG4gICAgdGhpcy5zdG9wVmlkZW9TdHJlYW0oKTtcbiAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICBjb25zdCBjID0gZnguY2FudmFzKCk7XG4gICAgY29uc3QgdGV4dHVyZSA9IGMudGV4dHVyZSh0aGlzLmNhbWVyYVNuYXBzaG90Q2FudmFzLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGMuZHJhdyh0ZXh0dXJlKVxuICAgICAgICAgICAgLmh1ZVNhdHVyYXRpb24oLTEsIC0xKS8vIGdyYXlzY2FsZVxuICAgICAgICAgICAgLnVuc2hhcnBNYXNrKDIwLCAyKVxuICAgICAgICAgICAgLmJyaWdodG5lc3NDb250cmFzdCgwLjIsIDAuOSlcbiAgICAgICAgICAgIC51cGRhdGUoKTtcbiAgICBjb25zb2xlLmxvZyhjKTtcblxuICAgIHRoaXMuY2FwdHVyZWRJbWFnZSA9IGMudG9EYXRhVVJMKCk7XG4gIH1cblxuICByZXRha2VTbmFwc2hvdCgpIHtcbiAgICB0aGlzLnJlc2V0TW9kYWwoKTtcbiAgICB0aGlzLmFjdGl2YXRlQ2FtZXJhVGFiKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3QsIEhvc3RMaXN0ZW5lciwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge05neFNpZ25hdHVyZUNvbXBvbmVudH0gZnJvbSAnLi9uZ3gtc2lnbmF0dXJlLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBOZ3hTaWduYXR1cmVdJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hTaWduYXR1cmVEaXJlY3RpdmUge1xuXG4gIEBPdXRwdXQoKSBvblNpZ25hdHVyZURvbmU6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZ1xuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgb3BlbkNvbXBvbmVudChldnQpIHtcblxuICAgIHRoaXMuZGlhbG9nLm9wZW4oTmd4U2lnbmF0dXJlQ29tcG9uZW50LCB7XG4gICAgICBwYW5lbENsYXNzOiAndHJhbnNwYXJlbnQnXG4gICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKClcbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgdGhpcy5vblNpZ25hdHVyZURvbmUuZW1pdChyZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neFNpZ25hdHVyZUNvbXBvbmVudCB9IGZyb20gJy4vbmd4LXNpZ25hdHVyZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VDcm9wcGVyTW9kdWxlIH0gZnJvbSAnbmd4LWltYWdlLWNyb3BwZXInO1xuaW1wb3J0IHsgTmd4U2lnbmF0dXJlRGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtc2lnbmF0dXJlLmRpcmVjdGl2ZSc7XG5pbXBvcnQge01hdERpYWxvZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtCcm93c2VyQW5pbWF0aW9uc01vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEltYWdlQ3JvcHBlck1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTm9vcEFuaW1hdGlvbnNNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4U2lnbmF0dXJlQ29tcG9uZW50LFxuICAgIE5neFNpZ25hdHVyZURpcmVjdGl2ZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmd4U2lnbmF0dXJlQ29tcG9uZW50LFxuICAgIE5neFNpZ25hdHVyZURpcmVjdGl2ZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBOZ3hTaWduYXR1cmVDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hTaWduYXR1cmVNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiU2lnbmF0dXJlUGFkLmRlZmF1bHQiLCJmeC5jYW52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