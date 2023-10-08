import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }

    const filterKeys = Object.keys(args);
    return value.filter((item: any) => {
      return filterKeys.every((key: string) => item[key] === args[key]);
    });
  }
}
