import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class UserProvider {
	firedata = firebase.database().ref('/users');
  constructor(public angularfireauth: AngularFireAuth) {
  }


  adduser(newuser) {//registro un nuevo usuario
    var promise = new Promise((resolve, reject) => {
      this.angularfireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.angularfireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://www.shareicon.net/data/512x512/2016/09/15/829473_man_512x512.png'
        }).then(() => {
          this.firedata.child(this.angularfireauth.auth.currentUser.uid).set({
            uid: this.angularfireauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: 'https://www.shareicon.net/data/512x512/2016/09/15/829473_man_512x512.png'
          }).then(() => {
            resolve({ success: true });
            }).catch((err) => {
              reject(err);
          })
          }).catch((err) => {
            reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  passwordreset(email){
    var promise = new Promise((resolve, reject)=>{
      firebase.auth().sendPasswordResetEmail(email).then(()=>{
        resolve({success: true});
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }

  updateimage(imageurl) {//actualizo una imagen
      var promise = new Promise((resolve, reject) => {
          this.angularfireauth.auth.currentUser.updateProfile({
              displayName: this.angularfireauth.auth.currentUser.displayName,
              photoURL: imageurl      
          }).then(() => {
              firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
              displayName: this.angularfireauth.auth.currentUser.displayName,
              photoURL: imageurl,
              uid: firebase.auth().currentUser.uid
              }).then(() => {
                  resolve({ success: true });
                  }).catch((err) => {
                      reject(err);
                  })
          }).catch((err) => {
                reject(err);
             })  
      })
      return promise;
  }

  getuserdetails() { //detalles de usuarios
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }

  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.angularfireauth.auth.currentUser.updateProfile({
      displayName: newname,
      photoURL: this.angularfireauth.auth.currentUser.photoURL
    }).then(() => {
      this.firedata.child(firebase.auth().currentUser.uid).update({
        displayName: newname,
        photoURL: this.angularfireauth.auth.currentUser.photoURL,
        uid: this.angularfireauth.auth.currentUser.uid
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
      }).catch((err) => {
        reject(err);
    })
    })
    return promise;
  }

 
  getallusers() { //trae todos los usuarios exceptuando el mismo que esta logueado
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
          for (var key in userdata) {
            if (key != firebase.auth().currentUser.uid) {// reduce 1 loop. and current user will not show in search list
              temparr.push(userdata[key]);
            }
          }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}
