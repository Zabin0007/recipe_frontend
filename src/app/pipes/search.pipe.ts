import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
            
  transform(allRecipe:any[],searchKey:string): any {
    let result:any[]//to hold search recipe content
    if(!allRecipe||searchKey==""){
      return allRecipe
    }else{                                //item.name===searchkey
      result=allRecipe.filter((item:any)=>item.name.toLowerCase().trim().includes(searchKey.toLowerCase().trim())) 
      return result
    }

  }

}
