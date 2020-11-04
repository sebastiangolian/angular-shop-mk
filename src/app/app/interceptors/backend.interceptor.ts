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
                    { id: 1, email: 'jan.kowalski@example.pl', zipCode: '11-111', created: '2020-04-01 12:02:28', active: false, documentLink: getPdfUrl(), idRole: 1},
                    { id: 2, email: 'anna.nowak@example.pl', zipCode: '22-222', created: '2020-04-01 13:02:28', active: false, documentLink: getPdfUrl(), idRole: 1},
                    { id: 3, email: 'henryk.kuczynski@example.pl', zipCode: '33-333', created: '2020-04-01 14:02:28', active: false, documentLink: getPdfUrl(), idRole: 1},
                    { id: 4, email: 'zdzislaw.kowalski@example.pl', zipCode: '44-444', created: '2020-04-01 15:02:28', active: false, documentLink: getPdfUrl(), idRole: 1},
                    { id: 5, email: 'cezary.kowal@example.pl', zipCode: '55-555', created: '2020-04-01 16:02:28', active: false, documentLink: getPdfUrl(), idRole: 1},
                    { id: 6, email: 'jerzy.tusk@example.pl', zipCode: '66-666', created: '2020-04-02 12:02:28', active: false, documentLink: getPdfUrl(), idRole: 1},
                    { id: 7, email: 'wojciech.walewski@example.pl', zipCode: '77-777', created: '2020-04-02 13:02:28', active: false, documentLink: getPdfUrl(), idRole: 1},
                    { id: 8, email: 'andrzej.nowaczek@example.pl', zipCode: '88-888', created: '2020-04-02 14:02:28', active: false, documentLink: getPdfUrl(), idRole: 1},
                    { id: 9, email: 'krystian.kowalewski@example.pl', zipCode: '99-999', created: '2020-04-02 15:02:28', active: false, documentLink: getPdfUrl(), idRole: 1},
                    { id: 10, email: 'michal.adamczuk@example.pl', zipCode: '00-111', created: '2020-04-02 16:02:28', active: false, documentLink: getPdfUrl(), idRole: 1},
                    { id: 11, email: 'adam.adamowicz@example.pl', zipCode: '00-222', created: '2020-04-02 17:02:28', active: false, documentLink: getPdfUrl(), idRole: 1},
                ],
                "role": [
                    { id: 1, name: "admin" },
                    { id: 2, name: "editor" },
                    { id: 3, name: "standard" }
                ],
                "car": [
                    { id: 1, name: "leon", brand: "seat" },
                    { id: 2, name: "golf", brand: "volkswagen" },
                    { id: 3, name: "A3", brand: "audi" }
                ],
                "hero": [
                    { id: 1, name: 'Rocky' },
                    { id: 2, name: 'Terminator' },
                    { id: 3, name: 'Rambo' },
                    { id: 4, name: 'Superman' },
                    { id: 5, name: 'Batman' },
                    { id: 6, name: 'Spiderman' },
                    { id: 7, name: 'Superwoman' },
                    { id: 8, name: 'Hulk' },
                    { id: 9, name: 'Ironman' },
                    { id: 10, name: 'Antman' }
                ]
            }

            db = loadStorage(db)

            //db.user = []
            // for(let i = 1; i <= 100; i++) {
            //     db.user.push({id: i,email: 'example' + i + '@o2.pl', zipCode: '11-111',created: DateTimeHelper.currentDateTime(), active: true, documentLink: getPdfUrl()})
            // }

            switch (true) {
                case (method === 'GET' && url.includes("/user/list")): {
                    const response = getAll(url, db.user)
                    return response200(response);
                }

                case (method === 'GET' && url.includes("/user/")): {
                    let item = db.user.find(user => user.id.toString() == getIdFromUrl())
                    return response200({ "item": item });
                }

                case (method === 'POST' && url.includes("/user")): {
                    body.id = db.user.length + 1
                    body.documentLink = getPdfUrl()
                    body.created = new Date().toJSON().slice(0, 10) + ' ' + new Date().toLocaleTimeString()
                    db.user.push(body)
                    saveStorage(db)
                    return response200({ "item": body });
                }

                case (method === 'PUT' && url.includes("/user")): {
                    let index = db.user.findIndex(user => user.id.toString() === getIdFromUrl())
                    body.id = db.user[index].id;
                    db.user[index] = body
                    saveStorage(db)
                    return response200({ "item": body });
                }

                case (method === 'DELETE' && url.includes("/user")): {
                    db.user = db.user.filter(user => user.id.toString() !== getIdFromUrl())
                    saveStorage(db)
                    return response200();
                    //return responseError(400, "Nie masz uprawnień, żeby usuwać użytkowników.")
                }

                case (method === 'GET' && url.includes("/role/list")): {
                    const response = getAll(url, db.role)
                    return response200(response);
                }

                case (method === 'PATCH' && url.includes("/user")): {
                    let index = db.user.findIndex(user => user.id.toString() == getIdFromUrl())
                    db.user[index].idRole = body.idRole
                    saveStorage(db)
                    return response200({ "item": body });
                }

                case (method === 'GET' && url.includes("/car/list")): {
                    const response = getAll(url, db.car)
                    return response200(response);
                }

                case (method === 'GET' && url.includes("/car/")): {
                    let item = db.car.find(car => car.id.toString() == getIdFromUrl())
                    return response200({ "item": item });
                }

                case (method === 'POST' && url.includes("/car")): {
                    //body.id = db.car.length + 1
                    db.car.push(body)
                    saveStorage(db)
                    return response200({ "item": body });
                }

                case (method === 'PUT' && url.includes("/car")): {
                    let index = db.car.findIndex(car => car.id.toString() === getIdFromUrl())
                    body.id = db.car[index].id;
                    db.car[index] = body
                    saveStorage(db)
                    return response200({ "item": body });
                }

                case (method === 'DELETE' && url.includes("/car")): {
                    db.car = db.car.filter(car => car.id.toString() !== getIdFromUrl())
                    saveStorage(db)
                    return response200();
                }

                case (method === 'GET' && url.includes("/hero/list")): {
                    const response = getAll(url, db.hero)
                    return response200(response);
                }

                case (method === 'GET' && url.includes("/hero/search/")): {
                    let items = db.hero.filter(hero => hero.name.toLowerCase().includes(getIdFromUrl()))
                    return response200(items);
                }

                case (method === 'GET' && url.includes("/hero/")): {
                    let item = db.hero.find(hero => hero.id.toString() == getIdFromUrl())
                    return response200({ "item": item });
                }

                case (method === 'POST' && url.includes("/hero")): {
                    body.id = db.hero.length + 1
                    db.hero.push(body)
                    saveStorage(db)
                    return response200({ "item": body });
                }

                case (method === 'PUT' && url.includes("/hero")): {
                    let index = db.hero.findIndex(hero => hero.id.toString() === getIdFromUrl())
                    body.id = db.hero[index].id;
                    db.hero[index] = body
                    saveStorage(db)
                    return response200({ "item": body });
                }

                case (method === 'DELETE' && url.includes("/hero")): {
                    db.hero = db.hero.filter(hero => hero.id.toString() !== getIdFromUrl())
                    saveStorage(db)
                    return response200();
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