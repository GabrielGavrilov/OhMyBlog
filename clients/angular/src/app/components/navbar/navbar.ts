import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IdentityService } from '../../services/identity-service';
import { User } from '../../models/User';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  constructor(private identityService: IdentityService) {}

  user: User;

  ngOnInit(): void {
    this.user = this.identityService.getCookieAuthObject();
    console.log(this.user);
  }
}
