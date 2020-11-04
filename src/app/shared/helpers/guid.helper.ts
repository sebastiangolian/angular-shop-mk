export class GuidHelper {
    static generate(): string {
        return crypto.getRandomValues(new Uint32Array(4)).join('-');
    }
}
