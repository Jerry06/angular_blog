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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var blog_1 = require('../model/blog');
var pagination_1 = require("../model/pagination");
var BlogService = (function () {
    function BlogService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:80';
    }
    BlogService.prototype.getPage = function (page, pageSize, sort) {
        var params = new http_1.URLSearchParams();
        params.set('size', "" + pageSize);
        params.set('page', "" + page);
        if (sort != null) {
            params.set('sort', sort.property + "," + sort.direction);
        }
        var options = new http_1.RequestOptions({
            search: params,
        });
        options.headers = this.getHeaders();
        //return this.http.get(`${webServiceEndpoint}/person`, options).map(this.extractData).publish().refCount();
        var people$ = this.http
            .get(this.baseUrl + "/blog", options)
            .map(mapBlogs)
            .catch(handleError);
        return people$;
    };
    BlogService.prototype.getAll = function () {
        var people$ = this.http
            .get(this.baseUrl + "/blog", { headers: this.getHeaders() })
            .map(mapBlogs)
            .catch(handleError);
        return people$;
    };
    BlogService.prototype.get = function (id) {
        var Blog$ = this.http
            .get(this.baseUrl + "/blog/" + id, { headers: this.getHeaders() })
            .map(mapBlog);
        return Blog$;
    };
    BlogService.prototype.save = function (Blog) {
        // this won't actually work because the StarWars API doesn't
        // is read-only. But it would look like this:
        return this.http
            .put(this.baseUrl + "/blog/" + Blog.id, JSON.stringify(Blog), { headers: this.getHeaders() });
    };
    BlogService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        return headers;
    };
    BlogService = __decorate([
        core_1.Injectable(),
        __metadata('design:paramtypes', [http_1.Http])
    ], BlogService);
    return BlogService;
}());
exports.BlogService = BlogService;
function mapBlogs(response) {
    // uncomment to simulate error:
    // throw new Error('ups! Force choke!');
    // The response of the API has a results
    // property with the actual results
    var json = response.json();
    var result = Object.assign(new pagination_1.PaginationPage(), json);
    return result;
}
// to avoid breaking the rest of our app
// I extract the id from the Blog url
function extractId(BlogData) {
    var extractedId = BlogData.url.replace('http://localhost:80/blog/', '').replace('/', '');
    return parseInt(extractedId);
}
function mapBlog(response) {
    // toBlog looks just like in the previous example
    var result = Object.assign(new blog_1.Blog(), response.json());
    return result;
}
// this could also be a private method of the component class
function handleError(error) {
    // log error
    // could be something more sofisticated
    var errorMsg = error.message || "Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!";
    console.error(errorMsg);
    // throw an application level error
    return Rx_1.Observable.throw(errorMsg);
}
//# sourceMappingURL=blog.service.js.map
