import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '../../interfaces/auth.interface';
import { AuthModel } from '../../models/login.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  environments: any = environment
  error: string | null = null
  model: Auth = new AuthModel();
  private _subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    if(this.authService.token && this.authService.subject.value) {
      this.router.navigate(['home'])
    }
  }

  onSubmit(f: NgForm) {
    let auth: Auth = new AuthModel()
    auth.login = this.model.login
    auth.password = this.model.password
    this._subscription.add(this.getToken(auth))
  }

  private getToken(auth: AuthModel): Subscription {
    return this.authService.getToken(auth).subscribe(
      {
        complete: () => {
          this.messageService.clearMessages()
          this.router.navigate(['/event'])
        },
        error: error => this.error = "Podany login lub hasło są nie prawidłowe, lub nie masz konta w aplikacji"
      }
    )
  }

  ngOnDestroy() {
    if (this._subscription) this._subscription.unsubscribe();
  }
}