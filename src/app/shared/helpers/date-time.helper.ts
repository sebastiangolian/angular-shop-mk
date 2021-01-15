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

    static currentDateTimeDiff(seconds: number, operator: string = '+'): string {
        seconds = seconds * 1000
        var retDate = new Date();
        retDate.setTime(new Date().getTime() + seconds)
        if (operator === '+') retDate.setTime(new Date().getTime() + seconds);
        if (operator === '-') retDate.setTime(new Date().getTime() - seconds);

        return retDate.toISOString().slice(0, 10) + ' ' + retDate.toLocaleTimeString();
    }
}
