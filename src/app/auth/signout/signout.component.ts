import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignOutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log("Signing out")
    this.authService.logout();
  }

}
