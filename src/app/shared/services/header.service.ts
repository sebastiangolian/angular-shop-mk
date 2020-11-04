import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeaderService {
    public subject = new BehaviorSubject<string>("");

    constructor(private titleService: Title) { }

    set(header: string) {
        this.subject.next(header);
    }

    get(): Observable<string> {
        return this.subject.asObservable();
    }

    getWithSetTitle(): Observable<string> {
        return this.subject.asObservable().pipe(
            tap((header: string) => {
                if(header)
                    this.titleService.setTitle(environment.title.toLowerCase() + " - " + header.toLowerCase())
                else 
                    this.titleService.setTitle(environment.title.toLowerCase())
            })
        );
    }

    clear() {
        this.subject.next(null);
    }
}