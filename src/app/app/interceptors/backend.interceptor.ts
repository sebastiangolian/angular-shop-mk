import { UserType } from './../../user/enums/user-type.enum';
import { BannerName } from './../../banner/enums/banner-name.enum';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
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

            const httpClient: HttpClient = new HttpClient(next);

            if (environment.loggingBackendUrl) { console.info('[' + request.method + ']' + url); }
            if (environment.loggingBackendRequestHeaders) { console.info(headers); }
            if (environment.loggingBackendRequest) { console.info(body); }
            let ret: Observable<HttpEvent<any>> = null;

            let db = {
                user: [
                    {
                        login: 'individual',
                        password: '81Xac4g21',
                        firstName: 'Jan',
                        lastName: 'Indiwidualny',
                        type: UserType.INDIVIDUAL
                    },
                    {
                        login: 'group',
                        password: '81Xac4g22',
                        firstName: 'Jan',
                        lastName: 'Grupowy',
                        type: UserType.GROUP
                    },
                ],
                event: [
                    { idEvent: '1', name: 'Dzień dziecka', titlePhotoUrl: '/api/photo/file/1/image', description: '<h2>Dzień dziecka</h2>dolor sit amet consectetur adipisicing elit. Alias vel molestiae rem illo optio voluptatem iste assumenda molestias neque. Reprehenderit quia dolor aut debitis corporis cum cupiditate eum, eveniet nulla.' },
                    { idEvent: '2', name: 'Dzień niepodległości', titlePhotoUrl: '/api/photo/file/2/image', description: '<h2 class=\'text-danger\'>Dzień niepodległości</h2>dolor sit amet consectetur adipisicing elit. Alias vel molestiae rem illo optio voluptatem iste assumenda molestias neque. Reprehenderit quia dolor aut debitis corporis cum cupiditate eum, eveniet nulla.' },
                    { idEvent: '3', name: 'Bieg City Trail', titlePhotoUrl: '/api/photo/file/3/image', description: '<h2 class=\'text-info\'>Bieg City Trail</h2>dolor sit amet consectetur adipisicing elit. Alias vel molestiae rem illo optio voluptatem iste assumenda molestias neque. Reprehenderit quia dolor aut debitis corporis cum cupiditate eum, eveniet nulla.' },
                    { idEvent: '4', name: 'Wesele Marii i Nikodema 2020-01-01', titlePhotoUrl: '/api/photo/file/4/image', description: '<h2 class=\'text-warning\'>Wesele Marii i Nikodema 2020-01-01</h2>dolor sit amet consectetur adipisicing elit. Alias vel molestiae rem illo optio voluptatem iste assumenda molestias neque. Reprehenderit quia dolor aut debitis corporis cum cupiditate eum, eveniet nulla.' },
                ],
                offer: [
                    {
                        idOffer: '1', idPhoto: '1', name: 'Zdjęcie', products: [
                            { idProduct: '1', name: '10x15', price: 10.00 },
                            { idProduct: '2', name: '13x18', price: 10.00 },
                            { idProduct: '3', name: '15x21', price: 10.00 },
                            { idProduct: '4', name: '18x25', price: 12.00 },
                            { idProduct: '5', name: '21x30', price: 14.00 },
                            { idProduct: '6', name: '25x38', price: 18.00 },
                            { idProduct: '7', name: '30x40', price: 60.00 },
                            { idProduct: '8', name: '40x50', price: 40.00 },
                            { idProduct: '9', name: '50x70', price: 60.00 },
                            { idProduct: '10', name: 'Legitymacyjne 4 szt', price: 10.00 },
                        ]
                    },
                    {
                        idOffer: '2', idPhoto: '1', name: 'Fotomagnes', products: [
                            { idProduct: '11', name: '7,5x10', price: 10.00 },
                            { idProduct: '12', name: '10x15', price: 16.00 },
                        ]
                    },
                    {
                        idOffer: '3', idPhoto: '1', name: 'Kalendarz', products: [
                            { idProduct: '13', name: 'A3', price: 30.00 },
                            { idProduct: '14', name: 'z wsuwanym zdjęciem A4', price: 35.00 },
                            { idProduct: '15', name: 'A4', price: 35.00 },
                        ]
                    },
                    {
                        idOffer: '4', idPhoto: '1', name: 'Fotoobraz', products: [
                            { idProduct: '16', name: '20x30', price: 50.00 },
                            { idProduct: '17', name: '30x45', price: 70.00 },
                            { idProduct: '18', name: '50x70', price: 110.00 },
                        ]
                    },
                    {
                        idOffer: '5', idPhoto: '2', name: 'Plik cyfrowy', products: [
                            { idProduct: '19', name: 'jpg', price: 30.00 }
                        ]
                    },
                    {
                        idOffer: '6', idPhoto: '3', name: 'Plik cyfrowy', products: [
                            { idProduct: '19', name: 'jpg', price: 30.00 }
                        ]
                    },
                    {
                        idOffer: '7', idPhoto: '4', name: 'Plik cyfrowy', products: [
                            { idProduct: '19', name: 'jpg', price: 30.00 }
                        ]
                    },
                ],
                photo: [
                    { idPhoto: '1', idEvent: '1', name: 'photo 1' },
                    { idPhoto: '2', idEvent: '2', name: 'photo 2' },
                    { idPhoto: '3', idEvent: '3', name: 'photo 3' },
                    { idPhoto: '4', idEvent: '4', name: 'photo 4' },
                ],
                orderDefinition: [
                    {
                        idOrder: '',
                        firstname: 'Jan',
                        lastname: 'Kowalski',
                        phone: '777777777',
                        email: 'kowalskijan@gmail.com',
                        emailConfirm: 'kowalskijan@gmail.com',
                        comment: '',
                        labels: {
                            firstnameLabel: 'Podaj swoje imię',
                            lastnameLabel: 'Podaj swoje nazwisko',
                            phoneLabel: 'Numer telefonu',
                            emailLabel: 'Adres email',
                            emailConfirmLabel: 'Potwierdź adres email',
                            commentLabel: 'Uwagi do zamówienia',
                            orderMethodLabel: 'Wybierz sposób odbioru zamówienia',
                            paymentMethodLabel: 'Wybierz formę płatności'
                        },
                        agreements: [
                            { idOrderAgreement: '1212', content: 'Zapoznałem się i akceptuje <a href=\'https://sklep.mk.pl/resource/sklep.regulamin.pdf\' target=\'_BLANK\'>regulamin sklepu</a>', checked: true, required: true },
                            { idOrderAgreement: '3323', content: 'Chcę dostać e-maila, kiedy w sklepie pojawią się zdjęcia z kolejnej sesji.', checked: false, required: false },
                            { idOrderAgreement: '4422', content: 'Chcę otrzymywać informacje na temat SESJI (mini sesji, sesji świątecznych) i WYDARZEŃ SPECJALNYCH organizowanych przez MK FOTOGRAFIA.', checked: false, required: false },
                        ],
                        deliveryMethods: [
                            { idOrderDeliveryMethod: 'sadsawewq222', content: 'Odbiór we Wtelnie' },
                            { idOrderDeliveryMethod: 'dsdsdsdadsad', content: 'Odbiór w Piccolo Studio (ul. Kujawska 109 Bydgoszcz)' },
                            { idOrderDeliveryMethod: 'we232e2e2e2e', content: 'Wysyłka paczkomatem Inpost (+12 zł)' },
                            { idOrderDeliveryMethod: 'r4r4r424r2r2', content: 'Wysyłka kurierem (+15 zł)' }
                        ],
                        paymentMethods: [
                            { idOrderPaymentMethod: '2124', content: 'Gotówka przy odbiorze' },
                            { idOrderPaymentMethod: '7655', content: 'Szybki przelew - Przelewy24' },
                            { idOrderPaymentMethod: '2354', content: 'Przelew tradycyjny' },
                        ],
                    }
                ],
                order: [],
                banner: [
                    { idBanner: '1', name: BannerName.TOP_BANNER, imgUrl: 'assets/images/banner.jpg', url: '', backgroundColor: '#051E1A' }
                ],
                log: [],
            };
            db = loadStorage(db);

            switch (true) {

                case (method === 'POST' && url.includes('/api/user/login')): {
                    const user = db.user.find(item => item.login === body.login && item.password === body.password);
                    if (user) {
                        const httpHeaders = new HttpHeaders({ Authorization: `Bearer ${body.login}` });
                        return response200(null, httpHeaders);
                    }
                    else {
                        return responseError(400, 'Musisz podać prawidłowy login i hasło.');
                    }
                }

                case (method === 'GET' && url.includes('/api/user/logout')): {
                    localStorage.clear();
                    return response200();
                }

                case (method === 'GET' && url.includes('/api/user')): {
                    const login = headers.get('Authorization').replace('Bearer ', '');
                    const user = db.user.find(item => item.login === login);
                    return response200({ item: user });
                }

                case (method === 'GET' && url.includes('/api/event/list')): {
                    const response = getAll(db.event);
                    return response200(response);
                    // return responseError(404, "Lista zdarzeń nie istnieje")
                }

                case (method === 'GET' && url.includes('/api/event')): {
                    const item = db.event.find(event => event.idEvent.toString() === getIdFromUrl());
                    return response200({ item });
                }

                case (method === 'GET' && url.includes('/api/photo/list')): {
                    const response = getAll(db.photo);
                    return response200(response);
                }

                case (method === 'GET' && url.includes('/api/photo') && url.includes('/image')): {
                    return response200(getJpegBlob());
                }

                case (method === 'GET' && url.includes('/api/photo/list')): {
                    const response = getAll(db.photo);
                    return response200(response);
                }

                case (method === 'GET' && url.includes('/api/offer/list')): {
                    const response = getAll(db.offer);
                    return response200(response);
                }

                case (method === 'GET' && url.includes('/api/order-definition')): {
                    return response200({ item: db.orderDefinition[0] });
                }

                case (method === 'GET' && url.includes('/api/order') && url.includes('/payment')): {
                    const copyUrl = url.replace('/payment', '');
                    const idOrder = copyUrl.substring(copyUrl.lastIndexOf('/') + 1);
                    const item = db.order.find(order => order.idOrder.toString() === idOrder);
                    return response200({ item: item.payment });
                }

                case (method === 'GET' && url.includes('/api/order/list')): {
                    const response = getAll(db.order);
                    return response200(response);
                }

                case (method === 'GET' && url.includes('/api/order')): {
                    // return responseError(404, "Zamówienie nie istnieje")
                    const item = db.order.find(order => order.idOrder.toString() === getIdFromUrl());
                    return response200({ item });
                }

                case (method === 'POST' && url.includes('/api/order/mock')): {
                    const indexOrder = db.order.findIndex(order => order.idOrder.toString() === body.idOrder);
                    db.order[indexOrder].isPaid = true;
                    saveStorage(db);
                    if (db.order[indexOrder].payment.isProgress === false) {
                        db.order[indexOrder].payment.isProgress = true;
                        db.order[indexOrder].payment.status = 'W trakcie';
                        saveStorage(db);
                        setTimeout(() => {
                            db.order[indexOrder].payment.isProgress = false;
                            db.order[indexOrder].payment.status = 'Zakończona';
                            db.order[indexOrder].isPaid = true;
                            saveStorage(db);
                        }, 10000);
                    }
                    return response200({ item: db.order[indexOrder] });
                }

                case (method === 'POST' && url.includes('/api/order')): {
                    const index = db.order.length;
                    db.order[index] = body;
                    db.order[index].idOrder = (Math.floor(Math.random() * 100000)).toString();
                    db.order[index].status = 'Przyjęte';
                    db.order[index].isPaid = false;
                    db.order[index].orderDate = DateTimeHelper.currentDateTime();
                    if (db.order[index].paymentMethod.idOrderPaymentMethod === '7655') {
                        db.order[index].payment = {
                            idOrderPayment: db.order[index].idOrder,
                            isProgress: false,
                            status: 'Nierozpoczęta',
                            operatorUrl: 'https://mock.secure.przelewy24.pl/trnRequest'
                        };
                    } else {
                        db.order[index].payment = null;
                    }

                    saveStorage(db);
                    return response200({ item: db.order[index] });
                }

                case (method === 'GET' && url.includes('/api/banner/list')): {
                    const response = getAll(db.banner);
                    return response200(response);
                }

                case (method === 'POST' && url.includes('/api/log')): {
                    db.log.push(body);
                    saveStorage(db);
                    return response200({ item: body });
                }

                default: ret = null;
            }

            if (ret == null) { ret = next.handle(request); }
            return ret;
        }

        function loadStorage(db: any): any {
            const localStorageDb = localStorage.getItem('angular-shop-mk');

            if (localStorageDb != null) {
                return JSON.parse(localStorageDb);
            }
            else {
                saveStorage(db);
                return db;
            }
        }

        function saveStorage(db) {
            localStorage.setItem('angular-shop-mk', JSON.stringify(db));
        }

        function getAll(items: any[]): any {
            const sortBy: string = getParamFromUrl('sort_by');
            const order: string = getParamFromUrl('order');
            const limit: string = getParamFromUrl('limit');
            const page: string = getParamFromUrl('page');
            const filters: string = getParamFromUrl('filters');
            let ret: any[] = items;
            let totalItemFilter: number = items.length;
            if (filters) { ret = setFilter(ret, JSON.parse(filters)); }

            totalItemFilter = ret.length;

            if (sortBy) { ret = setSort(ret, sortBy, order); }

            if (limit && page) {
                const min: number = Number(limit) * (Number(page) - 1);
                const max: number = min + Number(limit);
                ret = ret.filter((i: any, index: number) => (index >= min && index < max));
            }

            return { total: totalItemFilter, items: ret };
        }

        function response200(responseBody?: any, responseHeaders?: any): Observable<HttpResponse<any>> {
            const response = { status: 200, body, headers };
            if (responseBody) { response.body = responseBody; }
            if (responseHeaders) { response.headers = responseHeaders; }
            if (environment.loggingBackendResponse) { console.info(response); }
            return of(new HttpResponse<any>(response));
        }

        function responseError(code: number, message: string): Observable<HttpResponse<any>> {
            return throwError({
                errors: [
                    { code, message }
                ],
                notifications: [
                    { message }
                ]
            }
            );
        }

        function getIdFromUrl(): string {
            return url.substring(url.lastIndexOf('/') + 1);
        }

        function getParamFromUrl(name: string): string {
            const param = name + '=';
            const urlSplit = url.split(param);

            if (urlSplit.length > 1) {
                return urlSplit[1].split('&')[0];
            } else {
                return '';
            }
        }

        function getParamFromBody(name: string): string {
            const param = name + '=';
            const urlSplit = body.split(param);

            if (urlSplit.length > 1) {
                return urlSplit[1].split('&')[0];
            } else {
                return '';
            }
        }

        function setSort(data: any[], sort: string, order: string): any[] {
            if (sort === '' || order === '') {
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
            if (typeof (filters) !== 'object') {
                return data;
            }
            const dataFilter = data.filter((item) => {
                const currentValues: boolean[] = [];
                for (const [key, value] of Object.entries(filters)) {
                    if (item[key] || item[key] === false) {
                        const valueString = value.toString().toLowerCase();
                        currentValues.push(item[key].toString().toLowerCase().includes(valueString));
                    } else {
                        currentValues.push(false);
                    }
                }
                return !currentValues.includes(false);
            });

            return dataFilter;
        }

        function getPdfUrl() {
            const data = atob(
                `JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv
                TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg
                L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u
                dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU
                CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g
                CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v
                dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G`);
            const binary = data;
            const array = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) { array[i] = binary.charCodeAt(i); }

            const blob = new Blob([array], { type: 'application/pdf' });
            return URL.createObjectURL(blob);
        }

        function getJpegUrl() {
            const data = atob(
                `iVBORw0KGgoAAAANSUhEUgAAAdgAAAFNCAIAAAAsEOk+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARSSURBVHhe7dQxAQAADMOg+TfdycgDI
                rgBkBIxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzF
                ATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxE
                QPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBA
                TMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEA
                DERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQ
                MEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFAT
                MQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQP
                ERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATM
                UBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADE
                RA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAyQ2h7pXiGeO/1emQAAA
                ABJRU5ErkJggg==`);
            const binary = data;
            const array = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) { array[i] = binary.charCodeAt(i); }

            const blob = new Blob([array], { type: 'application/jpg' });
            return URL.createObjectURL(blob);
        }

        function getJpegBlob() {
            const data = atob(
                `iVBORw0KGgoAAAANSUhEUgAAAdgAAAFNCAIAAAAsEOk+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARSSURBVHhe7dQxAQAADMOg+TfdycgDI
                rgBkBIxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzF
                ATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxE
                QPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBA
                TMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEA
                DERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQ
                MEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFAT
                MQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQP
                ERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATM
                UBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADE
                RA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAyQ2h7pXiGeO/1emQAAA
                ABJRU5ErkJggg==`);
            const binary = data;
            const array = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) { array[i] = binary.charCodeAt(i); }

            const blob = new Blob([array], { type: 'application/jpg' });
            return blob;
        }
    }
}
