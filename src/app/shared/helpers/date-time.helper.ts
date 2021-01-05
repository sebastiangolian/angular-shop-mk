export class DateTimeHelper {

    static isoString(): string {
        return new Date().toISOString()
    }

    static currentDate(): string {
        return new Date().toISOString().slice(0, 10);
    }

    static currentTime(): string {
        return new Date().toLocaleTimeString();
    }

    static currentDateTime(): string {
        return new Date().toISOString().slice(0, 10) + ' ' + new Date().toLocaleTimeString();
    }
}
