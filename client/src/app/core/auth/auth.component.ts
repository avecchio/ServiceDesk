import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth/auth.service';

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.css'],
    templateUrl: 'login.component.html',
    providers: [AuthService]
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(
        protected router: Router,
        private authService: AuthService,
    ) { }

    public ngOnInit(): void {
        this.buildLoginForm();
        this.authService.isAuthenticated();
        this.authService.loggedIn
            .asObservable()
            .subscribe(isAuthenticated => {
                this.redirectIfLoggedIn(isAuthenticated);
            });
    }

    public authenticateUser() {
        this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
    }

    private buildLoginForm(): void {
        this.loginForm = new FormGroup({
            'username': new FormControl('', [Validators.required]),
            'password': new FormControl('', [Validators.required]),
        });
    }

    private redirectIfLoggedIn(authenticated: boolean) {
        if (authenticated) {
            this.router.navigateByUrl('dashboard');
        }
    }
}
