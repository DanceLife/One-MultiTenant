import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name2initials'
})
export class Name2InitialsPipe implements PipeTransform {

  transform(value: any, args?: any): any {


    var colours = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];

var name = value,
    nameSplit = name.split(" "),
    initials = nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase();
    
    return initials;

}
}
