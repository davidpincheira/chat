import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { usercreds } from '../../models/interfaces/usercreds';

@Injectable()
export class AuthProvider {

  constructor( public angularfireauth: AngularFireAuth) {
  }

  login(credentials: usercreds){
  	var promise = new Promise((resolve, reject)=>{
  		this.angularfireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(()=>{
  			resolve(true);
  		}).catch((err)=>{
  			reject(err);
  		})
  	});
  	
  	return promise;
  }

}
