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
                    { idEvent: 1, name: "Dzień dziecka", titlePhotoUrl: "https://picsum.photos/id/101/600/400" },
                    { idEvent: 2, name: "Dzień niepodległości", titlePhotoUrl: "https://picsum.photos/id/125/600/400" },
                    { idEvent: 3, name: "Bieg City Trail", titlePhotoUrl: "https://picsum.photos/id/102/600/400" },
                    { idEvent: 4, name: "Wesele Marii i Nikodema 2020-01-01", titlePhotoUrl: "https://picsum.photos/id/109/600/400" },
                ],
                "offer": [
                    { idOffer: 1, name: "Zdjęcie", products: [
                        {idProduct:1, name: "Zdjęcie 10x15", price: 10.00},
                        {idProduct:2, name: "Zdjęcie 13x18", price: 10.00},
                        {idProduct:3, name: "Zdjęcie 15x21", price: 10.00},
                        {idProduct:4, name: "Zdjęcie 18x25", price: 12.00},
                        {idProduct:5, name: "Zdjęcie 21x30", price: 14.00},
                        {idProduct:6, name: "Zdjęcie 25x38", price: 18.00},
                        {idProduct:7, name: "Zdjęcie 30x40", price: 60.00},
                        {idProduct:8, name: "Zdjęcie 40x50", price: 40.00},
                        {idProduct:9, name: "Zdjęcie 50x70", price: 60.00},
                        {idProduct:10, name: "Zdjęcie Legitymacyjne 4 szt", price: 10.00},
                    ]},
                    { idOffer: 2, name: "Fotomagnes", products: [
                        {idProduct:11, name: "Fotomagnes 7,5x10", price: 10.00},
                        {idProduct:12, name: "Fotomagnes 10x15", price: 16.00},
                    ]},
                    { idOffer: 3, name: "Kalendarz", products: [
                        {idProduct:13, name: "Kalendarz A3", price: 30.00},
                        {idProduct:14, name: "Kalendarz Z wsuwanym zdjęciem A4", price: 35.00},
                        {idProduct:15, name: "Kalendarz Fotomagnes A4", price: 35.00},
                    ]},
                    { idOffer: 4, name: "Fotoobraz", products: [
                        {idProduct:16, name: "Fotoobraz 20x30", price: 50.00},
                        {idProduct:17, name: "Fotoobraz 30x45", price: 70.00},
                        {idProduct:18, name: "Fotoobraz 50x70", price: 110.00},
                    ]},
                    { idOffer: 4, name: "Plik cyfrowy", products: [
                        {idProduct:19, name: "Plik cyfrowy jpg", price: 30.00}
                    ]},
                ],
                "photo": [
                    { idPhoto: 1, idEvent: 1, url: "https://picsum.photos/id/101/600/400" },
                    { idPhoto: 2, idEvent: 1, url: "https://picsum.photos/id/102/600/400" },
                    { idPhoto: 3, idEvent: 1, url: "https://picsum.photos/id/103/600/400" },
                    { idPhoto: 4, idEvent: 1, url: "https://picsum.photos/id/104/600/400" },
                    { idPhoto: 5, idEvent: 1, url: "https://picsum.photos/id/113/600/400" },
                    { idPhoto: 6, idEvent: 1, url: "https://picsum.photos/id/106/400/600" },
                    { idPhoto: 7, idEvent: 1, url: "https://picsum.photos/id/107/600/400" },
                    { idPhoto: 8, idEvent: 1, url: "https://picsum.photos/id/108/600/400" },
                    { idPhoto: 9, idEvent: 1, url: "https://picsum.photos/id/109/600/400" },
                    { idPhoto: 10, idEvent: 1, url: "https://picsum.photos/id/110/600/400" },
                    { idPhoto: 11, idEvent: 1, url: "https://picsum.photos/id/111/600/400" },
                    { idPhoto: 12, idEvent: 1, url: "https://picsum.photos/id/112/400/600" },
                    { idPhoto: 14, idEvent: 1, url: "https://picsum.photos/id/114/600/400" },
                    { idPhoto: 15, idEvent: 1, url: "https://picsum.photos/id/115/600/400" },
                    { idPhoto: 16, idEvent: 1, url: "https://picsum.photos/id/116/600/400" },
                    { idPhoto: 17, idEvent: 1, url: "https://picsum.photos/id/117/400/600" },
                    { idPhoto: 18, idEvent: 1, url: "https://picsum.photos/id/118/600/400" },
                    { idPhoto: 19, idEvent: 1, url: "https://picsum.photos/id/119/600/400" },
                    { idPhoto: 20, idEvent: 1, url: "https://picsum.photos/id/120/600/400" },
                    { idPhoto: 21, idEvent: 1, url: "https://picsum.photos/id/121/600/400" },
                    { idPhoto: 22, idEvent: 1, url: "https://picsum.photos/id/122/600/400" },
                    { idPhoto: 23, idEvent: 1, url: "https://picsum.photos/id/123/600/400" },
                    { idPhoto: 24, idEvent: 1, url: "https://picsum.photos/id/124/600/400" },
                    { idPhoto: 25, idEvent: 1, url: "https://picsum.photos/id/125/600/400" },
                    { idPhoto: 26, idEvent: 1, url: "https://picsum.photos/id/126/600/400" },
                    { idPhoto: 27, idEvent: 1, url: "https://picsum.photos/id/127/600/400" },
                    { idPhoto: 28, idEvent: 1, url: "https://picsum.photos/id/128/600/400" },
                    { idPhoto: 29, idEvent: 1, url: "https://picsum.photos/id/129/600/400" },
                    { idPhoto: 30, idEvent: 1, url: "https://picsum.photos/id/130/600/400" },
                    { idPhoto: 31, idEvent: 1, url: "https://picsum.photos/id/131/600/400" },
                    { idPhoto: 32, idEvent: 2, url: "https://picsum.photos/id/125/600/400" },
                    { idPhoto: 33, idEvent: 2, url: "https://picsum.photos/id/126/600/400" },
                    { idPhoto: 34, idEvent: 2, url: "https://picsum.photos/id/127/600/400" },
                    { idPhoto: 35, idEvent: 2, url: "https://picsum.photos/id/128/600/400" },
                    { idPhoto: 36, idEvent: 2, url: "https://picsum.photos/id/129/600/400" },
                    { idPhoto: 37, idEvent: 2, url: "https://picsum.photos/id/130/600/400" },
                    { idPhoto: 38, idEvent: 2, url: "https://picsum.photos/id/131/600/400" },
                    { idPhoto: 39, idEvent: 3, url: "https://picsum.photos/id/101/600/400" },
                    { idPhoto: 40, idEvent: 3, url: "https://picsum.photos/id/102/600/400" },
                    { idPhoto: 41, idEvent: 3, url: "https://picsum.photos/id/103/600/400" },
                    { idPhoto: 42, idEvent: 3, url: "https://picsum.photos/id/104/600/400" },
                    { idPhoto: 43, idEvent: 3, url: "https://picsum.photos/id/113/600/400" },
                    { idPhoto: 44, idEvent: 3, url: "https://picsum.photos/id/106/600/400" },
                    { idPhoto: 45, idEvent: 3, url: "https://picsum.photos/id/107/600/400" },
                    { idPhoto: 46, idEvent: 3, url: "https://picsum.photos/id/108/600/400" },
                    { idPhoto: 47, idEvent: 4, url: "https://picsum.photos/id/109/600/400" },
                    { idPhoto: 48, idEvent: 4, url: "https://picsum.photos/id/107/600/400" },
                    { idPhoto: 49, idEvent: 4, url: "https://picsum.photos/id/108/600/400" },
                    { idPhoto: 50, idEvent: 4, url: "https://picsum.photos/id/109/600/400" },
                ],
                "orderAgreement": [
                    { idOrderAgreement: 1212, content: "Zapoznałem się i akceptuje <b><a href='https://sklep.mk.pl/resource/sklep.regulamin.pdf' target='_BLANK'>regulamin sklepu</a></b>", accepted: false, required: true },
                    { idOrderAgreement: 3323, content: "Chcę dostać e-maila, kiedy w sklepie pojawią się zdjęcia z kolejnej sesji.", accepted: false, required: false },
                    { idOrderAgreement: 4422, content: "Chcę otrzymywać informacje na temat SESJI (mini sesji, sesji świątecznych) i WYDARZEŃ SPECJALNYCH organizowanych przez MK FOTOGRAFIA.", accepted: false, required: false },
                ],
                "orderPaymentMethod": [
                    { idOrderPaymentMethod: 2124, name: "Gotówka przy odbiorze" },
                    { idOrderPaymentMethod: 7655, name: "Szybki przelew - Przelewy24" },
                    { idOrderPaymentMethod: 2354, name: "Przelew tradycyjny" },
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
                        localStorage.setItem('token', db.user[0].token)
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
                    localStorage.clear()
                    return response200();
                }

                case (method === 'GET' && url.includes("/api/event/list")): {
                    const response = getAll(url, db.event)
                    return response200(response);
                }

                case (method === 'GET' && url.includes("/api/photo/list")): {
                    const response = getAll(url, db.photo)
                    return response200(response);
                }

                case (method === 'GET' && url.includes("/api/offer/list")): {
                    const response = getAll(url, db.offer)
                    return response200(response);
                }

                case (method === 'GET' && url.includes("/api/order-agreement/list")): {
                    const response = getAll(url, db.orderAgreement)
                    return response200(response);
                }

                case (method === 'GET' && url.includes("/api/order-payment-method/list")): {
                    const response = getAll(url, db.orderPaymentMethod)
                    return response200(response);
                }

                default: ret = null;
            }

            if (ret == null) ret = next.handle(request)
            return ret;
        }

        function loadStorage(db: any): any {
            let localStorageDb = localStorage.getItem('angular-shop-mk')

            if (localStorageDb != null) {
                return JSON.parse(localStorageDb)
            }
            else {
                localStorage.setItem('angular-shop-mk', JSON.stringify(db))
                return db
            }
        }

        function saveStorage(db) {
            localStorage.setItem('angular-shop-mk', JSON.stringify(db))
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