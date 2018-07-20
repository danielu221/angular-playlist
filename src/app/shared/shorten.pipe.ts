import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, length = 20): any {
    return value.substr(0,length) + " ... ";
  }

}
