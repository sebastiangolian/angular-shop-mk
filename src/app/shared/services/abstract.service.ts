import { HttpClient } from '@angular/common/http';
import { ApiList } from '../interfaces/api-list.interface';
import { Observable } from 'rxjs/internal/Observable';
import { Api } from '../interfaces/api.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

export abstract class AbstractService<T> {
    url: string = environment.apiEndpoint;

    constructor(protected http: HttpClient) { }

    get(limit?: number, page?: number, sort?: string, order?: string, filters?: any): Observable<T[]> {
        let url = this.url + '/list';
        const parameters: string[] = [];

        if (sort) { parameters.push(`sort_by=${sort}&order=${order}`); }
        if (limit > 0 && page >= 0) { parameters.push('limit=' + limit + '&page=' + page); }
        if (filters) {
            if (Object.keys(filters).length > 0) { parameters.push('filters=' + JSON.stringify(filters)); }
        }

        if (parameters.length > 0) { url += '?' + parameters.join('&'); }
        return this.http.get<ApiList<T>>(url).pipe(
            map(api => {
                if (api.items.length === 0) {
                    return null;
                } else {
                    return api.items;
                }
            })
        );
    }

    getOne(): Observable<T> {
        return this.http.get<Api<T>>(this.url).pipe(
            map(api => {
                if (api.item) {
                    return api.item;
                } else {
                    return null;
                }
            })
        );
    }

    getById(id: string): Observable<T> {
        return this.http.get<Api<T>>(this.url + '/' + id).pipe(
            map(api => {
                if (api.item) {
                    return api.item;
                } else {
                    return null;
                }
            })
        );
    }

    post(item: T): Observable<any> {
        item = this._trimItem(item);
        return this.http.post<T>(this.url, item);
    }

    update(id: string, item: T): Observable<any> {
        item = this._trimItem(item);
        return this.http.put<T>(this.url + '/' + id, item);
    }

    patch(id: string, item: any): Observable<any> {
        item = this._trimItem(item);
        return this.http.patch<any>(this.url + '/' + id, item);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<T>(this.url + '/' + id);
    }

    protected _trimItem(item: any) {
        Object.keys(item).map(k => {
            if (typeof item === 'string') { item[k] = item[k].trim(); }
        });
        return item;
    }
}
