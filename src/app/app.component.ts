import { Component } from '@angular/core';

import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

/**
 * Variable para hacer uso del JS de Materialize
 */
declare var M: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Iniciar Sesión';

  public user: SocialUser | undefined;
  public loggedIn: boolean = false;

  constructor(private authService: SocialAuthService) {
    this.authService.authState.subscribe(
      (user) => {
        this.user = user;
        this.loggedIn = (user != null);
      }
    )
  }

  /**
   * Funcion para autentificarse usando Google
   */
  signInWithGoogle(): void {
    console.log("Google");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.title = "Lista de Empleados";
  }

  /**
   * Funcion para autentificarse usando Facebook
   */
  signInWithFacebook(): void {
    console.log("Facebook");
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.title = "Lista de Empleados";
  }

  /**
   * Funcion para cerrar sesión
   */
  signOut(): void { 
    console.log("Salir");
    this.authService.signOut();
    this.title = "Iniciar Sesión";
  }

}
