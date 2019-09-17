import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterInventory'
})
export class FilterInventoryPipe implements PipeTransform {

  transform(products: any, search: any): any {

    if(search === undefined) return products;

    

    return products.filter(function(product){
      if(product.code != undefined && product.department != undefined)
      return (product.name.includes(search.toUpperCase()) || product.code.includes(search) || product.department.includes(search.toUpperCase()));

      else if( product.code != undefined && product.department == undefined)
      return (product.name.includes(search.toUpperCase()) || product.code.includes(search));

      else if( product.code == undefined && product.department != undefined)
      return (product.name.includes(search.toUpperCase()) || product.department.toUpperCase().includes(search.toUpperCase()));

      else if( product.code == undefined && product.department == undefined)
      return (product.name.includes(search.toUpperCase()));
    });
    
  }

}
