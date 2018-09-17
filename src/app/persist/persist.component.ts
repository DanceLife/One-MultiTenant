import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-persist',
  templateUrl: './persist.component.html',
  styleUrls: ['./persist.component.scss']
})
export class PersistComponent implements OnInit {
  configForm: FormGroup;
  configObject: any;
  systemapp;
  userapp;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.configForm = new FormGroup({
      configInputBox: new FormControl(null)
    });
    this.userapp = this.authService.getApp("User");

  }
  onRead(){

  }

}
