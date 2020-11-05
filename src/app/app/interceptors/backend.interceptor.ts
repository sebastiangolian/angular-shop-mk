import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DateTimeHelper } from 'src/app/shared/helpers/date-time.helper';


@Injectable()
export class BackendInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(environment.backendDelay))
            .pipe(dematerialize());

        function handleRoute() {

            let httpClient: HttpClient = new HttpClient(next);

            if (environment.loggingBackendUrl) console.info('[' + request.method + ']' + url);
            if (environment.loggingBackendRequestHeaders) console.info(headers);
            if (environment.loggingBackendRequest) console.info(body);
            let ret: Observable<HttpEvent<any>> = null

            let db = {
                "user": [
                    { idUser: 1, login: "kowalskijan", password: "12345", token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzU" },
                ],
                "event": [
                    { idEvent: 1, name: "Dzień dziecka" },
                    { idEvent: 2, name: "Dzień niepodległości" },
                    { idEvent: 3, name: "Bieg City Trail" },
                    { idEvent: 4, name: "Wesele Marii i Nikodema" },
                ],
            }

            db = loadStorage(db)

            //db.user = []
            // for(let i = 1; i <= 100; i++) {
            //     db.user.push({id: i,email: 'example' + i + '@o2.pl', zipCode: '11-111',created: DateTimeHelper.currentDateTime(), active: true, documentLink: getPdfUrl()})
            // }

            switch (true) {

                case (method === 'POST' && url.includes("/auth/login")): {
                    if (body.login == db.user[0].login && body.password == db.user[0].password) {
                        sessionStorage.setItem('token', db.user[0].token)
                        return response200({ "item": db.user[0] });
                    }
                    else {
                        return responseError(401, "Musisz podać prawidłowy login i hasło.")
                    }
                }

                case (method === 'GET' && url.includes("/api/user")): {
                    return response200({ "item": db.user[0] });
                }

                case (method === 'GET' && url.includes("/auth/logout")): {
                    sessionStorage.clear()
                    return response200();
                }

                case (method === 'GET' && url.includes("/api/event/list")): {
                    const response = getAll(url, db.event)
                    return response200(response);
                }

                default: ret = null;
            }

            if (ret == null) ret = next.handle(request)
            return ret;
        }

        function loadStorage(db: any): any {
            let localStorageDb = localStorage.getItem('angular-shop-martynaklewinowska')

            if (localStorageDb != null) {
                return JSON.parse(localStorageDb)
            }
            else {
                localStorage.setItem('angular-shop-martynaklewinowska', JSON.stringify(db))
                return db
            }
        }

        function saveStorage(db) {
            localStorage.setItem('angular-shop-martynaklewinowska', JSON.stringify(db))
        }

        function getAll(url: string, items: any[]): any {
            let sort_by: string = getParamFromUrl('sort_by');
            let order: string = getParamFromUrl('order');
            let limit: string = getParamFromUrl('limit');
            let page: string = getParamFromUrl('page');
            let filters: string = getParamFromUrl('filters');
            let ret: any[] = items;
            let totalItemFilter: number = items.length;
            if (filters) ret = setFilter(ret, JSON.parse(filters));

            totalItemFilter = ret.length

            if (sort_by) ret = setSort(ret, sort_by, order);

            if (limit && page) {
                let min: number = Number(limit) * (Number(page) - 1);
                let max: number = min + Number(limit);
                ret = ret.filter((i: any, index: number) => (index >= min && index < max))
            }

            return { total: totalItemFilter, items: ret }
        }

        function response200(body?: any): Observable<HttpResponse<any>> {
            let response = { status: 200, body }
            if (environment.loggingBackendResponse) console.info(response)
            return of(new HttpResponse<any>(response))
        }

        function responseError(status: number, message: string): Observable<HttpResponse<any>> {
            return throwError({ status: status, message: message });
        }

        function getIdFromUrl(): string {
            return url.substring(url.lastIndexOf('/') + 1);
        }

        function getParamFromUrl(name: string): string {
            let param = name + "=";
            let urlSplit = url.split(param)

            if (urlSplit.length > 1) {
                return urlSplit[1].split("&")[0]
            } else {
                return ""
            }
        }

        function getParamFromBody(name: string): string {
            let param = name + "=";
            let urlSplit = body.split(param)

            if (urlSplit.length > 1) {
                return urlSplit[1].split("&")[0]
            } else {
                return ""
            }
        }

        function setSort(data: any[], sort: string, order: string): any[] {
            if (sort == "" || order == "") {
                return data;
            }

            return data.sort((a, b) => {
                let propertyA: number | string = '';
                let propertyB: number | string = '';

                [propertyA, propertyB] = [a[sort], b[sort]];

                const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
                const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

                return (valueA < valueB ? -1 : 1) * (order === 'asc' ? 1 : -1);
            });
        }

        function setFilter(data: any[], filters: object): any[] {
            if (typeof (filters) !== "object") {
                return data;
            }
            let dataFilter = data.filter((item) => {
                let currentValues: boolean[] = []
                for (const [key, value] of Object.entries(filters)) {
                    if (item[key] || item[key] == false) {
                        let valueString = value.toString().toLowerCase()
                        currentValues.push(item[key].toString().toLowerCase().includes(valueString))
                    } else {
                        currentValues.push(false)
                    }
                }
                return !currentValues.includes(false)
            })

            return dataFilter
        }

        function getPdfUrl() {
            const pdfData = atob(
                `JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv
                TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg
                L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u
                dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU
                CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g
                CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v
                dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G`);
            let binary = pdfData
            let array = new Uint8Array(binary.length)
            for (var i = 0; i < binary.length; i++) { array[i] = binary.charCodeAt(i) }

            let blob = new Blob([array], { type: 'application/pdf' });
            return URL.createObjectURL(blob);
        }
    }
}