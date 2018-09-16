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
      this.message = "No email entered or not a valid email string.";

      if(value.indexOf("The action code is invalid") > -1)
      this.message = "Email verification failed. This can happen if the code was malformed, expired, or has already been used";

      if(value.indexOf("An internal error has occurred") > -1)
      this.message = "It seems something was missing. Did you enter the verification email?";
      
      return this.message;  
  }

}
