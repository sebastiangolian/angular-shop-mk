import { environment } from 'src/environments/environment';

export class IsProd {
    static check(): boolean {
        return (environment.name == 'prod')
    }
}
