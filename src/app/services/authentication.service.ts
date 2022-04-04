import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private auth: Auth) {}

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password).then((result) => {
      localStorage.setItem('user',JSON.stringify(this.auth.currentUser))
    }));
  }

  logout() {
    return from(this.auth.signOut().then((result)=>{
      localStorage.removeItem('user')
    }));
  }
}
