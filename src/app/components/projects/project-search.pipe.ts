import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectSearch'
})
export class ProjectSearchPipe implements PipeTransform {

  transform(list: any[], value: string) {
  

    return value ? list.filter(item => item.client.toLowerCase().includes(value.toLowerCase())) : list;
  }


}
