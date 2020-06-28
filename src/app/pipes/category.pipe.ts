import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORY } from '../declarations';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return CATEGORY.filter(element => element.id == value)[0].name;
  }

}
