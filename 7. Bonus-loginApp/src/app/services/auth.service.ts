import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyDAPoC9K0Sf79g4uYD93TTybwpQhKJ2nfY';

  userToken: string;
  userExpira: string;

  // Crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

  // Login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]

  constructor( private http: HttpClient) { 
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.userToken = '';
  }

  login( usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/verifyPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  nuevoUsuario( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/signupNewUser?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  private guardarToken( idToken: string ){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 100 );

    localStorage.setItem( 'expira', hoy.getTime().toString() );

  }

  leerToken() {

    if ( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    if ( localStorage.getItem('expira') ){
      this.userExpira = localStorage.getItem('exóra');
    } else {
      this.userExpira = '';
    }

    return this.userToken;

  }

  estaAunteticado(): boolean {

    if ( this.userToken.length < 2 || localStorage.getItem('token').length < 2) {
      console.log("No Tiene Token");
      return false;
    } else {
      console.log("Tiene Token");
      
      const expira = Number(localStorage.getItem('expira'));
      const expiraDate = new Date();
      expiraDate.setTime(expira);
  
      console.log("expira: " + expira);
      console.log("expiraDate: " + expiraDate.getTime());
      console.log("new Date: " + (new Date()).getTime());
      console.log("diff: " + (expiraDate.getTime() - (new Date()).getTime()));
  
      if( expiraDate > new Date() ){
        console.log("estaAunteticado: False");
        return true;
      }else{
        localStorage.removeItem('token');
        this.userToken = '';
        localStorage.removeItem('expira');
        this.userExpira = '';
        console.log("estaAunteticado: False");
        return false;
      }

    }
 

  }

}
