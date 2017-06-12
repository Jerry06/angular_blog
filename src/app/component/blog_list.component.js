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
var blog_service_1 = require('../service/blog.service');
var router_1 = require("@angular/router");
var BlogListComponent = (function () {
    function BlogListComponent(blogService, route, router) {
        this.blogService = blogService;
        this.route = route;
        this.router = router;
        this.errorMessage = '';
        this.isLoading = true;
    }
    BlogListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.queryParams.subscribe(function (params) {
            var pageNum;
            var pageSize;
            pageNum = Number.parseInt(params['page']) || 0;
            pageSize = Number.parseInt(params['size']) || 2;
            _this.blogService
                .getPage(pageNum, pageSize, null)
                .subscribe(function (p) { return _this.page = p; }, function (e) { return _this.errorMessage = e; }, function () { return _this.isLoading = false; });
        });
        this.routerSubscription = this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (event) {
            document.body.scrollTop = 0;
        });
    };
    BlogListComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BlogListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'blog-list',
            templateUrl: 'blog_list.component.html'
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, router_1.ActivatedRoute, router_1.Router])
    ], BlogListComponent);
    return BlogListComponent;
}());
exports.BlogListComponent = BlogListComponent;
//# sourceMappingURL=blog_list.component.js.map