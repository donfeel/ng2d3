"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var moment = require('moment');
var CircleSeries = (function () {
    function CircleSeries() {
        this.barVisible = false;
        this.type = 'standard';
        this.clickHandler = new core_1.EventEmitter();
    }
    CircleSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    CircleSeries.prototype.update = function () {
        this.circles = this.getCircles();
    };
    CircleSeries.prototype.getCircles = function () {
        var _this = this;
        return this.data.series.map(function (d, i) {
            var value = d.value;
            var label = d.name;
            if (value) {
                var cx = void 0;
                if (_this.scaleType === 'time') {
                    cx = _this.xScale(moment(label).toDate());
                }
                else if (_this.scaleType === 'linear') {
                    cx = _this.xScale(Number(label));
                }
                else {
                    cx = _this.xScale(label);
                }
                var cy = _this.yScale(_this.type === 'standard' ? value : d.d1);
                var radius = 5;
                var height = _this.yScale.range()[0] - cy;
                var opacity = 0;
                if (label && _this.visibleValue && label.toString() === _this.visibleValue.toString()) {
                    opacity = 1;
                }
                return {
                    classNames: [("circle-data-" + i)],
                    value: value,
                    label: label,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    height: height,
                    tooltipText: label + ", " + value,
                    opacity: opacity
                };
            }
        }).filter(function (circle) { return circle !== undefined; });
    };
    CircleSeries.prototype.click = function (value, label) {
        this.clickHandler.emit({
            name: label,
            value: value
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "strokeColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "scaleType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "visibleValue", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "clickHandler", void 0);
    CircleSeries = __decorate([
        core_1.Component({
            selector: 'g[circleSeries]',
            template: "\n    <svg:g *ngFor=\"let circle of circles\">\n      <svg:rect\n        *ngIf=\"barVisible\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"color\"\n        class=\"tooltip-bar\"\n      />\n\n      <svg:g circle\n        [attr.class]=\"className\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"color\"\n        [stroke]=\"strokeColor\"\n        [pointerEvents]=\"circle.value === 0 ? 'none': 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (clickHandler)=\"click($event, circle.label)\"\n        [style.opacity]=\"circle.opacity\"\n        [style.cursor]=\"'pointer'\"\n        \n        swui-tooltip\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"circle.tooltipText\"\n      />\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CircleSeries);
    return CircleSeries;
}());
exports.CircleSeries = CircleSeries;
//# sourceMappingURL=circle-series.component.js.map