import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pad'
})
export class PadPipe implements PipeTransform {

  transform(value: number, ...args: number[]): string {
    return this.pad(value, 2);
  }

  pad(num: number, size: number) {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }

}
