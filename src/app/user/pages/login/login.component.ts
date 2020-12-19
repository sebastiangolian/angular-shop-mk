import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/user.model';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  environments: any = environment;
  error: string | null = null;
  model: User = new UserModel();
  private subscription: Subscription = new Subscription();

  constructor(private userService: UserService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    if (this.userService.token && this.userService.subject.value) {
      this.router.navigate(['event']);
    }
  }

  onSubmit(f: NgForm) {
    const user: User = new UserModel();
    user.login = this.model.login;
    user.password = this.model.password;
    this.subscription.add(this.getToken(user));
  }

  private getToken(user: User): Subscription {
    return this.userService.getToken(user).subscribe(
      {
        complete: () => {
          this.messageService.clearMessages();
          const redirectUrl = sessionStorage.getItem('redirectUrl');
          if (redirectUrl) {
            sessionStorage.removeItem('redirectUrl');
            this.router.navigate([redirectUrl]);
          } else {
            this.router.navigate(['/event']);
          }
        },
        error: error => this.error = 'Podany login lub hasło są nie prawidłowe, lub nie masz konta w aplikacji'
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }
}
