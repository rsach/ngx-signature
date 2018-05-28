(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('signature_pad'), require('glfx-es6'), require('@angular/material'), require('@angular/common'), require('ngx-image-cropper'), require('@angular/platform-browser/animations')) :
    typeof define === 'function' && define.amd ? define('ngx-signature', ['exports', '@angular/core', 'signature_pad', 'glfx-es6', '@angular/material', '@angular/common', 'ngx-image-cropper', '@angular/platform-browser/animations'], factory) :
    (factory((global['ngx-signature'] = {}),global.ng.core,null,null,global.ng.material,global.ng.common,null,global.ng.platformBrowser.animations));
}(this, (function (exports,i0,SignaturePad,fx,material,common,ngxImageCropper,animations) { 'use strict';

    var SignaturePad__default = SignaturePad['default'];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxSignatureService = (function () {
        function NgxSignatureService() {
        }
        NgxSignatureService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        NgxSignatureService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxSignatureService.ngInjectableDef = i0.defineInjectable({ factory: function NgxSignatureService_Factory() { return new NgxSignatureService(); }, token: NgxSignatureService, providedIn: "root" });
        return NgxSignatureService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxSignatureComponent = (function () {
        function NgxSignatureComponent(dialogRef) {
            this.dialogRef = dialogRef;
            this.dragging = false;
            this.selected = false;
            this.selected_tab = 'draw';
            this.onSignatureDone = new i0.EventEmitter();
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
                var /** @type {?} */ browser = (navigator);
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
            { type: i0.Component, args: [{
                        selector: 'ngx-signature',
                        template: "<div class=\"ngx-signature-modal\" id=\"ngx-signature\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n\n          <!-- Modal Header -->\n          <div class=\"modal-header\">\n            <h4 class=\"modal-title\">E-Sign</h4>\n            <button type=\"button\" class=\"close\" (click)=\"dialogRef.close()\">&times;</button>\n          </div>\n\n          <!-- Modal body -->\n          <div class=\"modal-body\">\n              <ul class=\"nav nav-tabs\" role=\"tablist\">\n                  <li class=\"nav-item\">\n                    <a class=\"nav-link\" [ngClass]=\"selected_tab === 'draw' ? 'active' : ''\" (click)=\"activateDrawTab()\" role=\"tab\" > <i class=\"fa fa-edit\"></i> Draw</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a class=\"nav-link\" [ngClass]=\"selected_tab === 'camera' ? 'active' : ''\" (click)=\"activateCameraTab()\" role=\"tab\" > <i class=\"fa fa-camera\"></i> Snap</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a class=\"nav-link\" [ngClass]=\"selected_tab === 'upload' ? 'active' : ''\" (click)=\"activateUploadTab()\" role=\"tab\" > <i class=\"fa fa-image\"></i> Upload</a>\n                  </li>\n              </ul>\n              <div  [style.visibility]=\"selected_tab === 'draw' ? 'visible' : 'hidden'\" role=\"tabpanel\" class=\"tab-pane \" [ngClass]=\"selected_tab === 'draw' ? 'active' : 'fade'\" id=\"draw\">\n                  <span class=\"draw-text\">You can sign using your touchpad or mouse inside rectangular area</span>\n                  <canvas #signaturePad height=\"300\" width=\"470\" class=\"signature-pad\"></canvas>\n                  <button (click)=\"clearDrawing()\" class=\"btn btn-light\">Clear</button>\n                  <button (click)=\"doneDrawing()\" class=\"btn btn-primary pull-right\">\n                    Done\n                  </button>\n              </div>\n              <div [style.visibility]=\"selected_tab === 'upload' ? 'visible' : 'hidden'\" role=\"tabpanel\" class=\"tab-pane\" [ngClass]=\"selected_tab === 'upload' ? 'active' : 'fade'\" id=\"upload\">\n                  <div *ngIf=\"!selected\" class=\"upload\" [ngClass]=\"{'dragging' : dragging}\">\n                    <input type=\"file\" (change)=\"uploadFileChange($event)\" #fileUpload >\n                    <button *ngIf=\"!dragging\" class=\"btn\">\n                      <i class=\"fa fa-upload\"></i> Select a file to upload\n                    </button>\n                    <button *ngIf=\"dragging\" class=\"btn btn-light\">\n                      Drop file here to upload\n                    </button>\n                  </div>\n                  <div *ngIf=\"selected\" class=\"image\">\n                      <span class=\"crop-text\">Crop the image to the best fit</span>\n                      <image-cropper\n                        [imageChangedEvent]=\"uploadFileChangedEvent\"\n                        [maintainAspectRatio]=\"false\"\n                        format=\"png\"\n                        (imageCropped)=\"imageCropped($event)\"\n                        (imageLoaded)=\"imageLoaded()\"\n                        (loadImageFailed)=\"loadImageFailed()\"\n                      ></image-cropper>\n                      <br>\n                      <button (click)=\"doneCropping()\" class=\"btn btn-primary pull-right\">\n                        Done\n                      </button>\n                  </div>\n              </div>\n              <div [style.visibility]=\"selected_tab === 'camera' ? 'visible' : 'hidden'\" role=\"tabpanel\" class=\"tab-pane\" [ngClass]=\"selected_tab === 'camera' ? 'active' : 'fade'\" id=\"camera\">\n                  <div *ngIf=\"!selected\" class=\"capture\">\n                      <span class=\"camera-text\">Put signature near your camera and click on take snapshot</span>\n                      <canvas #cameraSnapshot height=\"300\" width=\"470\" style=\"display:none\"></canvas>\n\n                      <video  #camera height=\"300\" width=\"470\" class=\"signature-pad\"></video>\n                      <button class=\"btn btn-primary btn-block\" (click)=\"takeSnapshot()\">Take Snapshot</button>\n                  </div>\n                  <div *ngIf=\"selected\" class=\"capture\">\n                      <span class=\"crop-text\">Crop the image to the best fit</span>\n                      <image-cropper\n                        [imageBase64]=\"capturedImage\"\n                        [maintainAspectRatio]=\"false\"\n                        format=\"png\"\n                        (imageCropped)=\"imageCropped($event)\"\n                        (imageLoaded)=\"imageLoaded()\"\n                        (loadImageFailed)=\"loadImageFailed()\"\n                      ></image-cropper>\n                      <button (click)=\"retakeSnapshot()\" class=\"btn btn-light\">Retake Snapshot</button>\n\n                      <button (click)=\"doneCropping()\" class=\"btn btn-primary pull-right\">\n                        Done\n                      </button>\n                  </div>\n              </div>\n          </div>\n\n\n\n        </div>\n      </div>\n</div>\n",
                        styles: [".upload{margin-top:15px;margin-bottom:15px;padding:15px;width:100%;min-height:100px;border:2px dashed silver;text-align:center;display:flex;flex-direction:row;justify-content:center;align-items:center;position:relative}.upload input[type=file]{position:absolute;top:0;left:0;height:100%;width:100%;opacity:0;cursor:pointer}.upload.dragging{border:2px dashed #212121}:host image-cropper>.cropper{outline-color:rgba(1,1,1,.2)}.camera-text,.crop-text,.draw-text{display:block;text-align:center;padding-top:15px;padding-bottom:5px;font-size:14px}.tab-pane{display:none}.tab-pane.active{display:block}.signature-pad{border:1px solid #000;border-radius:5px}"]
                    },] },
        ];
        /** @nocollapse */
        NgxSignatureComponent.ctorParameters = function () {
            return [
                { type: material.MatDialogRef, },
            ];
        };
        NgxSignatureComponent.propDecorators = {
            "onSignatureDone": [{ type: i0.Output },],
            "fileInputField": [{ type: i0.ViewChild, args: ['fileUpload',] },],
            "signaturePadCanvas": [{ type: i0.ViewChild, args: ['signaturePad',] },],
            "cameraElement": [{ type: i0.ViewChild, args: ['camera',] },],
            "cameraSnapshotCanvas": [{ type: i0.ViewChild, args: ['cameraSnapshot',] },],
            "onDragOver": [{ type: i0.HostListener, args: ['dragover', ['$event'],] },],
            "onDragLeave": [{ type: i0.HostListener, args: ['dragleave', ['$event'],] },],
            "onDrop": [{ type: i0.HostListener, args: ['drop', ['$event'],] },],
        };
        return NgxSignatureComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxSignatureDirective = (function () {
        function NgxSignatureDirective(dialog) {
            this.dialog = dialog;
            this.onSignatureDone = new i0.EventEmitter();
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
            { type: i0.Directive, args: [{
                        selector: '[appNgxSignature]'
                    },] },
        ];
        /** @nocollapse */
        NgxSignatureDirective.ctorParameters = function () {
            return [
                { type: material.MatDialog, },
            ];
        };
        NgxSignatureDirective.propDecorators = {
            "onSignatureDone": [{ type: i0.Output },],
            "openComponent": [{ type: i0.HostListener, args: ['click', ['$event'],] },],
        };
        return NgxSignatureDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxSignatureModule = (function () {
        function NgxSignatureModule() {
        }
        NgxSignatureModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            ngxImageCropper.ImageCropperModule,
                            material.MatDialogModule,
                            animations.NoopAnimationsModule,
                            animations.BrowserAnimationsModule
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

    exports.NgxSignatureService = NgxSignatureService;
    exports.NgxSignatureComponent = NgxSignatureComponent;
    exports.NgxSignatureModule = NgxSignatureModule;
    exports.ɵa = NgxSignatureDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNpZ25hdHVyZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1zaWduYXR1cmUvbGliL25neC1zaWduYXR1cmUuc2VydmljZS50cyIsIm5nOi8vbmd4LXNpZ25hdHVyZS9saWIvbmd4LXNpZ25hdHVyZS5jb21wb25lbnQudHMiLCJuZzovL25neC1zaWduYXR1cmUvbGliL25neC1zaWduYXR1cmUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtc2lnbmF0dXJlL2xpYi9uZ3gtc2lnbmF0dXJlLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neFNpZ25hdHVyZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFNpZ25hdHVyZVBhZCBmcm9tICdzaWduYXR1cmVfcGFkJztcbmltcG9ydCAqIGFzIGZ4IGZyb20gJ2dsZngtZXM2JztcbmltcG9ydCB7IE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cblxuXG4vLyBkZWNsYXJlIGNvbnN0ICQ7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1zaWduYXR1cmUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJuZ3gtc2lnbmF0dXJlLW1vZGFsXCIgaWQ9XCJuZ3gtc2lnbmF0dXJlXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuXG4gICAgICAgICAgPCEtLSBNb2RhbCBIZWFkZXIgLS0+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj5FLVNpZ248L2g0PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIChjbGljayk9XCJkaWFsb2dSZWYuY2xvc2UoKVwiPiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDwhLS0gTW9kYWwgYm9keSAtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIiByb2xlPVwidGFibGlzdFwiPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIFtuZ0NsYXNzXT1cInNlbGVjdGVkX3RhYiA9PT0gJ2RyYXcnID8gJ2FjdGl2ZScgOiAnJ1wiIChjbGljayk9XCJhY3RpdmF0ZURyYXdUYWIoKVwiIHJvbGU9XCJ0YWJcIiA+IDxpIGNsYXNzPVwiZmEgZmEtZWRpdFwiPjwvaT4gRHJhdzwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm5hdi1saW5rXCIgW25nQ2xhc3NdPVwic2VsZWN0ZWRfdGFiID09PSAnY2FtZXJhJyA/ICdhY3RpdmUnIDogJydcIiAoY2xpY2spPVwiYWN0aXZhdGVDYW1lcmFUYWIoKVwiIHJvbGU9XCJ0YWJcIiA+IDxpIGNsYXNzPVwiZmEgZmEtY2FtZXJhXCI+PC9pPiBTbmFwPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBbbmdDbGFzc109XCJzZWxlY3RlZF90YWIgPT09ICd1cGxvYWQnID8gJ2FjdGl2ZScgOiAnJ1wiIChjbGljayk9XCJhY3RpdmF0ZVVwbG9hZFRhYigpXCIgcm9sZT1cInRhYlwiID4gPGkgY2xhc3M9XCJmYSBmYS1pbWFnZVwiPjwvaT4gVXBsb2FkPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgPGRpdiAgW3N0eWxlLnZpc2liaWxpdHldPVwic2VsZWN0ZWRfdGFiID09PSAnZHJhdycgPyAndmlzaWJsZScgOiAnaGlkZGVuJ1wiIHJvbGU9XCJ0YWJwYW5lbFwiIGNsYXNzPVwidGFiLXBhbmUgXCIgW25nQ2xhc3NdPVwic2VsZWN0ZWRfdGFiID09PSAnZHJhdycgPyAnYWN0aXZlJyA6ICdmYWRlJ1wiIGlkPVwiZHJhd1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkcmF3LXRleHRcIj5Zb3UgY2FuIHNpZ24gdXNpbmcgeW91ciB0b3VjaHBhZCBvciBtb3VzZSBpbnNpZGUgcmVjdGFuZ3VsYXIgYXJlYTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxjYW52YXMgI3NpZ25hdHVyZVBhZCBoZWlnaHQ9XCIzMDBcIiB3aWR0aD1cIjQ3MFwiIGNsYXNzPVwic2lnbmF0dXJlLXBhZFwiPjwvY2FudmFzPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiY2xlYXJEcmF3aW5nKClcIiBjbGFzcz1cImJ0biBidG4tbGlnaHRcIj5DbGVhcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZG9uZURyYXdpbmcoKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgRG9uZVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IFtzdHlsZS52aXNpYmlsaXR5XT1cInNlbGVjdGVkX3RhYiA9PT0gJ3VwbG9hZCcgPyAndmlzaWJsZScgOiAnaGlkZGVuJ1wiIHJvbGU9XCJ0YWJwYW5lbFwiIGNsYXNzPVwidGFiLXBhbmVcIiBbbmdDbGFzc109XCJzZWxlY3RlZF90YWIgPT09ICd1cGxvYWQnID8gJ2FjdGl2ZScgOiAnZmFkZSdcIiBpZD1cInVwbG9hZFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFzZWxlY3RlZFwiIGNsYXNzPVwidXBsb2FkXCIgW25nQ2xhc3NdPVwieydkcmFnZ2luZycgOiBkcmFnZ2luZ31cIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgKGNoYW5nZSk9XCJ1cGxvYWRGaWxlQ2hhbmdlKCRldmVudClcIiAjZmlsZVVwbG9hZCA+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCIhZHJhZ2dpbmdcIiBjbGFzcz1cImJ0blwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdXBsb2FkXCI+PC9pPiBTZWxlY3QgYSBmaWxlIHRvIHVwbG9hZFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImRyYWdnaW5nXCIgY2xhc3M9XCJidG4gYnRuLWxpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgRHJvcCBmaWxlIGhlcmUgdG8gdXBsb2FkXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2VsZWN0ZWRcIiBjbGFzcz1cImltYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjcm9wLXRleHRcIj5Dcm9wIHRoZSBpbWFnZSB0byB0aGUgYmVzdCBmaXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGltYWdlLWNyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpbWFnZUNoYW5nZWRFdmVudF09XCJ1cGxvYWRGaWxlQ2hhbmdlZEV2ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFttYWludGFpbkFzcGVjdFJhdGlvXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdD1cInBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoaW1hZ2VDcm9wcGVkKT1cImltYWdlQ3JvcHBlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChpbWFnZUxvYWRlZCk9XCJpbWFnZUxvYWRlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChsb2FkSW1hZ2VGYWlsZWQpPVwibG9hZEltYWdlRmFpbGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAgID48L2ltYWdlLWNyb3BwZXI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImRvbmVDcm9wcGluZygpXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgRG9uZVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IFtzdHlsZS52aXNpYmlsaXR5XT1cInNlbGVjdGVkX3RhYiA9PT0gJ2NhbWVyYScgPyAndmlzaWJsZScgOiAnaGlkZGVuJ1wiIHJvbGU9XCJ0YWJwYW5lbFwiIGNsYXNzPVwidGFiLXBhbmVcIiBbbmdDbGFzc109XCJzZWxlY3RlZF90YWIgPT09ICdjYW1lcmEnID8gJ2FjdGl2ZScgOiAnZmFkZSdcIiBpZD1cImNhbWVyYVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFzZWxlY3RlZFwiIGNsYXNzPVwiY2FwdHVyZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FtZXJhLXRleHRcIj5QdXQgc2lnbmF0dXJlIG5lYXIgeW91ciBjYW1lcmEgYW5kIGNsaWNrIG9uIHRha2Ugc25hcHNob3Q8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGNhbnZhcyAjY2FtZXJhU25hcHNob3QgaGVpZ2h0PVwiMzAwXCIgd2lkdGg9XCI0NzBcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvY2FudmFzPlxuXG4gICAgICAgICAgICAgICAgICAgICAgPHZpZGVvICAjY2FtZXJhIGhlaWdodD1cIjMwMFwiIHdpZHRoPVwiNDcwXCIgY2xhc3M9XCJzaWduYXR1cmUtcGFkXCI+PC92aWRlbz5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1ibG9ja1wiIChjbGljayk9XCJ0YWtlU25hcHNob3QoKVwiPlRha2UgU25hcHNob3Q8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNlbGVjdGVkXCIgY2xhc3M9XCJjYXB0dXJlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjcm9wLXRleHRcIj5Dcm9wIHRoZSBpbWFnZSB0byB0aGUgYmVzdCBmaXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGltYWdlLWNyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpbWFnZUJhc2U2NF09XCJjYXB0dXJlZEltYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFttYWludGFpbkFzcGVjdFJhdGlvXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdD1cInBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoaW1hZ2VDcm9wcGVkKT1cImltYWdlQ3JvcHBlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChpbWFnZUxvYWRlZCk9XCJpbWFnZUxvYWRlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChsb2FkSW1hZ2VGYWlsZWQpPVwibG9hZEltYWdlRmFpbGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAgID48L2ltYWdlLWNyb3BwZXI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwicmV0YWtlU25hcHNob3QoKVwiIGNsYXNzPVwiYnRuIGJ0bi1saWdodFwiPlJldGFrZSBTbmFwc2hvdDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZG9uZUNyb3BwaW5nKClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBEb25lXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cblxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AudXBsb2Fke21hcmdpbi10b3A6MTVweDttYXJnaW4tYm90dG9tOjE1cHg7cGFkZGluZzoxNXB4O3dpZHRoOjEwMCU7bWluLWhlaWdodDoxMDBweDtib3JkZXI6MnB4IGRhc2hlZCBzaWx2ZXI7dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOnJvdztqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtwb3NpdGlvbjpyZWxhdGl2ZX0udXBsb2FkIGlucHV0W3R5cGU9ZmlsZV17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7b3BhY2l0eTowO2N1cnNvcjpwb2ludGVyfS51cGxvYWQuZHJhZ2dpbmd7Ym9yZGVyOjJweCBkYXNoZWQgIzIxMjEyMX06aG9zdCBpbWFnZS1jcm9wcGVyPi5jcm9wcGVye291dGxpbmUtY29sb3I6cmdiYSgxLDEsMSwuMil9LmNhbWVyYS10ZXh0LC5jcm9wLXRleHQsLmRyYXctdGV4dHtkaXNwbGF5OmJsb2NrO3RleHQtYWxpZ246Y2VudGVyO3BhZGRpbmctdG9wOjE1cHg7cGFkZGluZy1ib3R0b206NXB4O2ZvbnQtc2l6ZToxNHB4fS50YWItcGFuZXtkaXNwbGF5Om5vbmV9LnRhYi1wYW5lLmFjdGl2ZXtkaXNwbGF5OmJsb2NrfS5zaWduYXR1cmUtcGFke2JvcmRlcjoxcHggc29saWQgIzAwMDtib3JkZXItcmFkaXVzOjVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hTaWduYXR1cmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBkcmFnZ2luZyA9IGZhbHNlO1xuICBzZWxlY3RlZCA9IGZhbHNlO1xuICB1cGxvYWRGaWxlQ2hhbmdlZEV2ZW50O1xuICBjYXB0dXJlZEltYWdlO1xuICBjcm9wcGVkSW1hZ2U7XG5cbiAgc2VsZWN0ZWRfdGFiID0gJ2RyYXcnO1xuXG4gIEBPdXRwdXQoKSBvblNpZ25hdHVyZURvbmU6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcmVzcG9uc2VJbWFnZTtcbiAgQFZpZXdDaGlsZCgnZmlsZVVwbG9hZCcpIGZpbGVJbnB1dEZpZWxkO1xuICBAVmlld0NoaWxkKCdzaWduYXR1cmVQYWQnKSBzaWduYXR1cmVQYWRDYW52YXM7XG4gIEBWaWV3Q2hpbGQoJ2NhbWVyYScpIGNhbWVyYUVsZW1lbnQ7XG4gIEBWaWV3Q2hpbGQoJ2NhbWVyYVNuYXBzaG90JykgY2FtZXJhU25hcHNob3RDYW52YXM7XG5cbiAgc2lnbmF0dXJlUGFkO1xuICB2aWRlb1N0cmVhbTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPE5neFNpZ25hdHVyZUNvbXBvbmVudD4sXG4gICAgLy8gcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZ1xuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5zaWduYXR1cmVQYWQgPSBuZXcgU2lnbmF0dXJlUGFkLmRlZmF1bHQodGhpcy5zaWduYXR1cmVQYWRDYW52YXMubmF0aXZlRWxlbWVudCk7XG4gICAgLy8gJCgnI25neC1zaWduYXR1cmUnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgICgpID0+IHtcbiAgICAvLyAgIHRoaXMucmVzZXRNb2RhbCgpO1xuICAgIC8vIH0pO1xuICAgIC8vICQoJyNuZ3gtc2lnbmF0dXJlJykub24oJ3Nob3cuYnMubW9kYWwnLCAgKCkgPT4ge1xuICAgIC8vICAgJCgnYVtocmVmPVxcJyNkcmF3XFwnXScpLmNsaWNrKCk7XG4gICAgLy8gfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pIG9uRHJhZ092ZXIoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IGZpbGVzID0gZXZ0LmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblxuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pIG9uRHJhZ0xlYXZlKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pIHB1YmxpYyBvbkRyb3AoZXZ0KSB7XG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIGNvbnNvbGUubG9nKGV2dCk7XG4gIH1cblxuXG4gIHVwbG9hZEZpbGVDaGFuZ2UoZSkge1xuICAgIGlmICh0aGlzLnZhbGlkYXRlRmlsZXMoZS50YXJnZXQuZmlsZXMpKXtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy51cGxvYWRGaWxlQ2hhbmdlZEV2ZW50ID0gZTtcbiAgICB9XG4gIH1cbiAgaW1hZ2VDcm9wcGVkKGltYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNyb3BwZWRJbWFnZSA9IGltYWdlO1xuICB9XG4gIGltYWdlTG9hZGVkKCkge1xuICAgICAgLy8gc2hvdyBjcm9wcGVyXG4gIH1cbiAgbG9hZEltYWdlRmFpbGVkKCkge1xuICAgICAgLy8gc2hvdyBtZXNzYWdlXG4gIH1cblxuICB2YWxpZGF0ZUZpbGVzKGZpbGVzKSB7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCEoZmlsZXNbaV0udHlwZS5tYXRjaCgnaW1hZ2UnKSkpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnSW52YWxpZCBmaWxlISBPbmx5IGltYWdlcyBhcmUgYWxsb3dlZC4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoICgoZmlsZXNbaV0uc2l6ZSAvIDEwMjQpIC8gMTAyNCkgPiA1KSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0ludmFsaWQgZmlsZSEgRmlsZSBzaXplIGV4Y2VlZHMgNSBNQi4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBkb25lQ3JvcHBpbmcoKSB7XG4gICAgdGhpcy5yZXNwb25zZUltYWdlID0gdGhpcy5jcm9wcGVkSW1hZ2U7XG4gICAgLy8gdGhpcy5vblNpZ25hdHVyZURvbmUuZW1pdCh0aGlzLnJlc3BvbnNlSW1hZ2UpO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMucmVzcG9uc2VJbWFnZSk7XG4gICAgLy8gJCgnI25neC1zaWduYXR1cmUnKS5tb2RhbCgnaGlkZScpO1xuICB9XG5cbiAgZG9uZURyYXdpbmcoKSB7XG4gICAgdGhpcy5yZXNwb25zZUltYWdlID0gdGhpcy5zaWduYXR1cmVQYWQudG9EYXRhVVJMKCk7XG4gICAgLy8gdGhpcy5vblNpZ25hdHVyZURvbmUuZW1pdCh0aGlzLnJlc3BvbnNlSW1hZ2UpO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMucmVzcG9uc2VJbWFnZSk7XG5cbiAgICAvLyAkKCcjbmd4LXNpZ25hdHVyZScpLm1vZGFsKCdoaWRlJyk7XG4gIH1cblxuXG4gIGNsZWFyRHJhd2luZygpIHtcbiAgICBpZiAodGhpcy5zaWduYXR1cmVQYWQgJiYgdGhpcy5zaWduYXR1cmVQYWQuY2xlYXIpIHtcbiAgICAgIHRoaXMuc2lnbmF0dXJlUGFkLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRNb2RhbCgpIHtcbiAgICAvLyBDbGVhciBEcmF3aW5nIHNlY3Rpb25cbiAgICB0aGlzLmNsZWFyRHJhd2luZygpO1xuICAgIC8vIENsZWFyIFVwbG9hZCBTZWN0aW9uXG4gICAgdGhpcy51cGxvYWRGaWxlQ2hhbmdlZEV2ZW50ID0gbnVsbDtcbiAgICB0aGlzLmNyb3BwZWRJbWFnZSA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgIC8vIENsZWFyIHNuYXAgc2VjdGlvblxuICAgIHRoaXMuc3RvcFZpZGVvU3RyZWFtKCk7XG4gIH1cblxuICBzdG9wVmlkZW9TdHJlYW0oKSB7XG4gICAgaWYgKHRoaXMudmlkZW9TdHJlYW0gJiYgdGhpcy52aWRlb1N0cmVhbS5nZXRUcmFja3MpIHtcbiAgICAgIGNvbnN0IHRyYWNrcyA9IHRoaXMudmlkZW9TdHJlYW0uZ2V0VHJhY2tzKCk7XG4gICAgICBmb3IgKGNvbnN0IGkgaW4gdHJhY2tzKSB7XG4gICAgICAgIGlmICh0cmFja3NbaV0gJiYgdHJhY2tzW2ldLnN0b3ApIHtcbiAgICAgICAgICB0cmFja3NbaV0uc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmNhbWVyYUVsZW1lbnQgJiYgdGhpcy5jYW1lcmFFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY2FtZXJhRWxlbWVudC5uYXRpdmVFbGVtZW50LnNyYyA9ICcnO1xuICAgICAgaWYgKHRoaXMuY2FtZXJhRWxlbWVudC5uYXRpdmVFbGVtZW50LnBhdXNlKSB7XG4gICAgICAgIHRoaXMuY2FtZXJhRWxlbWVudC5uYXRpdmVFbGVtZW50LnBhdXNlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBhY3RpdmF0ZURyYXdUYWIoKSB7XG4gICAgdGhpcy5zZWxlY3RlZF90YWIgPSAnZHJhdyc7XG4gICAgdGhpcy5yZXNldE1vZGFsKCk7XG4gIH1cblxuICBhY3RpdmF0ZUNhbWVyYVRhYigpIHtcbiAgICB0aGlzLnNlbGVjdGVkX3RhYiA9ICdjYW1lcmEnO1xuXG4gICAgdGhpcy5yZXNldE1vZGFsKCk7XG5cbiAgICBjb25zdCBicm93c2VyID0gPGFueT5uYXZpZ2F0b3I7XG4gICAgYnJvd3Nlci5nZXRVc2VyTWVkaWEgPSAoXG4gICAgICBicm93c2VyLmdldFVzZXJNZWRpYSB8fFxuICAgICAgYnJvd3Nlci53ZWJraXRHZXRVc2VyTWVkaWEgfHxcbiAgICAgIGJyb3dzZXIubW96R2V0VXNlck1lZGlhIHx8XG4gICAgICBicm93c2VyLm1zR2V0VXNlck1lZGlhXG4gICAgKTtcblxuICAgIGJyb3dzZXIubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7dmlkZW8gOiB0cnVlLCBhdWRpbyA6IGZhbHNlfSkudGhlbihzdHJlYW0gPT4ge1xuICAgICAgdGhpcy52aWRlb1N0cmVhbSA9IHN0cmVhbTtcbiAgICAgIHRoaXMuY2FtZXJhRWxlbWVudC5uYXRpdmVFbGVtZW50LnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgICB0aGlzLmNhbWVyYUVsZW1lbnQubmF0aXZlRWxlbWVudC5wbGF5KCk7XG4gICAgfSk7XG4gIH1cblxuICBhY3RpdmF0ZVVwbG9hZFRhYigpIHtcbiAgICB0aGlzLnNlbGVjdGVkX3RhYiA9ICd1cGxvYWQnO1xuXG4gICAgdGhpcy5yZXNldE1vZGFsKCk7XG4gIH1cblxuICB0YWtlU25hcHNob3QoKSB7XG4gICAgdGhpcy5jYW1lcmFTbmFwc2hvdENhbnZhc1xuICAgICAgLm5hdGl2ZUVsZW1lbnRcbiAgICAgIC5nZXRDb250ZXh0KCcyZCcpXG4gICAgICAuZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLmNhbWVyYUVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgdGhpcy5jYW1lcmFTbmFwc2hvdENhbnZhcy5uYXRpdmVFbGVtZW50LndpZHRoLFxuICAgICAgICB0aGlzLmNhbWVyYVNuYXBzaG90Q2FudmFzLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0XG4gICAgICApO1xuICAgIHRoaXMuc3RvcFZpZGVvU3RyZWFtKCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgY29uc3QgYyA9IGZ4LmNhbnZhcygpO1xuICAgIGNvbnN0IHRleHR1cmUgPSBjLnRleHR1cmUodGhpcy5jYW1lcmFTbmFwc2hvdENhbnZhcy5uYXRpdmVFbGVtZW50KTtcbiAgICBjLmRyYXcodGV4dHVyZSlcbiAgICAgICAgICAgIC5odWVTYXR1cmF0aW9uKC0xLCAtMSkvLyBncmF5c2NhbGVcbiAgICAgICAgICAgIC51bnNoYXJwTWFzaygyMCwgMilcbiAgICAgICAgICAgIC5icmlnaHRuZXNzQ29udHJhc3QoMC4yLCAwLjkpXG4gICAgICAgICAgICAudXBkYXRlKCk7XG4gICAgY29uc29sZS5sb2coYyk7XG5cbiAgICB0aGlzLmNhcHR1cmVkSW1hZ2UgPSBjLnRvRGF0YVVSTCgpO1xuICB9XG5cbiAgcmV0YWtlU25hcHNob3QoKSB7XG4gICAgdGhpcy5yZXNldE1vZGFsKCk7XG4gICAgdGhpcy5hY3RpdmF0ZUNhbWVyYVRhYigpO1xuICB9XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0LCBIb3N0TGlzdGVuZXIsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtOZ3hTaWduYXR1cmVDb21wb25lbnR9IGZyb20gJy4vbmd4LXNpZ25hdHVyZS5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwTmd4U2lnbmF0dXJlXSdcbn0pXG5leHBvcnQgY2xhc3MgTmd4U2lnbmF0dXJlRGlyZWN0aXZlIHtcblxuICBAT3V0cHV0KCkgb25TaWduYXR1cmVEb25lOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2dcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9wZW5Db21wb25lbnQoZXZ0KSB7XG5cbiAgICB0aGlzLmRpYWxvZy5vcGVuKE5neFNpZ25hdHVyZUNvbXBvbmVudCwge1xuICAgICAgcGFuZWxDbGFzczogJ3RyYW5zcGFyZW50J1xuICAgIH0pLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZygpXG4gICAgICBpZiAocmVzKSB7XG4gICAgICAgIHRoaXMub25TaWduYXR1cmVEb25lLmVtaXQocmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ3hTaWduYXR1cmVDb21wb25lbnQgfSBmcm9tICcuL25neC1zaWduYXR1cmUuY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlQ3JvcHBlck1vZHVsZSB9IGZyb20gJ25neC1pbWFnZS1jcm9wcGVyJztcbmltcG9ydCB7IE5neFNpZ25hdHVyZURpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LXNpZ25hdHVyZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7QnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsIE5vb3BBbmltYXRpb25zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJbWFnZUNyb3BwZXJNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFNpZ25hdHVyZUNvbXBvbmVudCxcbiAgICBOZ3hTaWduYXR1cmVEaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5neFNpZ25hdHVyZUNvbXBvbmVudCxcbiAgICBOZ3hTaWduYXR1cmVEaXJlY3RpdmVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgTmd4U2lnbmF0dXJlQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4U2lnbmF0dXJlTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJTaWduYXR1cmVQYWQuZGVmYXVsdCIsImZ4LmNhbnZhcyIsIkNvbXBvbmVudCIsIk1hdERpYWxvZ1JlZiIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIkhvc3RMaXN0ZW5lciIsIkRpcmVjdGl2ZSIsIk1hdERpYWxvZyIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiSW1hZ2VDcm9wcGVyTW9kdWxlIiwiTWF0RGlhbG9nTW9kdWxlIiwiTm9vcEFuaW1hdGlvbnNNb2R1bGUiLCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7OztrQ0FKRDs7Ozs7OztBQ0FBO1FBOEhFLCtCQUNTO1lBQUEsY0FBUyxHQUFULFNBQVM7NEJBbkJQLEtBQUs7NEJBQ0wsS0FBSztnQ0FLRCxNQUFNO21DQUU2QixJQUFJQyxlQUFZLEVBQVU7U0FhdkU7Ozs7UUFFTCx3Q0FBUTs7O1lBQVI7Z0JBRUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJQyxxQkFBb0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7YUFPckY7Ozs7O1FBRXFDLDBDQUFVOzs7O3NCQUFDLEdBQUc7Z0JBQ2xELEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDckIsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN0QixxQkFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOzs7Ozs7UUFHZ0IsMkNBQVc7Ozs7c0JBQUMsR0FBRztnQkFDcEQsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNyQixHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDOzs7Ozs7UUFFaUIsc0NBQU07Ozs7c0JBQUMsR0FB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