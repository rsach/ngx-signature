/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgxSignatureComponent } from './ngx-signature.component';
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
export { NgxSignatureDirective };
function NgxSignatureDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxSignatureDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxSignatureDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NgxSignatureDirective.propDecorators;
    /** @type {?} */
    NgxSignatureDirective.prototype.onSignatureDone;
    /** @type {?} */
    NgxSignatureDirective.prototype.dialog;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNpZ25hdHVyZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2lnbmF0dXJlLyIsInNvdXJjZXMiOlsibGliL25neC1zaWduYXR1cmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBUSxZQUFZLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7SUFTOUQsK0JBQ1U7UUFBQSxXQUFNLEdBQU4sTUFBTTsrQkFIa0MsSUFBSSxZQUFZLEVBQVU7S0FJdkU7Ozs7O0lBRThCLDZDQUFhOzs7O2NBQUMsR0FBRzs7UUFFbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDdEMsVUFBVSxFQUFFLGFBQWE7U0FDMUIsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7O1lBRTVCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEM7U0FDRixDQUFDLENBQUM7OztnQkFwQk4sU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7aUJBQzlCOzs7O2dCQUxPLFNBQVM7OztvQ0FRZCxNQUFNO2tDQU1OLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2dDQWZuQzs7U0FPYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0LCBIb3N0TGlzdGVuZXIsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtOZ3hTaWduYXR1cmVDb21wb25lbnR9IGZyb20gJy4vbmd4LXNpZ25hdHVyZS5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwTmd4U2lnbmF0dXJlXSdcbn0pXG5leHBvcnQgY2xhc3MgTmd4U2lnbmF0dXJlRGlyZWN0aXZlIHtcblxuICBAT3V0cHV0KCkgb25TaWduYXR1cmVEb25lOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2dcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9wZW5Db21wb25lbnQoZXZ0KSB7XG5cbiAgICB0aGlzLmRpYWxvZy5vcGVuKE5neFNpZ25hdHVyZUNvbXBvbmVudCwge1xuICAgICAgcGFuZWxDbGFzczogJ3RyYW5zcGFyZW50J1xuICAgIH0pLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZygpXG4gICAgICBpZiAocmVzKSB7XG4gICAgICAgIHRoaXMub25TaWduYXR1cmVEb25lLmVtaXQocmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19