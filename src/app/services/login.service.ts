import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { CadasService } from './cadas.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: Observable<firebase.User>;
  email: string;

  constructor(
    private router: Router,
    private cadasService: CadasService,
    public afAuth: AngularFireAuth
  ) {
    this.user = afAuth.authState;
  }

  public async login(mail: string, password: string) {
    await new Promise((_resolve, _reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(mail, password)
        .then(user => {
          localStorage['token'] = user.user;
          const first = mail.slice(0, 1).toUpperCase();
          const end = mail.slice(1, mail.indexOf('@'));
          this.email = first + end;

          this.cadasService.openSnackBar(`Seja bem vindo ${this.email}`, 'BOM TRABALHO');
          this.router.navigate(['/cadas']);
        })
        .catch(error => {
          // this.handleError(error);
          this.router.navigate(['/login']);

          (error.code === 'auth/wrong-password')
          ? this.cadasService.openSnackBar(`Senha incorreta`, 'TENTE NOVAMENTE')
          : this.cadasService.openSnackBar(`${mail} não encontrado`, 'TENTE NOVAMENTE');
        });
    }).catch(error => {
      this.handleError(error);
      this.router.navigate(['/login']);
    });
  }

  public async logout() {
    await this.afAuth.auth
      .signOut()
      .then(() => {
        localStorage.clear();
        localStorage.removeItem('firebase:host:project-cadas-app.firebaseio.com');
        this.cadasService.openSnackBar(`Até mais tarde ${this.email}`, 'ATÉ LOGO');
      })
      .catch(error => {
        this.handleError(error);
        this.cadasService.openSnackBar(`Opps! Aconteceu algum erro , não foi posivel realizar essa operação`, 'TENTE NOVAMENTE');
      });
  }

  public handleError(error: any) {
    console.log('Error na Conexão');
    console.log(error);
  }
}
