import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from './MyErrorStateMatcher';
import { LoginService } from 'src/app/services/login.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  matcher = new MyErrorStateMatcher();
  isMobile: boolean;
  observerSubscription: Subscription;

  colsImg = '2';
  colsForm = '1';

  constructor(
    private loginService: LoginService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.observerSubscription = this.breakpointObserver.observe([Breakpoints.Web])
    .subscribe((result: BreakpointState) => {
      this.isMobile = !result.matches;
      if (this.isMobile) {
        this.colsImg = '0';
        this.colsForm = '3';
      }
  });
  }

  ngOnDestroy() {
    this.observerSubscription.unsubscribe();
  }

  logOn(mail: string, password: string) {
    this.loginService.login(mail, password);
  }
}
