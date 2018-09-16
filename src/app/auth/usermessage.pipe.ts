import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usermessage'
})
export class UsermessagePipe implements PipeTransform {
   message;
  transform(value: any, args?: any): any {
      this.message = value;

      if(value.indexOf("must be a valid string") > -1) 
      this.message = "The email entered is not a valid email string.";
      
      if(value.indexOf("must be a valid string") > -1)
      this.message = "The email entered is not a valid email string.";

    return this.message;
  
  }

}
