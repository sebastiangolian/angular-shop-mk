import { HttpClient } from '@angular/common/http'
import { ApiList } from '../interfaces/api-list.interface';
import { Observable } from 'rxjs/internal/Observable';
import { Api } from '../interfaces/api.interface';
import { environment } from 'src/environments/environment';

export abstract class AbstractService<T> {
    url: string = environment.apiEndpoint

    constructor(protected http: HttpClient) { }

    get(limit?: number, page?: number, sort?: string, order?: string, filters?: string): Observable<ApiList<T>> {
        let url = this.url + "/list"
        let parameters: string[] = [];
    
        if (sort) parameters.push(`sort_by=${sort}&order=${order}`);
        if (limit > 0 && page >= 0) parameters.push("limit=" + limit + "&page=" + page)
        if (filters) {
            if (Object.keys(filters).length > 0) parameters.push("filters=" + JSON.stringify(filters))
        }
        
        if(parameters.length > 0) url += "?" + parameters.join("&")
        return this.http.get<ApiList<T>>(url);
    }

    getOne(): Observable<Api<T>> {
        return this.http.get<Api<T>>(this.url);
    }

    getById(id: string): Observable<Api<T>> {
        return this.http.get<Api<T>>(this.url + "/" + id);
    }

    create(item: T): Observable<any> {
        item = this._trimItem(item)
        return this.http.post<T>(this.url, item);
    }

    update(id: string, item: T): Observable<any> {
        item = this._trimItem(item)
        return this.http.put<T>(this.url + "/" + id, item);
    }

    patch(id: string, item: any): Observable<any> {
        item = this._trimItem(item)
        return this.http.patch<any>(this.url + "/" + id, item);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<T>(this.url + "/" + id);
    }
    
    private _trimItem(item: any) {
        Object.keys(item).map(k => {
            if(typeof item == "string") item[k] = item[k].trim()
        });
        return item
    }
}