import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Blog, Tag} from '../model/blog';
import {PaginationPage, PaginationPropertySort} from '../model/pagination';

@Injectable()
export class BlogService {
  private baseUrl: string = 'http://lazicoder.com/api';
  private baseUrl1: string = 'http://lazicoder.com';

  constructor(private http: Http) {
  }

  login(): Observable<String> {
    let people$ = this.http
      .get(`${this.baseUrl1}/login/facebook`, {headers: this.getHeaders()})
      .map(response => {
        return response.json().map(r => {
          return "ok";
        });
      })
      .catch(handleError);
    return people$;
  }

  login1(): Observable<String> {
    let people$ = this.http
      .get(`${this.baseUrl1}/user`, {headers: this.getHeaders()})
      .map(response => {
        return response.json().map(r => {
          return r.name;
        });
      })
      .catch(handleError);
    return people$;
  }

//   function mapBlogs(response: Response): PaginationPage<Blog> {
//   // uncomment to simulate error:
//   // throw new Error('ups! Force choke!');
//
//   // The response of the API has a results
//   // property with the actual results
//
//   let json = response.json();
//   let result: PaginationPage<Blog> = Object.assign(new PaginationPage<Blog>(), json);
//
//   return result;
// }

  getPage(page: number, pageSize: number, tag: string, sort: PaginationPropertySort): Observable<PaginationPage<Blog>> {
    let params = new URLSearchParams();
    params.set('size', `${pageSize}`);
    params.set('page', `${page}`);
    if (sort != null) {
      params.set('sort', `${sort.property},${sort.direction}`);
    }

    let options = new RequestOptions({
      search: params,
    });
    options.headers = this.getHeaders();
    //return this.http.get(`${webServiceEndpoint}/person`, options).map(this.extractData).publish().refCount();

    if (tag) {
      let people$ = this.http
        .get(`${this.baseUrl}/blog/tag/${tag}`, options)
        .map(mapBlogs)
        .catch(handleError);
      return people$;
    }
    else {
      let people$ = this.http
        .get(`${this.baseUrl}/blog`, options)
        .map(mapBlogs)
        .catch(handleError);
      return people$;
    }
  }

  getAll(): Observable<PaginationPage<Blog>> {
    let people$ = this.http
      .get(`${this.baseUrl}/blog`, {headers: this.getHeaders()})
      .map(mapBlogs)
      .catch(handleError);
    return people$;
  }

  search(searchText: string): Observable<PaginationPage<Blog>> {
    let url = `${this.baseUrl}/blog/search?text=${searchText}`;
    let $result = this.http
      .get(url, {headers: this.getHeaders()})
      .map(mapBlogs)
      .catch(handleError);
    return $result;
  }

  getTags(): Observable<Tag[]> {
    let result$ = this.http
      .get(`${this.baseUrl}/blog/tags`, {headers: this.getHeaders()})
      .map(response => {
        return response.json().map(r => {
          let tag = <Tag>({
            name: r.name,
          });
          return tag;
        });
      })
      .catch(handleError);
    return result$;
  }

  getTagsStr(): Observable<String[]> {
    let result$ = this.http
      .get(`${this.baseUrl}/blog/tags`, {headers: this.getHeaders()})
      .map(response => {
        return response.json().map(r => {
          return r.name;
        });
      })
      .catch(handleError);
    return result$;
  }

  get(id: string): Observable<Blog> {
    let Blog$ = this.http
      .get(`${this.baseUrl}/blog/${id}`, {headers: this.getHeaders()})
      .map(mapBlog);
    return Blog$;
  }

  delete(id: string): Observable<String> {
    return this.http
      .delete(`${this.baseUrl}/blog/${id}`, {headers: this.getHeaders()})
      .catch(handleError);
  }

  save(Blog: Blog): Observable<Response> {
    let a = 1;
    return this.http
      .post(`${this.baseUrl}/blog/`, JSON.stringify(Blog), {headers: this.getHeaders()});
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }
}

function mapBlogs(response: Response): PaginationPage<Blog> {
  // uncomment to simulate error:
  // throw new Error('ups! Force choke!');

  // The response of the API has a results
  // property with the actual results

  let json = response.json();
  let result: PaginationPage<Blog> = Object.assign(new PaginationPage<Blog>(), json);

  return result;
}


// to avoid breaking the rest of our app
// I extract the id from the Blog url
function extractId(BlogData: any) {
  let extractedId = BlogData.url.replace('${this.baseUrl}/blog/', '').replace('/', '');
  return parseInt(extractedId);
}

function mapBlog(response: Response): Blog {
  // toBlog looks just like in the previous example
  let result: Blog = Object.assign({}, response.json());
  return result;
}

// this could also be a private method of the component class
function handleError(error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
