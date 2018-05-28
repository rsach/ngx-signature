/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSignatureComponent } from './ngx-signature.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSignatureDirective } from './ngx-signature.directive';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
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
export { NgxSignatureModule };
function NgxSignatureModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxSignatureModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxSignatureModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNpZ25hdHVyZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2lnbmF0dXJlLyIsInNvdXJjZXMiOlsibGliL25neC1zaWduYXR1cmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFDLHVCQUF1QixFQUFFLG9CQUFvQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7Ozs7O2dCQUNsRyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLG9CQUFvQjt3QkFDcEIsdUJBQXVCO3FCQUN4QjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1oscUJBQXFCO3dCQUNyQixxQkFBcUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxxQkFBcUI7d0JBQ3JCLHFCQUFxQjtxQkFDdEI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLHFCQUFxQjtxQkFDdEI7aUJBQ0Y7OzZCQTFCRDs7U0EyQmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ3hTaWduYXR1cmVDb21wb25lbnQgfSBmcm9tICcuL25neC1zaWduYXR1cmUuY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlQ3JvcHBlck1vZHVsZSB9IGZyb20gJ25neC1pbWFnZS1jcm9wcGVyJztcbmltcG9ydCB7IE5neFNpZ25hdHVyZURpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LXNpZ25hdHVyZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7QnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsIE5vb3BBbmltYXRpb25zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJbWFnZUNyb3BwZXJNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFNpZ25hdHVyZUNvbXBvbmVudCxcbiAgICBOZ3hTaWduYXR1cmVEaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5neFNpZ25hdHVyZUNvbXBvbmVudCxcbiAgICBOZ3hTaWduYXR1cmVEaXJlY3RpdmVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgTmd4U2lnbmF0dXJlQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4U2lnbmF0dXJlTW9kdWxlIHsgfVxuIl19